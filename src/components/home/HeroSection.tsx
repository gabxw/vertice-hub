import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const calculateTimeLeft = () => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  endDate.setHours(23, 59, 59, 999);
  
  const difference = endDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground max-w-xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full mb-6 border border-success/30">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs font-semibold">+2.847 clientes satisfeitos</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Estilo que transforma sua{' '}
              <span className="text-accent">presença</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
              Peças exclusivas com qualidade premium. Vista-se para impressionar — de você mesmo primeiro.
            </p>

            {/* Urgency Bar */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-destructive">
                  <Clock size={18} className="animate-pulse" />
                  <span className="text-sm font-semibold">Promoção termina em:</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: timeLeft.hours, label: 'H' },
                    { value: timeLeft.minutes, label: 'M' },
                    { value: timeLeft.seconds, label: 'S' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <span className="bg-destructive text-destructive-foreground font-display text-lg font-bold w-10 h-10 flex items-center justify-center rounded-lg">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-primary-foreground/50 text-xs font-medium">{item.label}</span>
                      {index < 2 && <span className="text-destructive font-bold mx-1">:</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                asChild 
                size="lg" 
                className="h-14 px-8 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl"
              >
                <Link to="/ofertas">
                  Ver Ofertas
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base font-medium border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
              >
                <Link to="/categoria/tenis">
                  Explorar Coleção
                </Link>
              </Button>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-success" />
                <span>Frete grátis +R$299</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-success" />
                <span>Compra segura</span>
              </div>
            </div>
          </div>

          {/* Right - Featured Product */}
          <div className="relative hidden lg:block">
            <div className="relative bg-card/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/10">
              {/* Sale Badge */}
              <div className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-bold z-20">
                -30% OFF
              </div>
              
              {/* Product Image */}
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"
                alt="Tênis em destaque"
                className="w-full h-auto rounded-2xl mb-6"
              />
              
              {/* Product Info */}
              <div className="text-primary-foreground">
                <p className="text-accent text-sm font-medium mb-1">Mais Vendido</p>
                <h3 className="font-display text-xl font-bold mb-2">Tênis Urban Pro</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">R$ 279</span>
                  <span className="text-primary-foreground/50 line-through">R$ 399</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
