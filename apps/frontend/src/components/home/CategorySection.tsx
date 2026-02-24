import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const styleCollections = [
  {
    id: 'tenis',
    name: 'TENIS',
    subtitle: 'Movimento urbano',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    link: '/categoria/tenis',
  },
  {
    id: 'calcas',
    name: 'CALCAS',
    subtitle: 'Base de look diario',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    link: '/categoria/calcas',
  },
  {
    id: 'blusas',
    name: 'BLUSAS',
    subtitle: 'Peso e textura',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    link: '/categoria/blusas',
  },
  {
    id: 'acessorios',
    name: 'ACESSORIOS',
    subtitle: 'Detalhe que assina',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    link: '/categoria/acessorios',
  },
];

export const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative">
      {/* Section Header */}
      <div className="container mb-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-gothic text-sm text-accent tracking-[0.3em] uppercase mb-4 block">Categorias</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
              PECA CERTA, FIT CERTO
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />

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
                  <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
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
              <div className="absolute top-6 left-6 font-gothic text-sm text-muted-foreground/50">0{index + 1}</div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            to="/ofertas"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm"
          >
            Ver todas as colecoes
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
