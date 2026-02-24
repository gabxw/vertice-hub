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
    <section className="bg-secondary py-6 border-y border-border relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="flex items-center gap-4 py-2"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                <benefit.icon size={20} className="text-accent" strokeWidth={1.5} />
              </div>
              
              {/* Text */}
              <div>
                <p className="font-display text-sm text-foreground tracking-[0.1em] uppercase">
                  {benefit.title}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};
