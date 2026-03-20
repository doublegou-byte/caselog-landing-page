FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.ts tsconfig.json next-env.d.ts postcss.config.mjs eslint.config.mjs tailwind.config.js ./
COPY public ./public
COPY src ./src

RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
