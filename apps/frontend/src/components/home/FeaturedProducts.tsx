import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 8);

  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-neon text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
              Mais Vendidos
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl">
              EM DESTAQUE
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto border-foreground/20 hover:bg-foreground hover:text-background uppercase tracking-wider font-bold h-12 px-8">
            <Link to="/ofertas">
              Ver Todos
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
