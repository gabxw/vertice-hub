# VÉRTICE E-commerce API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication

Todas as rotas protegidas requerem um token JWT no header:
```
Authorization: Bearer <access_token>
```

---

## 📍 Autenticação (`/auth`)

### POST `/auth/register`
Cadastro de novo usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "SenhaForte123",
  "name": "Nome do Usuário",
  "cpf": "12345678900",
  "phone": "(11) 98765-4321"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

### POST `/auth/login`
Login de usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "SenhaForte123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

### POST `/auth/refresh`
Renovar access token.

**Body:**
```json
{
  "refreshToken": "..."
}
```

---

### POST `/auth/forgot-password`
Solicitar recuperação de senha.

**Body:**
```json
{
  "email": "usuario@exemplo.com"
}
```

---

### POST `/auth/reset-password`
Resetar senha com token.

**Body:**
```json
{
  "token": "...",
  "password": "NovaSenhaForte123"
}
```

---

### GET `/auth/me`
Obter usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "...",
    "role": "CUSTOMER"
  }
}
```

---

## 👤 Usuários (`/users`)

### GET `/users/me`
Obter perfil do usuário.

**Headers:** `Authorization: Bearer <token>`

---

### PUT `/users/me`
Atualizar perfil.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "Novo Nome",
  "cpf": "12345678900",
  "phone": "(11) 98765-4321"
}
```

---

### GET `/users/me/orders`
Obter histórico de pedidos.

**Query Params:**
- `page` (opcional): Número da página
- `limit` (opcional): Itens por página

---

### GET `/users/me/addresses`
Listar endereços.

---

### POST `/users/me/addresses`
Criar endereço.

**Body:**
```json
{
  "name": "Casa",
  "street": "Rua Exemplo",
  "number": "123",
  "complement": "Apto 45",
  "neighborhood": "Centro",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "isDefault": true
}
```

---

### PUT `/users/me/addresses/:id`
Atualizar endereço.

---

### DELETE `/users/me/addresses/:id`
Deletar endereço.

---

## 🛍️ Produtos (`/products`)

### GET `/products`
Listar produtos com filtros.

**Query Params:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 12)
- `categoryId` (opcional): Filtrar por categoria
- `minPrice` (opcional): Preço mínimo
- `maxPrice` (opcional): Preço máximo
- `isNew` (opcional): Apenas novos (true/false)
- `isBestSeller` (opcional): Apenas bestsellers (true/false)
- `search` (opcional): Busca por nome/descrição
- `tags` (opcional): Filtrar por tags (separadas por vírgula)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### GET `/products/featured`
Obter produtos em destaque.

**Query Params:**
- `limit` (opcional): Quantidade (padrão: 8)

---

### GET `/products/new`
Obter produtos novos.

**Query Params:**
- `limit` (opcional): Quantidade (padrão: 8)

---

### GET `/products/:slug`
Obter detalhes do produto por slug.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Urban Runner Pro",
    "slug": "urban-runner-pro",
    "description": "...",
    "story": "...",
    "price": 289.90,
    "originalPrice": 399.90,
    "rating": 4.8,
    "reviewCount": 234,
    "category": { ... },
    "images": [ ... ],
    "variants": [
      {
        "id": "...",
        "size": "40",
        "colorName": "Preto",
        "colorHex": "#1a1a1a",
        "sku": "URP-40-BLK",
        "stock": 12
      }
    ],
    "benefits": [ ... ],
    "tags": [ ... ]
  }
}
```

---

### GET `/products/:id/reviews`
Obter avaliações do produto.

**Query Params:**
- `page` (opcional)
- `limit` (opcional)

---

### POST `/products/:id/reviews`
Criar avaliação do produto.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "rating": 5,
  "content": "Produto excelente! Recomendo muito."
}
```

---

### POST `/products` (Admin)
Criar produto.

**Headers:** `Authorization: Bearer <admin_token>`

**Body:**
```json
{
  "name": "Produto Novo",
  "description": "Descrição do produto",
  "story": "História do produto",
  "price": 199.90,
  "originalPrice": 249.90,
  "categoryId": "...",
  "supplierId": "...",
  "isNew": true,
  "isBestSeller": false,
  "images": [
    { "url": "https://...", "alt": "Imagem 1", "order": 0 }
  ],
  "variants": [
    {
      "size": "M",
      "colorName": "Preto",
      "colorHex": "#1a1a1a",
      "sku": "PROD-M-BLK",
      "stock": 50
    }
  ],
  "benefits": ["Benefício 1", "Benefício 2"],
  "tags": ["tag1", "tag2"]
}
```

---

### PUT `/products/:id` (Admin)
Atualizar produto.

---

### DELETE `/products/:id` (Admin)
Deletar produto.

---

## 📂 Categorias (`/categories`)

### GET `/categories`
Listar todas as categorias.

---

### GET `/categories/:slug`
Obter detalhes da categoria.

---

### GET `/categories/:slug/products`
Obter produtos da categoria.

**Query Params:**
- `page` (opcional)
- `limit` (opcional)

---

### POST `/categories` (Admin)
Criar categoria.

**Body:**
```json
{
  "name": "Nova Categoria",
  "description": "Descrição",
  "image": "https://...",
  "parentId": "..." // opcional
}
```

---

### PUT `/categories/:id` (Admin)
Atualizar categoria.

---

### DELETE `/categories/:id` (Admin)
Deletar categoria.

---

## 🛒 Carrinho (`/cart`)

### GET `/cart`
Obter carrinho do usuário.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "cart": {
      "id": "...",
      "items": [ ... ]
    },
    "summary": {
      "subtotal": 579.80,
      "totalItems": 2,
      "shipping": 0,
      "discount": 0,
      "total": 579.80
    }
  }
}
```

---

### POST `/cart/items`
Adicionar item ao carrinho.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "variantId": "...",
  "quantity": 1
}
```

---

### PUT `/cart/items/:id`
Atualizar quantidade do item.

**Body:**
```json
{
  "quantity": 2
}
```

---

### DELETE `/cart/items/:id`
Remover item do carrinho.

---

### DELETE `/cart`
Limpar carrinho.

---

## 📦 Pedidos (`/orders`)

### POST `/orders`
Criar pedido a partir do carrinho.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "shippingAddressId": "...",
  "paymentMethod": "pix",
  "couponCode": "BEMVINDO10"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "id": "...",
    "orderNumber": "VRT-...",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "total": 521.82,
    "items": [ ... ]
  }
}
```

---

### GET `/orders/:id`
Obter detalhes do pedido.

---

### GET `/orders/:id/tracking`
Obter rastreamento do pedido.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "orderNumber": "VRT-...",
    "status": "SHIPPED",
    "trackingCode": "BR123456789",
    "statusHistory": [ ... ]
  }
}
```

---

## 🔒 Segurança

### Rate Limiting

- **Login:** 5 tentativas / 15 min
- **Registro:** 3 tentativas / 1 hora
- **Recuperação de senha:** 3 tentativas / 1 hora
- **API geral:** 100 requisições / 15 min

### Validações

- Todos os dados são validados com Zod
- Senhas devem ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números
- CPF é validado
- Emails são validados

---

## 📊 Códigos de Status

- `200 OK` - Sucesso
- `201 Created` - Recurso criado
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `429 Too Many Requests` - Rate limit excedido
- `500 Internal Server Error` - Erro do servidor

---

## 🧪 Testando a API

### Credenciais de Teste

Após executar `pnpm prisma:seed`:

**Admin:**
- Email: `admin@vertice.com`
- Senha: `admin123`

**Cliente:**
- Email: `cliente@teste.com`
- Senha: `customer123`

### Exemplo de Fluxo Completo

1. **Registrar/Login**
```bash
POST /api/v1/auth/login
```

2. **Listar Produtos**
```bash
GET /api/v1/products
```

3. **Ver Detalhes do Produto**
```bash
GET /api/v1/products/urban-runner-pro
```

4. **Adicionar ao Carrinho**
```bash
POST /api/v1/cart/items
{
  "variantId": "...",
  "quantity": 1
}
```

5. **Criar Endereço**
```bash
POST /api/v1/users/me/addresses
```

6. **Criar Pedido**
```bash
POST /api/v1/orders
{
  "shippingAddressId": "...",
  "paymentMethod": "pix"
}
```

---

**Desenvolvido para a marca VÉRTICE** 🚀
