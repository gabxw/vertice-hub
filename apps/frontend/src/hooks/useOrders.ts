import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, CreateOrderData, createOrder } from '@/api/orders';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () => ordersApi.list(page, limit),
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersApi.getById(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (orderData: CreateOrderData) => createOrder(orderData),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      const orderNumber = data?.orderNumber || data?.order?.orderNumber;
      const orderId = data?.id || data?.order?.id;
      const total = data?.total || data?.order?.total;

      toast({
        title: 'Pedido criado!',
        description: orderNumber ? `Pedido ${orderNumber} criado com sucesso.` : 'Pedido criado com sucesso.',
      });

      if (orderId) {
        navigate('/pedido-confirmado', { state: { orderId, total } });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar pedido',
        description: error.response?.data?.message || 'Nao foi possivel criar o pedido.',
        variant: 'destructive',
      });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderId: string) => ordersApi.cancel(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Pedido cancelado',
        description: 'O pedido foi cancelado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao cancelar',
        description: error.response?.data?.message || 'Nao foi possivel cancelar o pedido.',
        variant: 'destructive',
      });
    },
  });
};

export const useOrderTracking = (orderId: string) => {
  return useQuery({
    queryKey: ['tracking', orderId],
    queryFn: () => ordersApi.getTracking(orderId),
    enabled: !!orderId,
    refetchInterval: 5 * 60 * 1000,
  });
};
