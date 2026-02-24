# VERTICE Hub

Monorepo de e-commerce com frontend React + Vite e backend Node + Express + Prisma.

## Estrutura

- `apps/frontend`: loja web
- `apps/backend`: API, autenticacao, pedidos e integracoes

## Requisitos

- Node.js 20+
- pnpm

## Rodando localmente

### 1) Instalar dependencias

```bash
pnpm install
```

### 2) Subir backend

```bash
pnpm dev:backend
```

API esperada em `http://localhost:3000`.

### 3) Subir frontend

```bash
pnpm dev
```

App esperado em `http://localhost:5173`.

## Build

### Frontend

```bash
pnpm build
```

### Backend

```bash
pnpm build:backend
```

## Observacoes

- O projeto usa uma unica base de frontend em `apps/frontend`.
- Os comandos na raiz ja estao roteados para os apps corretos via workspace.
