import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { productsApi, Product } from '@/api/products';
import { ProductCard } from '@/components/products/ProductCard';
import { SlidersHorizontal, Loader2 } from 'lucide-react';

// Mapeamento de categorias
const categoryInfo: Record<string, { name: string; description: string; image: string }> = {
  tenis: {
    name: 'Tênis',
    description: 'Estilo e conforto para seus pés',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
  },
  calcas: {
    name: 'Calças',
    description: 'Caimento perfeito, estilo único',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
  },
  blusas: {
    name: 'Blusas',
    description: 'Express yourself',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
  },
};

// Mapeamento de categoryId para slug
const categoryIdToSlug: Record<string, string> = {
  'cat-1': 'tenis',
  'cat-2': 'calcas',
  'cat-3': 'blusas',
  'cat-4': 'acessorios',
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = slug ? categoryInfo[slug] : null;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await productsApi.list();
        // Filtrar produtos pela categoria
        const categoryProducts = response.products?.filter((p: Product) => {
          const productCategorySlug = categoryIdToSlug[p.categoryId] || p.category?.slug;
          return productCategorySlug === slug;
        }) || [];
        setProducts(categoryProducts);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Categoria não encontrada</h1>
          <Link to="/" className="text-accent hover:underline">Voltar para a home</Link>
        </div>
      </div>
    );
  }

  // Converter produto da API para o formato esperado pelo ProductCard
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

  return (
    <>
      <Helmet>
        <title>{category.name} | VÉRTICE</title>
        <meta name="description" content={`${category.description}. Confira nossa coleção de ${category.name.toLowerCase()} com estilo urbano.`} />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center">
          <div className="absolute inset-0">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
              {category.name.toUpperCase()}
            </h1>
            <p className="text-xl text-primary-foreground/80">{category.description}</p>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {loading ? 'Carregando...' : `${products.length} produtos encontrados`}
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                <SlidersHorizontal size={18} />
                Filtrar
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-accent hover:underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={convertProduct(product)} index={index} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">Nenhum produto encontrado nesta categoria.</p>
                <Link to="/" className="text-accent hover:underline">Voltar para a home</Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default CategoryPage;
