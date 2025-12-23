import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  'calcas': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  'blusas': 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80',
};

const categoryDescriptions: Record<string, string> = {
  'tenis': 'PISADA DO GUETO',
  'calcas': 'CONFORTO URBANO',
  'blusas': 'ESTILO PRÓPRIO',
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
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Explore</span>
            <h2 className="font-display text-4xl md:text-6xl text-primary-foreground tracking-wider">
              CATEGORIAS
            </h2>
          </div>
          <div className="hidden md:block w-24 h-1 bg-accent mb-3" />
        </div>

        {/* Categories Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className={`group relative overflow-hidden card-street ${
                index === 0 ? 'md:col-span-7 aspect-[4/3] md:aspect-[16/10]' : 'md:col-span-5 aspect-[4/3]'
              }`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image || defaultCategoryImages[category.slug] || defaultCategoryImages['blusas']}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2">
                  {categoryDescriptions[category.slug] || 'VER MAIS'}
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-3xl md:text-5xl text-primary-foreground tracking-wider">
                    {category.name.toUpperCase()}
                  </h3>
                  <div className="w-12 h-12 bg-accent flex items-center justify-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={24} className="text-accent-foreground" />
                  </div>
                </div>
              </div>

              {/* Accent border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
