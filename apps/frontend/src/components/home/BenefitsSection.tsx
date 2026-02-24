import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Gratis',
    description: 'Acima de R$ 299',
    shellClass: 'bg-accent/15 group-hover:bg-accent/25',
    iconClass: 'text-accent',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: '100% protegida',
    shellClass: 'bg-neon/15 group-hover:bg-neon/25',
    iconClass: 'text-neon',
  },
  {
    icon: RefreshCw,
    title: '30 Dias',
    description: 'Para trocar',
    shellClass: 'bg-electric/15 group-hover:bg-electric/25',
    iconClass: 'text-electric',
  },
  {
    icon: Headphones,
    title: 'Suporte',
    description: 'Atendimento rapido',
    shellClass: 'bg-hot/15 group-hover:bg-hot/25',
    iconClass: 'text-hot',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="border-y border-border/70 bg-secondary/35 py-16 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group panel-surface flex flex-col items-center px-4 py-5 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-colors ${benefit.shellClass}`}>
                <benefit.icon className={`h-7 w-7 transition-colors ${benefit.iconClass}`} />
              </div>
              <h3 className="mb-1 font-display text-xl uppercase tracking-wider text-secondary-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-secondary-foreground/65">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
