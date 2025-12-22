# Análise do Projeto Vértice Hub

## Status Atual

### Backend
- **URL**: https://vertice-hub-backend.vercel.app
- **Status**: Funcionando OK
- **Database**: Conectado (Supabase)
- **Produtos**: 3 produtos no banco (seed)

### Frontend
- **URL**: https://www.xn--vrtice-bva.store/
- **Status**: Funcionando visualmente
- **Problema**: VITE_API_URL não configurado na Vercel (usando localhost:3000)

## Problema Principal - Checkout
O erro "Network Error" ocorre porque:
1. A variável `VITE_API_URL` não está configurada no frontend da Vercel
2. O frontend tenta acessar `http://localhost:3000/api/v1` em vez de `https://vertice-hub-backend.vercel.app/api/v1`

## Solução Necessária
Configurar na Vercel do frontend:
```
VITE_API_URL=https://vertice-hub-backend.vercel.app/api/v1
```

## APIs de Dropshipping para Pesquisar
- AliExpress API
- CJ Dropshipping
- Printful
- Spocket
- Oberlo alternatives
- Wholesale2B
