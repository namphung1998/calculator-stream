FROM node:10.18.1-alpine

WORKDIR /usr/src/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]