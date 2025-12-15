# 🔗 Guia de Integração Front-end + Back-end VÉRTICE

Este guia explica como conectar o front-end (React + Supabase Auth) com o back-end (Express + PostgreSQL).

---

## 📋 O que foi implementado

### ✅ Front-end

**Configuração:**
- ✅ API client com Axios (`src/lib/api.ts`)
- ✅ Interceptors para adicionar token do Supabase automaticamente
- ✅ Tratamento de erros e refresh de token

**Serviços API:**
- ✅ `src/api/products.ts` - Produtos e reviews
- ✅ `src/api/categories.ts` - Categorias
- ✅ `src/api/cart.ts` - Carrinho de compras
- ✅ `src/api/orders.ts` - Pedidos
- ✅ `src/api/users.ts` - Perfil e endereços

**Hooks Personalizados:**
- ✅ `useProducts()` - Listar produtos com filtros
- ✅ `useProduct(slug)` - Detalhes de um produto
- ✅ `useFeaturedProducts()` - Produtos em destaque
- ✅ `useNewProducts()` - Produtos novos
- ✅ `useCartQuery()` - Carrinho do usuário
- ✅ `useAddToCart()` - Adicionar ao carrinho
- ✅ `useOrders()` - Listar pedidos
- ✅ `useCreateOrder()` - Criar pedido

**Páginas:**
- ✅ Login, Cadastro, Recuperar Senha, Redefinir Senha
- ✅ Perfil do usuário
- ✅ Lista de pedidos
- ✅ PrivateRoute para rotas protegidas

---

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente

#### Front-end (`apps/frontend/.env.local`)

```env
# API Backend
VITE_API_URL=http://localhost:3000/api/v1

# Supabase (obtenha no dashboard do Supabase)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

#### Back-end (`apps/backend/.env` ou raiz do projeto)

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres.[REF]:[SENHA]@db.[REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.[REF]:[SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase JWT Secret (IMPORTANTE!)
SUPABASE_JWT_SECRET="seu_supabase_jwt_secret"

# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# JWT (não será usado, mas mantenha por compatibilidade)
JWT_SECRET="qualquer_valor"
JWT_REFRESH_SECRET="qualquer_valor"
```

### 2. Obter Supabase JWT Secret

O back-end precisa validar os tokens do Supabase. Para isso:

1. Acesse o dashboard do Supabase
2. Vá em **Settings** > **API**
3. Role até **JWT Settings**
4. Copie o **JWT Secret**
5. Cole no `.env` como `SUPABASE_JWT_SECRET`

---

## 🔐 Atualizar Back-end para Supabase Auth

O back-end atual usa JWT customizado. Precisamos adaptá-lo para validar tokens do Supabase.

### Passo 1: Instalar dependência

```bash
cd apps/backend
pnpm add @supabase/supabase-js
```

### Passo 2: Atualizar middleware de autenticação

Edite `apps/backend/src/middlewares/auth.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.substring(7);

    // Validar token do Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Adicionar usuário ao request
    req.user = {
      id: user.id,
      email: user.email!,
      role: user.user_metadata?.role || 'CUSTOMER',
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Erro na autenticação' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Sem permissão' });
    }

    next();
  };
};
```

### Passo 3: Atualizar variáveis de ambiente

Adicione no `.env` do back-end:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

**Importante:** Use a **Service Role Key**, não a Anon Key. Ela está em **Settings** > **API** > **service_role (secret)**.

---

## 🚀 Como Testar a Integração

### 1. Iniciar Back-end

```bash
# Na raiz do projeto
pnpm dev:backend

# Ou
cd apps/backend
pnpm dev
```

Verifique se está rodando em `http://localhost:3000`

### 2. Iniciar Front-end

```bash
# Na raiz do projeto
pnpm dev:frontend

# Ou
cd apps/frontend
pnpm dev
```

Verifique se está rodando em `http://localhost:5173`

### 3. Testar Fluxo Completo

1. **Cadastro:**
   - Acesse `http://localhost:5173/cadastro`
   - Crie uma conta
   - Verifique o e-mail (Supabase envia automaticamente)

2. **Login:**
   - Acesse `http://localhost:5173/login`
   - Faça login com a conta criada

3. **Produtos:**
   - Abra o console do navegador (F12)
   - Verifique se há erros de CORS
   - Os produtos devem vir da API

4. **Carrinho:**
   - Adicione um produto ao carrinho
   - Verifique no Network tab se a requisição foi para a API

5. **Perfil:**
   - Acesse `http://localhost:5173/minha-conta`
   - Edite seu perfil
   - Verifique se salvou

---

## 🐛 Troubleshooting

### Erro: CORS blocked

**Causa:** Back-end não está aceitando requisições do front-end.

**Solução:** Verifique se `CORS_ORIGIN` no `.env` do back-end está correto:

```env
CORS_ORIGIN=http://localhost:5173
```

### Erro: 401 Unauthorized

**Causa:** Token do Supabase não está sendo validado corretamente.

**Solução:**
1. Verifique se `SUPABASE_SERVICE_ROLE_KEY` está correto no back-end
2. Verifique se o middleware foi atualizado
3. Teste o token manualmente:

```bash
curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3000/api/v1/users/me
```

### Erro: Can't reach database

**Causa:** Back-end não consegue conectar ao Supabase.

**Solução:**
1. Verifique `DATABASE_URL` e `DIRECT_URL`
2. Teste a conexão:

```bash
cd apps/backend
pnpm prisma:studio
```

### Produtos não aparecem

**Causa:** Banco de dados vazio.

**Solução:**
```bash
cd apps/backend
pnpm prisma:seed
```

---

## 📝 Próximos Passos

### Funcionalidades Restantes:

1. **Checkout:**
   - [ ] Página de checkout
   - [ ] Integração com Mercado Pago
   - [ ] Confirmação de pedido

2. **Endereços:**
   - [ ] Página de gerenciamento de endereços
   - [ ] CRUD completo

3. **Detalhes do Pedido:**
   - [ ] Página de detalhes do pedido
   - [ ] Timeline de status
   - [ ] Rastreamento

4. **Busca:**
   - [ ] Página de busca
   - [ ] Filtros avançados

5. **Reviews:**
   - [ ] Formulário de review
   - [ ] Integração com API

---

## 🔄 Sincronizar Carrinho

O carrinho atual usa localStorage. Para migrar para API:

### Atualizar CartContext

Edite `apps/frontend/src/context/CartContext.tsx`:

```typescript
import { useCartQuery, useAddToCart, useUpdateCartItem, useRemoveFromCart } from '@/hooks/useCart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: cart, isLoading } = useCartQuery();
  const addToCartMutation = useAddToCart();
  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveFromCart();

  const addItem = (variantId: string, quantity: number) => {
    addToCartMutation.mutate({ variantId, quantity });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    updateCartMutation.mutate({ itemId, quantity });
  };

  const removeItem = (itemId: string) => {
    removeCartMutation.mutate(itemId);
  };

  // ... resto do código
};
```

---

## ✅ Checklist de Integração

- [ ] Variáveis de ambiente configuradas (front e back)
- [ ] Supabase JWT Secret adicionado ao back-end
- [ ] Middleware de autenticação atualizado
- [ ] CORS configurado corretamente
- [ ] Back-end rodando sem erros
- [ ] Front-end rodando sem erros
- [ ] Login funcionando
- [ ] Produtos carregando da API
- [ ] Carrinho sincronizado
- [ ] Perfil do usuário funcionando

---

**Dúvidas?** Verifique os logs do back-end e do console do navegador para identificar erros específicos.
