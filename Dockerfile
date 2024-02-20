FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-lockfile

COPY src ./src

RUN yarn upgrade @nestjs/cli fork-ts-checker-webpack-plugin memfs ts-loader

RUN npm install -g @nestjs/cli

RUN nest build

RUN prisma generate

CMD ["yarn", " yarn run start:prod"]

EXPOSE 3000