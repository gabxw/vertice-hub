# 🚀 Como Importar os Produtos para o Supabase

## Arquivo Gerado

✅ **import_products.sql** - 999 linhas de SQL pronto para executar

## Passo a Passo

### 1. Acessar Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Faça login com sua conta
3. Selecione o projeto: **vertice-hub** (pwtwnypkbxcuorqtkksn)

### 2. Abrir SQL Editor

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New query**

### 3. Copiar e Executar SQL

1. Abra o arquivo `import_products.sql` (está na raiz do projeto)
2. Copie TODO o conteúdo (999 linhas)
3. Cole no SQL Editor do Supabase
4. Clique em **Run** (ou pressione Ctrl+Enter)

### 4. Verificar Importação

Após executar, você deve ver:

```
Success. No rows returned
```

Isso significa que tudo foi importado com sucesso!

### 5. Confirmar Produtos

Execute esta query para verificar:

```sql
-- Ver produtos importados
SELECT 
  p.name,
  p.price,
  c.name as category,
  p.is_new,
  p.is_best_seller
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.slug LIKE '%dark%' OR p.slug LIKE '%gothic%'
ORDER BY p.created_at DESC;
```

Você deve ver os 12 produtos novos!

## O que será importado

### ✅ 1 Categoria Nova
- **Acessórios** (cat-4)

### ✅ 12 Produtos

**Roupas (5):**
1. Camiseta Oversized Dark Anime - R$ 149,90
2. Moletom Gothic Cross Oversized - R$ 269,90
3. Calça Cargo Patchwork Gothic - R$ 299,90
4. Calça Baggy Streetwear Dark - R$ 249,90
5. Camiseta Rock Vintage Destroyed - R$ 139,90

**Acessórios (7):**
1. Colar Corrente Espinhos Gothic - R$ 89,90
2. Kit Anéis Gothic Dark - R$ 119,90
3. Bolsa Crossbody Gothic Skull - R$ 189,90
4. Cinto Fivela Dupla Gothic - R$ 79,90
5. Choker Veludo com Pingente Lua - R$ 59,90
6. Mochila Techwear Dark Urban - R$ 349,90
7. Óculos de Sol Retro Gothic - R$ 149,90

### ✅ Para cada produto:
- ✅ Imagens (1-2 por produto)
- ✅ Benefícios (4-5 por produto)
- ✅ Tags (3-5 por produto)
- ✅ Variantes (tamanho × cor)
- ✅ Estoque distribuído

## Verificar no Frontend

Após importar, acesse:

1. **Home:** https://vertice-hub.vercel.app/
   - Os produtos devem aparecer automaticamente

2. **Categoria Acessórios:** https://vertice-hub.vercel.app/produtos?category=acessorios
   - Deve mostrar os 7 acessórios

3. **Busca:** https://vertice-hub.vercel.app/busca?q=gothic
   - Deve encontrar vários produtos

## Troubleshooting

### ❌ Erro: "duplicate key value violates unique constraint"

**Causa:** Produtos já foram importados anteriormente

**Solução:** Execute este SQL para limpar:

```sql
-- Remover produtos antigos (CUIDADO!)
DELETE FROM products WHERE slug LIKE '%dark%' OR slug LIKE '%gothic%';
```

Depois execute o import_products.sql novamente.

### ❌ Erro: "relation does not exist"

**Causa:** Tabelas não existem no banco

**Solução:** Execute as migrations do Prisma:

```bash
cd apps/backend
npx prisma migrate deploy
```

### ❌ Produtos não aparecem no frontend

**Causas possíveis:**

1. **Cache do navegador:** Limpe o cache (Ctrl+Shift+R)
2. **API não atualizada:** Aguarde 1-2 minutos para o deploy
3. **Produtos inativos:** Verifique se `is_active = true`

```sql
-- Ativar todos os produtos
UPDATE products SET is_active = true WHERE is_active = false;
```

### ❌ Imagens não carregam

**Causa:** URLs do Unsplash são placeholders

**Solução:** Fazer upload das imagens reais:

1. Acesse: **Storage** no Supabase
2. Crie bucket: `product-images`
3. Faça upload das imagens
4. Atualize URLs:

```sql
-- Exemplo de atualização de imagem
UPDATE product_images 
SET url = 'https://pwtwnypkbxcuorqtkksn.supabase.co/storage/v1/object/public/product-images/camiseta-dark-anime.jpg'
WHERE product_id = (SELECT id FROM products WHERE slug = 'camiseta-oversized-dark-anime')
AND "order" = 0;
```

## Estatísticas da Importação

- **Produtos:** 12
- **Imagens:** ~18
- **Benefícios:** ~50
- **Tags:** ~45
- **Variantes:** ~120
- **Total de inserts:** ~245

## Próximos Passos

Após importar:

1. ✅ Testar checkout com produtos novos
2. ✅ Adicionar mais produtos similares
3. ✅ Configurar fornecedores de dropshipping
4. ✅ Criar campanhas de marketing
5. ✅ Otimizar SEO dos produtos

## Suporte

Se tiver problemas:

1. Verifique logs do SQL Editor
2. Consulte `DROPSHIPPING_GUIDE.md`
3. Revise `INSTRUCOES_PRODUTOS.md`
4. Entre em contato com suporte do Supabase

---

**Arquivo SQL:** `import_products.sql` (999 linhas)  
**Localização:** Raiz do projeto  
**Pronto para executar!** 🚀
