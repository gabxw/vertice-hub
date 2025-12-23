import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck } from 'lucide-react';
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
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/produto/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
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
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted font-body text-sm">
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

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground font-display text-sm px-2 py-1 tracking-wider">
            -{discountPercentage}%
          </div>
        )}

        {/* New/Bestseller Badge */}
        {product.isNew && !discountPercentage && (
          <div className="absolute top-3 left-3 bg-foreground text-background font-display text-xs px-2 py-1 tracking-wider">
            NOVO
          </div>
        )}

        {/* Low Stock */}
        {stock <= 5 && stock > 0 && (
          <div className="absolute bottom-12 left-0 right-0 bg-accent/90 text-accent-foreground text-xs font-body py-1.5 text-center">
            Últimas {stock} unidades
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-all bg-background/80 hover:bg-background',
            isWishlisted && 'text-accent'
          )}
          aria-label="Favoritar"
        >
          <Heart size={16} className={isWishlisted ? 'fill-current' : ''} strokeWidth={1.5} />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-foreground text-background h-11 font-display text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300',
            'translate-y-full group-hover:translate-y-0',
            stock <= 5 && stock > 0 && 'group-hover:-translate-y-8',
            (isAdding || stock === 0) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          {stock === 0 ? 'ESGOTADO' : isAdding ? 'ADICIONANDO...' : 'ADICIONAR'}
        </button>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-body text-sm text-foreground leading-snug line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display text-xl text-foreground">
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
          ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')}
        </p>

        {/* Free Shipping */}
        {product.price >= 299 && (
          <div className="flex items-center gap-1.5 text-xs text-accent font-body">
            <Truck size={12} strokeWidth={1.5} />
            <span>Frete grátis</span>
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
              <span className="text-xs text-muted-foreground font-body">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
