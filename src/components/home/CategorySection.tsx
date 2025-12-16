import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

export const CategorySection = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Coleções</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            EXPLORE POR <span className="text-gradient-neon">CATEGORIA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Encontre seu estilo. Do streetwear autêntico ao casual moderno.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group relative h-[450px] md:h-[550px] overflow-hidden rounded-3xl animate-fade-in card-hover"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90" />
              
              {/* Neon border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-accent/20 backdrop-blur-sm text-accent-foreground text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4">
                  {category.productCount} produtos
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3 tracking-wide">
                  {category.name}
                </h3>
                <p className="text-primary-foreground/70 mb-6 line-clamp-2">{category.description}</p>
                <div className="inline-flex items-center gap-3 text-accent font-bold uppercase tracking-wider text-sm group-hover:gap-5 transition-all">
                  Explorar
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
