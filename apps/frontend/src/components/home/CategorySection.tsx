import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
  'calcas': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  'blusas': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
};

const categoryDescriptions: Record<string, string> = {
  'tenis': 'Pisada com atitude',
  'calcas': 'Conforto e estilo',
  'blusas': 'Expressão única',
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
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wide mb-3">
            CATEGORIAS
          </h2>
          <div className="gothic-line-accent w-24 mx-auto" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-muted card-gothic"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image || defaultCategoryImages[category.slug] || defaultCategoryImages['blusas']}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <p className="text-primary-foreground/60 text-sm mb-1 font-body">
                    {categoryDescriptions[category.slug] || 'Ver produtos'}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl md:text-3xl text-primary-foreground tracking-wider">
                      {category.name.toUpperCase()}
                    </h3>
                    <ArrowUpRight 
                      size={24} 
                      className="text-accent transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                    />
                  </div>
                </div>
              </div>

              {/* Accent border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};