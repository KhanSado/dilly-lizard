FROM node:17

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-lockfile --frozen-lockfile

COPY src ./src

# Install global tools & dependencies
RUN npm install -g @nestjs/cli
RUN npm install -g npm@10.4.0

# Update relevant dependencies
RUN yarn upgrade memfs
RUN yarn upgrade fork-ts-checker-webpack-plugin

RUN yarn cache clean
RUN npm cache clean

RUN yarn install
RUN npm install

# Install platform-specific packages
RUN apk add --no-cache postgresql-dev
RUN apk add --no-cache icu-data-full

# Set production environment
ENV NODE_ENV production

# Build the application
RUN nest build

# Verify build output
RUN if [ ! -d dist/main ]; then echo "ERRO: Diretório dist/main não encontrado. Verifique o comando nest build."; exit 1; fi

# Mount dependency volume
VOLUME /app/node_modules

# Start the application
CMD ["yarn", "start:prod"]

EXPOSE 3000
