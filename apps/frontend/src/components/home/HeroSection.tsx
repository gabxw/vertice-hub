import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const calculateTimeLeft = () => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
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
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-primary">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80)',
        }}
      />
      
      {/* Dark Gothic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 texture-noise opacity-30" />
      
      {/* Gothic pattern overlay */}
      <div className="absolute inset-0 gothic-pattern" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Limited Edition Tag */}
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 backdrop-blur-sm text-accent px-5 py-2 mb-8 animate-fade-in">
            <Sparkles size={14} className="animate-flicker" />
            <span className="text-xs font-medium uppercase tracking-[0.2em]">Coleção Exclusiva</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6 animate-fade-in tracking-wide">
            ONDE A ESCURIDÃO<br />
            <span className="text-accent">ENCONTRA O ESTILO</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-in font-body leading-relaxed">
            Peças únicas para quem não segue tendências. 
            <span className="text-primary-foreground font-medium"> Streetwear alternativo</span> com atitude.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in">
            <span className="text-sm text-primary-foreground/50 uppercase tracking-wider">Drop encerra em:</span>
            <div className="flex gap-2 font-display text-2xl text-primary-foreground">
              <div className="bg-secondary/50 backdrop-blur-sm px-3 py-1 border border-border/30">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-accent">:</span>
              <div className="bg-secondary/50 backdrop-blur-sm px-3 py-1 border border-border/30">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-accent">:</span>
              <div className="bg-secondary/50 backdrop-blur-sm px-3 py-1 border border-border/30">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-12 text-sm font-semibold bg-primary-foreground hover:bg-primary-foreground/90 text-primary uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-glow-purple"
            >
              <Link to="/ofertas">
                Explorar Coleção
                <ArrowRight className="ml-3" size={18} />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="h-14 px-12 text-sm font-semibold border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 uppercase tracking-[0.15em] transition-all duration-300"
            >
              <Link to="/categoria/tenis">
                Novidades
              </Link>
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/50 text-sm animate-fade-in">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent" />
              Frete Grátis +R$299
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent" />
              Pagamento Seguro
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent" />
              Troca Garantida
            </span>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="gothic-line-accent" />
      </div>
    </section>
  );
};