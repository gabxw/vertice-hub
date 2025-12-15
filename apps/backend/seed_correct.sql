-- Seed data for VÉRTICE E-commerce

-- Insert Categories
INSERT INTO categories (id, name, slug, description, "isActive", "createdAt", "updatedAt") VALUES
('cat-1', 'Tênis', 'tenis', 'Tênis urbanos modernos', true, NOW(), NOW()),
('cat-2', 'Calças', 'calcas', 'Calças estilosas', true, NOW(), NOW()),
('cat-3', 'Blusas', 'blusas', 'Blusas confortáveis', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Products
INSERT INTO products (id, name, slug, description, story, price, "originalPrice", "categoryId", rating, "reviewCount", "isNew", "isBestSeller", "isActive", "createdAt", "updatedAt") VALUES
('prod-1', 'Tênis Urban Pro', 'tenis-urban-pro', 'Tênis urbano de alta performance', 'Design exclusivo para quem busca estilo e conforto', 299.90, 399.90, 'cat-1', 4.8, 127, true, true, true, NOW(), NOW()),
('prod-2', 'Calça Cargo Street', 'calca-cargo-street', 'Calça cargo moderna', 'Perfeita para o dia a dia urbano', 189.90, 249.90, 'cat-2', 4.6, 89, true, false, true, NOW(), NOW()),
('prod-3', 'Blusa Oversized Essential', 'blusa-oversized-essential', 'Blusa oversized confortável', 'Essencial para qualquer guarda-roupa', 129.90, 169.90, 'cat-3', 4.7, 156, false, true, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Product Images
INSERT INTO "product_images" (id, "productId", url, alt, "order", "createdAt") VALUES
('img-1', 'prod-1', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'Tênis Urban Pro', 1, NOW()),
('img-2', 'prod-2', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80', 'Calça Cargo Street', 1, NOW()),
('img-3', 'prod-3', 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990', 'Blusa Oversized Essential', 1, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Product Variants
INSERT INTO "product_variants" (id, "productId", size, "colorName", "colorHex", sku, stock, "createdAt", "updatedAt") VALUES
('var-1', 'prod-1', '40', 'Preto', '#000000', 'TEN-URB-40-BLK', 50, NOW(), NOW()),
('var-2', 'prod-1', '41', 'Preto', '#000000', 'TEN-URB-41-BLK', 45, NOW(), NOW()),
('var-3', 'prod-1', '42', 'Preto', '#000000', 'TEN-URB-42-BLK', 40, NOW(), NOW()),
('var-4', 'prod-1', '40', 'Branco', '#FFFFFF', 'TEN-URB-40-WHT', 30, NOW(), NOW()),
('var-5', 'prod-1', '41', 'Branco', '#FFFFFF', 'TEN-URB-41-WHT', 35, NOW(), NOW()),
('var-6', 'prod-2', 'P', 'Verde Militar', '#4A5D23', 'CAL-CAR-P-GRN', 25, NOW(), NOW()),
('var-7', 'prod-2', 'M', 'Verde Militar', '#4A5D23', 'CAL-CAR-M-GRN', 30, NOW(), NOW()),
('var-8', 'prod-2', 'G', 'Verde Militar', '#4A5D23', 'CAL-CAR-G-GRN', 28, NOW(), NOW()),
('var-9', 'prod-2', 'P', 'Preto', '#000000', 'CAL-CAR-P-BLK', 20, NOW(), NOW()),
('var-10', 'prod-3', 'M', 'Cinza', '#808080', 'BLU-OVE-M-GRY', 40, NOW(), NOW()),
('var-11', 'prod-3', 'G', 'Cinza', '#808080', 'BLU-OVE-G-GRY', 35, NOW(), NOW()),
('var-12', 'prod-3', 'M', 'Preto', '#000000', 'BLU-OVE-M-BLK', 45, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Product Benefits
INSERT INTO "product_benefits" (id, "productId", text, "order", "createdAt") VALUES
('ben-1', 'prod-1', 'Solado antiderrapante de alta aderência', 1, NOW()),
('ben-2', 'prod-1', 'Material respirável e confortável', 2, NOW()),
('ben-3', 'prod-1', 'Design exclusivo VÉRTICE', 3, NOW()),
('ben-4', 'prod-2', 'Múltiplos bolsos funcionais', 1, NOW()),
('ben-5', 'prod-2', 'Tecido resistente e durável', 2, NOW()),
('ben-6', 'prod-3', 'Caimento oversized moderno', 1, NOW()),
('ben-7', 'prod-3', '100% algodão premium', 2, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Product Tags
INSERT INTO "product_tags" (id, "productId", name, "createdAt") VALUES
('tag-1', 'prod-1', 'Conforto', NOW()),
('tag-2', 'prod-1', 'Estilo', NOW()),
('tag-3', 'prod-1', 'Performance', NOW()),
('tag-4', 'prod-2', 'Casual', NOW()),
('tag-5', 'prod-2', 'Urbano', NOW()),
('tag-6', 'prod-3', 'Essencial', NOW()),
('tag-7', 'prod-3', 'Conforto', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Coupons (correct column names: type, value, validFrom, validUntil, usageCount)
INSERT INTO coupons (id, code, description, type, value, "minPurchase", "maxDiscount", "usageLimit", "usageCount", "validFrom", "validUntil", "isActive", "createdAt", "updatedAt") VALUES
('coup-1', 'BEMVINDO10', 'Desconto de 10% para novos clientes', 'PERCENTAGE', 10, 100, 50, 1000, 0, NOW(), NOW() + INTERVAL '30 days', true, NOW(), NOW()),
('coup-2', 'PRIMEIRACOMPRA', 'Desconto de 15% na primeira compra', 'PERCENTAGE', 15, 150, 75, 500, 0, NOW(), NOW() + INTERVAL '60 days', true, NOW(), NOW()),
('coup-3', 'FRETEGRATIS', 'Desconto fixo de R$ 20', 'FIXED', 20, 200, 20, 2000, 0, NOW(), NOW() + INTERVAL '90 days', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

SELECT 'Seed completed successfully! ✅' as message;
