import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAddToCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  stock?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors?: { name: string; hex: string }[];
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: ProductCardProduct;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { mutateAsync: addItem } = useAddToCart();
  const { toast } = useToast();

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const stock = product.stock ?? 99;
  const colors = product.colors ?? [];
  const images = product.images ?? [];
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addItem({ variantId: product.id, quantity: 1 });
      toast({
        title: 'Adicionado ao carrinho',
        description: product.name,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar ao carrinho',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/produto/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-muted card-gothic">
        {/* Main Image */}
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={product.name}
            loading="lazy"
            className={cn(
              'w-full h-full object-cover transition-all duration-700 filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105',
              isHovered && images[1] && 'opacity-0'
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
            Sem imagem
          </div>
        )}
        
        {/* Second Image on Hover */}
        {images[1] && (
          <img
            src={images[1]}
            alt={product.name}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 bg-accent text-accent-foreground font-bold text-xs px-3 py-1.5 uppercase tracking-wider">
            -{discountPercentage}%
          </div>
        )}

        {/* New/Bestseller Badges */}
        <div className="absolute top-0 right-0 flex flex-col items-end">
          {product.isBestSeller && (
            <span className="bg-primary text-primary-foreground text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              Top
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-secondary text-secondary-foreground text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              Novo
            </span>
          )}
        </div>

        {/* Low Stock Warning */}
        {stock <= 5 && stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-wine text-wine-foreground text-xs font-medium py-1.5 text-center">
            Últimas {stock} unidades
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-10 right-2 w-8 h-8 flex items-center justify-center transition-all border',
            isWishlisted
              ? 'bg-accent text-accent-foreground border-accent'
              : 'bg-background/90 text-foreground border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent'
          )}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={14} className={isWishlisted ? 'fill-current' : ''} strokeWidth={1.5} />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground h-11 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300',
            'translate-y-full group-hover:translate-y-0',
            stock <= 5 && stock > 0 && 'translate-y-[-36px] group-hover:translate-y-[-36px]',
            (isAdding || stock === 0) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          {stock === 0 ? 'Esgotado' : isAdding ? 'Adicionando...' : 'Adicionar'}
        </button>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        {/* Rating */}
        {reviews > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={10}
                  className={cn(
                    star <= Math.round(rating) ? 'text-accent fill-accent' : 'text-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        )}

        {/* Name */}
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-medium text-sm leading-tight text-foreground hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-base text-foreground">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Installments */}
        <p className="text-xs text-muted-foreground">
          ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')}
        </p>

        {/* Free Shipping Indicator */}
        {product.price >= 299 && (
          <div className="flex items-center gap-1 text-xs text-accent font-medium">
            <Truck size={12} strokeWidth={1.5} />
            <span>Frete Grátis</span>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex gap-1 pt-1">
            {colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-muted-foreground">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};