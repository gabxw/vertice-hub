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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero">
      <div className="urban-grid absolute inset-0 opacity-30" />
      <div className="absolute right-0 top-0 h-full w-1/2 -skew-x-12 bg-accent/7 origin-top-right" />

      <div className="animate-float absolute left-[10%] top-20 h-20 w-20 rotate-45 border-2 border-accent/30" />
      <div className="absolute bottom-32 left-[5%] h-12 w-12 rotate-12 bg-neon/20" />
      <div className="absolute right-[15%] top-1/3 h-1 w-32 bg-accent" />
      <div className="absolute bottom-1/4 right-[10%] h-32 w-1 bg-electric/60" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="text-primary-foreground">
            <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full bg-accent px-4 py-2 text-accent-foreground">
              <Zap size={16} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Drop Limitado</span>
            </div>

            <h1 className="mb-6 font-display text-6xl leading-[0.85] animate-fade-in sm:text-7xl md:text-8xl lg:text-[7rem]">
              ESTILO QUE
              <br />
              <span className="text-accent">IMPOE</span>
              <br />
              PRESENCA
            </h1>

            <p className="mb-8 max-w-md font-body text-lg font-light text-primary-foreground/72 animate-fade-in md:text-xl">
              Pecas exclusivas para quem nao segue tendencias e cria as proprias regras.
            </p>

            <div className="mb-10 flex flex-col gap-4 animate-fade-in sm:flex-row sm:items-center">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/55">Termina em:</span>
              <div className="flex gap-2">
                {[
                  { value: timeLeft.hours, label: 'H' },
                  { value: timeLeft.minutes, label: 'M' },
                  { value: timeLeft.seconds, label: 'S' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent font-display text-3xl text-accent-foreground">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-primary-foreground/60">{item.label}</span>
                    {index < 2 && <span className="ml-1 font-bold text-accent">:</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 animate-fade-in sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 bg-accent px-10 text-base font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90"
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
                className="h-14 border-2 border-primary-foreground/30 px-10 text-base font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/categoria/tenis">Ver Drop</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rotate-3 rounded-3xl bg-accent/10" />

            <div className="relative z-10 p-8">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
                alt="Tenis em destaque"
                className="animate-float w-full drop-shadow-2xl"
              />
            </div>

            <div className="absolute -bottom-4 -left-4 h-1 w-24 bg-accent" />
            <div className="absolute -bottom-4 -left-4 h-24 w-1 bg-accent" />
            <div className="absolute -right-4 -top-4 h-1 w-24 bg-neon" />
            <div className="absolute -right-4 -top-4 h-24 w-1 bg-neon" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-neon to-electric" />
    </section>
  );
};
