# Use specific Node.js 17 version:
FROM node:17-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock:
COPY package.json yarn.lock ./

# Install dependencies (frozen lockfile, clean cache):
RUN yarn install --no-lockfile --frozen-lockfile && yarn cache clean

# Copy source code:
COPY src ./src

# Install global tools & dependencies:
RUN npm install -g @nestjs/cli npm@10.4.0

# Update relevant dependencies:
RUN yarn upgrade memfs fork-ts-checker-webpack-plugin

# Install platform-specific packages:
RUN apk add --no-cache postgresql-dev icu-data-full

# Set production environment:
ENV NODE_ENV production

# Build the application:
RUN nest build

# Verify build output:
RUN if [ ! -d dist/main ]; then echo "ERRO: Diretório dist/main não encontrado. Verifique o comando nest build."; exit 1; fi

# Mount dependency volume:
VOLUME /app/node_modules

# Start the application:
CMD ["yarn", "start:prod"]

# Expose port:
EXPOSE 3000