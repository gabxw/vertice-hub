# VERTICE Hub

Monorepo de e-commerce com frontend React + Vite e backend Node + Express + Prisma.

## Estrutura

- `apps/frontend`: loja web
- `apps/backend`: API, autenticação, pedidos e integrações

## Requisitos

- Node.js 20+
- npm ou pnpm

## Rodando localmente

### 1) Instalar dependências

```bash
pnpm install
```

### 2) Subir backend

```bash
cd apps/backend
pnpm dev
```

API esperada em `http://localhost:3000`.

### 3) Subir frontend

```bash
cd apps/frontend
pnpm dev
```

App esperado em `http://localhost:5173`.

## Build

### Frontend

```bash
cd apps/frontend
npm run build
```

### Backend

```bash
cd apps/backend
npm run build
```

## Observações

- O código legado na raiz (`src/`) existe por compatibilidade histórica.
- O frontend ativo para evolução está em `apps/frontend`.
