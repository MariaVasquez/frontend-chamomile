FROM node:18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.25.0-alpine

COPY --from=build-step /app/dist/chamomile /usr/share/nginx/html
