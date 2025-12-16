# 🔐 Configuração de Variáveis de Ambiente

## 📋 Estrutura Correta

O projeto usa **2 arquivos `.env` separados**:

```
vertice-hub/
├── apps/
│   ├── backend/
│   │   └── .env          ← Variáveis do back-end
│   └── frontend/
│       └── .env.local    ← Variáveis do front-end
```

⚠️ **IMPORTANTE:** Não crie `.env` na raiz do projeto!

---

## 🖥️ Backend (.env)

**Localização:** `apps/backend/.env`

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:Fu130406!@db.pwtwnypkbxcuorqtkksn.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.pwtwnypkbxcuorqtkksn:Fu130406!@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase
SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzMxNjgsImV4cCI6MjA4MTQwOTE2OH0.I41skP3C8rj2srQaQLCRrB6M1P-WFEivbD-lDgzZ7Io
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgzMzE2OCwiZXhwIjoyMDgxNDA5MTY4fQ.54WyTK6SmdTdcO5z2P1vIEJdHuJ84ijWdxZQJlgb3pg
SUPABASE_JWT_SECRET=Xk+3YGP8TdlBRi2MDxnKgVXK13/yBjPUgeZfGB1nV+UTeRH7R4qmILUt2YkDW5sgHeP7Otq6Zojr1HcqRLGlxg==

# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# JWT (usa o mesmo do Supabase)
JWT_SECRET=Xk+3YGP8TdlBRi2MDxnKgVXK13/yBjPUgeZfGB1nV+UTeRH7R4qmILUt2YkDW5sgHeP7Otq6Zojr1HcqRLGlxg==
JWT_REFRESH_SECRET=Xk+3YGP8TdlBRi2MDxnKgVXK13/yBjPUgeZfGB1nV+UTeRH7R4qmILUt2YkDW5sgHeP7Otq6Zojr1HcqRLGlxg==
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🎨 Frontend (.env.local)

**Localização:** `apps/frontend/.env.local`

```env
# API
VITE_API_URL=http://localhost:3000/api/v1

# Supabase
VITE_SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzMxNjgsImV4cCI6MjA4MTQwOTE2OH0.I41skP3C8rj2srQaQLCRrB6M1P-WFEivbD-lDgzZ7Io
```

---

## 🚀 Como Configurar

### Windows (PowerShell)

```powershell
# 1. Ir para o diretório do projeto
cd C:\xampp\htdocs\vertice\vertice-hub

# 2. Criar .env do backend
New-Item -Path "apps\backend\.env" -ItemType File -Force

# 3. Criar .env.local do frontend
New-Item -Path "apps\frontend\.env.local" -ItemType File -Force
```

Depois copie e cole o conteúdo acima em cada arquivo.

### Linux/Mac

```bash
# 1. Ir para o diretório do projeto
cd ~/vertice-hub

# 2. Criar .env do backend
touch apps/backend/.env

# 3. Criar .env.local do frontend
touch apps/frontend/.env.local
```

Depois copie e cole o conteúdo acima em cada arquivo.

---

## ✅ Verificar se Está Correto

### Backend

```bash
cd apps/backend
cat .env
```

Deve mostrar as variáveis do Supabase, DATABASE_URL, etc.

### Frontend

```bash
cd apps/frontend
cat .env.local
```

Deve mostrar VITE_API_URL e VITE_SUPABASE_*.

---

## 🔒 Segurança

⚠️ **NUNCA faça commit dos arquivos `.env`!**

Eles já estão no `.gitignore`:

```
apps/backend/.env
apps/frontend/.env.local
```

Se você acidentalmente fez commit, remova com:

```bash
git rm --cached apps/backend/.env
git rm --cached apps/frontend/.env.local
git commit -m "Remove env files"
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@supabase/supabase-js'"

**Solução:** Instale as dependências

```bash
pnpm install
```

### Erro: "DATABASE_URL is not defined"

**Solução:** Verifique se o arquivo `apps/backend/.env` existe e tem a variável DATABASE_URL

### Erro: "VITE_API_URL is not defined"

**Solução:** Verifique se o arquivo `apps/frontend/.env.local` existe

### Erro: "CORS blocked"

**Solução:** Verifique se FRONTEND_URL e CORS_ORIGIN estão corretos no `apps/backend/.env`

---

## 📝 Variáveis Explicadas

### Backend

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão direta com PostgreSQL (para migrations) |
| `DIRECT_URL` | URL com pooling (para aplicação) |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave privada do Supabase (admin) |
| `SUPABASE_JWT_SECRET` | Secret para validar tokens JWT |
| `PORT` | Porta do servidor (padrão: 3000) |
| `FRONTEND_URL` | URL do front-end (para CORS) |

### Frontend

| Variável | Descrição |
|----------|-----------|
| `VITE_API_URL` | URL da API do back-end |
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública do Supabase |

---

## 🎯 Próximos Passos

Após configurar os arquivos `.env`:

1. Instalar dependências: `pnpm install`
2. Iniciar back-end: `cd apps/backend && pnpm dev`
3. Iniciar front-end: `cd apps/frontend && pnpm dev`

Consulte o `START_HERE.md` para mais detalhes!
