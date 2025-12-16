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
    // Redirect if no order data
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600">
            Seu pedido foi recebido e está sendo processado
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Número do Pedido</p>
                <p className="font-semibold text-lg">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="font-semibold text-lg">R$ {total?.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">
                    Confirmação enviada por email
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Enviamos todos os detalhes do seu pedido para o email cadastrado.
                    Você receberá atualizações sobre o status da entrega.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Processamento do Pagamento</p>
                  <p className="text-sm text-gray-600">
                    Você receberá um link de pagamento por email em alguns minutos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Confirmação do Pagamento</p>
                  <p className="text-sm text-gray-600">
                    Após a confirmação, seu pedido será preparado para envio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Envio e Rastreamento</p>
                  <p className="text-sm text-gray-600">
                    Você receberá o código de rastreamento assim que o pedido for despachado.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Precisa de ajuda?{' '}
            <Link to="/contato" className="text-primary hover:underline font-medium">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
