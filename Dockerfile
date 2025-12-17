FROM node:24.12.0-alpine3.23 AS build

WORKDIR /app

RUN corepack enable

ARG REACT_APP_STOCK_QUOTE_BASE_URL
ARG REACT_APP_STOCK_CONTEST_BASE_URL

ENV REACT_APP_STOCK_QUOTE_BASE_URL=$REACT_APP_STOCK_QUOTE_BASE_URL
ENV REACT_APP_STOCK_CONTEST_BASE_URL=$REACT_APP_STOCK_CONTEST_BASE_URL

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
