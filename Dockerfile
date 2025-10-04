FROM node:22.20.0-alpine3.22 AS build
WORKDIR /app

ARG REACT_APP_STOCK_QUOTE_BASE_URL
ARG REACT_APP_STOCK_CONTEST_BASE_URL

ENV REACT_APP_STOCK_QUOTE_BASE_URL=$REACT_APP_STOCK_QUOTE_BASE_URL
ENV REACT_APP_STOCK_CONTEST_BASE_URL=$REACT_APP_STOCK_CONTEST_BASE_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
