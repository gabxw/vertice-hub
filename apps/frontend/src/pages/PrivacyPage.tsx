import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, UserCheck, Database, FileText } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Vértice</title>
        <meta name="description" content="Política de privacidade da VÉRTICE. Saiba como protegemos seus dados pessoais." />
      </Helmet>

      <main className="bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              POLÍTICA DE PRIVACIDADE
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua privacidade é importante para nós. Conheça como coletamos, usamos e protegemos seus dados.
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
                <h2 className="font-display text-3xl font-bold mb-4">Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A <strong>VÉRTICE</strong> está comprometida em proteger a privacidade e os dados pessoais de seus clientes. 
                  Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e compartilhamos suas informações 
                  quando você utiliza nosso site, aplicativos e serviços. Ao utilizar nossos serviços, você concorda com as 
                  práticas descritas nesta política.
                </p>
              </div>

              {/* Dados Coletados */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">1. Dados que Coletamos</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">1.1. Dados Fornecidos por Você</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Cadastro:</strong> Nome completo, e-mail, CPF, data de nascimento, telefone e senha.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Endereço:</strong> CEP, rua, número, complemento, bairro, cidade e estado para entrega.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Pagamento:</strong> Dados de cartão de crédito (processados por gateway seguro) ou informações de PIX.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Comunicação:</strong> Mensagens enviadas via chat, e-mail ou formulários de contato.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">1.2. Dados Coletados Automaticamente</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e origem do acesso.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Cookies:</strong> Utilizamos cookies para melhorar sua experiência e personalizar conteúdo.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Dispositivo:</strong> Informações sobre o dispositivo utilizado (modelo, sistema operacional, identificadores únicos).</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">1.3. Dados de Terceiros</h3>
                    <p>
                      Podemos receber dados de parceiros de marketing, redes sociais (quando você conecta sua conta) e 
                      serviços de análise de dados para melhorar nossos serviços.
                    </p>
                  </div>
                </div>
              </div>

              {/* Como Usamos */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">2. Como Usamos Seus Dados</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Processar pedidos:</strong> Gerenciar compras, pagamentos, entregas e trocas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Comunicação:</strong> Enviar confirmações de pedido, atualizações de entrega e suporte ao cliente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Marketing:</strong> Enviar ofertas, promoções e novidades (você pode cancelar a qualquer momento).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Personalização:</strong> Recomendar produtos com base em suas preferências e histórico de compras.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Segurança:</strong> Detectar e prevenir fraudes, abusos e atividades ilegais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Análise:</strong> Entender como nossos serviços são utilizados para melhorar a experiência do usuário.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Cumprimento legal:</strong> Atender a obrigações legais e regulatórias.</span>
                  </li>
                </ul>
              </div>

              {/* Compartilhamento */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">3. Compartilhamento de Dados</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Não vendemos seus dados pessoais. Compartilhamos informações apenas nas seguintes situações:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Prestadores de serviço:</strong> Empresas que nos auxiliam em pagamentos, logística, marketing e análise de dados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Parceiros comerciais:</strong> Com seu consentimento, para ofertas conjuntas ou promoções.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Autoridades legais:</strong> Quando exigido por lei ou para proteger nossos direitos e segurança.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Transações corporativas:</strong> Em caso de fusão, aquisição ou venda de ativos.</span>
                  </li>
                </ul>
              </div>

              {/* Segurança */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">4. Segurança dos Dados</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, 
                  perda, destruição ou alteração. Utilizamos criptografia SSL/TLS, firewalls, controle de acesso e 
                  monitoramento contínuo. No entanto, nenhum sistema é 100% seguro, e você também deve proteger suas credenciais.
                </p>
              </div>

              {/* Seus Direitos */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">5. Seus Direitos (LGPD)</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Acesso:</strong> Solicitar uma cópia dos dados que temos sobre você.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Correção:</strong> Atualizar ou corrigir dados incorretos ou incompletos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Exclusão:</strong> Solicitar a exclusão de seus dados, exceto quando houver obrigação legal de mantê-los.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e legível.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Revogação de consentimento:</strong> Retirar o consentimento para uso de dados a qualquer momento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Oposição:</strong> Se opor ao tratamento de dados em determinadas situações.</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Para exercer seus direitos, entre em contato conosco através do e-mail: <strong>privacidade@vertice.com.br</strong>
                </p>
              </div>

              {/* Cookies */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">6. Cookies e Tecnologias Similares</h2>
                <p className="text-muted-foreground mb-4">
                  Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego. Você pode 
                  gerenciar suas preferências de cookies nas configurações do navegador. Tipos de cookies utilizados:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Essenciais:</strong> Necessários para o funcionamento do site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Desempenho:</strong> Coletam informações sobre como você usa o site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Funcionalidade:</strong> Lembram suas preferências e escolhas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Marketing:</strong> Rastreiam sua navegação para exibir anúncios relevantes.</span>
                  </li>
                </ul>
              </div>

              {/* Retenção */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">7. Retenção de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
                  atender a obrigações legais ou resolver disputas. Após esse período, os dados serão anonimizados ou excluídos de 
                  forma segura.
                </p>
              </div>

              {/* Menores */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">8. Privacidade de Menores</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados de crianças 
                  sem o consentimento dos pais ou responsáveis. Se você acredita que coletamos dados de um menor indevidamente, 
                  entre em contato conosco imediatamente.
                </p>
              </div>

              {/* Alterações */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">9. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas 
                  por e-mail ou através de um aviso em nosso site. Recomendamos que você revise esta política regularmente.
                </p>
              </div>

              {/* Contato */}
              <div className="bg-primary/10 border border-primary/20 rounded-sm p-6">
                <h2 className="font-display text-2xl font-bold mb-4">10. Contato</h2>
                <p className="text-muted-foreground mb-4">
                  Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao 
                  tratamento de seus dados pessoais, entre em contato conosco:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>E-mail:</strong> privacidade@vertice.com.br</p>
                  <p><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPage;
