# 部署指南（Ubuntu 22.04 + Docker 26）

适用环境：腾讯云 `Ubuntu 22.04-Docker26`。  
目标域名：

- `www.caselog.cn`：当前这个静态官网
- `api.caselog.cn`：未来后端 API

结论：这个环境完全可用，而且适合做“纯镜像部署”。主机不直接安装 Nginx、不直接安装 Node、不直接放源码；服务器只负责运行 Docker 和容器。

## 1. 推荐架构

推荐拆成 3 个容器：

- `gateway`：外层反向代理 Nginx，对外暴露 `80/443`
- `web`：前端静态站点镜像，内部也可以是 Nginx，只负责提供静态文件
- `api`：后端服务镜像，监听内部端口，例如 `8080`

域名都解析到同一台服务器公网 IP，由 `gateway` 按 `Host` 头转发：

```text
Internet
   |
   |-- www.caselog.cn ----\
   |-- api.caselog.cn ----- > gateway (nginx :80/:443)
                              |-- Host=www.caselog.cn -> web:80
                              `-- Host=api.caselog.cn -> api:8080
```

这意味着会出现两个 Nginx：

- 外层 Nginx：做域名路由、HTTPS、反向代理
- 前端镜像里的 Nginx：只负责返回静态页面

这是常见生产方案，不冲突，也比“一个 Nginx 全包”更容易维护。

## 2. 为什么用这个方案

- 完全镜像化：前端、后端、网关都可独立发布和回滚
- 主机更干净：不直接安装 Nginx、Node、PM2
- 职责清晰：网关管入口，前端管静态资源，后端管 API
- 以后扩展方便：未来加 `admin.caselog.cn`、`staging` 只需要继续挂新容器

## 3. 服务器上到底放什么

推荐服务器上只放这几类文件：

- `docker-compose.yml`
- `gateway` 的 Nginx 配置
- HTTPS 证书文件（如果证书不在云负载均衡层终止）

不建议服务器上直接做这些事：

- 不建议 `git clone` 前端源码到线上服务器再构建
- 不建议主机直接安装 Nginx
- 不建议主机直接运行 Node 服务

更推荐的流程是：

1. 在本地或 CI 构建前端镜像和后端镜像
2. 推送到镜像仓库
3. 服务器只执行 `docker compose pull && docker compose up -d`

## 4. 当前项目适不适合做静态镜像

适合。这个项目已经配置了 Next.js 静态导出：

```ts
output: "export"
```

因此可以先执行 `npm run build` 生成 `out/`，再把 `out/` 打进一个前端静态镜像。

## 5. 域名与网络准备

在腾讯云 DNS（或 DNSPod）配置：

- `www.caselog.cn` -> 服务器公网 IP
- `api.caselog.cn` -> 服务器公网 IP

可选：

- `caselog.cn` -> 服务器公网 IP，再由 `gateway` 301 跳到 `https://www.caselog.cn`

服务器侧放行端口：

- 安全组放行 `80`、`443`、`22`
- 如果启用 UFW：

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw status
```

## 6. 前端镜像怎么做

前端镜像建议使用多阶段构建：

1. 第一阶段用 `node` 构建当前项目，输出 `out/`
2. 第二阶段用 `nginx:alpine` 承载静态文件

示例 `Dockerfile`：

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
```

前端容器内部的 Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;

    location /_next/static/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
}
```

这样前端镜像就是完整可运行单元，不依赖宿主机目录挂载。

这里特意不把未知路径回退到 `/index.html`，因为当前站点是单页官网而不是前端路由应用。这样可以避免诸如 `/wp-admin/...` 这类扫描请求错误地返回 `200`。

## 7. 外层网关 Nginx 怎么做

外层 `gateway` 容器负责根据域名转发。

示例 `gateway` 配置：

```nginx
server {
    listen 80;
    server_name caselog.cn;
    return 301 http://www.caselog.cn$request_uri;
}

server {
    listen 80;
    server_name www.caselog.cn;

    location / {
        proxy_pass http://web:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name api.caselog.cn;

    location / {
        proxy_pass http://api:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

以后上 HTTPS 时，思路不变，只是把 `80` 改成 `443 ssl` 并挂证书。

## 8. Docker Compose 推荐结构

示例 `docker-compose.yml`：

```yaml
services:
  gateway:
    image: nginx:1.27-alpine
    container_name: caselog-gateway
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deploy/gateway/conf.d:/etc/nginx/conf.d:ro
      - ./deploy/gateway/certs:/etc/nginx/certs:ro
    depends_on:
      - web
      - api

  web:
    image: your-registry/caselog-web:latest
    container_name: caselog-web
    restart: unless-stopped
    expose:
      - "80"

  api:
    image: your-registry/caselog-api:latest
    container_name: caselog-api
    restart: unless-stopped
    expose:
      - "8080"
```

说明：

- 只有 `gateway` 需要映射主机端口
- `web` 和 `api` 不需要直接暴露到公网
- `gateway` 通过服务名 `web`、`api` 访问它们

这就是 Docker 容器之间协同的方式：同一个 Compose 网络内，服务名就是容器内 DNS 名称。

## 9. 服务器部署步骤

推荐服务器目录结构：

```text
/opt/caselog
  ├── docker-compose.yml
  └── deploy
      └── gateway
          ├── certs
          └── conf.d
```

服务器实际操作可以简化为：

```bash
sudo mkdir -p /opt/caselog
cd /opt/caselog

# 放入 docker-compose.yml 和 gateway 配置
docker compose pull
docker compose up -d
docker compose ps
```

更新上线时：

```bash
cd /opt/caselog
docker compose pull
docker compose up -d
```

如果只更新前端镜像或后端镜像，也不需要改主机环境。

## 10. HTTPS 怎么处理

可以选两种方式：

- 方式 A：在腾讯云负载均衡或 CDN 终止 HTTPS，再回源到 `gateway:80`
- 方式 B：证书直接挂到 `gateway` 容器，由 Nginx 处理 `443`

如果你希望服务器上也完全容器化，方式 B 依然可行，证书文件直接挂载给 `gateway` 即可。

## 11. 这个方案的最终结论

你的理解可以定成这套：

- 一个单独的 `nginx` 镜像，作为外层入口网关
- 一个单独的前端静态镜像，负责提供官网 HTML、CSS、JS、图片
- 一个单独的后端镜像，负责 API
- `www.caselog.cn` 由外层 Nginx 路由到前端镜像
- `api.caselog.cn` 由外层 Nginx 路由到后端镜像

这是你当前需求下最清晰、最容易扩展、最符合生产环境的方案。

## 12. 当前仓库已补齐的文件

当前仓库已经可以直接用来构建前端镜像，相关文件如下：

- `Dockerfile`：多阶段构建当前 Next.js 项目，并将 `out/` 打进 Nginx 镜像
- `deploy/web/default.conf`：前端静态站点容器内部的 Nginx 配置
- `.dockerignore`：缩小构建上下文，避免把无关文件打进镜像
- `.github/workflows/build-web-image.yml`：GitHub Actions 自动构建并推送前端镜像

默认工作流行为：

- 推送到 `main` 时只做镜像构建校验，不推送镜像
- 推送形如 `v1.0.0` 的 Git Tag 时自动构建并推送镜像
- 支持在 GitHub Actions 页面手动触发

镜像标签默认会包含：

- `latest`：发布 Tag 时生成
- `sha-<commit>`：发布 Tag 时按提交号生成
- `1.0.0`、`1.0` 这类语义化版本标签：当使用 `v1.0.0` 这类 Git Tag 触发时生成

## 13. GitHub Actions 需要配置什么

在 GitHub 仓库里配置以下 Secrets：

- `REGISTRY_USERNAME`：阿里云 ACR 登录用户名
- `REGISTRY_PASSWORD`：阿里云 ACR 登录密码或令牌

当前工作流已经固定写入以下目标镜像仓库：

- `REGISTRY=crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com`
- `IMAGE_REPOSITORY=three_engine/caselog-web`

工作流推送后的完整镜像名会是：

```text
crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com/three_engine/caselog-web:latest
```

## 14. 版本号规则

版本从 `1.0` 起步，建议第一个正式版本使用 Git Tag：

```bash
git tag v1.0.0
git push origin v1.0.0
```

当你推送 `v1.0.0` 时，工作流会自动推送这些标签：

- `1.0.0`
- `1.0`

当你直接推送 `main` 分支时，工作流会自动推送这些标签：

不会推送镜像，只会校验 Docker 构建是否通过

## 15. 关于阿里云 ACR 个人版自动构建

阿里云官方文档仍然提供了“绑定 GitHub 自动构建镜像”的能力说明，但该能力已经出现地域和产品功能调整。

如果你只是想稳定地做到“代码提交后自动出镜像”，更推荐直接使用 GitHub Actions：

- 平台无关，不被某个镜像仓库的构建能力绑定
- 后续从阿里云 ACR 切到腾讯云 TCR、Docker Hub、GHCR 时，工作流基本不用改
- 构建日志、触发记录、Tag 规则都在 GitHub 内更直观

因此，这个仓库优先采用 GitHub Actions 构建并推送镜像，而不是把自动构建能力绑定在镜像仓库控制台里。
