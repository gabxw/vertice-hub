import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Star, Users } from 'lucide-react';
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      
      {/* Urban Grid Pattern */}
      <div className="absolute inset-0 urban-grid opacity-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Urgency Bar */}
          <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 backdrop-blur-sm text-accent px-4 py-2 mb-6 animate-fade-in">
            <Clock size={16} className="animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">Oferta termina em:</span>
            <div className="flex gap-1 font-display text-lg">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.9] mb-6 animate-fade-in">
            DESCUBRA SEU<br />
            <span className="text-accent">ESTILO ÚNICO</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg animate-fade-in font-body leading-relaxed">
            Peças exclusivas com <strong>até 50% OFF</strong>. Qualidade premium, 
            entrega rápida e garantia de satisfação.
          </p>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-secondary border-2 border-primary flex items-center justify-center"
                >
                  <Users size={16} className="text-primary-foreground" />
                </div>
              ))}
            </div>
            <div className="text-primary-foreground">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="fill-accent text-accent" />
                ))}
                <span className="ml-1 font-bold">4.9</span>
              </div>
              <p className="text-xs text-primary-foreground/70">+2.500 clientes satisfeitos</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-10 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wider shadow-lg"
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
              className="h-14 px-10 text-base font-bold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 uppercase tracking-wider"
            >
              <Link to="/categoria/tenis">
                Novidades
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 animate-fade-in">
            {[
              { icon: Truck, label: 'Frete Grátis acima de R$299' },
              { icon: ShieldCheck, label: 'Compra 100% Segura' },
              { icon: Clock, label: 'Entrega em até 7 dias' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-primary-foreground/70">
                <badge.icon size={18} className="text-accent" />
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-neon to-electric" />
    </section>
  );
};
