# Guia Completo: Configurar Supabase com Prisma

Este guia explica passo a passo como configurar o Supabase como banco de dados PostgreSQL para o projeto VÉRTICE.

---

## 📋 O que é Supabase?

Supabase é uma plataforma de backend-as-a-service (BaaS) que oferece PostgreSQL gerenciado, autenticação, storage e muito mais. É uma alternativa open-source ao Firebase.

**Vantagens:**
- PostgreSQL completo (não é NoSQL)
- Tier gratuito generoso (500MB de banco)
- Backups automáticos
- Connection pooling integrado
- Interface visual para gerenciar dados
- Escalável para produção

---

## 🚀 Passo 1: Criar Conta e Projeto

### 1.1 Criar Conta

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub (recomendado) ou email

### 1.2 Criar Novo Projeto

1. No dashboard, clique em "New Project"
2. Preencha:
   - **Name:** `vertice-ecommerce` (ou nome de sua escolha)
   - **Database Password:** Crie uma senha forte e **anote em local seguro**
   - **Region:** Escolha a mais próxima do Brasil (ex: `South America (São Paulo)`)
   - **Pricing Plan:** Free (500MB) ou Pro conforme necessidade

3. Clique em "Create new project"
4. Aguarde 2-3 minutos enquanto o projeto é provisionado

---

## 🔑 Passo 2: Obter Credenciais do Banco

### 2.1 Acessar Configurações

1. No projeto criado, vá em **Settings** (ícone de engrenagem no menu lateral)
2. Clique em **Database**

### 2.2 Copiar Connection String (Transaction Mode)

1. Role até a seção "Connection string"
2. Selecione a aba **URI**
3. Copie a string que começa com `postgresql://postgres...`

**Formato:**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha que você criou no passo 1.2

**Exemplo:**
```
postgresql://postgres.abcdefghijklmnop:minhaSenha123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 2.3 Copiar Connection Pooling (Session Mode)

1. Role até a seção "Connection Pooling"
2. Selecione **Mode: Session**
3. Copie a string que começa com `postgresql://postgres...`

**Formato:**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Exemplo:**
```
postgresql://postgres.abcdefghijklmnop:minhaSenha123@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### 3.1 Criar arquivo .env

Na **raiz do projeto** (`vertice-hub/`), crie o arquivo `.env`:

```bash
cd vertice-hub
cp .env.example .env
```

### 3.2 Editar .env

Abra o arquivo `.env` e configure:

```env
# ==============================================
# DATABASE (Supabase PostgreSQL)
# ==============================================

# Transaction Mode - para migrations
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:minhaSenha123@db.abcdefghijklmnop.supabase.co:5432/postgres"

# Session Mode com Pooling - para aplicação
DIRECT_URL="postgresql://postgres.abcdefghijklmnop:minhaSenha123@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# ==============================================
# JWT SECRETS (IMPORTANTE: Gere novos!)
# ==============================================

JWT_SECRET="seu_secret_aqui_min_32_caracteres"
JWT_REFRESH_SECRET="seu_refresh_secret_aqui_min_32_caracteres"

# ==============================================
# SERVER
# ==============================================

NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# ==============================================
# RATE LIMITING
# ==============================================

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3.3 Gerar JWT Secrets Seguros

Execute no terminal:

```bash
# Gerar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Gerar JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie os valores gerados e cole no `.env`.

---

## 🗄️ Passo 4: Executar Migrations

### 4.1 Instalar Dependências

```bash
pnpm install
```

### 4.2 Gerar Prisma Client

```bash
pnpm prisma:generate
```

### 4.3 Executar Migrations

```bash
pnpm prisma:migrate
```

Quando solicitado, dê um nome para a migration (ex: `init`).

### 4.4 Popular Banco com Dados de Teste

```bash
pnpm prisma:seed
```

---

## ✅ Passo 5: Verificar no Supabase

### 5.1 Acessar Table Editor

1. No dashboard do Supabase, clique em **Table Editor** (ícone de tabela no menu lateral)
2. Você verá todas as tabelas criadas:
   - `users`
   - `products`
   - `categories`
   - `orders`
   - `carts`
   - etc.

### 5.2 Visualizar Dados

1. Clique em qualquer tabela (ex: `users`)
2. Você verá os dados de teste criados pelo seed:
   - Admin: `admin@vertice.com`
   - Cliente: `cliente@teste.com`

---

## 🔍 Passo 6: Testar Conexão

### 6.1 Abrir Prisma Studio

```bash
pnpm prisma:studio
```

Isso abrirá uma interface web em `http://localhost:5555` onde você pode visualizar e editar dados.

### 6.2 Testar API

```bash
# Iniciar backend
pnpm dev:backend

# Em outro terminal, testar endpoint
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "development",
  "database": "connected"
}
```

---

## 📊 Entendendo as Duas URLs

### DATABASE_URL (Transaction Mode)

- **Porta:** 5432 (PostgreSQL padrão)
- **Uso:** Migrations, schema changes, operações DDL
- **Conexão:** Direta ao banco
- **Quando usar:** `prisma migrate`, `prisma db push`

### DIRECT_URL (Session Mode com Pooling)

- **Porta:** 6543 (PgBouncer)
- **Uso:** Aplicação em runtime
- **Conexão:** Via connection pooler
- **Quando usar:** Queries da aplicação
- **Vantagem:** Melhor performance, suporta mais conexões simultâneas

---

## 🔒 Segurança

### ✅ Boas Práticas

1. **Nunca commite o .env**
   - Já está no `.gitignore`
   - Use `.env.example` como template

2. **Use senhas fortes**
   - Mínimo 16 caracteres
   - Misture letras, números e símbolos

3. **Gere JWT secrets únicos**
   - Nunca use os valores de exemplo
   - Mínimo 32 caracteres

4. **Ative Row Level Security (RLS)**
   - No Supabase, vá em **Authentication** > **Policies**
   - Configure políticas de acesso

5. **Configure backups**
   - Supabase faz backups automáticos
   - Verifique em **Settings** > **Database** > **Backups**

---

## 🚀 Deploy em Produção

### Variáveis de Ambiente

Ao fazer deploy (Railway, Render, Vercel), configure:

```env
DATABASE_URL=<sua_connection_string>
DIRECT_URL=<sua_connection_pooling>
JWT_SECRET=<secret_de_producao>
JWT_REFRESH_SECRET=<refresh_secret_de_producao>
NODE_ENV=production
FRONTEND_URL=https://seu-dominio.com
CORS_ORIGIN=https://seu-dominio.com
```

### Executar Migrations em Produção

```bash
# Via Railway/Render
pnpm prisma:migrate

# Ou manualmente
npx prisma migrate deploy
```

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"

**Possíveis causas:**
1. URL do banco incorreta
2. Senha incorreta
3. Firewall bloqueando conexão
4. Projeto Supabase pausado (tier free após inatividade)

**Soluções:**
1. Verifique se copiou a URL completa
2. Confirme a senha no dashboard do Supabase
3. Teste conexão com `pnpm prisma:studio`
4. Acesse o dashboard e verifique se o projeto está ativo

### Erro: "SSL connection required"

**Solução:** Adicione `?sslmode=require` no final da URL:
```
postgresql://...?sslmode=require
```

### Erro: "Too many connections"

**Solução:** Use `DIRECT_URL` com connection pooling:
```env
DIRECT_URL="postgresql://...?pgbouncer=true"
```

### Erro: "Migration failed"

**Solução:**
1. Verifique se está usando `DATABASE_URL` (não `DIRECT_URL`) para migrations
2. Confirme que o banco está acessível
3. Tente resetar: `pnpm prisma migrate reset` (⚠️ apaga dados!)

---

## 📞 Suporte

### Recursos Oficiais

- **Documentação Supabase:** https://supabase.com/docs
- **Documentação Prisma:** https://www.prisma.io/docs
- **Discord Supabase:** https://discord.supabase.com
- **Discord Prisma:** https://pris.ly/discord

### Logs e Debugging

**Ver logs do Supabase:**
1. Dashboard > **Logs**
2. Selecione **Database Logs**

**Ver logs do Prisma:**
```bash
# Ativar debug
DATABASE_URL="..." pnpm prisma:migrate --debug
```

---

## ✨ Próximos Passos

Após configurar o Supabase:

1. ✅ Testar autenticação
2. ✅ Criar produtos via API
3. ✅ Testar fluxo de pedidos
4. ✅ Configurar Mercado Pago (pagamentos)
5. ✅ Configurar SMTP (emails)
6. ✅ Deploy em produção

---

**Supabase configurado com sucesso!** 🎉

Agora você tem um banco PostgreSQL gerenciado, escalável e pronto para produção.
