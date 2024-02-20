# Utilize Node.js 18.13.0 ou superior (evita incompatibilidade)
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos essenciais
COPY package.json yarn.lock tsconfig.json prisma ./

# Definir variável de ambiente para conexão com o banco de dados
# ENV DATABASE_URL='postgres://postgres:MG9TK%23sbqXN%2Ab4%23@db.poxhibnnxdqztblxyihy.supabase.co:5432/dilly-kangaskan?schema'
ENV DATABASE_URL='postgresql://postgres:dilly010203empresa@db.wqkqiyyxrsxzyawrfhdt.supabase.co:5432/khangaskan?schema=public'

# Instalar dependências (cache limpo, lockfile congelado)
RUN yarn install --frozen-lockfile && yarn cache clean

# Copiar código-fonte
COPY src ./src

# Instalar ferramentas e dependências globais
RUN npm install -g @nestjs/cli npm@10.4.0

# Atualizar dependências relevantes
RUN yarn upgrade memfs fork-ts-checker-webpack-plugin

# Corrigir aviso "memfs@3.6.0"
RUN yarn upgrade memfs@4.0.0
RUN yarn install --dev @types/memfs

# Atualizar Prisma para versão 5.9.1
RUN yarn add --dev prisma@5.9.1 @prisma/client@5.9.1

# Gerar Prisma Client
RUN yarn prisma generate

# Verificar necessidade do pacote "@angular-devkit/schematics"
# RUN if grep -q "@angular-devkit/schematics" package.json; then echo "ATENcaO: @angular-devkit/schematics presente. Verifique se e essencial." else echo "Pacote @angular-devkit/schematics nao encontrado." fi

# Analisar logs de instalação (buscar erros relacionados)
RUN yarn install && yarn why @angular-devkit/schematics || npm install -g @angular-devkit/schematics && npm ls @angular-devkit/schematics

# Instalar pacotes específicos da plataforma
RUN apk add --no-cache postgresql-dev icu-data-full

# Validar schema do Prisma
RUN npx prisma validate

# Definir ambiente de produção
ENV NODE_ENV production

# Copiar todos os arquivos para o container
COPY . .

# Construir aplicação
RUN nest build

# Verificar se a construção foi bem sucedida
RUN if [ ! -d dist ]; then echo "ERRO: Diretório dist não encontrado. Verifique o comando nest build."; exit 1; fi

# Criar volume para dependências
VOLUME /app/node_modules

# Iniciar aplicação
CMD ["yarn", "start:prod"]

# Expor porta
EXPOSE 3000
