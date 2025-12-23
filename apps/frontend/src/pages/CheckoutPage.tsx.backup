import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createPayPalOrder, capturePayPalOrder } from '@/api/paypal';
import { createOrder } from '@/api/orders';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Clock, 
  CheckCircle, 
  Lock, 
  Zap,
  ChevronRight,
  CreditCard,
  Package,
  Star,
  Users,
  ArrowLeft
} from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(1);
  
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    setAddress((prev) => ({ ...prev, zipCode: cep }));

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

  const validateAddress = () => {
    if (!address.name || !address.street || !address.number || !address.neighborhood || !address.city || !address.state || !address.zipCode) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateAddress()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!validateAddress()) {
        setLoading(false);
        return;
      }

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
  const shipping = 0;

  const totalSavings = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0) + discount;

  const steps = [
    { id: 1, name: 'Entrega', icon: Truck },
    { id: 2, name: 'Pagamento', icon: CreditCard },
    { id: 3, name: 'Confirmação', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Urgency Banner */}
      {timeLeft > 0 && (
        <div className="bg-primary text-primary-foreground py-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
            <Clock className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">
              Carrinho reservado por <span className="font-bold tabular-nums">{formatTime(timeLeft)}</span> - Finalize agora!
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Voltar</span>
          </button>
          
          <h1 className="text-4xl font-display tracking-wide">CHECKOUT</h1>
        </div>

        {/* Steps Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mx-4 mt-[-20px] transition-all duration-300 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Badges - Compact */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Shield, label: 'Compra Segura', color: 'text-success' },
                { icon: Truck, label: 'Frete Grátis', color: 'text-primary' },
                { icon: Package, label: 'Troca Fácil', color: 'text-electric' },
                { icon: Lock, label: 'Dados Protegidos', color: 'text-success' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 bg-card border border-border rounded-sm">
                  <badge.icon className={`h-5 w-5 ${badge.color} mb-1`} />
                  <span className="text-xs font-medium text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Address Form */}
            {currentStep === 1 && (
              <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h2 className="font-display text-xl tracking-wide">ENDEREÇO DE ENTREGA</h2>
                      <p className="text-sm text-muted-foreground">Para onde devemos enviar seu pedido?</p>
                    </div>
                  </div>
                </div>
                
                <form className="p-6 space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nome completo *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => handleAddressChange('name', e.target.value)}
                      className="mt-1.5 h-12 bg-background border-border"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode" className="text-sm font-medium">CEP *</Label>
                      <div className="relative">
                        <Input
                          id="zipCode"
                          placeholder="00000-000"
                          value={address.zipCode}
                          onChange={(e) => handleCepChange(e.target.value)}
                          className="mt-1.5 h-12 bg-background border-border"
                          required
                          disabled={loadingCep}
                        />
                        {loadingCep && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.75">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium">Estado *</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        value={address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className="mt-1.5 h-12 bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">Cidade *</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="mt-1.5 h-12 bg-background border-border"
                      placeholder="Sua cidade"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood" className="text-sm font-medium">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={address.neighborhood}
                      onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                      className="mt-1.5 h-12 bg-background border-border"
                      placeholder="Seu bairro"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street" className="text-sm font-medium">Rua *</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className="mt-1.5 h-12 bg-background border-border"
                        placeholder="Nome da rua"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="number" className="text-sm font-medium">Número *</Label>
                      <Input
                        id="number"
                        value={address.number}
                        onChange={(e) => handleAddressChange('number', e.target.value)}
                        className="mt-1.5 h-12 bg-background border-border"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="complement" className="text-sm font-medium">Complemento</Label>
                    <Input
                      id="complement"
                      placeholder="Apartamento, bloco, etc."
                      value={address.complement}
                      onChange={(e) => handleAddressChange('complement', e.target.value)}
                      className="mt-1.5 h-12 bg-background border-border"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full h-14 text-base font-semibold mt-6"
                    size="lg"
                  >
                    Continuar para Pagamento
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 2 && (
              <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h2 className="font-display text-xl tracking-wide">PAGAMENTO</h2>
                      <p className="text-sm text-muted-foreground">Escolha como deseja pagar</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Address Summary */}
                  <div className="bg-muted/50 rounded-sm p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Entregar em:</span>
                      <button 
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-primary hover:underline"
                      >
                        Alterar
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {address.street}, {address.number} {address.complement && `- ${address.complement}`}<br />
                      {address.neighborhood} - {address.city}, {address.state}<br />
                      CEP: {address.zipCode}
                    </p>
                  </div>

                  {/* Payment Security Info */}
                  <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-sm">
                    <Shield className="h-6 w-6 text-success flex-shrink-0" />
                    <div>
                      <p className="font-medium text-success">Pagamento 100% Seguro</p>
                      <p className="text-sm text-muted-foreground">Transação protegida com criptografia SSL de 256 bits</p>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {!showPayPal ? (
                    <Button
                      onClick={handleSubmit}
                      className="w-full h-14 text-base font-semibold bg-success hover:bg-success/90"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="h-5 w-5" />
                          Finalizar Pedido - R$ {finalTotal.toFixed(2)}
                        </span>
                      )}
                    </Button>
                  ) : (
                    <div className="border border-border rounded-sm p-4">
                      <p className="text-sm text-center text-muted-foreground mb-4">Clique no botão abaixo para pagar com PayPal</p>
                      <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: 'BRL' }}>
                        <PayPalButtons
                          style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
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
                    </div>
                  )}

                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Voltar para endereço
                  </button>
                </div>
              </div>
            )}

            {/* Social Proof */}
            <div className="bg-card border border-border rounded-sm p-5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-hot text-hot" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">+2.847</span> clientes satisfeitos este mês
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-4 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    <h2 className="font-display text-lg tracking-wide">SEU PEDIDO</h2>
                    <span className="ml-auto text-sm text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Items List */}
                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                        <div className="relative">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-sm border border-border"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Tam: {item.size} | Cor: {item.color}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {item.product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                R$ {(item.product.originalPrice * item.quantity).toFixed(2)}
                              </span>
                            )}
                            <span className="text-sm font-semibold">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border" />

                  {/* Coupon */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Cupom de desconto"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={loading || !!appliedCoupon}
                        className="h-11 bg-background border-border text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={loading || !!appliedCoupon || !couponCode.trim()}
                        className="h-11 px-6"
                      >
                        Aplicar
                      </Button>
                    </div>
                    {appliedCoupon && (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Cupom {appliedCoupon} aplicado!</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-border" />

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-success">
                        <span>Desconto</span>
                        <span>- R$ {discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-success font-medium">GRÁTIS</span>
                    </div>
                    
                    {totalSavings > 0 && (
                      <div className="flex items-center justify-between bg-success/10 text-success px-4 py-3 rounded-sm text-sm">
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Você economiza
                        </span>
                        <span className="font-bold">R$ {totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="h-px bg-border" />
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-medium">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold">R$ {finalTotal.toFixed(2)}</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          ou 3x de R$ {(finalTotal / 3).toFixed(2)} sem juros
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Footer */}
              <div className="flex items-center justify-center gap-3 py-4">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Pagamento 100% seguro e criptografado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
