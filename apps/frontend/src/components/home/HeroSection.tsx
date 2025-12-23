import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)',
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/90" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 texture-noise" />

      {/* Marquee Banner */}
      <div className="absolute top-0 left-0 right-0 bg-foreground py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-12 font-body text-sm text-background tracking-widest">
              FRETE GRÁTIS ACIMA DE R$299 • PEÇAS EXCLUSIVAS • ENVIO EM 24H • PARCELAMENTO EM ATÉ 6X
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-block mb-8 animate-fade-in">
            <span className="font-body text-xs text-accent font-semibold tracking-[0.3em] uppercase">
              Nova Coleção
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            DARK
            <br />
            <span className="text-accent">STREET</span>
            <br />
            WEAR
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg text-muted-foreground mb-10 max-w-md font-body leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Estética underground. Atitude rebelde. 
            Peças exclusivas para quem não segue tendências.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-10 bg-foreground text-background hover:bg-foreground/90 font-display text-base tracking-widest"
            >
              <Link to="/ofertas" className="flex items-center gap-3">
                VER COLEÇÃO
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="h-14 px-10 border-foreground/30 text-foreground hover:bg-foreground hover:text-background font-display text-base tracking-widest"
            >
              <Link to="/categoria/tenis">
                EXPLORAR
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div 
            className="flex flex-wrap gap-8 text-muted-foreground animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-accent" />
              <span className="font-body text-sm">Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-accent" />
              <span className="font-body text-sm">Troca em 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-accent" />
              <span className="font-body text-sm">Envio Nacional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
};
