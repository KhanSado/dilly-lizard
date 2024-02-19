# Use uma imagem base Node.js
FROM node:14

# Instale o Yarn globalmente
RUN npm install -g yarn -force

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src

# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install -force

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN yarn build -force

# Exponha a porta em que a aplicação estará em execução (substitua a porta 3000 pela porta correta, se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação (substitua pelo comando correto para iniciar sua aplicação)
CMD [ "yarn", "nest start"]
