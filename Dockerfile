FROM node:16-alpine as base

WORKDIR /home/app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build