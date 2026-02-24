import { Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Acima de R$ 299',
    color: 'text-success',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Dados protegidos',
    color: 'text-accent',
  },
  {
    icon: RefreshCw,
    title: 'Troca Fácil',
    description: '30 dias garantidos',
    color: 'text-accent',
  },
  {
    icon: CreditCard,
    title: 'Parcelamento',
    description: 'Até 12x sem juros',
    color: 'text-success',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-6 bg-muted border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center gap-3"
            >
              <div className={`${benefit.color}`}>
                <benefit.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
