import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center img-grunge"
          style={{ backgroundImage: 'url(/streetwear-90s-hero.jpg)' }}
        />

        <div className="absolute inset-0 bg-background/84" />
        <div className="absolute inset-0 texture-grunge scan-lines opacity-80" />

        <div className="container h-full relative z-10 flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            <div className="order-2 lg:order-1">
              <div className="animate-fade-up mb-6">
                <span className="inline-block font-gothic text-sm text-accent tracking-[0.3em] uppercase border border-accent px-5 py-2.5">
                  Drop 01 | Streetwear 90s
                </span>
              </div>

              <h1 className="animate-fade-up delay-100">
                <span className="block font-display text-[4.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] text-foreground leading-[0.9] tracking-tight">
                  90S
                </span>
                <span className="block font-display text-[4.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] text-accent leading-[0.9] tracking-tight">
                  STREETWEAR
                </span>
                <span className="block font-display text-[4.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] text-foreground leading-[0.9] tracking-tight">
                  DNA
                </span>
              </h1>

              <p className="animate-fade-up delay-200 text-muted-foreground font-body text-lg md:text-xl mt-8 max-w-md leading-relaxed">
                Oversized tee, baggy jeans e atitude de rua em uma curadoria feita para quem quer vestir o 90s sem fantasia.
              </p>

              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 mt-10">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 bg-accent text-accent-foreground hover:bg-accent/90 font-display text-lg tracking-[0.15em] transition-all duration-300"
                >
                  <Link to="/ofertas" className="flex items-center gap-3">
                    EXPLORAR DROP
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 border-foreground/30 text-foreground hover:border-accent hover:text-accent bg-transparent font-display text-lg tracking-[0.15em] transition-all duration-300"
                >
                  <Link to="/ofertas">VER CATEGORIAS</Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-up delay-200">
              <div className="relative aspect-[9/16] max-w-sm mx-auto lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
                  alt="Editorial streetwear 90s"
                  className="w-full h-full object-cover img-grunge"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent -z-10" />

                <div className="absolute -left-4 bottom-12 bg-accent text-accent-foreground px-6 py-3">
                  <span className="font-display text-base tracking-[0.15em]">ASSINATURA 90S</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-colors animate-fade-in delay-500"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
    </section>
  );
};
