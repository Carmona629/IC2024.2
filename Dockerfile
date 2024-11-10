FROM node:20

# Instala o Bun
RUN curl -fsSL https://bun.sh/install | bash

# Configura o PATH para o Bun
ENV PATH="/root/.bun/bin:${PATH}"

# Define o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos para o diretório de trabalho
COPY . .

# Instala as dependências usando o Bun
RUN bun install

# Executa as migrações do Prisma
RUN npx prisma generate
RUN bun prisma migrate dev

# Executa os testes com Vitest
RUN bun vitest

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["bun", "run", "dev"]
