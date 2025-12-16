import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Urban Grid Pattern */}
      <div className="absolute inset-0 urban-grid opacity-30" />
      
      {/* Diagonal Line Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 transform -skew-x-12 origin-top-right" />
      
      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-[10%] w-20 h-20 border-2 border-accent/30 rotate-45 animate-float" />
      <div className="absolute bottom-32 left-[5%] w-12 h-12 bg-neon/20 rotate-12" />
      <div className="absolute top-1/3 right-[15%] w-32 h-1 bg-accent" />
      <div className="absolute bottom-1/4 right-[10%] w-1 h-32 bg-electric/50" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 mb-8 animate-fade-in">
              <Zap size={16} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Drop Limitado</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.85] mb-6 animate-fade-in">
              ESTILO QUE<br />
              <span className="text-accent">IMPÕE</span><br />
              PRESENÇA
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-md animate-fade-in font-body font-light">
              Peças exclusivas para quem não segue tendências — cria as próprias.
            </p>

            {/* Countdown */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 animate-fade-in">
              <span className="text-primary-foreground/50 text-xs uppercase tracking-[0.3em] font-medium">
                Termina em:
              </span>
              <div className="flex gap-2">
                {[
                  { value: timeLeft.hours, label: 'H' },
                  { value: timeLeft.minutes, label: 'M' },
                  { value: timeLeft.seconds, label: 'S' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className="bg-accent text-accent-foreground font-display text-3xl w-14 h-14 flex items-center justify-center">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-primary-foreground/50 text-xs font-bold">{item.label}</span>
                    {index < 2 && <span className="text-accent font-bold ml-1">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                asChild 
                size="lg" 
                className="h-14 px-10 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wider"
              >
                <Link to="/ofertas">
                  Comprar Agora
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
                  Ver Drop
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="relative hidden lg:block">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-accent/10 transform rotate-3" />
            
            {/* Main Image */}
            <div className="relative z-10 p-8">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
                alt="Tênis em destaque"
                className="w-full h-auto animate-float drop-shadow-2xl"
              />
            </div>
            
            {/* Accent Lines */}
            <div className="absolute -bottom-4 -left-4 w-24 h-1 bg-accent" />
            <div className="absolute -bottom-4 -left-4 w-1 h-24 bg-accent" />
            <div className="absolute -top-4 -right-4 w-24 h-1 bg-neon" />
            <div className="absolute -top-4 -right-4 w-1 h-24 bg-neon" />
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-neon to-electric" />
    </section>
  );
};
