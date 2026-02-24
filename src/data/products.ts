export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'tenis' | 'calcas' | 'blusas' | 'acessorios';
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  story: string;
  benefits: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Runner Pro',
    slug: 'urban-runner-pro',
    category: 'tenis',
    price: 289.90,
    originalPrice: 399.90,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    ],
    description: 'O tênis que vai transformar seu estilo urbano',
    story: 'Criado para quem não aceita o comum. O Urban Runner Pro nasceu das ruas, para as ruas. Cada passo é uma declaração de estilo.',
    benefits: ['Conforto extremo durante todo o dia', 'Design exclusivo streetwear', 'Tecnologia de amortecimento premium', 'Combina com qualquer visual'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Vermelho', hex: '#e53935' },
    ],
    stock: 12,
    rating: 4.8,
    reviews: 234,
    tags: ['bestseller', 'streetwear', 'conforto'],
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Street Force X',
    slug: 'street-force-x',
    category: 'tenis',
    price: 349.90,
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    ],
    description: 'Força e estilo em cada movimento',
    story: 'Inspirado nos movimentos das grandes metrópoles. O Street Force X é para quem faz a cidade parar.',
    benefits: ['Durabilidade incomparável', 'Sola antiderrapante', 'Estilo único e marcante', 'Versatilidade total'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      { name: 'Cinza', hex: '#757575' },
      { name: 'Preto', hex: '#1a1a1a' },
    ],
    stock: 8,
    rating: 4.9,
    reviews: 189,
    tags: ['novo', 'premium'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Calça Cargo Essentials',
    slug: 'calca-cargo-essentials',
    category: 'calcas',
    price: 189.90,
    originalPrice: 249.90,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    ],
    description: 'Praticidade e estilo em uma peça só',
    story: 'A Cargo Essentials foi desenhada para quem vive intensamente. Bolsos funcionais, caimento perfeito, atitude de sobra.',
    benefits: ['Bolsos práticos e funcionais', 'Tecido resistente e confortável', 'Caimento moderno', 'Fácil de combinar'],
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Caqui', hex: '#c4a35a' },
      { name: 'Verde Militar', hex: '#4a5d23' },
    ],
    stock: 23,
    rating: 4.7,
    reviews: 156,
    tags: ['bestseller', 'casual'],
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Jogger Premium Flex',
    slug: 'jogger-premium-flex',
    category: 'calcas',
    price: 159.90,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    ],
    description: 'Liberdade de movimento com muito estilo',
    story: 'Perfeita para quem não para. A Jogger Premium Flex acompanha seu ritmo, seja na academia ou no rolê.',
    benefits: ['Tecido com elastano', 'Punhos ajustáveis', 'Cintura confortável', 'Look moderno'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza Mescla', hex: '#9e9e9e' },
    ],
    stock: 5,
    rating: 4.6,
    reviews: 98,
    tags: ['conforto', 'esporte'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Oversized Statement Tee',
    slug: 'oversized-statement-tee',
    category: 'blusas',
    price: 129.90,
    originalPrice: 179.90,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    description: 'Faça sua declaração de estilo',
    story: 'Uma camiseta não é só uma camiseta. É uma extensão de quem você é. A Statement Tee é para quem quer ser visto.',
    benefits: ['Algodão premium 100%', 'Corte oversized moderno', 'Estampa exclusiva', 'Durável e confortável'],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Off-White', hex: '#f5f5dc' },
    ],
    stock: 34,
    rating: 4.9,
    reviews: 312,
    tags: ['bestseller', 'streetwear'],
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Moletom Urban Core',
    slug: 'moletom-urban-core',
    category: 'blusas',
    price: 219.90,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    ],
    description: 'Aconchego e atitude para dias frios',
    story: 'O Urban Core foi criado para as noites mais frias da cidade. Capuz ajustável, bolso canguru e muito estilo.',
    benefits: ['Forro interno macio', 'Capuz com cordão ajustável', 'Bolso canguru funcional', 'Ideal para qualquer ocasião'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza Escuro', hex: '#424242' },
      { name: 'Bordô', hex: '#800020' },
    ],
    stock: 15,
    rating: 4.8,
    reviews: 178,
    tags: ['inverno', 'premium'],
    isNew: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Lucas M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    date: '2024-01-15',
    content: 'Melhor tênis que já comprei! O conforto é surreal e o design é único. Recebo elogios toda vez que uso.',
    verified: true,
  },
  {
    id: '2',
    productId: '1',
    author: 'Amanda R.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    date: '2024-01-10',
    content: 'Entrega super rápida e o produto veio exatamente como nas fotos. Amei demais!',
    verified: true,
  },
  {
    id: '3',
    productId: '1',
    author: 'Pedro S.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    rating: 4,
    date: '2024-01-08',
    content: 'Ótimo custo-benefício. O acabamento é impecável.',
    verified: true,
  },
];

export const categories = [
  {
    id: 'tenis',
    name: 'Tênis',
    slug: 'tenis',
    description: 'Estilo e conforto para seus pés',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
    productCount: 24,
  },
  {
    id: 'calcas',
    name: 'Calças',
    slug: 'calcas',
    description: 'Caimento perfeito, estilo único',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    productCount: 18,
  },
  {
    id: 'blusas',
    name: 'Blusas',
    slug: 'blusas',
    description: 'Express yourself',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
    productCount: 32,
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Complete seu look com atitude',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600',
    productCount: 15,
  },
];
