import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Save,
  Store,
  CreditCard,
  Truck,
  Mail,
  Shield,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  
  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    name: 'VÉRTICE',
    description: 'Streetwear autêntico para quem faz suas próprias regras.',
    email: 'contato@vertice.com.br',
    phone: '(11) 99999-9999',
    address: 'São Paulo, SP',
    logo: '',
    favicon: '',
  });

  // Shipping settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 299,
    defaultShippingFee: 19.90,
    expressShippingFee: 39.90,
    estimatedDays: '5-10',
    enableFreeShipping: true,
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    enablePaypal: true,
    enablePix: false,
    enableCreditCard: false,
    paypalClientId: '',
    paypalMode: 'sandbox',
  });

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    enableOrderConfirmation: true,
    enableShippingNotification: true,
    enablePromotionalEmails: false,
    senderName: 'VÉRTICE',
    senderEmail: 'noreply@vertice.com.br',
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Configurações de ${section} salvas com sucesso!`);
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-1">Gerencie as configurações da loja</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="store" className="gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Loja</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="gap-2">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Frete</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamento</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Informações da Loja
                </CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua loja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input
                      id="storeName"
                      value={storeSettings.name}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email de Contato</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Descrição</Label>
                  <Textarea
                    id="storeDescription"
                    value={storeSettings.description}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Telefone</Label>
                    <Input
                      id="storePhone"
                      value={storeSettings.phone}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Endereço</Label>
                    <Input
                      id="storeAddress"
                      value={storeSettings.address}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('loja')} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Configurações de Frete
                </CardTitle>
                <CardDescription>
                  Configure as opções de entrega da sua loja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Frete Grátis</Label>
                    <p className="text-sm text-gray-500">
                      Ativar frete grátis para compras acima do valor mínimo
                    </p>
                  </div>
                  <Switch
                    checked={shippingSettings.enableFreeShipping}
                    onCheckedChange={(checked) =>
                      setShippingSettings({ ...shippingSettings, enableFreeShipping: checked })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Valor Mínimo (R$)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          freeShippingThreshold: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultShippingFee">Frete Padrão (R$)</Label>
                    <Input
                      id="defaultShippingFee"
                      type="number"
                      step="0.01"
                      value={shippingSettings.defaultShippingFee}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          defaultShippingFee: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingFee">Frete Expresso (R$)</Label>
                    <Input
                      id="expressShippingFee"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingFee}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          expressShippingFee: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDays">Prazo de Entrega Estimado</Label>
                  <Input
                    id="estimatedDays"
                    value={shippingSettings.estimatedDays}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, estimatedDays: e.target.value })
                    }
                    placeholder="Ex: 5-10 dias úteis"
                  />
                </div>
                <Button onClick={() => handleSave('frete')} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Métodos de Pagamento
                </CardTitle>
                <CardDescription>
                  Configure os métodos de pagamento aceitos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">PP</span>
                      </div>
                      <div>
                        <Label>PayPal</Label>
                        <p className="text-sm text-gray-500">
                          Aceite pagamentos via PayPal
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.enablePaypal}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, enablePaypal: checked })
                      }
                    />
                  </div>

                  {paymentSettings.enablePaypal && (
                    <div className="ml-16 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                        <Input
                          id="paypalClientId"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) =>
                            setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })
                          }
                          placeholder="Seu Client ID do PayPal"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <Label>Modo:</Label>
                        <div className="flex gap-2">
                          <Button
                            variant={paymentSettings.paypalMode === 'sandbox' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() =>
                              setPaymentSettings({ ...paymentSettings, paypalMode: 'sandbox' })
                            }
                          >
                            Sandbox
                          </Button>
                          <Button
                            variant={paymentSettings.paypalMode === 'live' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() =>
                              setPaymentSettings({ ...paymentSettings, paypalMode: 'live' })
                            }
                          >
                            Produção
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold">PIX</span>
                      </div>
                      <div>
                        <Label>PIX</Label>
                        <p className="text-sm text-gray-500">
                          Aceite pagamentos via PIX (em breve)
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.enablePix}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, enablePix: checked })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="text-purple-600" />
                      </div>
                      <div>
                        <Label>Cartão de Crédito</Label>
                        <p className="text-sm text-gray-500">
                          Aceite cartões via Stripe (em breve)
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.enableCreditCard}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, enableCreditCard: checked })
                      }
                      disabled
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('pagamento')} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configurações de Email
                </CardTitle>
                <CardDescription>
                  Configure as notificações por email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Nome do Remetente</Label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, senderName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Email do Remetente</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, senderEmail: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Confirmação de Pedido</Label>
                      <p className="text-sm text-gray-500">
                        Enviar email quando um pedido for realizado
                      </p>
                    </div>
                    <Switch
                      checked={emailSettings.enableOrderConfirmation}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, enableOrderConfirmation: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificação de Envio</Label>
                      <p className="text-sm text-gray-500">
                        Enviar email quando o pedido for enviado
                      </p>
                    </div>
                    <Switch
                      checked={emailSettings.enableShippingNotification}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, enableShippingNotification: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emails Promocionais</Label>
                      <p className="text-sm text-gray-500">
                        Enviar emails de marketing e promoções
                      </p>
                    </div>
                    <Switch
                      checked={emailSettings.enablePromotionalEmails}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, enablePromotionalEmails: checked })
                      }
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('email')} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  SEO e Meta Tags
                </CardTitle>
                <CardDescription>
                  Configure as meta tags para melhorar o SEO
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Título da Página (Meta Title)</Label>
                  <Input
                    id="metaTitle"
                    defaultValue="VÉRTICE | Moda Urbana e Streetwear"
                    placeholder="Título que aparece nos resultados de busca"
                  />
                  <p className="text-sm text-gray-500">Recomendado: 50-60 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Descrição (Meta Description)</Label>
                  <Textarea
                    id="metaDescription"
                    defaultValue="Descubra tênis, calças e blusas com estilo urbano único. Frete grátis acima de R$299. Moda streetwear para quem não aceita o comum."
                    placeholder="Descrição que aparece nos resultados de busca"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">Recomendado: 150-160 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Palavras-chave</Label>
                  <Input
                    id="metaKeywords"
                    defaultValue="tênis, calças, blusas, streetwear, moda urbana"
                    placeholder="Palavras-chave separadas por vírgula"
                  />
                </div>
                <Button onClick={() => handleSave('SEO')} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
