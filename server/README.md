# Agents Server

API REST desenvolvida em Node.js com TypeScript para gerenciamento de agentes.

## 🛠️ Tecnologias

- **Runtime**: Node.js com ES Modules
- **Framework**: Fastify
- **Banco de Dados**: PostgreSQL com pgvector
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **Linting/Formatting**: Biome
- **Containerização**: Docker Compose

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (via Docker)

## 🚀 Setup

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Configure as seguintes variáveis:

   - `PORT`: Porta do servidor (padrão: 3000)
   - `DATABASE_URL`: URL de conexão com PostgreSQL

4. **Inicie o banco de dados**

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações**

   ```bash
   npx drizzle-kit push
   ```

6. **Popule o banco (opcional)**

   ```bash
   npm run db:seed
   ```

7. **Inicie o servidor**
   ```bash
   npm run dev
   ```

## 📁 Estrutura do Projeto

```
src/
├── db/
│   ├── connection.ts    # Conexão com banco
│   ├── schema/          # Schemas do Drizzle
│   └── seed.ts          # Dados iniciais
├── http/
│   └── routes/          # Rotas da API
├── env.ts              # Validação de variáveis
└── server.ts           # Servidor Fastify
```

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run db:seed`: Popula o banco com dados iniciais
- `npx drizzle-kit push`: Executa migrações
- `npx drizzle-kit generate`: Gera novas migrações

## 🌐 Endpoints

- `GET /health`: Health check da API
- `GET /rooms`: Lista de salas (exemplo de rota)

## 🎯 Padrões de Projeto

- **Type Safety**: TypeScript com validação Zod
- **Database First**: Drizzle ORM com PostgreSQL
- **API Design**: Fastify com type providers
- **Code Quality**: Biome para linting e formatação
- **Environment**: Validação de variáveis com Zod
