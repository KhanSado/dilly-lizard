# # Use uma imagem base Node.js
# FROM node:18

# RUN apt-get update && apt-get install -y npm

# # RUN npm cache clean
# RUN npm cache verify

# RUN yarn cache clean

# RUN rm -rf /usr/local/bin

# RUN rm -rf ../lib/node_modules 

# RUN rm -rf node_modules

# RUN rm -rf package-lock.json

# # Instale o Yarn globalmente
# RUN npm install --location=global yarn

# # Instale as dependências do projeto
# RUN yarn install

# # Construa a aplicação
# RUN yarn build -force

# # Copie o arquivo package.json e yarn.lock para o diretório de trabalho
# # COPY package.json yarn.lock ./

# # Copie o restante dos arquivos do projeto para o diretório de trabalho
# COPY . .

# # Defina o diretório de trabalho dentro do contêiner
# WORKDIR /

# # Exponha a porta em que a aplicação estará em execução (substitua a porta 3000 pela porta correta, se necessário)
# EXPOSE 3000

# # Comando para iniciar a aplicação (substitua pelo comando correto para iniciar sua aplicação)
# CMD ["yarn run start:prod"]


# Use uma imagem base Node.js
FROM node:18

# Instale o Yarn globalmente
RUN npm install --global yarn

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

RUN rm -f /usr/local/bin/yarn

# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install --frozen-lockfile

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN yarn build

# Exponha a porta em que a aplicação estará em execução (substitua a porta 3000 pela porta correta, se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação (substitua pelo comando correto para iniciar sua aplicação)
CMD ["yarn", "start:prod"]
