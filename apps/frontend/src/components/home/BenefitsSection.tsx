import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Acima de R$ 299',
    accent: 'accent',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: '100% protegida',
    accent: 'neon',
  },
  {
    icon: RefreshCw,
    title: '30 Dias',
    description: 'Para trocar',
    accent: 'electric',
  },
  {
    icon: Headphones,
    title: 'Suporte',
    description: 'Atendimento rápido',
    accent: 'hot',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-${benefit.accent}/10 flex items-center justify-center mb-4 group-hover:bg-${benefit.accent} transition-colors`}>
                <benefit.icon className={`w-7 h-7 text-${benefit.accent} group-hover:text-${benefit.accent}-foreground transition-colors`} />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider mb-1 text-secondary-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs text-secondary-foreground/60 uppercase tracking-wider">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
