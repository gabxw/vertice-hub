# 🔧 Guia: Remover PayPal e Adicionar PIX, Boleto e Cartão

## 📋 Resumo

Você está certo! PayPal não é popular no Brasil. Vou te mostrar exatamente o que mudar para ter **PIX, Boleto e Cartão** funcionando.

---

## ✅ O Que Já Foi Feito

1. ✅ Removido pacote `@paypal/react-paypal-js` do package.json
2. ✅ Removidos arquivos do backend:
   - `paypal.controller.ts`
   - `paypal.service.ts`
   - `paypal.config.ts`
   - `paypal.routes.ts`
3. ✅ Removido `paypal.ts` do frontend
4. ✅ Removidas rotas do PayPal do backend

---

## 🛠️ O Que Você Precisa Fazer

### 1. Substituir CheckoutPage.tsx

O arquivo está em: `apps/frontend/src/pages/CheckoutPage.tsx`

**Problema:** O arquivo atual tem código do PayPal misturado.

**Solução:** Substitua o arquivo inteiro pelo código abaixo.

---

## 📝 Código Completo do Novo CheckoutPage.tsx

Copie e cole este código completo em `apps/frontend/src/pages/CheckoutPage.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  ArrowLeft,
  QrCode,
  Barcode
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

type PaymentMethod = 'pix' | 'boleto' | 'credit_card' | null;

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
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

  const handleFinalizePurchase = async () => {
    if (!selectedPaymentMethod) {
      setError('Por favor, selecione um método de pagamento');
      return;
    }

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
        paymentMethod: selectedPaymentMethod,
      };

      const response = await createOrder(orderData);
      
      clearCart();
      navigate('/pagamento/sucesso', { state: { orderId: response.id, paymentMethod: selectedPaymentMethod } });
    } catch (err: any) {
      setError(err.message || 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = totalPrice - discount;

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

  const paymentMethods = [
    {
      id: 'pix' as PaymentMethod,
      name: 'PIX',
      icon: QrCode,
      description: 'Aprovação instantânea',
      discount: '5% de desconto',
      color: 'bg-teal-500',
    },
    {
      id: 'boleto' as PaymentMethod,
      name: 'Boleto',
      icon: Barcode,
      description: 'Vence em 3 dias',
      discount: '3% de desconto',
      color: 'bg-orange-500',
    },
    {
      id: 'credit_card' as PaymentMethod,
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Parcelamento em até 12x',
      discount: 'Sem juros em 3x',
      color: 'bg-blue-500',
    },
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
            {/* Trust Badges */}
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

            {/* Address Form - Step 1 */}
            {currentStep === 1 && (
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg">Endereço de Entrega</h3>
                      <p className="text-sm text-muted-foreground">Onde você quer receber seu pedido?</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="zipCode">CEP *</Label>
                    <div className="relative">
                      <Input
                        id="zipCode"
                        value={address.zipCode}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="00000-000"
                        maxLength={9}
                      />
                      {loadingCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => handleAddressChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        placeholder="Nome da rua"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={address.number}
                        onChange={(e) => handleAddressChange('number', e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={address.complement}
                        onChange={(e) => handleAddressChange('complement', e.target.value)}
                        placeholder="Apto, bloco, etc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={address.neighborhood}
                        onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                        placeholder="Seu bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>

                  {error && currentStep === 1 && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleContinueToPayment}
                    className="w-full h-12"
                    size="lg"
                  >
                    Continuar para Pagamento
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Payment - Step 2 */}
            {currentStep === 2 && (
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg">Método de Pagamento</h3>
                      <p className="text-sm text-muted-foreground">Escolha como deseja pagar</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
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

                  {/* Security Info */}
                  <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-sm">
                    <Shield className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-medium text-success">Pagamento 100% Seguro</p>
                      <p className="text-sm text-muted-foreground">Transação protegida com criptografia SSL</p>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                          selectedPaymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center`}>
                            <method.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-lg">{method.name}</h4>
                              <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                                {method.discount}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPaymentMethod === method.id
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {error && currentStep === 2 && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                    <Button
                      onClick={handleFinalizePurchase}
                      disabled={!selectedPaymentMethod || loading}
                      className="flex-1 bg-success hover:bg-success/90"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="h-5 w-5" />
                          Finalizar - R$ {finalTotal.toFixed(2)}
                        </span>
                      )}
                    </Button>
                  </div>
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
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    <h2 className="font-display text-lg">SEU PEDIDO</h2>
                    <span className="ml-auto text-sm text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-4 max-h-[280px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                        <div className="relative">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-sm border"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
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

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Cupom de desconto"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={loading || !!appliedCoupon}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={loading || !!appliedCoupon || !couponCode.trim()}
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
```

---

## ✅ Depois de Substituir

1. **Salve o arquivo**
2. **Faça commit:**
   ```bash
   git add apps/frontend/src/pages/CheckoutPage.tsx
   git commit -m "feat: substituir PayPal por PIX, Boleto e Cartão"
   git push origin main
   ```

3. **Aguarde o deploy do Vercel** (1-2 minutos)

4. **Teste:**
   - Adicione produto ao carrinho
   - Vá para checkout
   - Veja as 3 opções: PIX, Boleto, Cartão

---

## 🎨 O Que Mudou

### ❌ Removido
- PayPal (botão, SDK, imports)
- Estado `showPayPal`
- Função `handleSubmit` antiga
- Imports do `@paypal/react-paypal-js`

### ✅ Adicionado
- **PIX** (ícone QrCode, verde)
- **Boleto** (ícone Barcode, laranja)
- **Cartão** (ícone CreditCard, azul)
- Estado `selectedPaymentMethod`
- Função `handleFinalizePurchase`
- Visual moderno com badges de desconto
- Seleção visual clara

---

## 🚀 Próximos Passos (Opcional)

Se quiser integrar pagamento de verdade:

1. **Mercado Pago:** Melhor para Brasil
   - PIX instantâneo
   - Boleto
   - Cartão com parcelamento

2. **PagSeguro:** Alternativa
   - Mesmas funcionalidades
   - Mais taxas

3. **Stripe:** Internacional
   - Só cartão
   - Não tem PIX/Boleto

**Recomendação:** Mercado Pago (mais usado no Brasil)

---

## 📝 Notas

- O código atual **simula** o pagamento
- Redireciona para página de sucesso
- Em produção, você precisa integrar com gateway real
- Mas a UX está pronta e profissional!

---

**Arquivo pronto para copiar e colar!** 🎉
