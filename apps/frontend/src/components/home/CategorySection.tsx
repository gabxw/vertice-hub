import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

// Imagens padrão para categorias
const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
  'calcas': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
  'blusas': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
};

export const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const accentColors = ['accent', 'neon', 'electric'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.list();
        // A API pode retornar { success: true, data: [...] } ou diretamente o array
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
      <section className="py-20 md:py-32 bg-background">
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
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
              Coleções
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl">
              EXPLORE POR<br />CATEGORIA
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm md:text-base font-light">
            Do streetwear ao casual, encontre peças que definem seu estilo único.
          </p>
        </div>

        {/* Categories Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className={cn(
                'group relative overflow-hidden animate-fade-in bg-secondary',
                index === 0 && 'md:row-span-2 aspect-[3/4] md:aspect-auto',
                index !== 0 && 'aspect-[4/3]'
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <img
                src={category.image || defaultCategoryImages[category.slug] || defaultCategoryImages['blusas']}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              
              {/* Accent Line */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-${accentColors[index % 3]}`} />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className={`text-${accentColors[index % 3]} text-xs font-bold uppercase tracking-[0.2em] mb-2 block`}>
                  Coleção
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-3">
                  {category.name.toUpperCase()}
                </h3>
                <div className={`inline-flex items-center gap-2 text-${accentColors[index % 3]} text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all`}>
                  Ver Coleção
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`absolute -top-8 -right-8 w-16 h-16 bg-${accentColors[index % 3]} rotate-45`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
