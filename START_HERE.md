# 🚀 VÉRTICE E-commerce - Guia de Início Rápido

## ✅ Status: Tudo Configurado!

- ✅ Supabase Auth configurado
- ✅ Banco de dados criado (20 tabelas)
- ✅ Dados de teste inseridos
- ✅ Back-end pronto
- ✅ Front-end pronto
- ✅ Integração configurada

---

## 🎯 Como Iniciar o Projeto

### 1. Instalar Dependências (se ainda não fez)

```bash
# Na raiz do projeto
pnpm install
```

### 2. Iniciar Back-end

```bash
# Terminal 1
cd apps/backend
pnpm dev
```

**Deve aparecer:**
```
✅ Server running on http://localhost:3000
```

### 3. Iniciar Front-end

```bash
# Terminal 2 (nova aba)
cd apps/frontend
pnpm dev
```

**Deve aparecer:**
```
  VITE v6.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

---

## 🧪 Testar a Aplicação

### 1. Acessar o Site

Abra: **http://localhost:5173**

### 2. Criar uma Conta

1. Clique em "Entrar" no header
2. Clique em "Criar conta"
3. Preencha:
   - Nome: Seu nome
   - Email: seu@email.com
   - Senha: mínimo 8 caracteres
4. Clique em "Criar conta"
5. **Importante:** Verifique seu email e clique no link de confirmação

### 3. Fazer Login

1. Após confirmar o email, volte para o site
2. Clique em "Entrar"
3. Faça login com suas credenciais
4. Você deve ver seu nome no header

### 4. Testar Produtos

1. Na home, você deve ver **3 produtos**:
   - Tênis Urban Pro (R$ 299,90)
   - Calça Cargo Street (R$ 189,90)
   - Blusa Oversized Essential (R$ 129,90)

2. Clique em um produto para ver os detalhes

3. Verifique se aparecem:
   - Imagens
   - Descrição
   - Variações (tamanhos e cores)
   - Benefícios
   - Reviews (ainda vazio)

### 5. Testar Área do Cliente

1. Clique no seu nome no header
2. Vá em "Minha Conta"
3. Teste editar seu perfil
4. Vá em "Meus Pedidos" (ainda vazio)

---

## 🎨 Dados de Teste Disponíveis

### Produtos
- **3 produtos** com imagens, variações e benefícios
- **12 variações** (tamanhos e cores)
- **3 categorias** (Tênis, Calças, Blusas)

### Cupons
- `BEMVINDO10` - 10% de desconto (mín. R$ 100)
- `PRIMEIRACOMPRA` - 15% de desconto (mín. R$ 150)
- `FRETEGRATIS` - R$ 20 de desconto (mín. R$ 200)

---

## 🔍 Verificar se Está Funcionando

### Back-end

**Teste 1: Health Check**
```bash
curl http://localhost:3000/health
```
Deve retornar: `{"status":"ok"}`

**Teste 2: Listar Produtos**
```bash
curl http://localhost:3000/api/v1/products
```
Deve retornar JSON com 3 produtos

**Teste 3: Listar Categorias**
```bash
curl http://localhost:3000/api/v1/categories
```
Deve retornar JSON com 3 categorias

### Front-end

1. Abra o console do navegador (F12)
2. Vá para a aba "Network"
3. Navegue pela home
4. Você deve ver requisições para:
   - `http://localhost:3000/api/v1/products`
   - `http://localhost:3000/api/v1/categories`

---

## 📊 Endpoints da API Disponíveis

### Públicos (sem autenticação)

```
GET  /api/v1/products              - Listar produtos
GET  /api/v1/products/:slug         - Detalhes do produto
GET  /api/v1/products/featured      - Produtos em destaque
GET  /api/v1/products/new           - Produtos novos
GET  /api/v1/categories             - Listar categorias
GET  /api/v1/categories/:slug       - Detalhes da categoria
POST /api/v1/auth/register          - Criar conta
POST /api/v1/auth/login             - Fazer login
```

### Protegidos (requer autenticação)

```
GET  /api/v1/users/me               - Perfil do usuário
PUT  /api/v1/users/me               - Atualizar perfil
GET  /api/v1/users/me/orders        - Listar pedidos
GET  /api/v1/cart                   - Ver carrinho
POST /api/v1/cart/items             - Adicionar ao carrinho
POST /api/v1/orders                 - Criar pedido
```

---

## 🐛 Problemas Comuns

### Erro: "CORS blocked"

**Solução:** Verifique se o back-end está rodando em `http://localhost:3000`

### Erro: "Network Error"

**Solução:** 
1. Verifique se o back-end está rodando
2. Verifique se a URL da API está correta no `.env.local` do front-end

### Produtos não aparecem

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Verifique se a requisição para `/api/v1/products` foi feita
4. Se não houver produtos, execute o seed SQL novamente

### Não consigo fazer login

**Solução:**
1. Verifique se confirmou o email
2. Verifique se o Supabase Auth está configurado
3. Tente criar uma nova conta

---

## 📁 Estrutura do Projeto

```
vertice-hub/
├── apps/
│   ├── frontend/          # React + Vite + TypeScript
│   │   ├── src/
│   │   │   ├── api/       # Serviços da API
│   │   │   ├── components/
│   │   │   ├── context/   # AuthContext, CartContext
│   │   │   ├── hooks/     # Custom hooks
│   │   │   ├── pages/
│   │   │   └── lib/       # Supabase, API client
│   │   └── .env.local     # Variáveis de ambiente
│   │
│   └── backend/           # Node.js + Express + Prisma
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── routes/
│       │   ├── middlewares/
│       │   └── config/
│       ├── prisma/
│       │   └── schema.prisma
│       └── .env           # Variáveis de ambiente
│
├── .env                   # Variáveis globais
└── pnpm-workspace.yaml
```

---

## 🎯 Próximos Passos

### Funcionalidades Prontas ✅
- Autenticação (login, cadastro, recuperação de senha)
- Produtos (listagem, detalhes, filtros)
- Categorias
- Perfil do usuário
- API completa

### Funcionalidades a Implementar 🚧
1. **Carrinho** - Migrar de localStorage para API
2. **Checkout** - Fluxo completo de compra
3. **Pagamentos** - Integração com Mercado Pago
4. **Pedidos** - Página de detalhes e rastreamento
5. **Endereços** - CRUD completo
6. **Reviews** - Formulário de avaliação
7. **Busca** - Página de busca com filtros
8. **Admin** - Painel administrativo

---

## 📚 Documentação

- **API_DOCUMENTATION.md** - Documentação completa da API
- **INTEGRATION_GUIDE.md** - Como integrar front + back
- **SUPABASE_SETUP.md** - Setup do Supabase
- **FRONTEND_TODO.md** - Lista do que falta implementar
- **IMPLEMENTATION_SUMMARY.md** - Resumo do projeto

---

## 🆘 Precisa de Ajuda?

### Logs

**Back-end:**
```bash
cd apps/backend
pnpm dev
# Verifique os logs no terminal
```

**Front-end:**
```bash
# Abra o console do navegador (F12)
# Vá para a aba "Console"
```

### Comandos Úteis

```bash
# Ver dados no banco
cd apps/backend
pnpm prisma:studio

# Resetar banco (⚠️ apaga tudo!)
pnpm prisma:migrate reset

# Verificar erros de TypeScript
cd apps/frontend
pnpm build
```

---

## ✅ Checklist Final

Antes de considerar tudo funcionando:

- [ ] Back-end rodando sem erros
- [ ] Front-end rodando sem erros
- [ ] Produtos aparecem na home
- [ ] Consegue criar conta
- [ ] Consegue fazer login
- [ ] Nome aparece no header após login
- [ ] Consegue acessar "Minha Conta"
- [ ] Sem erros no console do navegador
- [ ] Sem erros de CORS

---

**Quando tudo estiver ✅, você tem um e-commerce funcional!** 🎉

**Próximo passo:** Implementar o checkout e integrar o Mercado Pago para começar a vender! 💰
