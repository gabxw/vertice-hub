import api from '@/lib/api';

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: Array<{ url: string }>;
  };
  variant: {
    id: string;
    size: string;
    colorName: string;
    colorHex: string;
    sku: string;
    stock: number;
  };
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export const cartApi = {
  // Buscar carrinho do usuário
  get: async (): Promise<Cart> => {
    const { data } = await api.get('/cart');
    return data;
  },

  // Adicionar item ao carrinho
  addItem: async (variantId: string, quantity: number = 1) => {
    const { data } = await api.post('/cart/items', { variantId, quantity });
    return data;
  },

  // Atualizar quantidade de um item
  updateItem: async (itemId: string, quantity: number) => {
    const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
    return data;
  },

  // Remover item do carrinho
  removeItem: async (itemId: string) => {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    return data;
  },

  // Limpar carrinho
  clear: async () => {
    const { data } = await api.delete('/cart');
    return data;
  },

  // Aplicar cupom
  applyCoupon: async (code: string) => {
    const { data } = await api.post('/cart/coupon', { code });
    return data;
  },

  // Remover cupom
  removeCoupon: async () => {
    const { data } = await api.delete('/cart/coupon');
    return data;
  },
};
