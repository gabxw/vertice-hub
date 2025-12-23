import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productsApi, Product } from '@/api/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';
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
    <section className="py-24 bg-secondary relative">
      {/* Texture */}
      <div className="absolute inset-0 texture-grunge opacity-50" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-gothic text-xs text-accent tracking-[0.4em] uppercase mb-4 block">
              Seleção
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
              MAIS VENDIDOS
            </h2>
          </div>
          <Link 
            to="/ofertas" 
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm group self-start md:self-auto"
          >
            Ver todos os produtos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
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
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-body">Nenhum produto encontrado</p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-20 relative overflow-hidden">
          <div className="bg-background border border-border p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1">
                <span className="font-gothic text-xs text-accent tracking-[0.3em] uppercase mb-3 block">
                  Oferta Exclusiva
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
                  10% OFF NA PRIMEIRA COMPRA
                </h3>
                <p className="text-muted-foreground font-body max-w-md">
                  Use o código <span className="text-accent font-semibold">VERTICE10</span> no checkout e garanta seu desconto exclusivo.
                </p>
              </div>

              {/* CTA Button */}
              <Button 
                asChild 
                size="lg"
                className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-[0.2em] group"
              >
                <Link to="/ofertas" className="flex items-center gap-3">
                  COMPRAR AGORA
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-accent/20" />
          </div>
        </div>
      </div>
    </section>
  );
};
