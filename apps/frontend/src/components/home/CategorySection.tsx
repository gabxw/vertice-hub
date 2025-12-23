import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
  'calcas': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  'blusas': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
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
      <section className="py-20 bg-background">
        <div className="container flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-body text-xs text-accent font-semibold tracking-[0.3em] uppercase mb-3 block">
              Categorias
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              EXPLORE
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image || defaultCategoryImages[category.slug] || defaultCategoryImages['blusas']}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  {category.name.toUpperCase()}
                </h3>
                <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-body text-sm">Ver produtos</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-accent transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
