# Utilize Node.js 18.13.0 ou superior (evita incompatibilidade)
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos essenciais
COPY package.json yarn.lock tsconfig.json prisma/schema.prisma ./

ENV DATABASE_URL='postgres://postgres:MG9TK%23sbqXN%2Ab4%23@db.poxhibnnxdqztblxyihy.supabase.co:5432/dilly-kangaskan?schema'

# Instalar dependências (cache limpo, lockfile congelado)
# RUN yarn install --no-lockfile --frozen-lockfile && yarn cache clean
# RUN yarn install
RUN yarn install --production && npx prisma generate

# Copiar código-fonte
COPY src ./src

# Instalar ferramentas e dependências globais
RUN npm install -g @nestjs/cli npm@10.4.0

# Atualizar dependências relevantes
RUN yarn upgrade memfs fork-ts-checker-webpack-plugin

# Corrigir aviso "memfs@3.6.0"
RUN yarn upgrade memfs@4.0.0
RUN yarn install --dev @types/memfs

RUN yarn add --dev prisma@5.9.1 @prisma/client@5.9.1

RUN yarn prisma generate

RUN yarn run build
# Verificar necessidade do pacote "@angular-devkit/schematics"
# RUN if grep -q "@angular-devkit/schematics" package.json; then echo "ATENÇÃO: @angular-devkit/schematics presente. Verifique se é essencial." else echo "Pacote @angular-devkit/schematics não encontrado." fi

# Contabilizar versão compatível (@angular-devkit/schematics)
RUN (yarn why @angular-devkit/schematics || npm ls @angular-devkit/schematics) && echo

# Analisar logs de instalação (buscar erros relacionados)
RUN (yarn install && yarn why @angular-devkit/schematics) || (npm install -g @angular-devkit/schematics && npm ls @angular-devkit/schematics)

# Instalar pacotes específicos da plataforma
RUN apk add --no-cache postgresql-dev icu-data-full

RUN npx prisma validate

# Ambiente de produção
ENV NODE_ENV production
# ENV DATABASE_URL postgresql://postgres:MG9TK%23sbqXN%2Ab4%23@db.poxhibnnxdqztblxyihy.supabase.co:5432/dilly-kangaskan?schema=public

COPY . .

# Construir aplicação
RUN nest build

# Verificar output da construção
RUN if [ ! -d dist ]; then echo "ERRO: Diretório dist não encontrado. Verifique o comando nest build."; exit 1; fi

# Volume para dependências
VOLUME /app/node_modules

# Iniciar aplicação
CMD ["yarn", "start:prod"]

# Expor porta
EXPOSE 3000