import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
  'calcas': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
  'blusas': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
};

export const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.list();
        const cats = Array.isArray(response) ? response : (response as any).data || [];
        setCategories(cats);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
            Coleções
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            COMPRE POR CATEGORIA
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Encontre o que procura de forma rápida e fácil
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative overflow-hidden aspect-[4/5] animate-fade-in bg-secondary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image || defaultCategoryImages[category.slug] || defaultCategoryImages['blusas']}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                <h3 className="font-display text-3xl md:text-4xl text-primary-foreground mb-2">
                  {category.name.toUpperCase()}
                </h3>
                <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  Ver Produtos
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
