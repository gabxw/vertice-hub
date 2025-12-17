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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pagamento Confirmado!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Seu pedido foi processado com sucesso.
          </p>

          {/* Order Details */}
          {orderId && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Número do Pedido</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{orderId}</p>
            </div>
          )}

          {/* Next Steps */}
          <div className="text-left bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">Próximos Passos:</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Você receberá um email de confirmação com os detalhes do pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Seu pedido será processado e enviado em até 2 dias úteis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Você poderá acompanhar o status do pedido na sua conta</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/minha-conta/pedidos')}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Package className="w-4 h-4" />
              Ver Meus Pedidos
            </Button>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="gap-2"
            >
              Continuar Comprando
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Support */}
          <p className="text-sm text-gray-500 mt-8">
            Precisa de ajuda?{' '}
            <a href="/contato" className="text-blue-600 hover:underline">
              Entre em contato
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
