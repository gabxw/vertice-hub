# 🚀 Quick Start - VÉRTICE Backend

## Início Rápido em 5 Minutos

### 1. Pré-requisitos

- Node.js 22+
- PostgreSQL 14+
- pnpm (ou npm)

### 2. Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd vertice-backend

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Configurar Banco de Dados

```bash
# Opção 1: PostgreSQL local
# Crie o banco de dados
createdb vertice

# Opção 2: Use o Docker Compose
docker-compose up -d postgres
```

Atualize o `.env`:
```env
DATABASE_URL=postgresql://vertice:vertice123@localhost:5432/vertice
```

### 4. Executar Migrações e Seed

```bash
# Gerar Prisma Client
pnpm prisma:generate

# Executar migrações
pnpm prisma:migrate

# Popular banco com dados de teste
pnpm prisma:seed
```

### 5. Iniciar Servidor

```bash
# Desenvolvimento (com hot reload)
pnpm dev

# O servidor estará rodando em http://localhost:3000
```

### 6. Testar a API

```bash
# Health check
curl http://localhost:3000/health

# Login com usuário de teste
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@teste.com",
    "password": "customer123"
  }'

# Listar produtos
curl http://localhost:3000/api/v1/products
```

---

## 🎯 Credenciais de Teste

Após executar `pnpm prisma:seed`:

**Admin:**
- Email: `admin@vertice.com`
- Senha: `admin123`

**Cliente:**
- Email: `cliente@teste.com`
- Senha: `customer123`

---

## 📚 Próximos Passos

1. **Explore a API**
   - Veja `API_DOCUMENTATION.md` para todos os endpoints
   - Use Postman ou Insomnia para testar

2. **Integre com o Front-end**
   - Configure `FRONTEND_URL` no `.env`
   - Atualize as URLs da API no front-end

3. **Configure Pagamentos**
   - Obtenha credenciais do Mercado Pago
   - Atualize `MP_ACCESS_TOKEN` e `MP_PUBLIC_KEY`

4. **Configure Email**
   - Configure SMTP (Gmail, SendGrid, etc.)
   - Atualize variáveis `SMTP_*` no `.env`

5. **Deploy em Produção**
   - Veja `DEPLOYMENT.md` para guias completos
   - Railway, Render ou VPS

---

## 🛠️ Comandos Úteis

```bash
# Ver logs do servidor
pnpm dev

# Abrir Prisma Studio (GUI do banco)
pnpm prisma:studio

# Verificar erros TypeScript
pnpm lint

# Build para produção
pnpm build

# Iniciar produção
pnpm start
```

---

## 🐛 Problemas Comuns

### Erro de conexão com banco
```bash
# Verifique se PostgreSQL está rodando
sudo systemctl status postgresql

# Ou use Docker
docker-compose up -d postgres
```

### Erro "Prisma Client not generated"
```bash
pnpm prisma:generate
```

### Porta 3000 já em uso
```bash
# Altere a porta no .env
PORT=3001
```

---

## 📞 Ajuda

- **Documentação da API:** `API_DOCUMENTATION.md`
- **Deploy:** `DEPLOYMENT.md`
- **Resumo do Projeto:** `PROJECT_SUMMARY.md`
- **README Completo:** `README.md`

---

**Pronto! Seu back-end VÉRTICE está rodando!** 🎉
