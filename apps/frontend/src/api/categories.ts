import api from '@/lib/api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  children?: Category[];
}

export const categoriesApi = {
  // Listar todas as categorias
  list: async (): Promise<Category[]> => {
    const { data } = await api.get('/categories');
    return data;
  },

  // Buscar categoria por slug
  getBySlug: async (slug: string): Promise<Category> => {
    const { data } = await api.get(`/categories/${slug}`);
    return data;
  },

  // Produtos de uma categoria
  getProducts: async (categoryId: string, page = 1, limit = 12) => {
    const { data } = await api.get(`/categories/${categoryId}/products`, {
      params: { page, limit },
    });
    return data;
  },
};
