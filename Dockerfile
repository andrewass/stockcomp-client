FROM node:16.13.1-alpine3.13

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]


