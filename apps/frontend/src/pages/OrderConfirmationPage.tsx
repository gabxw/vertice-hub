import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package, Mail, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background/20 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <h1 className="font-display text-4xl">Pedido Confirmado!</h1>
          <p className="mt-2 text-muted-foreground">Seu pedido foi recebido e esta sendo processado.</p>
        </div>

        <Card className="panel-surface mb-6 border-border/70">
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Numero do Pedido</p>
                <p className="text-lg font-semibold">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-lg font-semibold">R$ {total?.toFixed(2)}</p>
              </div>
            </div>

            <div className="rounded-lg border border-electric/40 bg-electric/10 p-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-electric" />
                <div>
                  <p className="font-medium text-electric">Confirmacao enviada por email</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enviamos os detalhes do seu pedido para o email cadastrado. Voce recebera atualizacoes do status da entrega.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="panel-surface mb-6 border-border/70">
          <CardHeader>
            <CardTitle>Proximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-sm font-semibold text-accent">1</span>
                </div>
                <div>
                  <p className="font-medium">Processamento do Pagamento</p>
                  <p className="text-sm text-muted-foreground">Voce recebera um link de pagamento por email em alguns minutos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-sm font-semibold text-accent">2</span>
                </div>
                <div>
                  <p className="font-medium">Confirmacao do Pagamento</p>
                  <p className="text-sm text-muted-foreground">Apos a confirmacao, seu pedido sera preparado para envio.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-sm font-semibold text-accent">3</span>
                </div>
                <div>
                  <p className="font-medium">Envio e Rastreamento</p>
                  <p className="text-sm text-muted-foreground">Voce recebera o codigo de rastreamento assim que o pedido for despachado.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild className="flex-1" size="lg">
            <Link to="/minha-conta/pedidos" className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              Ver Meus Pedidos
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1" size="lg">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="h-5 w-5" />
              Voltar para Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Precisa de ajuda?{' '}
          <Link to="/sobre" className="font-medium text-accent hover:underline">
            Entre em contato
          </Link>
        </div>
      </div>
    </div>
  );
}
