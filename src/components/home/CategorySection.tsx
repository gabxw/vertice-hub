import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

export const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            EXPLORE POR <span className="text-accent">CATEGORIA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Encontre o estilo perfeito para você. Do streetwear ao casual, temos tudo que você precisa.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-accent text-sm font-semibold uppercase tracking-wide mb-2 block">
                  {category.productCount} produtos
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-primary-foreground/70 mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                  Ver Coleção
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
