# APP Landing Page Template
This template is an App landing page implemented with Next.js static generation and Tailwind CSS. The design is inspired by [Zelal Hossain](https://www.figma.com/community/file/995026220622307527).

## Local Development
Install dependencies: `npm install`
Local development: `npm run dev`

## Style Theme
You can modify the color theme in `/src/styles/globals.css`.

## Image Build And Release
This repository includes a GitHub Actions workflow for container image build and release:

- Workflow file: `.github/workflows/build-web-image.yml`
- Registry: `crpi-had8j9la06ibxzbx.cn-shanghai.personal.cr.aliyuncs.com`
- Image repository: `three_engine/caselog-web`

Behavior:

- Push to `main`: build validation only, no image push
- Push tag like `v1.0.0`: build and push image

Required GitHub Actions secrets:

- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`

Release example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

This will publish image tags such as:

- `latest`
- `sha-<commit>`
- `1.0.0`
- `1.0`

## Features
- Developed with Next.js TypeScript
- Flexible and clean styling with Tailwind CSS
- Purely static pages, excellent Lighthouse scores
- Modular, responsive and scalable components
