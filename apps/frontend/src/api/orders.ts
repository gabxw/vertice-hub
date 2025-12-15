import api from '@/lib/api';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  trackingCode?: string;
  shippingAddress: {
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      slug: string;
      images: Array<{ url: string }>;
    };
    variant: {
      size: string;
      colorName: string;
    };
  }>;
  statusHistory: Array<{
    id: string;
    status: OrderStatus;
    notes?: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  shippingAddressId: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  couponCode?: string;
}

export const ordersApi = {
  // Listar pedidos do usuário
  list: async (page = 1, limit = 10) => {
    const { data } = await api.get('/users/me/orders', {
      params: { page, limit },
    });
    return data;
  },

  // Buscar detalhes de um pedido
  getById: async (orderId: string): Promise<Order> => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  },

  // Criar novo pedido
  create: async (orderData: CreateOrderData) => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  // Cancelar pedido
  cancel: async (orderId: string) => {
    const { data } = await api.post(`/orders/${orderId}/cancel`);
    return data;
  },

  // Rastreamento do pedido
  getTracking: async (orderId: string) => {
    const { data } = await api.get(`/orders/${orderId}/tracking`);
    return data;
  },
};
