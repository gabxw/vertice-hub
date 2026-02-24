import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
              <Flame size={20} className="text-destructive" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Mais Vendidos</h2>
              <p className="text-muted-foreground text-sm">Os favoritos dos nossos clientes</p>
            </div>
          </div>
          <Button 
            asChild 
            variant="ghost" 
            className="self-start md:self-auto text-accent hover:text-accent hover:bg-accent/10"
          >
            <Link to="/ofertas">
              Ver todos
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg"
            className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold"
          >
            <Link to="/ofertas">
              Ver catálogo completo
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
