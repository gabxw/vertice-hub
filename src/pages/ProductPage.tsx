import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Heart, 
  Truck, 
  Shield, 
  RefreshCw,
  Check,
  AlertTriangle
} from 'lucide-react';
import { products, reviews as allReviews } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(product?.stock || 0);

  // Simulate stock decreasing
  useEffect(() => {
    if (product && product.stock <= 10) {
      const timer = setInterval(() => {
        setStock((prev) => Math.max(prev - 1, 1));
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-accent hover:underline">Voltar para a home</Link>
        </div>
      </div>
    );
  }

  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Selecione um tamanho',
        description: 'Por favor, escolha o tamanho antes de adicionar ao carrinho.',
        variant: 'destructive',
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: 'Selecione uma cor',
        description: 'Por favor, escolha a cor antes de adicionar ao carrinho.',
        variant: 'destructive',
      });
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    toast({
      title: '✓ Adicionado ao carrinho!',
      description: `${product.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | VÉRTICE</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>

      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li>/</li>
              <li><Link to={`/categoria/${product.category}`} className="hover:text-foreground capitalize">{product.category}</Link></li>
              <li>/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-lg">
                      NOVO
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-lg">
                      -{discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                        selectedImage === index ? 'border-accent' : 'border-transparent'
                      )}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= Math.round(product.rating) ? 'text-accent text-lg' : 'text-muted text-lg'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
                </p>
              </div>

              {/* Stock Warning */}
              {stock <= 10 && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-3 rounded-lg animate-pulse-slow">
                  <AlertTriangle size={18} />
                  <span className="font-semibold">
                    🔥 Apenas {stock} unidades restantes! Compre agora!
                  </span>
                </div>
              )}

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-3">Cor: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === color.name ? 'border-accent ring-2 ring-accent ring-offset-2' : 'border-border'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold mb-3">Tamanho: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[48px] h-12 px-4 border rounded-lg font-semibold transition-all',
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-foreground'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantidade</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                    className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  size="xl"
                  variant="accent"
                  className="flex-1"
                >
                  Adicionar ao Carrinho
                </Button>
                <Button size="xl" variant="outline" className="w-14">
                  <Heart size={20} />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-accent" />
                  <span className="text-sm">Frete grátis acima de R$299</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm">Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <span className="text-sm">30 dias de troca</span>
                </div>
              </div>

              {/* Story */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-display text-xl font-bold mb-3">Sobre este produto</h3>
                <p className="text-muted-foreground leading-relaxed">{product.story}</p>
                
                <h4 className="font-semibold mt-6 mb-3">Por que você vai amar:</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="font-display text-3xl font-bold mb-8">
              Avaliações dos Clientes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productReviews.map((review) => (
                <div key={review.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded">
                            Compra verificada
                          </span>
                        )}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= review.rating ? 'text-accent' : 'text-muted'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
