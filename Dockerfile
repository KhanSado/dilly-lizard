FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-lockfile

RUN yarn cache clean

RUN npm install -g npm@10.4.0

COPY src ./src

RUN yarn upgrade @nestjs/cli fork-ts-checker-webpack-plugin memfs ts-loader

RUN yarn upgrade --force webpack@^5.0.0 ts-loader

RUN yarn upgrade fork-ts-checker-webpack-plugin

RUN npm install -g @nestjs/cli

RUN nest build

RUN prisma generate

CMD ["yarn", " yarn run start:prod"]

EXPOSE 3000