import { AccountLayout } from '@/components/account/AccountLayout';
import { useOrders } from '@/hooks/useOrders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusMap = {
  PENDING: { label: 'Pendente', variant: 'secondary' as const },
  CONFIRMED: { label: 'Confirmado', variant: 'default' as const },
  PROCESSING: { label: 'Processando', variant: 'default' as const },
  SHIPPED: { label: 'Enviado', variant: 'default' as const },
  DELIVERED: { label: 'Entregue', variant: 'default' as const },
  CANCELLED: { label: 'Cancelado', variant: 'destructive' as const },
  REFUNDED: { label: 'Reembolsado', variant: 'secondary' as const },
};

export default function OrdersPage() {
  const { data, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AccountLayout>
    );
  }

  if (error) {
    return (
      <AccountLayout>
        <div className="py-12 text-center">
          <p className="text-destructive">Erro ao carregar pedidos</p>
        </div>
      </AccountLayout>
    );
  }

  const orders = data?.orders || [];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-3xl">Meus Pedidos</h2>
          <p className="text-muted-foreground">Acompanhe seus pedidos</p>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground/65" />
            <h3 className="mb-2 text-lg font-semibold">Nenhum pedido encontrado</h3>
            <p className="mb-4 text-muted-foreground">Voce ainda nao fez nenhum pedido.</p>
            <Button asChild>
              <Link to="/">Comecar a Comprar</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id} className="border-border/70 bg-card/75 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Pedido #{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <Badge variant={statusMap[order.status as keyof typeof statusMap].variant}>
                    {statusMap[order.status as keyof typeof statusMap].label}
                  </Badge>
                </div>

                <div className="mb-4 space-y-2">
                  {order.items.slice(0, 2).map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.variant.size} - {item.variant.colorName} - Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && <p className="text-sm text-muted-foreground">+ {order.items.length - 2} item(s)</p>}
                </div>

                <div className="flex items-center justify-between border-t border-border/70 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">R$ {order.total.toFixed(2)}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link to={`/minha-conta/pedido/${order.id}`}>Ver Detalhes</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
