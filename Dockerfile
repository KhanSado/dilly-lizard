FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-lockfile

COPY src ./src

RUN nest build

RUN prisma generate

CMD ["yarn", " yarn run start:prod"]

EXPOSE 3000