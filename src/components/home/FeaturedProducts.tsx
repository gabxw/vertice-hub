import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              🔥 Mais Vendidos
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              PEÇAS EM <span className="text-gradient-neon">DESTAQUE</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto h-12 px-8 rounded-full border-2 font-bold uppercase tracking-wider hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
            <Link to="/ofertas">
              Ver Todos
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
