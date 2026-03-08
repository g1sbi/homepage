FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci 2>/dev/null || npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "build"]
