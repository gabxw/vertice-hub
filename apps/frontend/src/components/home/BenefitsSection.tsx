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
    <section className="bg-primary py-5 border-y-2 border-accent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-accent flex items-center justify-center">
                <benefit.icon size={18} className="text-accent-foreground" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-foreground uppercase tracking-wide">{benefit.title}</p>
                <p className="text-xs text-primary-foreground/60 font-body">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
