import { Helmet } from 'react-helmet-async';
import { Package, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const steps = [
  {
    icon: Package,
    title: 'Solicite a troca',
    description: 'Entre em contato conosco em até 7 dias após receber seu pedido.',
  },
  {
    icon: Clock,
    title: 'Aguarde aprovação',
    description: 'Analisaremos sua solicitação em até 24 horas úteis.',
  },
  {
    icon: RefreshCw,
    title: 'Envie o produto',
    description: 'Após aprovação, você terá 7 dias para enviar o produto de volta.',
  },
  {
    icon: CheckCircle,
    title: 'Receba seu novo produto',
    description: 'Assim que recebermos, enviaremos o novo produto ou faremos o reembolso.',
  },
];

const ReturnsPage = () => {
  return (
    <>
      <Helmet>
        <title>Trocas e Devoluções | VÉRTICE</title>
        <meta name="description" content="Política de trocas e devoluções da VÉRTICE. Sua satisfação é nossa prioridade." />
      </Helmet>

      <main className="bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              TROCAS E DEVOLUÇÕES
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua satisfação é nossa prioridade. Confira nossa política de trocas e devoluções.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
              Como funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">PASSO {index + 1}</div>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
                Política Detalhada
              </h2>

              <div className="space-y-8">
                {/* Prazo */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Prazo para Troca
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar a troca ou devolução, 
                    conforme estabelecido pelo Código de Defesa do Consumidor. Para produtos com defeito de fabricação, 
                    o prazo é de até <strong>90 dias</strong> após o recebimento.
                  </p>
                </div>

                {/* Condições */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Condições do Produto
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>O produto deve estar em perfeito estado, sem sinais de uso, lavagem ou alterações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Todas as etiquetas originais devem estar intactas e fixadas ao produto.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>A embalagem original deve ser preservada sempre que possível.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Produtos íntimos (como underwear) só podem ser trocados se não tiverem sido abertos.</span>
                    </li>
                  </ul>
                </div>

                {/* Motivos */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    Motivos para Troca
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Arrependimento da compra</h4>
                      <p>Você pode devolver o produto sem necessidade de justificativa. O valor será reembolsado integralmente.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tamanho incorreto</h4>
                      <p>Caso o tamanho não sirva, faremos a troca por outro tamanho disponível sem custo adicional.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Defeito de fabricação</h4>
                      <p>Produtos com defeito serão trocados imediatamente ou reembolsados, com frete por nossa conta.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Produto errado</h4>
                      <p>Se você recebeu um produto diferente do pedido, faremos a troca com frete por nossa conta.</p>
                    </div>
                  </div>
                </div>

                {/* Frete */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Frete de Devolução
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Defeito ou erro nosso:</strong> O frete de devolução é por nossa conta. 
                        Enviaremos uma etiqueta de postagem reversa.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Arrependimento ou troca de tamanho:</strong> O frete de devolução fica por conta do cliente. 
                        Você pode escolher a transportadora de sua preferência.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Reembolso */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Reembolso
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Após recebermos e aprovarmos a devolução, o reembolso será processado em até <strong>7 dias úteis</strong>. 
                    O valor será estornado na mesma forma de pagamento utilizada na compra:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Cartão de crédito:</strong> O estorno aparecerá na próxima fatura ou em até 2 faturas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>PIX/Boleto:</strong> Informe seus dados bancários para transferência.</span>
                    </li>
                  </ul>
                </div>

                {/* Não Aceitamos */}
                <div className="bg-destructive/10 border border-destructive/20 rounded-sm p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    Não Aceitamos Trocas
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Produtos com sinais de uso, lavagem ou alterações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Produtos sem etiquetas ou com etiquetas danificadas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Produtos íntimos abertos ou usados.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Solicitações fora do prazo estabelecido.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Precisa de ajuda?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Nossa equipe está pronta para ajudar você com sua troca ou devolução.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:contato@vertice.com.br" 
                className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground font-semibold rounded-sm hover:bg-background/90 transition-colors"
              >
                Enviar E-mail
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-sm hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ReturnsPage;
