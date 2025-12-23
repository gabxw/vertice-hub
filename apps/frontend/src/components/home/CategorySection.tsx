import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/api/categories';

const defaultCategoryImages: Record<string, string> = {
  'tenis': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
  'calcas': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  'blusas': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
};

// Style collections for the editorial grid
const styleCollections = [
  {
    id: 'grunge',
    name: 'GRUNGE',
    subtitle: 'Estilo destruído',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    link: '/categoria/blusas',
  },
  {
    id: 'dark',
    name: 'DARK',
    subtitle: 'Streetwear sombrio',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    link: '/categoria/calcas',
  },
  {
    id: 'rock',
    name: 'ROCK',
    subtitle: 'Atitude rebelde',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
    link: '/categoria/tenis',
  },
];

export const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <section className="py-24 bg-background">
        <div className="container flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background relative">
      {/* Section Header */}
      <div className="container mb-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-gothic text-xs text-accent tracking-[0.4em] uppercase mb-4 block">
              Coleções
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
              EXPLORE O ESTILO
            </h2>
          </div>
          <Link 
            to="/ofertas" 
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm group"
          >
            Ver tudo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {styleCollections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 img-grunge"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Subtitle */}
                <span className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {collection.subtitle}
                </span>
                
                {/* Title */}
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors duration-300">
                    {collection.name}
                  </h3>
                  
                  {/* Arrow */}
                  <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                    <ArrowUpRight 
                      size={18} 
                      className="text-foreground group-hover:text-accent-foreground transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Index Number */}
              <div className="absolute top-6 left-6 font-gothic text-xs text-muted-foreground/50">
                0{index + 1}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link 
            to="/ofertas" 
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm"
          >
            Ver todas as coleções
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Category Links (Alternative) */}
      {categories.length > 0 && (
        <div className="container mt-20 pt-20 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="group py-4 text-center border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300"
              >
                <span className="font-display text-sm tracking-[0.15em] text-foreground group-hover:text-accent transition-colors">
                  {category.name.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
