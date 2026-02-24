import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentCancelledPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background/20 p-4">
      <Card className="panel-surface w-full max-w-2xl border-border/70">
        <CardContent className="pb-8 pt-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-hot/20 p-6">
              <XCircle className="h-16 w-16 text-hot" />
            </div>
          </div>

          <h1 className="mb-4 font-display text-4xl">Pagamento Cancelado</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Voce cancelou o processo de pagamento. Nenhuma cobranca foi realizada.
          </p>

          <div className="mb-8 rounded-lg border border-electric/35 bg-electric/10 p-6 text-left">
            <h2 className="mb-3 font-semibold text-electric">O que aconteceu?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-electric">•</span>
                <span>Voce cancelou o pagamento no PayPal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric">•</span>
                <span>Seu pedido nao foi finalizado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric">•</span>
                <span>Os itens ainda estao no seu carrinho</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => navigate('/checkout')} variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Checkout
            </Button>
            <Button onClick={() => navigate('/')} size="lg" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Continuar Comprando
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Teve algum problema?{' '}
            <a href="/sobre" className="text-accent hover:underline">
              Fale conosco
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
