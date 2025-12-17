# 🔍 Guia de Debug - Erro de Autenticação

## Problema Atual

Erro ao tentar criar pedido no checkout:
```json
{
  "error": "Unauthorized",
  "message": "Token de autenticação não fornecido"
}
```

---

## Diagnóstico

Adicionei logs de debug no front-end e back-end para identificar onde o token está sendo perdido.

### Logs no Front-end (`api.ts`)

Ao fazer uma requisição, você verá no console do navegador:
```
[API] Request to: /orders
[API] Session exists: true/false
[API] Token exists: true/false
[API] Token added to headers (se token existir)
```

### Logs no Back-end (`auth.middleware.ts`)

No terminal do back-end, você verá:
```
Auth middleware - checking authorization
  path: /api/v1/orders
  method: POST
  hasAuthHeader: true/false
  headers: [...]
```

---

## Como Testar

### 1. Puxar as Alterações

```powershell
git pull origin main
```

### 2. Reiniciar os Servidores

```powershell
# Terminal 1 - Backend
cd apps\backend
pnpm dev

# Terminal 2 - Frontend  
cd apps\frontend
pnpm dev
```

### 3. Abrir o Console do Navegador

- Pressione `F12` no navegador
- Vá para a aba "Console"

### 4. Fazer Login

- Acesse `http://localhost:5173/login`
- Faça login com sua conta

### 5. Tentar Criar um Pedido

- Adicione produtos ao carrinho
- Vá para o checkout
- Preencha o endereço
- Clique em "Continuar para Pagamento"

### 6. Verificar os Logs

**No Console do Navegador:**
- Procure por `[API] Request to: /orders`
- Verifique se `Session exists: true`
- Verifique se `Token exists: true`
- Verifique se `Token added to headers` aparece

**No Terminal do Back-end:**
- Procure por `Auth middleware - checking authorization`
- Verifique se `hasAuthHeader: true`

---

## Possíveis Causas e Soluções

### Causa 1: Usuário não está logado

**Sintomas:**
- `Session exists: false`
- `Token exists: false`

**Solução:**
1. Verifique se você fez login
2. Verifique se o Supabase Auth está funcionando
3. Tente fazer logout e login novamente

### Causa 2: Token não está sendo adicionado ao header

**Sintomas:**
- `Session exists: true`
- `Token exists: true`
- Mas `hasAuthHeader: false` no back-end

**Solução:**
1. Verifique se o interceptor do Axios está funcionando
2. Pode ser um problema de CORS
3. Verifique se a URL da API está correta

### Causa 3: Token expirado

**Sintomas:**
- `Session exists: true`
- `Token exists: true`
- `hasAuthHeader: true`
- Mas ainda retorna 401

**Solução:**
1. O Supabase deve fazer refresh automático
2. Tente fazer logout e login novamente
3. Verifique se o JWT_SECRET do back-end está correto

### Causa 4: CORS bloqueando headers

**Sintomas:**
- Logs do front-end mostram tudo OK
- Mas back-end não recebe o header

**Solução:**
1. Verifique se o CORS está configurado corretamente no back-end
2. Verifique se `FRONTEND_URL` está correto no `.env`
3. Tente adicionar `'Authorization'` aos headers permitidos

---

## Verificações Adicionais

### 1. Verificar se o Supabase está configurado

```powershell
# No console do navegador
localStorage.getItem('supabase.auth.token')
```

Deve retornar um objeto JSON com o token.

### 2. Verificar se a API está acessível

```powershell
curl http://localhost:3000/api/v1/products
```

Deve retornar a lista de produtos.

### 3. Verificar se o token é válido

No console do navegador:
```javascript
const { data: { session } } = await supabase.auth.getSession();
console.log(session);
```

Deve mostrar o usuário e o token.

---

## Próximos Passos

Depois de executar os testes acima, me envie:

1. **Logs do Console do Navegador** (print ou copiar o texto)
2. **Logs do Terminal do Back-end** (print ou copiar o texto)
3. **Resultado do `localStorage.getItem('supabase.auth.token')`**

Com essas informações, posso identificar exatamente onde está o problema e corrigi-lo.

---

## Solução Temporária

Se você quiser testar o PayPal sem resolver o auth agora, posso:

1. Remover temporariamente a autenticação do endpoint de pedidos
2. Ou criar um token de teste hardcoded

Mas isso é apenas para teste - não deve ir para produção.

---

**Me avise os resultados dos logs!** 🔍
