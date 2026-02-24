# Instruções para Importar Produtos Novos

## Produtos Criados

Foram criados **12 novos produtos** de estilo alternativo/gótico/gueto:

### Roupas (5 produtos)
1. Camiseta Oversized Dark Anime - R$ 149,90
2. Moletom Gothic Cross Oversized - R$ 269,90 (BESTSELLER)
3. Calça Cargo Patchwork Gothic - R$ 299,90
4. Calça Baggy Streetwear Dark - R$ 249,90
5. Camiseta Rock Vintage Destroyed - R$ 139,90 (BESTSELLER)

### Acessórios (7 produtos)
1. Colar Corrente Espinhos Gothic - R$ 89,90 (BESTSELLER)
2. Kit Anéis Gothic Dark (5 peças) - R$ 119,90
3. Bolsa Crossbody Gothic Skull - R$ 189,90 (BESTSELLER)
4. Cinto Fivela Dupla Gothic - R$ 79,90
5. Choker Veludo com Pingente Lua - R$ 59,90 (BESTSELLER)
6. Mochila Techwear Dark Urban - R$ 349,90 (BESTSELLER)
7. Óculos de Sol Retro Gothic - R$ 149,90

## Como Importar para o Banco de Dados

### Opção 1: Usar o Script Automático (Recomendado)

```bash
# 1. Navegar até o diretório do backend
cd apps/backend

# 2. Compilar o script TypeScript
npx tsx scripts/import-new-products.ts

# Ou se preferir usar ts-node:
npx ts-node scripts/import-new-products.ts
```

O script irá:
- ✅ Criar a categoria "Acessórios" se não existir
- ✅ Importar todos os 12 produtos
- ✅ Adicionar imagens, benefícios e tags
- ✅ Criar variantes (combinações de tamanho e cor)
- ✅ Distribuir estoque entre variantes

### Opção 2: Importar Manualmente via Supabase

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Vá em "Table Editor"
3. Crie a categoria "Acessórios" na tabela `categories`:
   ```sql
   INSERT INTO categories (id, name, slug, description, image, is_active)
   VALUES ('cat-4', 'Acessórios', 'acessorios', 'Complete seu look com atitude', 
           'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600', true);
   ```

4. Para cada produto em `NEW_PRODUCTS.json`, crie:
   - Registro na tabela `products`
   - Registros na tabela `product_images`
   - Registros na tabela `product_benefits`
   - Registros na tabela `product_tags`
   - Registros na tabela `product_variants`

### Opção 3: Usar API do Backend

Se o backend estiver rodando, você pode usar a API de admin para criar produtos:

```bash
POST /api/v1/admin/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Camiseta Oversized Dark Anime",
  "slug": "camiseta-oversized-dark-anime",
  "description": "Camiseta oversized com estampa de anime dark",
  "story": "Inspirada na cultura anime dark e estética gótica japonesa",
  "price": 149.90,
  "originalPrice": 199.90,
  "categoryId": "cat-3",
  "isNew": true,
  "isBestSeller": false
}
```

## Verificar Importação

Após importar, verifique se os produtos aparecem:

1. **No Frontend:**
   - Acesse: http://localhost:5173/produtos
   - Filtre por categoria "Acessórios"
   - Busque por "gothic" ou "dark"

2. **No Backend:**
   ```bash
   # Contar produtos
   npx prisma studio
   # Ou via SQL:
   SELECT COUNT(*) FROM products WHERE category_id = 'cat-4';
   ```

3. **Via API:**
   ```bash
   curl https://vertice-hub-backend.vercel.app/api/v1/products?category=acessorios
   ```

## Atualizar Imagens

As imagens atualmente usam URLs do Unsplash (placeholder). Para usar imagens reais:

1. Fazer upload das imagens em `product_images/` para um CDN ou Supabase Storage
2. Atualizar URLs na tabela `product_images`

```sql
-- Exemplo de atualização de URL de imagem
UPDATE product_images 
SET url = 'https://seu-cdn.com/produto-1.jpg'
WHERE product_id = 'id-do-produto' AND "order" = 0;
```

## Troubleshooting

### Erro: "Categoria não encontrada"
- Certifique-se de criar a categoria "Acessórios" primeiro (cat-4)

### Erro: "SKU duplicado"
- Verifique se o produto já foi importado anteriormente
- O script pula produtos que já existem

### Erro: "Prisma Client não encontrado"
- Execute: `cd apps/backend && npx prisma generate`

### Produtos não aparecem no frontend
- Verifique se `isActive = true`
- Limpe o cache do navegador
- Verifique se a categoria está mapeada corretamente

## Próximos Passos

Após importar os produtos:

1. **Testar Checkout:** Adicione produtos ao carrinho e teste o fluxo completo
2. **Adicionar Reviews:** Crie algumas avaliações para os produtos
3. **Configurar Dropshipping:** Configure fornecedores conforme `DROPSHIPPING_GUIDE.md`
4. **Marketing:** Crie campanhas para os novos produtos alternativos
5. **SEO:** Otimize descrições e tags para busca

## Suporte

Se tiver problemas na importação:
- Verifique logs do script
- Consulte `DROPSHIPPING_GUIDE.md` para informações sobre fornecedores
- Verifique schema do Prisma em `apps/backend/prisma/schema.prisma`
