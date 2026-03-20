# 部署指南（Ubuntu 22.04 + Docker 26）

适用环境：腾讯云 `Ubuntu 22.04-Docker26`。  
结论：这个环境完全可用，而且很适合你当前方案（主机不直接安装 Nginx，全部走容器）。

## 1. 部署目标

- 同一台服务器同时承载静态页面和未来后端服务
- 对外只暴露一个 Nginx 容器（80/443）
- 后端服务运行在独立容器，通过 Docker 内网与 Nginx 通信

架构示意：

```text
Internet
   |
Domain -> Server Public IP
   |
Nginx Container (:80/:443)
   |-- /        -> Static Files (Next.js out/)
   `-- /api/*   -> Backend Container (:8080)
```

## 2. 前置检查

在服务器执行：

```bash
docker -v
docker compose version
```

如果 `docker compose` 不可用，安装 Compose 插件：

```bash
sudo apt-get update
sudo apt-get install -y docker-compose-plugin
```

## 3. 域名与网络

1. 在腾讯云 DNS（或 DNSPod）把 `A` 记录指向服务器公网 IP（常见是 `@` 和 `www` 两条）。
2. 腾讯云安全组放行 `80`、`443`（以及你自己的 `22`）。
3. 如果启用 UFW，放行端口：

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw status
```

## 4. 构建静态页面（不在主机安装 Node）

以下步骤使用 `node` 容器构建，不污染主机环境。

```bash
sudo mkdir -p /opt/caselog
cd /opt/caselog

# 拉代码（替换为你的仓库地址）
git clone <your-repo-url> source
cd source

# 在容器里安装依赖并构建，产物目录是 out/
docker run --rm -v "$PWD":/app -w /app node:20-alpine sh -lc "npm ci && npm run build"

# 准备给 nginx 挂载的静态目录
sudo mkdir -p /opt/caselog/frontend
sudo rm -rf /opt/caselog/frontend/*
sudo cp -R out/. /opt/caselog/frontend/
```

## 5. 准备 Nginx 配置（先部署静态页）

创建目录和配置文件：

```bash
sudo mkdir -p /opt/caselog/nginx/conf.d
sudo tee /opt/caselog/nginx/conf.d/default.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name example.com www.example.com;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    location /_next/static/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
}
EOF
```

把 `example.com` 换成你的真实域名。

## 6. 启动 Nginx 容器

创建 `docker-compose.yml`：

```bash
sudo tee /opt/caselog/docker-compose.yml > /dev/null <<'EOF'
services:
  nginx:
    image: nginx:1.27-alpine
    container_name: caselog-nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - /opt/caselog/frontend:/usr/share/nginx/html:ro
      - /opt/caselog/nginx/conf.d:/etc/nginx/conf.d:ro
EOF
```

启动：

```bash
cd /opt/caselog
docker compose up -d
docker compose ps
docker compose logs -f nginx
```

## 7. 验证

```bash
# 本机验证
curl -I http://127.0.0.1

# 域名验证（DNS 生效后）
curl -I http://example.com
```

## 8. 后续接入后端 API（同一个 Nginx 管理）

你后端容器准备好后，更新 `docker-compose.yml`，新增 `backend` 服务：

```yaml
services:
  nginx:
    image: nginx:1.27-alpine
    container_name: caselog-nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - /opt/caselog/frontend:/usr/share/nginx/html:ro
      - /opt/caselog/nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - backend

  backend:
    image: your-registry/your-backend:latest
    container_name: caselog-backend
    restart: unless-stopped
    expose:
      - "8080"
```

然后在 `/opt/caselog/nginx/conf.d/default.conf` 增加：

```nginx
location /api/ {
    proxy_pass http://backend:8080/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

重启：

```bash
cd /opt/caselog
docker compose up -d
docker compose restart nginx
```

这样，`https://example.com/` 走静态页面，`https://example.com/api/*` 走后端容器。

## 9. HTTPS（建议）

生产建议加 TLS（`443`）：

- 方案 A：使用腾讯云负载均衡/证书服务终止 HTTPS，再回源到 Nginx 容器 `80`
- 方案 B：在服务器用证书（例如 `certbot`）并给 Nginx 容器挂载证书目录

无论选哪种，部署模型不变：一个 Nginx 容器统一管理静态页和 API 入口。
