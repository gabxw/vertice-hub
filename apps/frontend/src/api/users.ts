import api from '@/lib/api';

export interface Address {
  id: string;
  userId: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  cpf?: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const usersApi = {
  // Buscar perfil do usuário logado
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get('/users/me');
    return data;
  },

  // Atualizar perfil
  updateProfile: async (profileData: Partial<UserProfile>) => {
    const { data } = await api.put('/users/me', profileData);
    return data;
  },

  // Listar endereços
  listAddresses: async (): Promise<Address[]> => {
    const { data } = await api.get('/users/me/addresses');
    return data;
  },

  // Criar endereço
  createAddress: async (addressData: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post('/users/me/addresses', addressData);
    return data;
  },

  // Atualizar endereço
  updateAddress: async (addressId: string, addressData: Partial<Address>) => {
    const { data } = await api.put(`/users/me/addresses/${addressId}`, addressData);
    return data;
  },

  // Deletar endereço
  deleteAddress: async (addressId: string) => {
    const { data } = await api.delete(`/users/me/addresses/${addressId}`);
    return data;
  },

  // Definir endereço padrão
  setDefaultAddress: async (addressId: string) => {
    const { data } = await api.patch(`/users/me/addresses/${addressId}/default`);
    return data;
  },
};
