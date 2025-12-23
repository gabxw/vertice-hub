import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

export const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2 block">
            Categorias
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Encontre seu estilo
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative h-[320px] md:h-[400px] overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-primary-foreground/70 text-sm mb-1 block">
                      {category.productCount} produtos
                    </span>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={18} className="text-accent-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
