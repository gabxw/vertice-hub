import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background/20 p-4">
      <Card className="panel-surface w-full max-w-2xl border-border/70">
        <CardContent className="pb-8 pt-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-success/20 p-6">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          </div>

          <h1 className="mb-4 font-display text-4xl">Pagamento Confirmado!</h1>
          <p className="mb-8 text-lg text-muted-foreground">Seu pedido foi processado com sucesso.</p>

          {orderId && (
            <div className="mb-8 rounded-lg border border-border/70 bg-secondary/45 p-6">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Numero do Pedido</span>
              </div>
              <p className="text-2xl font-bold">{orderId}</p>
            </div>
          )}

          <div className="mb-8 rounded-lg border border-electric/35 bg-electric/10 p-6 text-left">
            <h2 className="mb-4 font-semibold text-electric">Proximos Passos:</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-electric">1.</span>
                <span>Voce recebera um email de confirmacao com os detalhes do pedido.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-electric">2.</span>
                <span>Seu pedido sera processado e enviado em ate 2 dias uteis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-electric">3.</span>
                <span>Voce podera acompanhar o status do pedido na sua conta.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => navigate('/minha-conta/pedidos')} variant="outline" size="lg" className="gap-2">
              <Package className="h-4 w-4" />
              Ver Meus Pedidos
            </Button>
            <Button onClick={() => navigate('/')} size="lg" className="gap-2">
              Continuar Comprando
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Precisa de ajuda?{' '}
            <a href="/sobre" className="text-accent hover:underline">
              Entre em contato
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
