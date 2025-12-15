# VÉRTICE E-commerce Backend

Back-end completo, seguro e escalável para o e-commerce de dropshipping da marca **VÉRTICE**.

## 🚀 Tecnologias

- **Node.js** 22.13.0
- **TypeScript** 5.9.3
- **Express.js** 5.2.1
- **PostgreSQL** (via Prisma ORM)
- **Prisma** 7.1.0
- **JWT** para autenticação
- **Mercado Pago** para pagamentos
- **Nodemailer** para e-mails
- **Winston** para logs

## 📁 Estrutura do Projeto

```
vertice-backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── migrations/            # Migrações do banco
│   └── seed.ts               # Dados iniciais
├── src/
│   ├── config/               # Configurações (env, database, logger, cache)
│   ├── controllers/          # Controladores (lógica de requisição/resposta)
│   ├── services/             # Lógica de negócio
│   ├── repositories/         # Acesso a dados (Prisma)
│   ├── middlewares/          # Autenticação, validação, rate limit
│   ├── routes/               # Definição de rotas
│   ├── validators/           # Schemas Zod
│   ├── utils/                # Helpers e utilitários
│   ├── types/                # TypeScript types/interfaces
│   ├── jobs/                 # Tarefas agendadas (cron)
│   └── server.ts             # Entry point
├── uploads/                  # Upload de arquivos
├── logs/                     # Logs da aplicação
├── .env                      # Variáveis de ambiente
├── .env.example              # Template de variáveis
├── tsconfig.json             # Configuração TypeScript
└── package.json              # Dependências e scripts
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 22+
- PostgreSQL 14+
- pnpm (gerenciador de pacotes)

### Passos

1. **Clone o repositório**
```bash
git clone <repo-url>
cd vertice-backend
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. **Configure o banco de dados**
```bash
# Crie o banco de dados PostgreSQL
createdb vertice

# Execute as migrações
pnpm prisma:migrate

# Gere o Prisma Client
pnpm prisma:generate

# (Opcional) Popule o banco com dados de exemplo
pnpm prisma:seed
```

5. **Inicie o servidor**
```bash
# Desenvolvimento (com hot reload)
pnpm dev

# Produção
pnpm build
pnpm start
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor em modo de desenvolvimento
- `pnpm build` - Compila o TypeScript para JavaScript
- `pnpm start` - Inicia o servidor em produção
- `pnpm prisma:generate` - Gera o Prisma Client
- `pnpm prisma:migrate` - Executa migrações do banco
- `pnpm prisma:studio` - Abre o Prisma Studio (GUI do banco)
- `pnpm prisma:seed` - Popula o banco com dados iniciais
- `pnpm lint` - Verifica erros de TypeScript

## 🔐 Variáveis de Ambiente

Veja o arquivo `.env.example` para todas as variáveis necessárias.

### Principais variáveis:

- `DATABASE_URL` - URL de conexão do PostgreSQL
- `JWT_SECRET` - Chave secreta para JWT
- `MP_ACCESS_TOKEN` - Token de acesso do Mercado Pago
- `SMTP_*` - Configurações de e-mail
- `FRONTEND_URL` - URL do front-end (para CORS)

## 🌐 Endpoints da API

### Base URL: `/api/v1`

#### Autenticação
- `POST /auth/register` - Cadastro de usuário
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Recuperação de senha
- `POST /auth/reset-password` - Resetar senha

#### Produtos
- `GET /products` - Listar produtos
- `GET /products/:slug` - Detalhes do produto
- `GET /products/:id/reviews` - Reviews do produto
- `POST /products/:id/reviews` - Criar review

#### Categorias
- `GET /categories` - Listar categorias
- `GET /categories/:slug` - Detalhes da categoria

#### Carrinho
- `GET /cart` - Obter carrinho
- `POST /cart/items` - Adicionar item
- `PUT /cart/items/:id` - Atualizar quantidade
- `DELETE /cart/items/:id` - Remover item

#### Pedidos
- `POST /orders` - Criar pedido
- `GET /orders/:id` - Detalhes do pedido
- `GET /orders/:id/tracking` - Rastreamento

#### Pagamentos
- `POST /payments/create` - Criar pagamento
- `POST /payments/webhook` - Webhook Mercado Pago

#### Admin (requer autenticação de admin)
- `GET /admin/products` - Gerenciar produtos
- `GET /admin/orders` - Gerenciar pedidos
- `GET /admin/users` - Gerenciar usuários
- `GET /admin/dashboard/metrics` - Métricas

## 🔒 Segurança

- ✅ Autenticação JWT com refresh tokens
- ✅ Hash de senhas com bcrypt
- ✅ Rate limiting por IP
- ✅ Validação de dados com Zod
- ✅ Helmet para security headers
- ✅ CORS configurado
- ✅ Proteção contra SQL Injection (Prisma)
- ✅ Logs de erros e atividades

## 📊 Performance

- ✅ Paginação em listagens
- ✅ Cache de produtos e categorias
- ✅ Índices no banco de dados
- ✅ Compression gzip
- ✅ Connection pooling (Prisma)

## 🧪 Testes

```bash
pnpm test
```

## 📦 Deploy

### Docker

```bash
docker build -t vertice-backend .
docker run -p 3000:3000 vertice-backend
```

### PM2

```bash
pnpm build
pm2 start dist/server.js --name vertice-backend
```

## 📄 Licença

ISC

## 👥 Autor

**VÉRTICE** - Moda urbana, moderna e exclusiva.

---

**Desenvolvido com ❤️ para a marca VÉRTICE**
