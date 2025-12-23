import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productsApi, Product } from '@/api/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight, Loader2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIdToSlug: Record<string, string> = {
  'cat-1': 'tenis',
  'cat-2': 'calcas',
  'cat-3': 'blusas',
};

const convertProduct = (p: Product) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  category: categoryIdToSlug[p.categoryId] || p.category?.slug || 'blusas',
  price: Number(p.price),
  originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
  images: p.images?.map(img => img.url) || [],
  description: p.description,
  story: p.story,
  benefits: p.benefits?.map(b => b.text) || [],
  sizes: [...new Set(p.variants?.map(v => v.size) || [])],
  colors: p.variants?.reduce((acc: { name: string; hex: string }[], v) => {
    if (!acc.find(c => c.name === v.colorName)) {
      acc.push({ name: v.colorName, hex: v.colorHex });
    }
    return acc;
  }, []) || [],
  stock: p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0,
  rating: p.rating,
  reviews: p.reviewCount,
  tags: p.tags?.map(t => t.name) || [],
  isNew: p.isNew,
  isBestSeller: p.isBestSeller,
});

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.list();
        const featured = (response.products || response.data || [])
          .filter((p: Product) => p.isBestSeller || p.isNew)
          .slice(0, 8);
        setProducts(featured);
      } catch (err) {
        console.error('Erro ao carregar produtos em destaque:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background texture-concrete">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-accent" />
              <span className="text-accent font-bold text-sm uppercase tracking-widest">Em Alta</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-foreground tracking-wider">
              MAIS VENDIDOS
            </h2>
          </div>
          <Button 
            asChild 
            variant="ghost" 
            className="group self-start md:self-auto text-foreground hover:text-accent hover:bg-transparent transition-colors uppercase tracking-wider font-bold"
          >
            <Link to="/ofertas" className="flex items-center gap-2">
              <span className="text-sm">Ver Todos</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={convertProduct(product)} index={index} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-body">Nenhum produto encontrado</p>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-secondary p-8 md:p-12 border-2 border-accent relative overflow-hidden">
          <div className="absolute inset-0 urban-grid opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-primary-foreground tracking-wider mb-2">
                QUER 10% OFF?
              </h3>
              <p className="text-primary-foreground/70 font-body">
                Use o cupom <span className="text-accent font-bold">STREET10</span> na primeira compra
              </p>
            </div>
            <Button 
              asChild 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-widest h-12 px-8"
            >
              <Link to="/ofertas">
                COMPRAR AGORA
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
