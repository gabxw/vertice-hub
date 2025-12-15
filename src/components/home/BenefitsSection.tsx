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
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
