import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, CreateOrderData } from '@/api/orders';
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
    mutationFn: (orderData: CreateOrderData) => ordersApi.create(orderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      
      toast({
        title: 'Pedido criado!',
        description: `Pedido ${data.orderNumber} criado com sucesso.`,
      });

      // Redirecionar para página de pagamento ou sucesso
      navigate(`/pedido/${data.id}/pagamento`);
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar pedido',
        description: error.response?.data?.message || 'Não foi possível criar o pedido.',
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
        description: error.response?.data?.message || 'Não foi possível cancelar o pedido.',
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
    refetchInterval: 5 * 60 * 1000, // Atualizar a cada 5 minutos
  });
};
