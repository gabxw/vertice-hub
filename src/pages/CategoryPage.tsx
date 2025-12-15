import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

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

  return (
    <>
      <Helmet>
        <title>{category.name} | Urban Style</title>
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
                {categoryProducts.length} produtos encontrados
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                <SlidersHorizontal size={18} />
                Filtrar
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CategoryPage;
