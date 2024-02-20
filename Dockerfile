# FROM node:18-alpine

# WORKDIR /app

# COPY package.json yarn.lock ./

# RUN yarn install --no-lockfile

# RUN yarn cache clean

# RUN npm install -g npm@10.4.0

# COPY src ./src

# RUN yarn upgrade @nestjs/cli fork-ts-checker-webpack-plugin memfs ts-loader

# RUN yarn upgrade --force webpack@^5.0.0 ts-loader

# RUN yarn upgrade fork-ts-checker-webpack-plugin

# RUN npm install -g @nestjs/cli

# RUN nest build

# RUN prisma generate

# CMD ["yarn", " yarn run start:prod"]

# EXPOSE 3000
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-lockfile --frozen-lockfile

COPY src ./src

# RUN apk add --no-cache postgresql-dev  # Assuming you need PostgreSQL for Prisma

# ENV NODE_ENV production

RUN nest build

# Verifica se o diretório dist/main foi criado
RUN if [ ! -d dist/main ]; then echo "ERRO: Diretório dist/main não encontrado. Verifique o comando nest build."; exit 1; fi

VOLUME /app/node_modules

CMD ["yarn", "start:prod"]

EXPOSE 3000