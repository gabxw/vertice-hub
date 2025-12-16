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
      <Link to={`/produto/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            isHovered && 'scale-110 opacity-0'
          )}
        />
        
        {/* Second Image on Hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-110',
              isHovered ? 'opacity-100 scale-100' : 'opacity-0'
            )}
          />
        )}

        {/* Badges */}
        <div className="absolute top-0 left-0 flex flex-col">
          {product.isNew && (
            <span className="bg-neon text-neon-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
              Novo
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
              -{discountPercentage}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-hot text-hot-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
              Últimas {product.stock}
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
            'absolute top-3 right-3 w-10 h-10 flex items-center justify-center transition-all',
            isWishlisted
              ? 'bg-accent text-accent-foreground'
              : 'bg-background/90 text-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Quick Actions */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 flex transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          )}
        >
          <button className="flex-1 bg-primary text-primary-foreground h-12 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent transition-colors">
            <ShoppingBag size={16} />
            Adicionar
          </button>
          <Link
            to={`/produto/${product.slug}`}
            className="w-12 h-12 bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-2">
        {/* Category */}
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          {product.category}
        </span>

        {/* Name */}
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-display text-lg uppercase leading-tight hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 border border-border hover:scale-125 transition-transform cursor-pointer"
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
