import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Acima de R$ 299',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: '100% protegida',
  },
  {
    icon: RefreshCw,
    title: '30 Dias',
    description: 'Para trocar',
  },
  {
    icon: Headphones,
    title: 'Suporte',
    description: 'Atendimento rápido',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-8 bg-secondary border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0">
                <benefit.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-secondary-foreground">
                  {benefit.title}
                </h3>
                <p className="text-xs text-secondary-foreground/60">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
