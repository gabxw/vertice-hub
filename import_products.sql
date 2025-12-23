-- Script de Importação de Produtos
-- Gerado automaticamente
-- Execute no Supabase SQL Editor

BEGIN;


-- Criar categoria de Acessórios
INSERT INTO categories (id, name, slug, description, image, is_active, created_at, updated_at)
VALUES (
  'cat-4',
  'Acessórios',
  'acessorios',
  'Complete seu look com atitude',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;


-- Produto: Camiseta Oversized Dark Anime
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  '96c71ce8-e8a6-45bd-9836-58ff274288ad',
  'Camiseta Oversized Dark Anime',
  'camiseta-oversized-dark-anime',
  'Camiseta oversized com estampa de anime dark, perfeita para o estilo alternativo',
  'Inspirada na cultura anime dark e estética gótica japonesa. Uma peça que expressa sua personalidade única.',
  149.9,
  199.9,
  'cat-3',
  4.8,
  87,
  true,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('9bf0114d-12d1-421a-8445-693f45bf08d7', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'Camiseta Oversized Dark Anime', 0, NOW());


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('35c30ed0-f3eb-458d-ae8a-07cb5e7e410c', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Camiseta Oversized Dark Anime', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('2741c2bb-833b-4806-bca0-bc5e8ea9c51b', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'Algodão premium 100%', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b59dbeaa-fbb2-4b09-a337-324f8e009145', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'Corte oversized confortável', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('9cb30eea-6fdc-4e10-a2f6-00a102314b48', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'Estampa exclusiva de alta qualidade', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('36124d7a-b4c0-4066-8b89-4d33814f2df7', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'Ideal para looks alternativos', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('8a86731e-ee9a-42e7-91a6-e8fe0156dba8', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'alternativo', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('71a400d5-89de-4426-a2c6-b3b64f2e5122', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'anime', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('d4ac95ef-1a85-42af-8a94-ff32c050b1db', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'dark', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a78bbcbd-b626-497a-bca2-1090f86266d0', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'oversized', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('5ff2275d-5b0e-498d-a063-49c53ed4a63a', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'P', 'Preto', '#000000', 'camiseta-oversized-dark-anime-p-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('6b70ca87-a98e-406b-a609-c08c50148b94', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'P', 'Cinza Escuro', '#2c2c2c', 'camiseta-oversized-dark-anime-p-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('108e3c5e-90a1-4a7d-afdd-c148e3866fa9', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'M', 'Preto', '#000000', 'camiseta-oversized-dark-anime-m-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('d95ed22c-be85-4394-8f66-50b573bf4bfc', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'M', 'Cinza Escuro', '#2c2c2c', 'camiseta-oversized-dark-anime-m-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('a2e46472-858a-43bd-bca9-fd73d26f27c2', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'G', 'Preto', '#000000', 'camiseta-oversized-dark-anime-g-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('98e5e169-d448-4bc7-a95d-565e752fdf02', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'G', 'Cinza Escuro', '#2c2c2c', 'camiseta-oversized-dark-anime-g-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('f91917bb-0f7f-4902-bfa9-d8713468eb74', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'GG', 'Preto', '#000000', 'camiseta-oversized-dark-anime-gg-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('d6c058e8-9d6d-4c82-9f45-e815a54721e5', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'GG', 'Cinza Escuro', '#2c2c2c', 'camiseta-oversized-dark-anime-gg-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('22d1f5cd-7f01-4f01-b60e-5af028b920b7', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'XGG', 'Preto', '#000000', 'camiseta-oversized-dark-anime-xgg-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('cfc2e331-19e9-426f-b02b-828e403b0562', '96c71ce8-e8a6-45bd-9836-58ff274288ad', 'XGG', 'Cinza Escuro', '#2c2c2c', 'camiseta-oversized-dark-anime-xgg-cinza-escuro', 2, NOW(), NOW());


-- Produto: Moletom Gothic Cross Oversized
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'f7c816b8-001a-4f0d-b8dd-00bde74fe668',
  'Moletom Gothic Cross Oversized',
  'moletom-gothic-cross-oversized',
  'Moletom oversized com estampa de cruz gótica, perfeito para o inverno',
  'Design inspirado na arquitetura gótica medieval. Conforto e atitude em uma peça só.',
  269.9,
  349.9,
  'cat-3',
  4.9,
  124,
  true,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('6f4829bf-d9c1-43a8-85c0-95829b9346d6', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', 'Moletom Gothic Cross Oversized', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('0a43186c-a48d-4fca-8a09-0cf13af32f12', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'Forro interno macio e quente', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('8df359b1-587e-4285-a08d-3725ea933804', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'Estampa gótica exclusiva', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('75845023-1a20-4822-8196-e0e9f70e7f6a', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'Corte oversized moderno', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('356e2363-4c33-4fea-99e3-ec221b186c2f', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'Capuz com cordão ajustável', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('11b6d5ed-3b40-4c9c-9d51-43cb9716a902', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('5f68091d-6c72-46e0-899c-186663d74591', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'inverno', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('afdba899-cea7-4e1b-aade-ea6d3f378436', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'oversized', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('fd051575-6333-43a1-9eeb-90205264b353', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'dark', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('1b883f0a-19e1-4b1c-bac7-5f66c07d5f94', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'P', 'Preto', '#000000', 'moletom-gothic-cross-oversized-p-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('87e54f19-24f8-4f2b-a0f1-5ba13fb17d21', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'P', 'Cinza Chumbo', '#4a4a4a', 'moletom-gothic-cross-oversized-p-cinza-chumbo', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('a9f11a9f-c820-4a2a-9c7d-f1209bba3fa8', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'M', 'Preto', '#000000', 'moletom-gothic-cross-oversized-m-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('a6f79e5f-a57f-4ddb-ad57-b2594ba57e47', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'M', 'Cinza Chumbo', '#4a4a4a', 'moletom-gothic-cross-oversized-m-cinza-chumbo', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('103ee915-4fb3-4de6-8458-cfb11c40efcf', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'G', 'Preto', '#000000', 'moletom-gothic-cross-oversized-g-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('d5ba91d8-3295-4a38-a196-2a8c731a696c', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'G', 'Cinza Chumbo', '#4a4a4a', 'moletom-gothic-cross-oversized-g-cinza-chumbo', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('93d182b0-04cd-4bc4-94fc-e522b3ec939b', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'GG', 'Preto', '#000000', 'moletom-gothic-cross-oversized-gg-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('c6397dfe-23bf-463b-951d-e505153c63a7', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'GG', 'Cinza Chumbo', '#4a4a4a', 'moletom-gothic-cross-oversized-gg-cinza-chumbo', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('ed49d352-80a7-4a52-b7ef-1414ccbe8801', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'XGG', 'Preto', '#000000', 'moletom-gothic-cross-oversized-xgg-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('b6a7023b-339d-46d1-ba07-09411fb1f5a3', 'f7c816b8-001a-4f0d-b8dd-00bde74fe668', 'XGG', 'Cinza Chumbo', '#4a4a4a', 'moletom-gothic-cross-oversized-xgg-cinza-chumbo', 1, NOW(), NOW());


-- Produto: Calça Cargo Patchwork Gothic
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'a3365a66-ad7a-4ac7-ad40-b70272c23e7d',
  'Calça Cargo Patchwork Gothic',
  'calca-cargo-patchwork-gothic',
  'Calça cargo com detalhes patchwork e estética gótica urbana',
  'Fusão perfeita entre funcionalidade cargo e estética dark. Para quem não tem medo de ousar.',
  299.9,
  399.9,
  'cat-2',
  4.7,
  92,
  true,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('e9fe5e40-83dc-4d9f-b999-c83d23f762ea', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', 'Calça Cargo Patchwork Gothic', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b87dca50-a316-43ca-a711-79ebd87dea41', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'Múltiplos bolsos funcionais', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('e512323e-08fd-4012-a589-99f06e00bc0b', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'Detalhes patchwork exclusivos', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('ce3e7fd6-fd02-4eda-942d-9b85201a091c', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'Tecido resistente e confortável', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('ac958498-ee96-4453-8a95-737fc5223bb9', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'Estilo gótico urbano', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('547966e2-97d0-47d2-b6ad-f9de2c7d029f', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('b4ebd8cd-7ec3-40ff-af88-ff86a39f28f1', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'cargo', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('555355f5-fa43-468d-8ba4-0a9c7b1e4171', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'alternativo', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('3cecf9c4-19b3-488a-b8da-1bc8ff5fc4e1', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', 'patchwork', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('7928c2f5-a681-4406-92c0-e771cad6d4a7', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '36', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-36-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('ddda2c18-b453-48e0-abf6-02d8a6dbd667', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '36', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-36-preto/vermelho', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('3e3ab993-2459-423d-8322-d1be227dc2ba', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '38', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-38-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('5077ef76-528f-4926-b7f3-1ab388ec21d4', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '38', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-38-preto/vermelho', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('c62fa969-ce06-492e-9b1b-882407fc7ba7', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '40', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-40-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('bee8908d-8c09-4aae-8e5e-32ee7099434d', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '40', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-40-preto/vermelho', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('31858ff1-c683-4645-bcfa-3d4313284c13', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '42', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-42-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('b0828a31-244b-4a5a-b35d-da73dcfa8bc5', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '42', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-42-preto/vermelho', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('02fa4348-ec88-483c-86f3-fead71c964a0', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '44', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-44-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('8df492e5-c3de-4b55-ae61-3d17994f5a75', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '44', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-44-preto/vermelho', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('35be164f-1b63-41ca-bd15-f09850080776', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '46', 'Preto', '#000000', 'calca-cargo-patchwork-gothic-46-preto', 1, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('f2edd174-fed2-4efe-8224-b06522d8944f', 'a3365a66-ad7a-4ac7-ad40-b70272c23e7d', '46', 'Preto/Vermelho', '#1a0000', 'calca-cargo-patchwork-gothic-46-preto/vermelho', 1, NOW(), NOW());


-- Produto: Calça Baggy Streetwear Dark
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  '78a4a2ff-798b-4666-b53c-706f2a5e9cc6',
  'Calça Baggy Streetwear Dark',
  'calca-baggy-streetwear-dark',
  'Calça baggy com estética dark streetwear, perfeita para looks alternativos',
  'O encontro entre o streetwear e a cultura alternativa. Conforto e atitude em cada passo.',
  249.9,
  NULL,
  'cat-2',
  4.6,
  76,
  true,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('7cf7ae22-524e-4e62-b17f-493b1629cc74', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800', 'Calça Baggy Streetwear Dark', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('0aa5b564-1949-48fa-b90c-5708542df578', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'Corte baggy moderno', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('f833756b-2bf2-4ab3-8cf6-c1e6524444b6', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'Cintura ajustável com cordão', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('6918ba58-c3cc-4ad5-a307-4968a30e0fa0', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'Tecido de alta qualidade', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('cea7f0c0-5ce8-43b5-aa87-909e1eef1f50', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'Versatilidade para diversos looks', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('aa59fe4d-10cc-45a0-9a62-7ee4ec773c01', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'streetwear', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('b535673b-0b6c-4410-b347-5b7fd51bc324', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'baggy', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('65aab3b6-fcd4-480e-8c66-28d74942c96f', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'dark', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('25a845bb-ab7a-4174-8c66-d20ba5232fcf', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'alternativo', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('f1ecfe34-6c48-40e5-b8bd-57d3c49d11bc', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'P', 'Preto', '#000000', 'calca-baggy-streetwear-dark-p-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('0d8039af-5060-4bac-b5d4-6accac8838a6', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'P', 'Cinza Escuro', '#2c2c2c', 'calca-baggy-streetwear-dark-p-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('ed3b30e4-ff05-47f8-a546-f113270afbc7', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'M', 'Preto', '#000000', 'calca-baggy-streetwear-dark-m-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('c2881de4-6e7c-406a-b2ee-85914c9fadd8', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'M', 'Cinza Escuro', '#2c2c2c', 'calca-baggy-streetwear-dark-m-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('6261e67c-1766-46ef-adbc-37a7508eabf2', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'G', 'Preto', '#000000', 'calca-baggy-streetwear-dark-g-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('f0773a42-5342-488b-9112-d565b7ab91c5', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'G', 'Cinza Escuro', '#2c2c2c', 'calca-baggy-streetwear-dark-g-cinza-escuro', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('3522e454-c016-425f-aed2-9a766bacd0b0', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'GG', 'Preto', '#000000', 'calca-baggy-streetwear-dark-gg-preto', 2, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('f3d8ae6f-f2f3-4197-a077-ae59d09daccc', '78a4a2ff-798b-4666-b53c-706f2a5e9cc6', 'GG', 'Cinza Escuro', '#2c2c2c', 'calca-baggy-streetwear-dark-gg-cinza-escuro', 2, NOW(), NOW());


-- Produto: Camiseta Rock Vintage Destroyed
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'a5f43e51-933a-4b33-9f84-4850827ec050',
  'Camiseta Rock Vintage Destroyed',
  'camiseta-rock-vintage-destroyed',
  'Camiseta com estética rock vintage e efeito destroyed',
  'Inspirada nos ícones do rock dos anos 80 e 90. Cada peça tem seu próprio caráter único.',
  139.9,
  189.9,
  'cat-3',
  4.8,
  145,
  false,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('cbe2bcc0-d705-49a9-82c0-df04a96ae405', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'Camiseta Rock Vintage Destroyed', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('833a851f-2737-488a-bbd9-ada3953cdb02', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'Algodão envelhecido premium', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('1cb2ac81-83d9-455d-aa87-d8f53d3643b0', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'Efeito destroyed autêntico', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b010e51f-5954-40b2-8787-9a4941710d53', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'Estampa vintage exclusiva', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('564111bd-4440-4906-9a2f-0f26aacc1d8a', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'Conforto e estilo rock', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('5b228399-7a45-4065-8719-556314d0d83a', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'rock', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a4dc4154-5e4b-4a76-8d2f-84bceb3cae6b', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'vintage', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('7872354a-1325-498c-9e23-cd9c63152304', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'destroyed', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('58983370-f40a-4211-ae8a-dd87490814c1', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'alternativo', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('c0550661-aace-42f3-a628-47e06057cbd6', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'P', 'Preto Desbotado', '#1a1a1a', 'camiseta-rock-vintage-destroyed-p-preto-desbotado', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('bceb71f7-1fc0-4d35-805c-0b0d1f51bc6c', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'P', 'Cinza Vintage', '#6a6a6a', 'camiseta-rock-vintage-destroyed-p-cinza-vintage', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('aa2efe5a-4535-4ed4-8544-82c1e949b6ac', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'M', 'Preto Desbotado', '#1a1a1a', 'camiseta-rock-vintage-destroyed-m-preto-desbotado', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('30dedd02-a9fe-42f0-a63d-2ca9197775ab', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'M', 'Cinza Vintage', '#6a6a6a', 'camiseta-rock-vintage-destroyed-m-cinza-vintage', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('87db8672-140a-4a91-b9c1-ad7b1df82e07', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'G', 'Preto Desbotado', '#1a1a1a', 'camiseta-rock-vintage-destroyed-g-preto-desbotado', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('8d114152-544b-48db-aab9-0338e6f121fd', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'G', 'Cinza Vintage', '#6a6a6a', 'camiseta-rock-vintage-destroyed-g-cinza-vintage', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('9de39d1a-7241-4920-b5e4-fb8347c2ef5c', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'GG', 'Preto Desbotado', '#1a1a1a', 'camiseta-rock-vintage-destroyed-gg-preto-desbotado', 3, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('040864e0-4587-412e-adcb-bfa2e8620251', 'a5f43e51-933a-4b33-9f84-4850827ec050', 'GG', 'Cinza Vintage', '#6a6a6a', 'camiseta-rock-vintage-destroyed-gg-cinza-vintage', 3, NOW(), NOW());


-- Produto: Colar Corrente Espinhos Gothic
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'bef8fd3f-ec29-4722-9168-2b2acc4ef89d',
  'Colar Corrente Espinhos Gothic',
  'colar-corrente-espinhos-gothic',
  'Colar com corrente e pingente de espinhos, perfeito para o estilo gótico',
  'Inspirado na estética gótica medieval. Um acessório que completa qualquer look dark.',
  89.9,
  129.9,
  'cat-4',
  4.9,
  203,
  true,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('1c88cc92-c035-4b01-a1cd-0603aa9d4f6a', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 'Colar Corrente Espinhos Gothic', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('8028445f-17f3-44f2-be97-52168451e78c', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Aço inoxidável de alta qualidade', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('ce377270-8ad9-4bf1-882a-420ab84e027e', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Design gótico exclusivo', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('649ba413-5d20-4c3d-a9a8-0d445d051b4a', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Resistente e durável', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('cdbfc4d9-f8d9-4859-813d-c1ecd3d6d11d', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Ajustável', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('e5b94032-e327-4b91-8e73-75ccc010e2cf', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('30488061-d637-4a93-bf0e-3aeedfbdcd55', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'colar', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('caecd634-d231-47a9-9fc3-88fb7fff8944', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'acessório', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('d74879cc-9a83-4b4c-aadc-8d8def6bef16', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'corrente', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('20322e88-2925-41aa-944f-5f7a4e047277', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Único', 'Prata Envelhecida', '#8c8c8c', 'colar-corrente-espinhos-gothic-único-prata-envelhecida', 22, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('0f12ec55-1849-493c-939d-da046c74d78a', 'bef8fd3f-ec29-4722-9168-2b2acc4ef89d', 'Único', 'Preto Fosco', '#1a1a1a', 'colar-corrente-espinhos-gothic-único-preto-fosco', 22, NOW(), NOW());


-- Produto: Kit Anéis Gothic Dark (5 peças)
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'eecddb98-5d79-40f0-af82-4383657072dc',
  'Kit Anéis Gothic Dark (5 peças)',
  'kit-aneis-gothic-dark-5-pecas',
  'Kit com 5 anéis de design gótico variado, perfeito para compor seu look',
  'Uma coleção cuidadosamente selecionada de anéis góticos. Cada um com seu próprio simbolismo dark.',
  119.9,
  179.9,
  'cat-4',
  4.7,
  167,
  true,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('414daac4-a789-4767-a968-ca7b5e6abe1d', 'eecddb98-5d79-40f0-af82-4383657072dc', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800', 'Kit Anéis Gothic Dark (5 peças)', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('81a4fb19-e82e-4fd4-a0a4-f391cc43da71', 'eecddb98-5d79-40f0-af82-4383657072dc', '5 anéis de designs variados', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('e6b64db1-bcf0-4501-8b66-c7c64aaabd17', 'eecddb98-5d79-40f0-af82-4383657072dc', 'Liga metálica de qualidade', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('ad04eaff-2df7-49f3-a31f-fa9b659555a1', 'eecddb98-5d79-40f0-af82-4383657072dc', 'Tamanhos ajustáveis', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('4293c962-a3e1-457c-966a-f99370fe5348', 'eecddb98-5d79-40f0-af82-4383657072dc', 'Acabamento premium', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('4354e8af-ff63-4289-8288-1a64da1e8b86', 'eecddb98-5d79-40f0-af82-4383657072dc', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a479540e-53ce-4e33-ba31-46664d52bdf7', 'eecddb98-5d79-40f0-af82-4383657072dc', 'anéis', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('e4288ef8-1ebb-4733-829b-f9f8be5c5d18', 'eecddb98-5d79-40f0-af82-4383657072dc', 'kit', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('72c4ae42-1e21-4e85-9d0c-e917d56e7ab5', 'eecddb98-5d79-40f0-af82-4383657072dc', 'acessório', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('152da088-f34e-4b6f-9def-27ef7fd6ce9a', 'eecddb98-5d79-40f0-af82-4383657072dc', 'Ajustável', 'Preto/Prata', '#2c2c2c', 'kit-aneis-gothic-dark-5-pecas-ajustável-preto/prata', 38, NOW(), NOW());


-- Produto: Bolsa Crossbody Gothic Skull
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7',
  'Bolsa Crossbody Gothic Skull',
  'bolsa-crossbody-gothic-skull',
  'Bolsa crossbody com detalhes de caveira e estética gótica',
  'Funcionalidade encontra estilo dark. Perfeita para carregar seus essenciais com atitude.',
  189.9,
  259.9,
  'cat-4',
  4.8,
  134,
  true,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('64f2ba36-22fe-4ea4-9084-cb2c7adbead7', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', 'Bolsa Crossbody Gothic Skull', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('d1a1e680-7675-401c-9bf7-662a6de81c42', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Couro sintético de alta qualidade', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('7057283f-77c5-4311-9a97-2efda7e22dcb', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Múltiplos compartimentos', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('d93b1203-a9fe-4b62-aab2-2fce41748e46', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Alça ajustável', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('4e9f313c-eeb1-4866-ab41-bbca1c1a8afa', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Design gótico exclusivo', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a8c28825-b9b5-407a-9cf6-b7cea97a2656', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('4ca203dd-27b8-4a1a-959d-62a246a6bf68', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'bolsa', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('0943ae75-0bd0-4812-b03e-37eba402667f', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'crossbody', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a9568eec-8b77-4642-a1c6-f199d5a5fda3', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'skull', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('65a9bc6b-d4e6-48ed-8bd9-3c3118da726b', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Único', 'Preto', '#000000', 'bolsa-crossbody-gothic-skull-único-preto', 10, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('a36e3497-3829-4f09-a766-93117525c265', 'f4d4a7e8-9651-4ba5-824f-e8e3dcb7e3f7', 'Único', 'Preto/Rosa', '#1a0a0f', 'bolsa-crossbody-gothic-skull-único-preto/rosa', 10, NOW(), NOW());


-- Produto: Cinto Fivela Dupla Gothic
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'b89afc77-a686-4c29-9924-f0355670f04d',
  'Cinto Fivela Dupla Gothic',
  'cinto-fivela-dupla-gothic',
  'Cinto com fivela dupla e detalhes metálicos góticos',
  'Um acessório essencial para qualquer guarda-roupa alternativo. Funcional e estiloso.',
  79.9,
  NULL,
  'cat-4',
  4.6,
  89,
  false,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('c5933367-eb6f-4217-86ef-474ac6408a6c', 'b89afc77-a686-4c29-9924-f0355670f04d', 'https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800', 'Cinto Fivela Dupla Gothic', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('582f18f1-6973-4af7-adaf-d713de4c1878', 'b89afc77-a686-4c29-9924-f0355670f04d', 'Couro sintético resistente', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('bfb80ef5-f803-4efd-bfb7-eb3fa63a687d', 'b89afc77-a686-4c29-9924-f0355670f04d', 'Fivela dupla metálica', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('7641b374-7381-4dfd-882a-f3d140b208f4', 'b89afc77-a686-4c29-9924-f0355670f04d', 'Ajustável', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('5db5cd41-316b-4b48-bc55-a1e05238d94d', 'b89afc77-a686-4c29-9924-f0355670f04d', 'Design gótico urbano', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('30a91000-321f-4585-81ea-77253e972f02', 'b89afc77-a686-4c29-9924-f0355670f04d', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('a4e26e04-da3d-4c9b-8d83-843e5b3cb9c5', 'b89afc77-a686-4c29-9924-f0355670f04d', 'cinto', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('5ebb2db6-c1a5-4e66-b002-9a372d240830', 'b89afc77-a686-4c29-9924-f0355670f04d', 'acessório', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('e6737d7f-dffb-4eea-9241-05a731706131', 'b89afc77-a686-4c29-9924-f0355670f04d', 'metal', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('0ef2a5b0-81a0-4e54-96b9-90cda2eacdd8', 'b89afc77-a686-4c29-9924-f0355670f04d', 'P/M', 'Preto', '#000000', 'cinto-fivela-dupla-gothic-p/m-preto', 16, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('858ce311-effc-4280-ba86-5b6bc0777158', 'b89afc77-a686-4c29-9924-f0355670f04d', 'G/GG', 'Preto', '#000000', 'cinto-fivela-dupla-gothic-g/gg-preto', 16, NOW(), NOW());


-- Produto: Choker Veludo com Pingente Lua
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  'f6524402-de71-4b7e-9dd9-d5d67df01f7e',
  'Choker Veludo com Pingente Lua',
  'choker-veludo-pingente-lua',
  'Choker de veludo preto com pingente de lua crescente',
  'Elegância gótica em sua forma mais pura. Um clássico que nunca sai de moda.',
  59.9,
  89.9,
  'cat-4',
  4.9,
  278,
  false,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('07cd066d-d92d-48d6-9822-1b052bfd0afa', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800', 'Choker Veludo com Pingente Lua', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('0f3bf960-1328-412e-886c-44e423cac75b', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'Veludo macio e confortável', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('19ce3c6d-4557-40d2-88f7-a961aba3d6a7', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'Pingente de lua em metal', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('8dc7048b-400a-4f59-87d3-1604c0f44174', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'Ajustável', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b37b6572-792f-498a-a7d2-d4a39f1b1d6b', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'Design minimalista gótico', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('09b58ee1-6d8d-4fb6-8a82-2d5267805909', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('2ce80704-6aa5-41b5-8e7f-b17e819562e2', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'choker', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('7de1c78a-5d92-4032-95f3-fefc11ef30ae', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'veludo', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('e8fa6b77-e147-4295-9a12-f319fd973c29', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'lua', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('51ff06a0-2699-4692-9d8b-3fc0a74d4926', 'f6524402-de71-4b7e-9dd9-d5d67df01f7e', 'Único', 'Preto', '#000000', 'choker-veludo-pingente-lua-único-preto', 50, NOW(), NOW());


-- Produto: Mochila Techwear Dark Urban
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  '72528ae0-03f3-4ef0-bbed-133d9de6c175',
  'Mochila Techwear Dark Urban',
  'mochila-techwear-dark-urban',
  'Mochila techwear com múltiplos compartimentos e estética dark urbana',
  'Funcionalidade futurista encontra estética dark. Para quem vive na cidade e precisa de praticidade com estilo.',
  349.9,
  499.9,
  'cat-4',
  4.8,
  156,
  true,
  true,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('99069df9-592e-4a36-8499-c0f4e114bcce', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Mochila Techwear Dark Urban', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b8b70535-0fd0-4e40-8fa6-5ff33843825b', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Material impermeável', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('661d5cd6-fcf5-4af4-83d1-2c66370b8a22', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Múltiplos compartimentos', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('0f94c73a-7041-4446-a7f4-e38ea42b7f36', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Alças ergonômicas', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('fbdf5a26-5bee-4330-b394-a0c73a28eeec', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Design techwear exclusivo', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('ec8843da-62bc-4db8-9aa3-f078d092c53e', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'techwear', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('718bb58e-2c89-476a-bb49-7c588f3cf5b2', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'mochila', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('42e28064-8e66-4444-9f2a-b83d01e89e7e', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'urbano', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('b9a60edc-36a5-4034-813b-c4e49a5476a4', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'funcional', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('783a7570-7d9c-4f8a-ac00-1c984860bfb5', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Único', 'Preto Total', '#000000', 'mochila-techwear-dark-urban-único-preto-total', 6, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('5f942922-cfc6-42ba-b68a-fff090030d4b', '72528ae0-03f3-4ef0-bbed-133d9de6c175', 'Único', 'Preto/Vermelho', '#1a0000', 'mochila-techwear-dark-urban-único-preto/vermelho', 6, NOW(), NOW());


-- Produto: Óculos de Sol Retro Gothic
INSERT INTO products (
  id, name, slug, description, story, price, original_price,
  category_id, rating, review_count, is_new, is_best_seller, is_active,
  created_at, updated_at
)
VALUES (
  '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9',
  'Óculos de Sol Retro Gothic',
  'oculos-sol-retro-gothic',
  'Óculos de sol com armação retrô e lentes escuras, estilo gótico',
  'Inspirado nos ícones góticos dos anos 90. Proteção UV e muito estilo.',
  149.9,
  NULL,
  'cat-4',
  4.7,
  112,
  false,
  false,
  true,
  NOW(),
  NOW()
);


INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES ('bb501da7-af39-4148-8691-09e05410f431', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', 'Óculos de Sol Retro Gothic', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('9ab316b0-bb61-4618-9ac1-a11fcafcbf51', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Proteção UV400', 0, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('d0807664-523d-442e-8087-e3b1f0a8e259', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Armação resistente', 1, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('b2941447-3b7f-4cf0-ba12-a944bc5e8660', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Design retrô gótico', 2, NOW());


INSERT INTO product_benefits (id, product_id, text, "order", created_at)
VALUES ('a5a2c86d-fec9-470f-80f2-09849d19f976', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Lentes de alta qualidade', 3, NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('f383ca68-6ba6-497a-b4d4-176c818c2370', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'gótico', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('bf723a4a-6411-40af-b1d4-99f0fd14b6d9', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'óculos', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('39d89e3f-dd10-40fd-801a-72c5ae141a0e', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'retro', NOW());


INSERT INTO product_tags (id, product_id, name, created_at)
VALUES ('6e851206-2f5c-4ced-b36d-8cfd55f791fb', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'acessório', NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('87ad4dc4-09ef-4333-a532-d6fda19376fc', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Único', 'Preto', '#000000', 'oculos-sol-retro-gothic-único-preto', 14, NOW(), NOW());


INSERT INTO product_variants (id, product_id, size, color_name, color_hex, sku, stock, created_at, updated_at)
VALUES ('a2464aad-51b9-4297-b911-a1633c9093f6', '029e2d3f-8f9a-4603-b013-c3b3ce79ffc9', 'Único', 'Tartaruga Escuro', '#3d2817', 'oculos-sol-retro-gothic-único-tartaruga-escuro', 14, NOW(), NOW());


COMMIT;
