import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const FREE_SHIPPING_THRESHOLD = 299;

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-foreground/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-display text-xl font-semibold">Seu Carrinho</h2>
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:text-accent transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="p-4 bg-muted/50 border-b border-border">
            {remainingForFreeShipping > 0 ? (
              <>
                <p className="text-sm mb-2">
                  Faltam <span className="font-bold text-accent">R$ {remainingForFreeShipping.toFixed(2)}</span> para frete grátis!
                </p>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-success">
                <Truck size={18} />
                <span className="font-semibold">Parabéns! Você ganhou frete grátis!</span>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-muted-foreground/30 mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">Carrinho vazio</h3>
              <p className="text-muted-foreground mb-6">Adicione produtos incríveis ao seu carrinho!</p>
              <Button onClick={() => setIsOpen(false)} variant="default">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-card rounded-lg border border-border animate-fade-in"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Tamanho: {item.size} | Cor: {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="p-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="p-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                    {item.product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        R$ {(item.product.originalPrice * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4 bg-card">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-xl">R$ {totalPrice.toFixed(2)}</span>
            </div>
            <Button 
              asChild 
              className="w-full h-12 text-base font-semibold btn-glow" 
              size="lg"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/checkout">Finalizar Compra</Link>
            </Button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};
