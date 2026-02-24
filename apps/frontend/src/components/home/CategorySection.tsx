import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

const accentStyles = [
  {
    bar: 'bg-accent',
    text: 'text-accent',
    corner: 'bg-accent',
  },
  {
    bar: 'bg-neon',
    text: 'text-neon',
    corner: 'bg-neon',
  },
  {
    bar: 'bg-electric',
    text: 'text-electric',
    corner: 'bg-electric',
  },
];

export const CategorySection = () => {
  return (
    <section className="bg-background/40 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-accent">Colecoes</span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl">
              EXPLORE POR
              <br />
              CATEGORIA
            </h2>
          </div>
          <p className="max-w-md text-sm font-light text-muted-foreground md:text-base">
            Do streetwear ao casual, encontre pecas que definem seu estilo unico.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((category, index) => {
            const accent = accentStyles[index % accentStyles.length];

            return (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className={cn(
                  'group panel-surface relative overflow-hidden rounded-2xl animate-fade-in',
                  index === 0 && 'md:row-span-2 md:aspect-auto aspect-[3/4]',
                  index !== 0 && 'aspect-[4/3]'
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-transparent" />
                <div className={cn('absolute left-0 top-0 h-full w-1', accent.bar)} />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className={cn('mb-2 block text-xs font-bold uppercase tracking-[0.2em]', accent.text)}>
                    {category.productCount} produtos
                  </span>
                  <h3 className="mb-3 font-display text-3xl text-primary-foreground md:text-4xl lg:text-5xl">
                    {category.name.toUpperCase()}
                  </h3>
                  <div className={cn('inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all group-hover:gap-4', accent.text)}>
                    Ver Colecao
                    <ArrowRight size={16} />
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
                  <div className={cn('absolute -right-8 -top-8 h-16 w-16 rotate-45', accent.corner)} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
