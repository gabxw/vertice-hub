import api from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  images: Array<{
    id: string;
    url: string;
    alt?: string;
    order: number;
  }>;
  variants: Array<{
    id: string;
    size: string;
    colorName: string;
    colorHex: string;
    sku: string;
    stock: number;
  }>;
  benefits: Array<{
    id: string;
    text: string;
    order: number;
  }>;
  tags: Array<{
    id: string;
    name: string;
  }>;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ProductsFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const productsApi = {
  // Listar produtos com filtros
  list: async (filters?: ProductsFilters): Promise<{ products: Product[]; data?: Product[] }> => {
    const { data } = await api.get('/products', { params: filters });
    // A API retorna { success: true, data: [...] }
    const products = data.data || data.products || data;
    return { products, data: products };
  },

  // Buscar produto por slug
  getBySlug: async (slug: string): Promise<Product> => {
    const { data } = await api.get(`/products/${slug}`);
    // A API retorna { success: true, data: {...} }
    return data.data || data;
  },

  // Produtos em destaque
  getFeatured: async (): Promise<Product[]> => {
    const { data } = await api.get('/products/featured');
    // A API retorna { success: true, data: [...] }
    return data.data || data;
  },

  // Produtos novos
  getNew: async (): Promise<Product[]> => {
    const { data } = await api.get('/products/new');
    // A API retorna { success: true, data: [...] }
    return data.data || data;
  },

  // Reviews de um produto
  getReviews: async (productId: string, page = 1) => {
    const { data } = await api.get(`/products/${productId}/reviews`, {
      params: { page, limit: 10 },
    });
    return data.data || data;
  },

  // Criar review (usuário autenticado)
  createReview: async (productId: string, review: { rating: number; content: string }) => {
    const { data } = await api.post(`/products/${productId}/reviews`, review);
    return data.data || data;
  },
};
