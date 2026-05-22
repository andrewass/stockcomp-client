FROM node:24.15.0-alpine3.23 AS build

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN mkdir -p public \
	&& cp -r public .next/standalone/ \
	&& cp -r .next/static .next/standalone/.next/

FROM node:24.15.0-alpine3.23 AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/.next/standalone ./

EXPOSE 3000

CMD ["node", "server.js"]
