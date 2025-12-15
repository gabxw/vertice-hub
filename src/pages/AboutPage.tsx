import { Helmet } from 'react-helmet-async';
import { Heart, Target, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Cada peça é criada com amor pelo estilo urbano e pela cultura streetwear.',
  },
  {
    icon: Target,
    title: 'Qualidade',
    description: 'Selecionamos apenas materiais premium para garantir durabilidade e conforto.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description: 'Somos mais que uma marca, somos uma comunidade de pessoas autênticas.',
  },
  {
    icon: Zap,
    title: 'Inovação',
    description: 'Estamos sempre buscando as últimas tendências para você estar à frente.',
  },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Quem Somos | VÉRTICE</title>
        <meta name="description" content="Conheça a história da VÉRTICE. Moda urbana para quem não aceita o comum." />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920"
              alt="VÉRTICE"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
              NOSSA HISTÓRIA
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Nascemos da vontade de transformar a moda urbana brasileira
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                De sonho a <span className="text-accent">realidade</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A VÉRTICE nasceu em 2020, em plena pandemia, de dois amigos apaixonados por moda streetwear. 
                Cansados de não encontrar peças que expressassem nossa identidade, decidimos criar nossa própria marca.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Começamos no quarto de casa, com apenas 10 camisetas. Hoje, vestimos milhares de pessoas em todo o Brasil 
                que, assim como nós, não aceitam o comum.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cada peça que criamos carrega um pedaço da nossa história. Acreditamos que moda é uma forma de expressão, 
                uma declaração de quem você é sem precisar dizer uma palavra.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
              Nossos <span className="text-accent">Valores</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Faça parte da nossa comunidade
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Junte-se a milhares de pessoas que já encontraram seu estilo com a VÉRTICE
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-accent hover:text-accent/80 transition-colors text-lg">
                @vertice
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
