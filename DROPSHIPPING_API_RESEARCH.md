# Pesquisa de APIs de Dropshipping

## CJ Dropshipping API

**Documentação**: https://developers.cjdropshipping.com/

### Endpoints Principais

#### 1. Autenticação
- Requer `CJ-Access-Token` no header de todas as requisições
- Token obtido através do processo de autenticação OAuth

#### 2. Produtos

**Listar Categorias**
```
GET https://developers.cjdropshipping.com/api2.0/v1/product/getCategory
Header: CJ-Access-Token: xxxxx
```

**Listar Produtos (V2 - Recomendado)**
```
GET https://developers.cjdropshipping.com/api2.0/v1/product/listV2
Header: CJ-Access-Token: xxxxx

Parâmetros:
- keyWord: Busca por nome ou SKU
- page: Número da página (1-1000)
- size: Itens por página (1-100)
- categoryId: Filtrar por categoria
- countryCode: CN, US, GB, FR, BR, etc.
- startSellPrice / endSellPrice: Filtro de preço
- productType: 4=Supplier, 10=Video, 11=Non-video
- sort: desc/asc
- orderBy: 0=best match, 1=listing count, 2=sell price, 3=create time, 4=inventory
```

**Resposta de Produto**
```json
{
  "id": "04A22450-67F0-4617-A132-E7AE7F8963B0",
  "nameEn": "Personalized Belly-baring Cat Ear Hoody Coat",
  "sku": "CJNSSYWY01847",
  "bigImage": "https://...",
  "sellPrice": "11.85",
  "nowPrice": "9.50",
  "categoryId": "...",
  "threeCategoryName": "Hoodies & Sweatshirts",
  "warehouseInventoryNum": 500
}
```

### Como Obter Access Token

1. Criar conta em https://cjdropshipping.com/
2. Acessar Developer Center
3. Criar aplicação
4. Obter Client ID e Client Secret
5. Usar endpoint de autenticação para obter token

---

## Outras APIs Pesquisadas

### Wholesale2B
- URL: https://www.wholesale2b.com/dropship-api-plan.html
- Tipo: Pago
- Automação de pedidos

### AutoDS
- URL: https://www.autods.com/api/
- Integração com múltiplas plataformas
- Automação completa

### EPROLO
- URL: https://eprolo.com/
- Gratuito para começar
- Foco em branding

### DSers
- URL: https://www.dsers.com/
- Integração AliExpress
- Gratuito para começar

---

## Recomendação para Vértice Hub

Para um site de streetwear/moda urbana no Brasil, recomendo:

1. **CJ Dropshipping** - Melhor opção por:
   - API bem documentada
   - Produtos de moda disponíveis
   - Envio para Brasil
   - Preços competitivos

2. **Implementação sugerida**:
   - Criar serviço no backend para integrar com CJ API
   - Sincronizar produtos periodicamente
   - Mapear categorias CJ para categorias do site
   - Implementar sistema de pedidos que cria ordens na CJ


---

## Detalhes de Autenticação CJ Dropshipping

### Obter Access Token

**Endpoint:**
```
POST https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken
```

**Request:**
```json
{
  "apiKey": "CJUserNum@api@xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "code": 200,
  "result": true,
  "message": "Success",
  "data": {
    "openId": 123456789,
    "accessToken": "f59ac98193d64d62a9e887abea830369",
    "accessTokenExpiryDate": "2021-08-18T09:16:33+08:00",
    "refreshToken": "f7edabe65c3b4a198b50ca8f969e36eb",
    "refreshTokenExpiryDate": "2022-02-07T09:16:33+08:00"
  }
}
```

### Importante:
- Access Token válido por **15 dias**
- Refresh Token válido por **180 dias**
- Pode ser chamado apenas **1x a cada 5 minutos**
- API Key obtida em: https://cjdropshipping.com/ > Developer Center > Generate API Key

### Refresh Token

**Endpoint:**
```
POST https://developers.cjdropshipping.com/api2.0/v1/authentication/refreshAccessToken
```

**Request:**
```json
{
  "refreshToken": "3d3b01404da04be8b6795d7e9823cee5"
}
```
