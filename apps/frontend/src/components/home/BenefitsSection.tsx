import { Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Acima de R$299',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Dados protegidos',
  },
  {
    icon: RefreshCw,
    title: 'Troca Fácil',
    description: 'Até 30 dias',
  },
  {
    icon: CreditCard,
    title: 'Parcelamento',
    description: 'Até 6x sem juros',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="bg-muted py-6 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="flex-shrink-0">
                <benefit.icon size={20} className="text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};