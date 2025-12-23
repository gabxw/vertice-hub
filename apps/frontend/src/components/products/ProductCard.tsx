import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Flame } from 'lucide-react';
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addItem({ variantId: product.id, quantity: 1 });
      toast({
        title: 'Adicionado! 🔥',
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
      <Link to={`/produto/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-muted card-street">
        {/* Main Image */}
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={product.name}
            loading="lazy"
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              isHovered && images[1] && 'opacity-0',
              'group-hover:scale-105'
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted font-body">
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
              'absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Discount Badge - Neon Style */}
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 bg-accent text-accent-foreground font-bold text-sm px-3 py-2 font-display tracking-wider">
            -{discountPercentage}%
          </div>
        )}

        {/* Hot/New Badges */}
        <div className="absolute top-0 right-0 flex flex-col items-end">
          {product.isBestSeller && (
            <span className="bg-neon-pink text-neon-pink-foreground text-xs font-bold px-3 py-1.5 uppercase tracking-wider flex items-center gap-1">
              <Flame size={12} />
              HOT
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-neon-blue text-neon-blue-foreground text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
              DROP
            </span>
          )}
        </div>

        {/* Low Stock Warning */}
        {stock <= 5 && stock > 0 && (
          <div className="absolute bottom-12 left-0 right-0 bg-rust text-rust-foreground text-xs font-bold py-2 text-center uppercase tracking-wider">
            Últimas {stock} peças
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-12 right-2 w-10 h-10 flex items-center justify-center transition-all',
            isWishlisted
              ? 'bg-accent text-accent-foreground'
              : 'bg-secondary/90 text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={16} className={isWishlisted ? 'fill-current' : ''} strokeWidth={2} />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-accent text-accent-foreground h-12 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300',
            'translate-y-full group-hover:translate-y-0',
            stock <= 5 && stock > 0 && 'group-hover:-translate-y-10',
            (isAdding || stock === 0) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ShoppingBag size={16} strokeWidth={2} />
          {stock === 0 ? 'ESGOTADO' : isAdding ? 'ADICIONANDO...' : 'COMPRAR'}
        </button>

        {/* Hover border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-300 pointer-events-none" />
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        {/* Name */}
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-body font-bold text-sm leading-tight text-foreground hover:text-accent transition-colors line-clamp-2 uppercase tracking-wide">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-display text-2xl text-foreground">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-body">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Installments */}
        <p className="text-xs text-muted-foreground font-body">
          ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
        </p>

        {/* Free Shipping Indicator */}
        {product.price >= 299 && (
          <div className="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-wider">
            <Truck size={14} strokeWidth={2} />
            <span>Frete Grátis</span>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex gap-1.5 pt-1">
            {colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-5 h-5 border-2 border-border hover:border-accent transition-colors"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-muted-foreground font-body">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
