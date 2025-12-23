import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createPayPalOrder, capturePayPalOrder } from '@/api/paypal';
import { createOrder } from '@/api/orders';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, Truck, CreditCard, Shield, Clock, CheckCircle, Lock, Zap } from 'lucide-react';

interface AddressForm {
  name: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  
  // Timer de urgência
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const [address, setAddress] = useState<AddressForm>({
    name: user?.user_metadata?.name || '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Timer countdown
  useEffect(() => {
    if (items.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [items.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Carregando autenticação...</p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCepChange = async (cep: string) => {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, '');
    setAddress((prev) => ({ ...prev, zipCode: cep }));

    // Only search if CEP has 8 digits
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
          }));
        } else {
          setError('CEP não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate coupon validation (replace with API call)
      const validCoupons: Record<string, number> = {
        BEMVINDO10: 10,
        PRIMEIRACOMPRA: 15,
        FRETEGRATIS: 20,
        PRIMEIRA10: 10,
      };

      const discountPercent = validCoupons[couponCode.toUpperCase()];
      
      if (discountPercent) {
        const discountAmount = (totalPrice * discountPercent) / 100;
        setDiscount(discountAmount);
        setAppliedCoupon(couponCode.toUpperCase());
        setError('');
      } else {
        setError('Cupom inválido');
        setDiscount(0);
        setAppliedCoupon('');
      }
    } catch (err) {
      setError('Erro ao aplicar cupom');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate address
      if (!address.name || !address.street || !address.number || !address.neighborhood || !address.city || !address.state || !address.zipCode) {
        setError('Por favor, preencha todos os campos obrigatórios');
        setLoading(false);
        return;
      }

      // Create order in database
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          productSlug: item.product.slug,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: address,
        couponCode: appliedCoupon || undefined,
      };

      const response = await createOrder(orderData);
      setOrderId(response.id);
      setShowPayPal(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = totalPrice - discount;
  const shipping = 0; // Free shipping for now

  // Calcular economia total
  const totalSavings = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0) + discount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Banner */}
        {timeLeft > 0 && (
          <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 flex items-center justify-center gap-3">
            <Clock className="h-5 w-5 animate-pulse" />
            <span className="font-medium">
              Seu carrinho está reservado por <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
            </span>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Complete seus dados para finalizar o pedido</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">Compra 100% Segura</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <Truck className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Frete Grátis</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium">30 Dias p/ Troca</span>
              </div>
            </div>

            {/* Address Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        value={address.name}
                        onChange={(e) => handleAddressChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        placeholder="00000-000"
                        value={address.zipCode}
                        onChange={(e) => handleCepChange(e.target.value)}
                        required
                        disabled={loadingCep}
                      />
                      {loadingCep && (
                        <p className="text-xs text-gray-500 mt-1">Buscando CEP...</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        value={address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={address.neighborhood}
                        onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-1">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-1">
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={address.number}
                        onChange={(e) => handleAddressChange('number', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apartamento, bloco, etc."
                        value={address.complement}
                        onChange={(e) => handleAddressChange('complement', e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Lock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Pagamento Seguro via PayPal</p>
                    <p className="text-sm text-green-600">Seus dados estão protegidos com criptografia SSL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Tam: {item.size} | Cor: {item.color}
                        </p>
                        <p className="text-sm font-medium">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Coupon */}
                <div className="space-y-2">
                  <Label htmlFor="coupon">Cupom de Desconto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={loading || !!appliedCoupon}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={loading || !!appliedCoupon || !couponCode.trim()}
                    >
                      Aplicar
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-sm text-green-600">
                      ✓ Cupom {appliedCoupon} aplicado!
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  
                  {/* Economia total */}
                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                      <span className="flex items-center gap-1">
                        <Zap size={14} />
                        Você está economizando
                      </span>
                      <span className="font-bold">R$ {totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    ou 3x de R$ {(finalTotal / 3).toFixed(2)} sem juros
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!showPayPal ? (
                  <Button
                    onClick={handleSubmit}
                    className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : '🔒 Continuar para Pagamento'}
                  </Button>
                ) : (
                  <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: 'BRL' }}>
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      createOrder={async () => {
                        if (!orderId) throw new Error('Order ID not found');
                        const response = await createPayPalOrder(orderId);
                        return response.data.id;
                      }}
                      onApprove={async (data) => {
                        try {
                          await capturePayPalOrder(data.orderID);
                          clearCart();
                          navigate('/pagamento/sucesso', { state: { orderId } });
                        } catch (error) {
                          setError('Erro ao processar pagamento');
                        }
                      }}
                      onError={(err) => {
                        console.error('PayPal error:', err);
                        setError('Erro ao processar pagamento com PayPal');
                      }}
                      onCancel={() => {
                        setShowPayPal(false);
                        setError('Pagamento cancelado');
                      }}
                    />
                  </PayPalScriptProvider>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <Lock size={12} />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
