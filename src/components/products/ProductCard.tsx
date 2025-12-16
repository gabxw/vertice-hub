import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/produto/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            isHovered && 'scale-110'
          )}
        />
        
        {/* Second Image on Hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Gradient overlay on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider neon-glow">
              NOVO
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              -{discountPercentage}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              ÚLTIMAS {product.stock}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all',
            isWishlisted
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-background/80 text-foreground hover:bg-background'
          )}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Quick Actions */}
        <div
          className={cn(
            'absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <button className="flex-1 bg-accent text-accent-foreground h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent/90 transition-all btn-glow uppercase tracking-wider">
            <ShoppingBag size={16} />
            Comprar
          </button>
          <Link
            to={`/produto/${product.slug}`}
            className="w-12 h-12 bg-background/90 backdrop-blur-sm text-foreground rounded-full flex items-center justify-center hover:bg-background transition-all"
          >
            <Eye size={18} />
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-5">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-display font-bold text-sm md:text-base line-clamp-2 hover:text-accent transition-colors tracking-wide">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={cn(
                  'text-sm',
                  star <= Math.round(product.rating) ? 'text-accent' : 'text-muted-foreground/30'
                )}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="font-display font-bold text-xl">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-1 mt-2">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};
