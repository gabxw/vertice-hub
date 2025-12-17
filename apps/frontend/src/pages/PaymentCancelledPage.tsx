import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentCancelledPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-8 text-center">
          {/* Cancel Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 rounded-full p-6">
              <XCircle className="w-16 h-16 text-yellow-600" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pagamento Cancelado
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-900 mb-3">O que aconteceu?</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Você cancelou o pagamento no PayPal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Seu pedido não foi finalizado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Os itens ainda estão no seu carrinho</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/checkout')}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Checkout
            </Button>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Continuar Comprando
            </Button>
          </div>

          {/* Support */}
          <p className="text-sm text-gray-500 mt-8">
            Teve algum problema?{' '}
            <a href="/contato" className="text-blue-600 hover:underline">
              Fale conosco
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
