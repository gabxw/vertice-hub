# 📋 VÉRTICE Frontend - Lista do que Falta Implementar

## Status Atual

O front-end está **funcionando com dados mockados** (hardcoded). Todas as páginas principais existem, mas **não estão conectadas ao back-end**. O carrinho funciona apenas com localStorage.

---

## 🔴 Crítico - Integração com Back-end

### 1. Configuração Base da API

- [ ] Criar arquivo `src/lib/api.ts` com configuração do Axios
- [ ] Configurar base URL da API (`http://localhost:3000/api/v1`)
- [ ] Criar interceptors para adicionar token JWT automaticamente
- [ ] Criar interceptors para tratamento de erros (401, 403, 500)
- [ ] Configurar variáveis de ambiente (`.env.local`)

**Arquivo necessário:**
```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

### 2. Sistema de Autenticação (ZERO implementado)

#### Páginas Necessárias:

- [ ] `/login` - Página de login
- [ ] `/cadastro` - Página de cadastro
- [ ] `/recuperar-senha` - Solicitar recuperação de senha
- [ ] `/redefinir-senha/:token` - Redefinir senha com token

#### Context/Provider:

- [ ] Criar `AuthContext` para gerenciar estado de autenticação
- [ ] Armazenar `accessToken` e `refreshToken` no localStorage
- [ ] Implementar função `login(email, password)`
- [ ] Implementar função `register(data)`
- [ ] Implementar função `logout()`
- [ ] Implementar função `refreshToken()` automática
- [ ] Proteger rotas privadas com `PrivateRoute` component

#### Hooks:

- [ ] `useAuth()` - Hook para acessar contexto de autenticação
- [ ] `useUser()` - Hook para dados do usuário logado

#### Componentes:

- [ ] Formulário de login
- [ ] Formulário de cadastro
- [ ] Formulário de recuperação de senha
- [ ] Botão de logout no header
- [ ] Mostrar nome do usuário no header quando logado

---

### 3. Integração de Produtos (Parcialmente implementado)

#### Substituir dados mockados por API:

- [ ] **Home Page:**
  - [ ] Buscar produtos em destaque via `/products/featured`
  - [ ] Buscar produtos novos via `/products/new`
  
- [ ] **Página de Categoria (`/categoria/:slug`):**
  - [ ] Buscar produtos por categoria via `/products?categoryId=...`
  - [ ] Implementar filtros (preço, tags, etc.)
  - [ ] Implementar paginação
  - [ ] Implementar ordenação (mais vendidos, menor preço, etc.)

- [ ] **Página de Produto (`/produto/:slug`):**
  - [ ] Buscar detalhes do produto via `/products/:slug`
  - [ ] Buscar reviews via `/products/:id/reviews`
  - [ ] Verificar estoque real antes de adicionar ao carrinho
  - [ ] Mostrar variantes (tamanho + cor) vindas da API

- [ ] **Busca:**
  - [ ] Criar página `/busca` ou modal de busca
  - [ ] Implementar busca via `/products?search=...`
  - [ ] Autocompletar sugestões

#### Hooks:

- [ ] `useProducts(filters)` - Listar produtos
- [ ] `useProduct(slug)` - Detalhes de um produto
- [ ] `useFeaturedProducts()` - Produtos em destaque
- [ ] `useNewProducts()` - Produtos novos
- [ ] `useCategories()` - Listar categorias

---

### 4. Sistema de Carrinho (Migrar de localStorage para API)

#### Atualizar CartContext:

- [ ] Sincronizar carrinho com API `/cart`
- [ ] Ao adicionar item, chamar `POST /cart/items`
- [ ] Ao atualizar quantidade, chamar `PUT /cart/items/:id`
- [ ] Ao remover item, chamar `DELETE /cart/items/:id`
- [ ] Buscar carrinho ao fazer login via `GET /cart`
- [ ] Mesclar carrinho do localStorage com carrinho do servidor

#### Validações:

- [ ] Verificar estoque antes de adicionar ao carrinho
- [ ] Mostrar erro se item não estiver disponível
- [ ] Atualizar preços em tempo real

---

### 5. Fluxo de Checkout (ZERO implementado)

#### Páginas Necessárias:

- [ ] `/checkout` - Página de checkout
- [ ] `/checkout/endereco` - Selecionar/adicionar endereço
- [ ] `/checkout/pagamento` - Escolher método de pagamento
- [ ] `/checkout/confirmacao` - Revisar pedido
- [ ] `/pedido/:id/sucesso` - Confirmação de pedido
- [ ] `/pedido/:id/erro` - Erro no pagamento

#### Componentes:

- [ ] Formulário de endereço
- [ ] Seletor de endereços salvos
- [ ] Resumo do pedido (sidebar)
- [ ] Campo de cupom de desconto
- [ ] Seletor de método de pagamento (PIX, Cartão, Boleto)

#### Integração:

- [ ] Criar pedido via `POST /orders`
- [ ] Aplicar cupom via validação no back-end
- [ ] Integrar com Mercado Pago para pagamentos
- [ ] Mostrar QR Code do PIX
- [ ] Redirecionar para checkout do Mercado Pago (cartão)

---

### 6. Área do Cliente (ZERO implementado)

#### Páginas Necessárias:

- [ ] `/minha-conta` - Dashboard do cliente
- [ ] `/minha-conta/perfil` - Editar perfil
- [ ] `/minha-conta/pedidos` - Histórico de pedidos
- [ ] `/minha-conta/pedido/:id` - Detalhes do pedido
- [ ] `/minha-conta/enderecos` - Gerenciar endereços
- [ ] `/minha-conta/senha` - Alterar senha

#### Componentes:

- [ ] Menu lateral da conta
- [ ] Lista de pedidos com status
- [ ] Card de pedido
- [ ] Timeline de status do pedido
- [ ] Formulário de edição de perfil
- [ ] Lista de endereços com CRUD

#### Integração:

- [ ] Buscar dados do usuário via `GET /users/me`
- [ ] Atualizar perfil via `PUT /users/me`
- [ ] Buscar pedidos via `GET /users/me/orders`
- [ ] Buscar detalhes do pedido via `GET /orders/:id`
- [ ] Rastreamento via `GET /orders/:id/tracking`
- [ ] CRUD de endereços via `/users/me/addresses`

---

### 7. Sistema de Reviews (Parcialmente implementado)

#### Funcionalidades:

- [ ] Buscar reviews reais da API
- [ ] Permitir usuário logado criar review
- [ ] Formulário de review (rating + comentário)
- [ ] Mostrar badge "Compra verificada"
- [ ] Paginação de reviews

#### Integração:

- [ ] Buscar reviews via `GET /products/:id/reviews`
- [ ] Criar review via `POST /products/:id/reviews`
- [ ] Validar se usuário já comprou o produto

---

## 🟡 Importante - Melhorias de UX

### 8. Loading States

- [ ] Skeleton loaders para produtos
- [ ] Loading spinner para botões
- [ ] Loading state para páginas
- [ ] Shimmer effect para imagens

### 9. Tratamento de Erros

- [ ] Página de erro 500
- [ ] Mensagens de erro amigáveis
- [ ] Toast notifications para erros
- [ ] Fallback para imagens quebradas

### 10. Otimizações

- [ ] Lazy loading de imagens
- [ ] Lazy loading de rotas
- [ ] Cache de requisições com React Query
- [ ] Debounce na busca
- [ ] Infinite scroll em listagens

---

## 🟢 Desejável - Features Extras

### 11. Busca Avançada

- [ ] Página de busca dedicada
- [ ] Filtros avançados (preço, cor, tamanho, categoria)
- [ ] Ordenação (relevância, preço, novos)
- [ ] Histórico de buscas

### 12. Wishlist / Favoritos

- [ ] Botão de favoritar produto
- [ ] Página `/favoritos`
- [ ] Sincronizar com back-end (se implementado)

### 13. Comparador de Produtos

- [ ] Adicionar produtos para comparar
- [ ] Página `/comparar`
- [ ] Tabela comparativa

### 14. Notificações

- [ ] Notificar quando produto voltar ao estoque
- [ ] Notificar sobre promoções
- [ ] Notificar sobre status do pedido

### 15. SEO

- [ ] Meta tags dinâmicas por página
- [ ] Open Graph tags
- [ ] Sitemap
- [ ] Structured data (JSON-LD)

---

## 📦 Estrutura de Pastas Sugerida

```
src/
├── api/                    # Serviços de API
│   ├── auth.ts            # Endpoints de autenticação
│   ├── products.ts        # Endpoints de produtos
│   ├── cart.ts            # Endpoints de carrinho
│   ├── orders.ts          # Endpoints de pedidos
│   └── users.ts           # Endpoints de usuários
├── components/
│   ├── auth/              # Componentes de autenticação
│   ├── checkout/          # Componentes de checkout
│   ├── account/           # Componentes da área do cliente
│   ├── common/            # Componentes reutilizáveis
│   └── ...
├── context/
│   ├── AuthContext.tsx    # Contexto de autenticação
│   ├── CartContext.tsx    # Contexto do carrinho (já existe)
│   └── ...
├── hooks/
│   ├── useAuth.ts         # Hook de autenticação
│   ├── useProducts.ts     # Hook de produtos
│   ├── useCart.ts         # Hook de carrinho
│   └── ...
├── lib/
│   ├── api.ts             # Configuração do Axios
│   └── utils.ts           # Funções utilitárias
├── pages/
│   ├── auth/              # Páginas de autenticação
│   ├── checkout/          # Páginas de checkout
│   ├── account/           # Páginas da área do cliente
│   └── ...
├── types/
│   ├── api.ts             # Tipos da API
│   ├── product.ts         # Tipos de produto
│   └── ...
└── ...
```

---

## 🎯 Prioridades Recomendadas

### Sprint 1 - Fundação (1-2 semanas)
1. Configurar API base
2. Implementar autenticação completa
3. Integrar listagem de produtos
4. Integrar detalhes do produto

### Sprint 2 - Carrinho e Checkout (1-2 semanas)
5. Migrar carrinho para API
6. Implementar fluxo de checkout
7. Integrar pagamentos (Mercado Pago)

### Sprint 3 - Área do Cliente (1 semana)
8. Implementar área do cliente
9. Histórico de pedidos
10. Rastreamento

### Sprint 4 - Polimento (1 semana)
11. Loading states
12. Tratamento de erros
13. Otimizações
14. Testes

---

## 📊 Resumo Quantitativo

| Categoria | Total | Status |
|-----------|-------|--------|
| **Páginas novas** | ~15 | 0% |
| **Integrações API** | ~30 endpoints | 0% |
| **Componentes novos** | ~40 | 0% |
| **Hooks novos** | ~10 | 0% |
| **Context/Providers** | 1 (AuthContext) | 0% |

**Estimativa total:** 4-6 semanas de desenvolvimento full-time

---

## 🚀 Próximo Passo Imediato

**Comece por aqui:**

1. Criar `src/lib/api.ts` com configuração do Axios
2. Criar `.env.local` com `VITE_API_URL=http://localhost:3000/api/v1`
3. Criar `src/context/AuthContext.tsx`
4. Criar páginas de login e cadastro
5. Testar autenticação end-to-end

---

**Quer que eu implemente alguma dessas funcionalidades agora?** 

Posso começar por:
- ✅ Configuração da API
- ✅ Sistema de autenticação completo
- ✅ Integração de produtos
- ✅ Qualquer outra prioridade que você escolher
