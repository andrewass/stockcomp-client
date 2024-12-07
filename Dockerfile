FROM node:22.11.0-alpine3.20

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]


