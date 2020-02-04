FROM node:10.18.1-alpine

WORKDIR /usr/src/client

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]