# 腾讯云服务器首个网关部署

适用场景：

- 服务器：腾讯云 `Ubuntu 22.04-Docker26`
- 登录方式：可直接 `root` 登录
- 当前状态：已经有前端镜像，还没有搭第一个 `nginx` 网关
- 目标：先让 `www.caselog.cn` 访问当前静态官网，`api.caselog.cn` 先预留

这份文档只讲第一次把站点跑起来的最小步骤，不展开 CI、镜像构建和完整生产架构。

## 1. 先确认三件事

1. 腾讯云安全组当前至少已经放行 `80`
2. 域名已经解析到服务器公网 IP
3. 服务器里已经有 `docker` 和 `docker compose`

当前阶段端口建议：

- `80`：现在就放行，用于先把官网跑通
- `443`：等你准备启用 HTTPS 时再放行
- SSH 管理端口：按你自己的实际登录端口单独控制，这份文档不假设一定开放 `22`

检查命令：

```bash
docker -v
docker compose version
```

## 2. 域名解析建议

在 DNS 里先配这三条：

- `www.caselog.cn` -> 服务器公网 IP
- `caselog.cn` -> 服务器公网 IP
- `api.caselog.cn` -> 服务器公网 IP

当前阶段：

- `www.caselog.cn`：走静态官网
- `caselog.cn`：跳转到 `www.caselog.cn`
- `api.caselog.cn`：先返回 `503`，等后端镜像准备好后再接入

## 3. 服务器先登录镜像仓库

因为前端镜像在阿里云私有仓库里，服务器第一次拉镜像前需要先登录：

```bash
docker login --username=rivendell1984@gmail.com crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com
```

登录成功后，可以先手动验证镜像能拉下来：

```bash
docker pull crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com/three_engine/caselog-web:1.0.1
```

## 4. 创建部署目录

```bash
mkdir -p /opt/caselog/deploy/gateway/conf.d
cd /opt/caselog
```

推荐目录结构：

```text
/opt/caselog
  ├── docker-compose.yml
  └── deploy
      └── gateway
          └── conf.d
              └── default.conf
```

## 5. 写 docker-compose.yml

在 `/opt/caselog/docker-compose.yml` 写入：

```yaml
services:
  gateway:
    image: nginx:1.27-alpine
    container_name: caselog-gateway
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./deploy/gateway/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - web

  web:
    image: crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com/three_engine/caselog-web:1.0.1
    container_name: caselog-web
    restart: unless-stopped
    expose:
      - "80"
```

说明：

- 现在只启动两个容器：`gateway` 和 `web`
- `gateway` 是外层网关
- `web` 是你已经构建好的前端静态镜像
- 建议从 `1.0.1` 开始使用，因为这个版本起未知路径会返回 `404`，不会再把 `/wp-admin/...` 之类的扫描请求错误返回为首页 `200`

## 6. 写网关 Nginx 配置

在 `/opt/caselog/deploy/gateway/conf.d/default.conf` 写入：

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
    return 503 "API not deployed yet\n";
    add_header Content-Type text/plain;
}
```

这份配置现在的行为是：

- `caselog.cn` 自动跳到 `www.caselog.cn`
- `www.caselog.cn` 转发到前端容器 `web`
- `api.caselog.cn` 暂时直接返回 `503`

## 7. 启动

```bash
cd /opt/caselog
docker compose pull
docker compose up -d
docker compose ps
```

查看日志：

```bash
docker logs caselog-gateway
docker logs caselog-web
```

## 8. 验证

先在服务器本机验证：

```bash
curl -I http://127.0.0.1
curl -I -H "Host: www.caselog.cn" http://127.0.0.1
curl -I -H "Host: api.caselog.cn" http://127.0.0.1
```

预期：

- `127.0.0.1` 会命中默认站点或 `www` 站点
- `www.caselog.cn` 返回 `200`
- `api.caselog.cn` 返回 `503`
- 类似 `/wp-admin/setup-config.php` 这类未知路径应返回 `404`，而不是首页 `200`

然后再用浏览器访问：

- `http://www.caselog.cn`
- `http://caselog.cn`

## 9. 更新前端镜像

如果后面你发布了新版本，比如 `1.0.1`，只需要改 `docker-compose.yml` 里的镜像 tag：

```yaml
image: crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com/three_engine/caselog-web:1.0.1
```

然后执行：

```bash
cd /opt/caselog
docker compose pull
docker compose up -d
```

如果你当前已经部署的是 `1.0.0`，想修复未知路径返回首页的问题，最直接的做法就是发布 `v1.0.1`，然后把服务器上的镜像 tag 改到 `1.0.1` 再重新拉取启动。

## 10. 后续接入 API

等后端镜像准备好后，补两件事：

1. 在 `docker-compose.yml` 里加 `api` 服务
2. 把 `api.caselog.cn` 的 `503` 配置改成反向代理

替换为：

```nginx
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

## 11. 现在先不要做的事

第一次上线先不要同时处理太多变量。

当前阶段不建议一开始就做：

- 不建议先上 HTTPS，先把 `80` 跑通
- 不建议把前端源码直接放到服务器构建
- 不建议主机直接安装 Nginx
- 不建议先把后端也一起部署，先把官网和网关跑通

先把 `www.caselog.cn` 稳定打开，再继续加 `443`、证书、后端服务。
