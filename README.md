# VÉRTICE Hub

E-commerce full stack organizado como monorepo, com **frontend React/Vite** e **backend Node.js/Express**, incluindo autenticação, catálogo, carrinho, checkout, pagamentos, pedidos e painel administrativo.

O projeto foi estruturado para separar claramente a experiência do cliente da API e das regras de negócio.

## Arquitetura

```text
            ┌────────────────────┐
            │   React / Vite     │
            │    Frontend        │
            └─────────┬──────────┘
                      │ HTTP
                      ▼
            ┌────────────────────┐
            │ Express / TypeScript│
            │       API          │
            └─────────┬──────────┘
                      │
          ┌───────────┼─────────────┐
          ▼           ▼             ▼
     PostgreSQL   Pagamentos     Serviços externos
       Prisma     PayPal / MP     Email / Supabase
```

## Funcionalidades

### Cliente

- cadastro, login e recuperação de senha
- catálogo por categorias
- busca de produtos
- página de produto
- carrinho
- endereços
- checkout autenticado
- histórico de pedidos
- acompanhamento de status
- avaliações
- cupons
- fluxo de pagamento

### Administração

- dashboard
- gestão de produtos
- gestão de categorias
- gestão de pedidos
- gestão de cupons
- configurações administrativas

### Backend

- API versionada em `/api/v1`
- autenticação com JWT e refresh token
- hash de senha
- validação de entrada
- rate limiting
- headers de segurança com Helmet
- CORS configurável
- compressão HTTP
- logging estruturado
- health check com validação da conexão ao banco
- graceful shutdown
- persistência com Prisma + PostgreSQL

## Domínio

O modelo inclui:

- usuários
- refresh tokens
- recuperação de senha
- categorias
- produtos e variantes
- imagens, tags e benefícios
- carrinho
- pedidos
- histórico de status
- pagamentos
- cupons
- endereços
- fornecedores
- avaliações
- carrinhos abandonados

## Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI

### Backend

- Node.js
- Express 5
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Winston
- Helmet
- express-rate-limit

### Integrações

- Mercado Pago
- PayPal
- Supabase
- Nodemailer

## Estrutura

```text
vertice-hub/
├── apps/
│   ├── frontend/
│   └── backend/
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── package.json
```

## Desenvolvimento local

### Pré-requisitos

- Node.js 20+
- pnpm 10+
- PostgreSQL

### Instalação

```bash
pnpm install
```

### Backend

Configure as variáveis de ambiente do backend, gere o Prisma Client e aplique as migrations necessárias.

```bash
pnpm dev:backend
```

API:

```text
http://localhost:3000
```

Health check:

```text
GET /health
```

### Frontend

```bash
pnpm dev
```

Aplicação:

```text
http://localhost:5173
```

## Qualidade

```bash
pnpm lint
pnpm build:backend
pnpm build:frontend
```

O repositório também possui uma pipeline de CI para validar lint e builds em pushes e pull requests.

## Segurança

O backend já utiliza mecanismos como Helmet, CORS, rate limiting, validação e autenticação por token.

Para uso em produção, ainda é importante manter:

- segredos fora do Git
- HTTPS obrigatório
- rotação de tokens e credenciais
- validação de autorização por recurso
- monitoramento e auditoria
- proteção e validação de webhooks de pagamento
- backups do banco

## Próximas evoluções

- testes unitários e de integração
- idempotência em operações de pagamento
- filas para processamento assíncrono
- outbox/eventos de domínio
- observabilidade com OpenTelemetry
- Docker Compose para ambiente completo
- documentação OpenAPI
- testes E2E do checkout

## Objetivo técnico

O VÉRTICE Hub é um projeto de portfólio voltado para problemas reais de e-commerce: autenticação, catálogo, estoque, carrinho, pedidos, pagamentos, autorização e persistência relacional, com frontend e backend evoluindo como aplicações separadas dentro do mesmo monorepo.
