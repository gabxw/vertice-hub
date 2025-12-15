import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Flame size={18} className="animate-bounce-subtle" />
            <span className="text-sm font-semibold uppercase tracking-wide">Coleção Limitada</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-[0.9] animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            VISTA SEU<br />
            <span className="text-accent">ESTILO</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Moda urbana para quem não aceita o comum. Descubra peças exclusivas que expressam quem você realmente é.
          </p>

          {/* Countdown */}
          <div 
            className="flex items-center gap-4 mb-8 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-primary-foreground/70 text-sm uppercase tracking-wide">Oferta termina em:</span>
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: 'h' },
                { value: timeLeft.minutes, label: 'm' },
                { value: timeLeft.seconds, label: 's' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="bg-accent text-accent-foreground font-bold text-lg px-3 py-1 rounded animate-countdown">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-primary-foreground/70 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground btn-glow"
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
              className="h-14 px-8 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/categoria/tenis">
                Nova Coleção
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div 
            className="mt-12 flex items-center gap-6 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Cliente"
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                />
              ))}
            </div>
            <div className="text-primary-foreground">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/70">+2.500 clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Product Image (Desktop) */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
        <img
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
          alt="Tênis em destaque"
          className="absolute top-1/2 right-20 -translate-y-1/2 w-[500px] h-auto drop-shadow-2xl animate-fade-in hover:scale-105 transition-transform duration-500"
          style={{ animationDelay: '0.6s' }}
        />
      </div>
    </section>
  );
};
