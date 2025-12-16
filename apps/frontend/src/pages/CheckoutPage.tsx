import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';

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
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

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

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
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
      };

      const discountPercent = validCoupons[couponCode.toUpperCase()];
      
      if (discountPercent) {
        const discountAmount = (total * discountPercent) / 100;
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
    setError('');
    setLoading(true);

    try {
      // Validate address
      if (!address.street || !address.number || !address.neighborhood || 
          !address.city || !address.state || !address.zipCode) {
        setError('Preencha todos os campos obrigatórios do endereço');
        setLoading(false);
        return;
      }

      // Create order (will be implemented with API)
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          variantId: item.selectedSize || 'default',
          quantity: item.quantity,
          price: item.price,
        })),
        address,
        couponCode: appliedCoupon || undefined,
        total: total - discount,
      };

      console.log('Creating order:', orderData);

      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart and redirect to confirmation
      clearCart();
      navigate('/pedido-confirmado', { 
        state: { 
          orderId: 'VRT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: total - discount 
        } 
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao finalizar pedido');
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = total - discount;
  const shipping = 0; // Free shipping for now

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Complete seus dados para finalizar o pedido</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
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
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        required
                      />
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
                <Alert>
                  <AlertDescription>
                    O pagamento será processado após a confirmação do pedido.
                    Você receberá um link de pagamento por email.
                  </AlertDescription>
                </Alert>
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
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Tam: {item.selectedSize} | Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

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

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Processando...' : 'Finalizar Pedido'}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Ao finalizar, você concorda com nossos termos e condições
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
