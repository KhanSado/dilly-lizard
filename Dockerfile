# Use uma imagem base Node.js
FROM node:17

RUN apt-get update && apt-get install -y npm

RUN npm cache clean --force

RUN yarn cache clean -force

RUN rm -rf /usr/local/bin

RUN rm -rf ../lib/node_modules 

# Instale o Yarn globalmente
RUN npm install --location=global yarn

# Comandos adicionais, como instalação de dependências, construção de aplicativos, etc. (opcional)
RUN npm install

RUN npm run build

# Instale as dependências do projeto
RUN yarn install -force

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src

# Construa a aplicação
RUN yarn build -force


# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
# COPY package.json yarn.lock ./

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação estará em execução (substitua a porta 3000 pela porta correta, se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação (substitua pelo comando correto para iniciar sua aplicação)
CMD ["npm", "yarn", "yarn run start:prod"]
