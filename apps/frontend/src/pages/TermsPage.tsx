import { Helmet } from 'react-helmet-async';
import { FileText, ShieldCheck, AlertTriangle, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso | VÉRTICE</title>
        <meta name="description" content="Termos de uso da VÉRTICE. Leia os termos e condições para utilizar nossos serviços." />
      </Helmet>

      <main className="bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              TERMOS DE USO
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leia atentamente os termos e condições para utilizar nossos serviços.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: Dezembro de 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Introdução */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bem-vindo à <strong>VÉRTICE</strong>! Estes Termos de Uso ("Termos") regem o acesso e uso de nosso site, 
                  aplicativos, produtos e serviços (coletivamente, "Serviços"). Ao acessar ou utilizar nossos Serviços, você 
                  concorda em cumprir e estar vinculado a estes Termos. Se você não concordar com qualquer parte destes Termos, 
                  não utilize nossos Serviços.
                </p>
              </div>

              {/* Cadastro */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">2. Cadastro e Conta</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>2.1. Elegibilidade:</strong> Você deve ter pelo menos 18 anos para criar uma conta e realizar compras. 
                    Menores de 18 anos podem utilizar os Serviços apenas com a supervisão de um responsável legal.
                  </p>
                  <p>
                    <strong>2.2. Informações Precisas:</strong> Ao criar uma conta, você concorda em fornecer informações verdadeiras, 
                    precisas, atuais e completas. Você é responsável por manter a confidencialidade de sua senha e por todas as 
                    atividades que ocorram em sua conta.
                  </p>
                  <p>
                    <strong>2.3. Responsabilidade:</strong> Você é responsável por todas as ações realizadas através de sua conta. 
                    Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.
                  </p>
                  <p>
                    <strong>2.4. Suspensão de Conta:</strong> Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer 
                    momento, sem aviso prévio, se você violar estes Termos ou se houver suspeita de atividade fraudulenta.
                  </p>
                </div>
              </div>

              {/* Compras */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">3. Compras e Pagamentos</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>3.1. Pedidos:</strong> Ao fazer um pedido, você está fazendo uma oferta de compra. Reservamo-nos o direito 
                    de aceitar ou recusar qualquer pedido por qualquer motivo, incluindo disponibilidade de estoque, erros de preço ou 
                    suspeita de fraude.
                  </p>
                  <p>
                    <strong>3.2. Preços:</strong> Todos os preços estão em Reais (BRL) e incluem impostos aplicáveis. Reservamo-nos o 
                    direito de alterar preços a qualquer momento, mas as alterações não afetarão pedidos já confirmados.
                  </p>
                  <p>
                    <strong>3.3. Pagamento:</strong> Aceitamos cartões de crédito, débito, PIX e outros métodos de pagamento indicados 
                    no site. O pagamento deve ser realizado no momento da compra. Utilizamos gateways de pagamento seguros e não 
                    armazenamos dados completos de cartão de crédito.
                  </p>
                  <p>
                    <strong>3.4. Confirmação:</strong> Você receberá um e-mail de confirmação após a aprovação do pagamento. A confirmação 
                    não garante a disponibilidade do produto, que está sujeita a estoque.
                  </p>
                  <p>
                    <strong>3.5. Cancelamento:</strong> Você pode cancelar seu pedido antes do envio. Após o envio, consulte nossa 
                    Política de Trocas e Devoluções.
                  </p>
                </div>
              </div>

              {/* Entrega */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">4. Entrega</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>4.1. Prazo:</strong> Os prazos de entrega são estimativas e podem variar de acordo com a localização e 
                    disponibilidade. Não nos responsabilizamos por atrasos causados por transportadoras ou eventos fora de nosso controle.
                  </p>
                  <p>
                    <strong>4.2. Endereço:</strong> É sua responsabilidade fornecer um endereço de entrega correto e completo. Não nos 
                    responsabilizamos por entregas em endereços incorretos fornecidos por você.
                  </p>
                  <p>
                    <strong>4.3. Rastreamento:</strong> Você receberá um código de rastreamento após o envio do pedido para acompanhar 
                    a entrega.
                  </p>
                  <p>
                    <strong>4.4. Recebimento:</strong> Ao receber o produto, verifique se está em perfeitas condições. Em caso de dano 
                    ou produto errado, entre em contato conosco imediatamente.
                  </p>
                </div>
              </div>

              {/* Propriedade Intelectual */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">5. Propriedade Intelectual</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>5.1. Direitos Autorais:</strong> Todo o conteúdo disponível nos Serviços, incluindo textos, imagens, logos, 
                    gráficos, vídeos e software, é de propriedade da VÉRTICE ou de seus licenciadores e está protegido por leis de 
                    direitos autorais e propriedade intelectual.
                  </p>
                  <p>
                    <strong>5.2. Uso Limitado:</strong> Você pode visualizar, baixar e imprimir conteúdo apenas para uso pessoal e 
                    não comercial. Qualquer outro uso, incluindo reprodução, distribuição, modificação ou publicação, é proibido sem 
                    autorização prévia por escrito.
                  </p>
                  <p>
                    <strong>5.3. Marcas Registradas:</strong> "VÉRTICE" e todos os logos relacionados são marcas registradas da VÉRTICE. 
                    Você não pode usar nossas marcas sem permissão expressa.
                  </p>
                </div>
              </div>

              {/* Conduta do Usuário */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">6. Conduta do Usuário</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Você concorda em NÃO:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Usar os Serviços para qualquer finalidade ilegal ou não autorizada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Violar quaisquer leis locais, estaduais, nacionais ou internacionais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Transmitir vírus, malware ou qualquer código malicioso.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Coletar ou armazenar dados pessoais de outros usuários sem consentimento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Interferir ou interromper o funcionamento dos Serviços ou servidores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Fazer engenharia reversa, descompilar ou tentar extrair o código-fonte dos Serviços.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Usar os Serviços para enviar spam, phishing ou qualquer comunicação não solicitada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Fazer uso comercial dos Serviços sem autorização prévia.</span>
                  </li>
                </ul>
              </div>

              {/* Limitação de Responsabilidade */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">7. Limitação de Responsabilidade</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>7.1. Garantias:</strong> Os Serviços são fornecidos "no estado em que se encontram" e "conforme disponíveis". 
                    Não garantimos que os Serviços serão ininterruptos, livres de erros ou seguros.
                  </p>
                  <p>
                    <strong>7.2. Exclusão de Responsabilidade:</strong> Na máxima extensão permitida por lei, a VÉRTICE não será 
                    responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes 
                    do uso ou incapacidade de usar os Serviços.
                  </p>
                  <p>
                    <strong>7.3. Produtos:</strong> Fazemos o possível para exibir cores e detalhes dos produtos com precisão, mas não 
                    garantimos que a exibição em seu dispositivo seja precisa. Não nos responsabilizamos por variações de cor ou tamanho.
                  </p>
                </div>
              </div>

              {/* Indenização */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">8. Indenização</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Você concorda em indenizar, defender e isentar a VÉRTICE, seus diretores, funcionários, parceiros e afiliados de 
                  quaisquer reivindicações, responsabilidades, danos, perdas e despesas (incluindo honorários advocatícios) decorrentes 
                  de seu uso dos Serviços ou violação destes Termos.
                </p>
              </div>

              {/* Lei Aplicável */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">9. Lei Aplicável e Jurisdição</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Qualquer disputa 
                  decorrente destes Termos será submetida à jurisdição exclusiva dos tribunais de São Paulo, SP, Brasil.
                </p>
              </div>

              {/* Alterações */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">10. Alterações nos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente 
                  após a publicação no site. O uso continuado dos Serviços após as alterações constitui aceitação dos novos Termos. 
                  Recomendamos que você revise estes Termos periodicamente.
                </p>
              </div>

              {/* Disposições Gerais */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">11. Disposições Gerais</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>11.1. Integralidade:</strong> Estes Termos constituem o acordo completo entre você e a VÉRTICE em relação 
                    ao uso dos Serviços.
                  </p>
                  <p>
                    <strong>11.2. Divisibilidade:</strong> Se qualquer disposição destes Termos for considerada inválida ou inexequível, 
                    as demais disposições permanecerão em pleno vigor e efeito.
                  </p>
                  <p>
                    <strong>11.3. Renúncia:</strong> A falha da VÉRTICE em exercer ou fazer cumprir qualquer direito ou disposição destes 
                    Termos não constituirá renúncia a tal direito ou disposição.
                  </p>
                  <p>
                    <strong>11.4. Cessão:</strong> Você não pode ceder ou transferir estes Termos sem nosso consentimento prévio por 
                    escrito. Podemos ceder estes Termos a qualquer momento sem aviso prévio.
                  </p>
                </div>
              </div>

              {/* Contato */}
              <div className="bg-primary/10 border border-primary/20 rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">12. Contato</h2>
                <p className="text-muted-foreground mb-4">
                  Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>E-mail:</strong> contato@vertice.com.br</p>
                  <p><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567</p>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="bg-muted/50 border border-border rounded-sm p-6 text-center">
                <p className="text-muted-foreground">
                  Ao utilizar nossos Serviços, você reconhece que leu, compreendeu e concordou em estar vinculado a estes Termos de Uso.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsPage;
