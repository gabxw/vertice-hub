import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Em compras acima de R$ 299',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Seus dados 100% protegidos',
  },
  {
    icon: RefreshCw,
    title: '30 Dias de Troca',
    description: 'Satisfação garantida',
  },
  {
    icon: Headphones,
    title: 'Suporte Rápido',
    description: 'Atendimento humanizado',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-secondary/50 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2 tracking-wide">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
