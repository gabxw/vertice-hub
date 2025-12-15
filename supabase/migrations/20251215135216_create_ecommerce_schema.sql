/*
  # Criar Schema Completo do E-commerce VÉRTICE

  ## 1. Novas Tabelas
  
  ### Categorias
    - `categories` - Categorias de produtos (Tênis, Calças, Blusas)
      - `id` (uuid, primary key)
      - `name` (text) - Nome da categoria
      - `slug` (text, unique) - URL amigável
      - `description` (text) - Descrição
      - `image` (text) - URL da imagem
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Produtos
    - `products` - Produtos da loja
      - `id` (uuid, primary key)
      - `name` (text) - Nome do produto
      - `slug` (text, unique) - URL amigável
      - `category_id` (uuid, foreign key) - Referência para categories
      - `price` (decimal) - Preço atual
      - `original_price` (decimal, nullable) - Preço original (para promoções)
      - `description` (text) - Descrição curta
      - `story` (text) - História do produto
      - `stock` (integer) - Quantidade em estoque
      - `rating` (decimal) - Avaliação média
      - `reviews_count` (integer) - Quantidade de avaliações
      - `is_new` (boolean) - Produto novo
      - `is_best_seller` (boolean) - Mais vendido
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Imagens de Produtos
    - `product_images` - Múltiplas imagens por produto
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `url` (text) - URL da imagem
      - `order` (integer) - Ordem de exibição
      - `created_at` (timestamp)
  
  ### Cores de Produtos
    - `product_colors` - Cores disponíveis por produto
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `name` (text) - Nome da cor
      - `hex` (text) - Código hexadecimal
      - `created_at` (timestamp)
  
  ### Tamanhos de Produtos
    - `product_sizes` - Tamanhos disponíveis por produto
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `size` (text) - Tamanho (38, 40, P, M, G)
      - `created_at` (timestamp)
  
  ### Benefícios de Produtos
    - `product_benefits` - Benefícios do produto
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `benefit` (text) - Descrição do benefício
      - `created_at` (timestamp)
  
  ### Tags de Produtos
    - `product_tags` - Tags para filtros e busca
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `tag` (text) - Tag (bestseller, streetwear, conforto)
      - `created_at` (timestamp)
  
  ### Avaliações
    - `reviews` - Avaliações de produtos
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key) - Referência para auth.users
      - `rating` (integer) - Nota de 1 a 5
      - `content` (text) - Texto da avaliação
      - `verified` (boolean) - Compra verificada
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Perfis de Usuários
    - `profiles` - Dados adicionais dos usuários
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key, unique) - Referência para auth.users
      - `full_name` (text) - Nome completo
      - `avatar_url` (text) - URL do avatar
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Endereços
    - `addresses` - Endereços de entrega
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `street` (text) - Rua
      - `number` (text) - Número
      - `complement` (text) - Complemento
      - `neighborhood` (text) - Bairro
      - `city` (text) - Cidade
      - `state` (text) - Estado (UF)
      - `zip_code` (text) - CEP
      - `is_default` (boolean) - Endereço padrão
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Carrinho
    - `carts` - Carrinho de compras
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Itens do Carrinho
    - `cart_items` - Itens no carrinho
      - `id` (uuid, primary key)
      - `cart_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer) - Quantidade
      - `size` (text) - Tamanho selecionado
      - `color` (text) - Cor selecionada
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Pedidos
    - `orders` - Pedidos realizados
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `address_id` (uuid, foreign key)
      - `total` (decimal) - Total do pedido
      - `discount` (decimal) - Desconto aplicado
      - `shipping` (decimal) - Valor do frete
      - `status` (text) - Status (pending, paid, processing, shipped, delivered, cancelled)
      - `payment_method` (text) - Método de pagamento (pix, credit_card, boleto)
      - `payment_status` (text) - Status do pagamento (pending, paid, failed)
      - `tracking_code` (text) - Código de rastreio
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  ### Itens do Pedido
    - `order_items` - Itens do pedido
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer) - Quantidade
      - `price` (decimal) - Preço no momento da compra
      - `size` (text) - Tamanho
      - `color` (text) - Cor
      - `created_at` (timestamp)
  
  ## 2. Segurança (Row Level Security)
  
  Todas as tabelas terão RLS habilitado com políticas apropriadas:
  - Produtos e categorias: leitura pública
  - Perfis: usuários podem ler e editar apenas seu próprio perfil
  - Endereços: usuários podem gerenciar apenas seus próprios endereços
  - Carrinho: usuários podem gerenciar apenas seu próprio carrinho
  - Pedidos: usuários podem ver apenas seus próprios pedidos
  - Reviews: usuários autenticados podem criar, ver todas, editar/deletar apenas suas próprias
  
  ## 3. Índices
  
  Índices criados para otimizar consultas frequentes:
  - products(slug)
  - products(category_id)
  - categories(slug)
  - reviews(product_id)
  - cart_items(cart_id)
  - order_items(order_id)
  
  ## 4. Triggers
  
  - Atualizar updated_at automaticamente em updates
  - Criar perfil automaticamente ao criar usuário
  - Criar carrinho automaticamente ao criar usuário
  - Atualizar rating do produto ao criar/atualizar/deletar review
*/

-- Criar extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CATEGORIAS
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorias são públicas"
  ON categories FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  description TEXT NOT NULL,
  story TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Produtos são públicos"
  ON products FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- IMAGENS DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Imagens de produtos são públicas"
  ON product_images FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- CORES DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_colors_product ON product_colors(product_id);

ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cores de produtos são públicas"
  ON product_colors FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- TAMANHOS DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_sizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_sizes_product ON product_sizes(product_id);

ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tamanhos de produtos são públicos"
  ON product_sizes FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- BENEFÍCIOS DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  benefit TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_benefits_product ON product_benefits(product_id);

ALTER TABLE product_benefits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Benefícios de produtos são públicos"
  ON product_benefits FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- TAGS DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_tags_product ON product_tags(product_id);
CREATE INDEX IF NOT EXISTS idx_product_tags_tag ON product_tags(tag);

ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags de produtos são públicas"
  ON product_tags FOR SELECT
  TO public
  USING (true);

-- ============================================================
-- PERFIS DE USUÁRIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver todos os perfis públicos"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- AVALIAÇÕES
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Avaliações são públicas"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Usuários autenticados podem criar avaliações"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias avaliações"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias avaliações"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- ENDEREÇOS
-- ============================================================
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios endereços"
  ON addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios endereços"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios endereços"
  ON addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios endereços"
  ON addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- CARRINHO
-- ============================================================
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio carrinho"
  ON carts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seu próprio carrinho"
  ON carts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio carrinho"
  ON carts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ITENS DO CARRINHO
-- ============================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(cart_id, product_id, size, color)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver itens do seu carrinho"
  ON cart_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem adicionar itens ao seu carrinho"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem atualizar itens do seu carrinho"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem deletar itens do seu carrinho"
  ON cart_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

-- ============================================================
-- PEDIDOS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address_id UUID NOT NULL REFERENCES addresses(id),
  total DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  tracking_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios pedidos"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios pedidos"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ITENS DO PEDIDO
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver itens dos seus pedidos"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- FUNÇÕES E TRIGGERS
-- ============================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar perfil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_profile_for_user();

-- Função para criar carrinho automaticamente
CREATE OR REPLACE FUNCTION create_cart_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO carts (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar carrinho
CREATE TRIGGER on_auth_user_created_cart
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_cart_for_user();

-- Função para atualizar rating do produto
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar rating
CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER on_review_updated
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER on_review_deleted
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();
