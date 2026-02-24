import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const styleCollections = [
  {
    id: 'tenis',
    name: 'TENIS',
    subtitle: 'Bota e sola pesada',
    image: '/streetwear-90s-hero.jpg',
    objectPosition: '50% 98%',
    link: '/categoria/tenis',
  },
  {
    id: 'calcas',
    name: 'CALCAS',
    subtitle: 'Baggy jeans vintage',
    image: '/streetwear-90s-hero.jpg',
    objectPosition: '50% 78%',
    link: '/categoria/calcas',
  },
  {
    id: 'blusas',
    name: 'BLUSAS',
    subtitle: 'Oversized em camada',
    image: '/streetwear-90s-hero.jpg',
    objectPosition: '50% 20%',
    link: '/categoria/blusas',
  },
  {
    id: 'acessorios',
    name: 'ACESSORIOS',
    subtitle: 'Bag, chaveiro e metal',
    image: '/streetwear-90s-hero.jpg',
    objectPosition: '50% 36%',
    link: '/categoria/acessorios',
  },
];

export const CategorySection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mb-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-gothic text-sm text-accent tracking-[0.3em] uppercase mb-4 block">Categorias</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">STREETWEAR 90S</h2>
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

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {styleCollections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  style={{ objectPosition: collection.objectPosition }}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 img-grunge"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {collection.subtitle}
                </span>

                <div className="flex items-end justify-between">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                    {collection.name}
                  </h3>

                  <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className="text-foreground group-hover:text-accent-foreground transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute top-6 left-6 font-gothic text-sm text-muted-foreground/50">0{index + 1}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Link
            to="/ofertas"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm"
          >
            Ver todas as categorias
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
