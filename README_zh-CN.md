# APP 落地页模板
本模板是基于 Next.js 静态生成和 Tailwind CSS 实现的 App 落地页，外观设计来自[
Zelal Hossain](https://www.figma.com/community/file/995026220622307527)。

## 本地开发
安装依赖：`npm install`
本地调试：`npm run dev`

## 样式主题
在 `/src/styles/globals.css` 可以修改样式颜色。

## 服务器部署（Ubuntu + Docker）
参考文档：`docs/deploy-ubuntu22-docker26-nginx.md`

## 镜像构建与发布
仓库已内置 GitHub Actions 工作流：`.github/workflows/build-web-image.yml`

目标镜像仓库：

- Registry：`crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com`
- Repository：`three_engine/caselog-web`

工作流规则：

- 推送到 `main`：只做 Docker 构建校验，不推送镜像
- 推送 `v1.0.0` 这类 Git Tag：构建并推送镜像

GitHub 仓库需要提前配置以下 Repository secrets：

- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`

正式发布示例：

```bash
git tag v1.0.0
git push origin v1.0.0
```

发布后会产出这些镜像标签：

- `latest`
- `sha-<commit>`
- `1.0.0`
- `1.0`

## 特性
- 使用Next.js TypeScript 开发
- Tailwind CSS 构建灵活简洁的样式
- 纯静态页面，Lighthouse 分数优秀
- 模块化、响应式、可扩展的&组件
