import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
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
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Image - Street/Urban */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80)',
        }}
      />
      
      {/* Dark overlay with concrete texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/90 to-secondary" />
      <div className="absolute inset-0 texture-concrete" />
      <div className="absolute inset-0 urban-grid" />

      {/* Marquee Banner - Top */}
      <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="mx-8 font-display text-lg tracking-wider">
              DROP LIMITADO • FRETE GRÁTIS +R$299 • ESTILO UNDERGROUND • PEÇAS EXCLUSIVAS
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-5xl">
          
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 mb-6 animate-fade-in">
            <Zap size={14} className="animate-flicker" />
            <span className="font-body text-sm font-bold uppercase tracking-widest">Nova Coleção 2024</span>
          </div>

          {/* Main Headline - Massive Impact */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-primary-foreground leading-[0.85] mb-4 animate-fade-in tracking-wider">
            STREET
            <br />
            <span className="text-neon animate-flicker">CULTURE</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl animate-fade-in font-body leading-relaxed">
            Moda de rua que veio do <span className="text-accent font-bold">underground</span>. 
            Peças únicas pra quem não segue regras.
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in">
            <span className="text-sm text-primary-foreground/50 uppercase tracking-wider font-bold">Drop acaba em:</span>
            <div className="flex gap-2 font-display text-3xl md:text-4xl text-primary-foreground">
              <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-accent animate-pulse-neon">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-accent">:</span>
              <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-accent/50">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-accent">:</span>
              <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-accent/50">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-10 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-widest transition-all duration-300 hover:shadow-glow-neon border-0"
            >
              <Link to="/ofertas" className="flex items-center gap-3">
                VER DROP
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="h-14 px-10 text-base font-bold border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary uppercase tracking-widest transition-all duration-300"
            >
              <Link to="/categoria/tenis">
                EXPLORAR
              </Link>
            </Button>
          </div>

          {/* Trust Elements - Raw Style */}
          <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm animate-fade-in font-body font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent" />
              Frete Grátis +R$299
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-pink" />
              Pagamento Seguro
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-blue" />
              Troca em 30 dias
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      
      {/* Corner accent */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="font-display text-[8rem] text-primary-foreground/5 leading-none">
          V
        </div>
      </div>
    </section>
  );
};
