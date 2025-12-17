# 🚀 Guia de Deploy - VÉRTICE E-commerce

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Conta no [Supabase](https://supabase.com)
- Repositório GitHub conectado

---

## 🔧 Parte 1: Deploy do Backend

### 1. Criar Novo Projeto na Vercel

1. Acesse https://vercel.com/new
2. Selecione o repositório `gabxw/vertice-hub`
3. Configure:
   - **Project Name:** `vertice-backend`
   - **Framework Preset:** Other
   - **Root Directory:** `apps/backend`

### 2. Configurar Environment Variables

Clique em **"Environment Variables"** e adicione:

```env
# Database
DATABASE_URL=postgresql://postgres.pwtwnypkbxcuorqtkksn:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.pwtwnypkbxcuorqtkksn:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres

# Supabase
SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTg5MjEsImV4cCI6MjA1MDAzNDkyMX0.Jm-Vy6Qb7N3Kl6rnHLIz_6GG_hZYdXNKmYHuqLX_Ug8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDQ1ODkyMSwiZXhwIjoyMDUwMDM0OTIxfQ.XJjHbgxSMQWJE5OI9vLHiZKlDmEGT-e0lUXGRqZL-Ow
SUPABASE_JWT_SECRET=Xk+3YGP8TdlBRi2MDxnKgVXK13/yBjPUgeZfGB1nV+UZNsONQGLgIp9qvBxFYAGRQv8qvO3f7Hy8TZfhPQxqNQ==

# API
NODE_ENV=production
PORT=3000
API_URL=https://vertice-backend.vercel.app
FRONTEND_URL=https://vertice-frontend.vercel.app

# CORS
CORS_ORIGIN=https://vertice-frontend.vercel.app,http://localhost:5173

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=your-mercado-pago-token

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@vertice.com
```

**⚠️ IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha do Supabase!

### 3. Deploy

Clique em **"Deploy"** e aguarde o build.

### 4. Obter URL do Backend

Após o deploy, copie a URL (ex: `https://vertice-backend.vercel.app`)

---

## 🎨 Parte 2: Deploy do Frontend

### 1. Criar Novo Projeto na Vercel

1. Acesse https://vercel.com/new
2. Selecione o repositório `gabxw/vertice-hub`
3. Configure:
   - **Project Name:** `vertice-frontend`
   - **Framework Preset:** Vite
   - **Root Directory:** `apps/frontend`

### 2. Configurar Environment Variables

```env
VITE_API_URL=https://vertice-backend.vercel.app/api/v1
VITE_SUPABASE_URL=https://pwtwnypkbxcuorqtkksn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTg5MjEsImV4cCI6MjA1MDAzNDkyMX0.Jm-Vy6Qb7N3Kl6rnHLIz_6GG_hZYdXNKmYHuqLX_Ug8
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### 3. Deploy

Clique em **"Deploy"**.

---

## ✅ Parte 3: Verificação

### 1. Testar Backend

Acesse: `https://vertice-backend.vercel.app/health`

Deve retornar:
```json
{
  "status": "ok",
  "database": "connected",
  "environment": "production"
}
```

### 2. Testar Frontend

Acesse: `https://vertice-frontend.vercel.app`

### 3. Testar Autenticação

1. Crie uma conta
2. Faça login
3. Adicione produtos ao carrinho
4. Finalize um pedido

---

## 🔧 Troubleshooting

### Erro: "Can't reach database server"

**Solução:** Verifique se a `DATABASE_URL` está usando **Connection Pooling** (porta 6543):

```
postgresql://postgres.xxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Erro: "CORS blocked"

**Solução:** Atualize a variável `CORS_ORIGIN` no backend com a URL do frontend.

### Erro: "Module not found"

**Solução:** Certifique-se de que `vercel-build` está no `package.json`:

```json
"vercel-build": "prisma generate && prisma migrate deploy"
```

---

## 📝 Notas Importantes

1. **Supabase Connection Pooling:** Use porta **6543** (pooler) em vez de 5432 (direto)
2. **Environment Variables:** Sempre use variáveis de ambiente, nunca hardcode credenciais
3. **CORS:** Configure corretamente para permitir frontend acessar backend
4. **Prisma:** O comando `vercel-build` gera o Prisma Client automaticamente

---

## 🎯 Próximos Passos

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. 🔄 Configurar domínio customizado (Hostinger)
4. 🔄 Configurar SSL/HTTPS
5. 🔄 Configurar Mercado Pago (produção)
6. 🔄 Configurar emails transacionais
7. 🔄 Monitoramento e logs

---

## 📞 Suporte

Se encontrar problemas, verifique:
- Logs na Vercel: https://vercel.com/dashboard
- Logs no Supabase: https://supabase.com/dashboard
- GitHub Issues: https://github.com/gabxw/vertice-hub/issues
