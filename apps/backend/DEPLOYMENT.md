# Guia de Deploy - VÉRTICE Backend

## 🚀 Deploy em Produção

### Opção 1: Railway (Recomendado)

Railway é uma plataforma moderna que facilita o deploy de aplicações Node.js com PostgreSQL.

#### Passos:

1. **Criar conta no Railway**
   - Acesse [railway.app](https://railway.app)
   - Faça login com GitHub

2. **Criar novo projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório do back-end

3. **Adicionar PostgreSQL**
   - No projeto, clique em "+ New"
   - Selecione "Database" → "PostgreSQL"
   - Railway criará automaticamente um banco

4. **Configurar variáveis de ambiente**
   - Clique no serviço da API
   - Vá em "Variables"
   - Adicione todas as variáveis do `.env.example`
   - `DATABASE_URL` será preenchido automaticamente

5. **Deploy**
   - Railway fará o deploy automaticamente
   - Acesse a URL fornecida

#### Variáveis Necessárias:
```env
NODE_ENV=production
JWT_SECRET=<gerar-chave-segura>
JWT_REFRESH_SECRET=<gerar-chave-segura>
MP_ACCESS_TOKEN=<mercado-pago-token>
MP_PUBLIC_KEY=<mercado-pago-public-key>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<seu-email>
SMTP_PASS=<senha-app>
FRONTEND_URL=<url-do-frontend>
```

---

### Opção 2: Render

1. **Criar conta no Render**
   - Acesse [render.com](https://render.com)

2. **Criar PostgreSQL**
   - Dashboard → New → PostgreSQL
   - Copie a `DATABASE_URL`

3. **Criar Web Service**
   - Dashboard → New → Web Service
   - Conecte o repositório GitHub
   - Configure:
     - Build Command: `pnpm install && pnpm prisma:generate && pnpm build`
     - Start Command: `pnpm start`

4. **Adicionar variáveis de ambiente**

---

### Opção 3: Vercel + Supabase

1. **Criar banco no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie novo projeto
   - Copie a connection string do PostgreSQL

2. **Deploy no Vercel**
   - Instale Vercel CLI: `npm i -g vercel`
   - Execute: `vercel`
   - Configure variáveis de ambiente

---

### Opção 4: VPS (Digital Ocean, AWS, etc.)

#### Requisitos:
- Ubuntu 22.04+
- Node.js 22+
- PostgreSQL 14+
- Nginx
- PM2

#### Passos:

1. **Conectar ao servidor**
```bash
ssh root@seu-servidor
```

2. **Instalar dependências**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Nginx
sudo apt-get install nginx

# PM2
npm install -g pm2 pnpm
```

3. **Configurar PostgreSQL**
```bash
sudo -u postgres psql
CREATE DATABASE vertice;
CREATE USER vertice WITH PASSWORD 'senha-segura';
GRANT ALL PRIVILEGES ON DATABASE vertice TO vertice;
\q
```

4. **Clonar repositório**
```bash
cd /var/www
git clone <repo-url> vertice-backend
cd vertice-backend
```

5. **Instalar dependências**
```bash
pnpm install
```

6. **Configurar .env**
```bash
cp .env.example .env
nano .env
# Editar variáveis
```

7. **Executar migrações**
```bash
pnpm prisma:migrate
pnpm prisma:seed
```

8. **Build**
```bash
pnpm build
```

9. **Iniciar com PM2**
```bash
pm2 start dist/server.js --name vertice-api
pm2 save
pm2 startup
```

10. **Configurar Nginx**
```bash
sudo nano /etc/nginx/sites-available/vertice-api
```

```nginx
server {
    listen 80;
    server_name api.vertice.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/vertice-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

11. **SSL com Certbot**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.vertice.com
```

---

## 🐳 Deploy com Docker

### Build e Run

```bash
# Build
docker build -t vertice-backend .

# Run
docker run -p 3000:3000 --env-file .env vertice-backend
```

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar
docker-compose down
```

---

## 📊 Monitoramento

### PM2 Monitoring

```bash
pm2 monit
pm2 logs vertice-api
pm2 restart vertice-api
```

### Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "database": "connected"
}
```

---

## 🔐 Segurança

### Checklist de Produção

- [ ] Variáveis de ambiente configuradas
- [ ] JWT secrets gerados aleatoriamente (mínimo 32 caracteres)
- [ ] CORS configurado apenas para domínio do front-end
- [ ] Rate limiting ativado
- [ ] HTTPS/SSL configurado
- [ ] Firewall configurado (apenas portas 80, 443, 22)
- [ ] PostgreSQL não exposto publicamente
- [ ] Backups automáticos do banco configurados
- [ ] Logs sendo salvos e rotacionados
- [ ] Credenciais de teste removidas

### Gerar Secrets Seguros

```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# JWT Refresh Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔄 Atualizações

### Atualizar código em produção

```bash
cd /var/www/vertice-backend
git pull origin main
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm build
pm2 restart vertice-api
```

---

## 📦 Backup do Banco de Dados

### Backup Manual

```bash
pg_dump -U vertice -h localhost vertice > backup_$(date +%Y%m%d).sql
```

### Restaurar Backup

```bash
psql -U vertice -h localhost vertice < backup_20241215.sql
```

### Backup Automático (Cron)

```bash
crontab -e
```

Adicionar:
```
0 2 * * * pg_dump -U vertice vertice > /backups/vertice_$(date +\%Y\%m\%d).sql
```

---

## 🐛 Troubleshooting

### Erro de conexão com banco

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Verificar conexão
psql -U vertice -h localhost -d vertice
```

### Erro de porta em uso

```bash
# Ver o que está usando a porta 3000
sudo lsof -i :3000

# Matar processo
sudo kill -9 <PID>
```

### Logs

```bash
# PM2 logs
pm2 logs vertice-api

# Logs da aplicação
tail -f logs/combined.log
tail -f logs/error.log

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Suporte

Para dúvidas sobre deploy, consulte:
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [PM2 Docs](https://pm2.keymetrics.io/docs)

---

**VÉRTICE Backend** - Pronto para escalar! 🚀
