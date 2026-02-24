# ðŸ” ConfiguraÃ§Ã£o de VariÃ¡veis de Ambiente

## ðŸ“‹ Estrutura Correta

O projeto usa **2 arquivos `.env` separados**:

```
vertice-hub/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ backend/
â”‚   â”‚   â””â”€â”€ .env          â† VariÃ¡veis do back-end
â”‚   â””â”€â”€ frontend/
â”‚       â””â”€â”€ .env.local    â† VariÃ¡veis do front-end
```

âš ï¸ **IMPORTANTE:** NÃ£o crie `.env` na raiz do projeto!

---

## ðŸ–¥ï¸ Backend (.env)

**LocalizaÃ§Ã£o:** `apps/backend/.env`

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:Fu130406!@db.pwtwnypkbxcuorqtkksn.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.pwtwnypkbxcuorqtkksn:Fu130406!@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase
SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzMxNjgsImV4cCI6MjA4MTQwOTE2OH0.I41skP3C8rj2srQaQLCRrB6M1P-WFEivbD-lDgzZ7Io
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
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

## ðŸŽ¨ Frontend (.env.local)

**LocalizaÃ§Ã£o:** `apps/frontend/.env.local`

```env
# API
VITE_API_URL=http://localhost:3000/api/v1

# Supabase
VITE_SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzMxNjgsImV4cCI6MjA4MTQwOTE2OH0.I41skP3C8rj2srQaQLCRrB6M1P-WFEivbD-lDgzZ7Io
```

---

## ðŸš€ Como Configurar

### Windows (PowerShell)

```powershell
# 1. Ir para o diretÃ³rio do projeto
cd C:\xampp\htdocs\vertice\vertice-hub

# 2. Criar .env do backend
New-Item -Path "apps\backend\.env" -ItemType File -Force

# 3. Criar .env.local do frontend
New-Item -Path "apps\frontend\.env.local" -ItemType File -Force
```

Depois copie e cole o conteÃºdo acima em cada arquivo.

### Linux/Mac

```bash
# 1. Ir para o diretÃ³rio do projeto
cd ~/vertice-hub

# 2. Criar .env do backend
touch apps/backend/.env

# 3. Criar .env.local do frontend
touch apps/frontend/.env.local
```

Depois copie e cole o conteÃºdo acima em cada arquivo.

---

## âœ… Verificar se EstÃ¡ Correto

### Backend

```bash
cd apps/backend
cat .env
```

Deve mostrar as variÃ¡veis do Supabase, DATABASE_URL, etc.

### Frontend

```bash
cd apps/frontend
cat .env.local
```

Deve mostrar VITE_API_URL e VITE_SUPABASE_*.

---

## ðŸ”’ SeguranÃ§a

âš ï¸ **NUNCA faÃ§a commit dos arquivos `.env`!**

Eles jÃ¡ estÃ£o no `.gitignore`:

```
apps/backend/.env
apps/frontend/.env.local
```

Se vocÃª acidentalmente fez commit, remova com:

```bash
git rm --cached apps/backend/.env
git rm --cached apps/frontend/.env.local
git commit -m "Remove env files"
```

---

## ðŸ› Troubleshooting

### Erro: "Cannot find module '@supabase/supabase-js'"

**SoluÃ§Ã£o:** Instale as dependÃªncias

```bash
pnpm install
```

### Erro: "DATABASE_URL is not defined"

**SoluÃ§Ã£o:** Verifique se o arquivo `apps/backend/.env` existe e tem a variÃ¡vel DATABASE_URL

### Erro: "VITE_API_URL is not defined"

**SoluÃ§Ã£o:** Verifique se o arquivo `apps/frontend/.env.local` existe

### Erro: "CORS blocked"

**SoluÃ§Ã£o:** Verifique se FRONTEND_URL e CORS_ORIGIN estÃ£o corretos no `apps/backend/.env`

---

## ðŸ“ VariÃ¡veis Explicadas

### Backend

| VariÃ¡vel | DescriÃ§Ã£o |
|----------|-----------|
| `DATABASE_URL` | URL de conexÃ£o direta com PostgreSQL (para migrations) |
| `DIRECT_URL` | URL com pooling (para aplicaÃ§Ã£o) |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave pÃºblica do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave privada do Supabase (admin) |
| `SUPABASE_JWT_SECRET` | Secret para validar tokens JWT |
| `PORT` | Porta do servidor (padrÃ£o: 3000) |
| `FRONTEND_URL` | URL do front-end (para CORS) |

### Frontend

| VariÃ¡vel | DescriÃ§Ã£o |
|----------|-----------|
| `VITE_API_URL` | URL da API do back-end |
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pÃºblica do Supabase |

---

## ðŸŽ¯ PrÃ³ximos Passos

ApÃ³s configurar os arquivos `.env`:

1. Instalar dependÃªncias: `pnpm install`
2. Iniciar back-end: `cd apps/backend && pnpm dev`
3. Iniciar front-end: `cd apps/frontend && pnpm dev`

Consulte o `START_HERE.md` para mais detalhes!

