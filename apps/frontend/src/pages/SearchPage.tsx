import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesCategory = !selectedCategory || product.category === selectedCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSelectedCategory('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl">Buscar Produtos</h1>

          <form onSubmit={handleSearch} className="mt-5 flex flex-wrap gap-2">
            <div className="relative min-w-[240px] flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome, categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 bg-card/80 pl-10"
              />
            </div>
            <Button type="submit">Buscar</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-border/70 bg-card/60"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              {searchQuery && ` para "${searchQuery}"`}
            </p>
            {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {showFilters && (
            <aside className="lg:w-72">
              <div className="panel-surface space-y-6 p-6">
                <h3 className="font-semibold uppercase tracking-wide">Filtros</h3>

                <div>
                  <Label className="mb-3 block">Categoria</Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={cn(
                        'w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                        !selectedCategory ? 'bg-accent text-accent-foreground' : 'bg-secondary/45 hover:bg-secondary/70'
                      )}
                    >
                      Todas
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          'w-full rounded-md px-3 py-2 text-left text-sm uppercase transition-colors',
                          selectedCategory === category ? 'bg-accent text-accent-foreground' : 'bg-secondary/45 hover:bg-secondary/70'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Faixa de Preco</Label>
                  <div className="px-1">
                    <Slider min={0} max={1000} step={50} value={priceRange} onValueChange={setPriceRange} className="mb-4" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="panel-surface py-12 text-center">
                <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                <h3 className="mb-2 text-xl font-semibold">Nenhum produto encontrado</h3>
                <p className="mb-4 text-muted-foreground">Tente ajustar os filtros ou fazer uma nova busca.</p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
