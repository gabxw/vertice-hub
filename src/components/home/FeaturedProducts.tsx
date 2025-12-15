import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold uppercase tracking-wide text-sm mb-2 block">
              Mais Vendidos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              PEÇAS EM <span className="text-accent">DESTAQUE</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/ofertas">
              Ver Todos
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
