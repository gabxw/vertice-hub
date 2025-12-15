import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Flame, Clock } from 'lucide-react';

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

const OffersPage = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const offerProducts = products.filter((p) => p.originalPrice);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Ofertas Imperdíveis | VÉRTICE</title>
        <meta name="description" content="Aproveite descontos incríveis em tênis, calças e blusas. Ofertas por tempo limitado!" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="bg-destructive text-destructive-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-background/20 px-4 py-2 rounded-full mb-4">
              <Flame size={18} className="animate-bounce-subtle" />
              <span className="font-semibold uppercase tracking-wide text-sm">Ofertas Limitadas</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
              ATÉ 50% OFF
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Corra! Essas ofertas acabam em breve
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock size={20} />
              <span className="font-semibold">Termina em:</span>
            </div>
            <div className="flex justify-center gap-4">
              {[
                { value: timeLeft.hours, label: 'Horas' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Seg' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <span className="block bg-background text-foreground font-bold text-3xl md:text-4xl px-4 py-3 rounded-lg mb-1 animate-countdown">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs opacity-80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {offerProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OffersPage;
