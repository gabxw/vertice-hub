import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, LogOut, Package, UserCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categoria/tenis', label: 'Tenis' },
  { href: '/categoria/calcas', label: 'Calcas' },
  { href: '/categoria/blusas', label: 'Blusas' },
  { href: '/categoria/acessorios', label: 'Acessorios' },
  { href: '/ofertas', label: 'Drops', highlight: true },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="border-b border-border/60 bg-accent/95 py-2 text-center text-accent-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Frete gratis acima de R$ 299</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-ml-2 rounded-md p-2 transition-colors hover:bg-secondary/80 hover:text-accent lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center">
            <h1 className="font-display text-3xl tracking-[0.1em] text-foreground md:text-4xl">VERTICE</h1>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative py-2 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent',
                  location.pathname === link.href && 'text-accent',
                  link.highlight && 'text-accent font-semibold'
                )}
              >
                {link.label}
                {location.pathname === link.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-md p-2.5 transition-colors hover:bg-secondary/80 hover:text-accent"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden rounded-md p-2.5 transition-colors hover:bg-secondary/80 hover:text-accent md:block" aria-label="Conta">
                    <User size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.user_metadata?.name || 'Usuario'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/minha-conta" className="flex cursor-pointer items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Minha Conta</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/minha-conta/pedidos" className="flex cursor-pointer items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Meus Pedidos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden rounded-md p-2.5 transition-colors hover:bg-secondary/80 hover:text-accent md:block" aria-label="Entrar">
                <User size={20} />
              </Link>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="relative rounded-md p-2.5 transition-colors hover:bg-secondary/80 hover:text-accent"
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center bg-accent text-[10px] font-bold text-accent-foreground animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="border-t border-border/70 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="O que voce procura?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-md border border-border bg-secondary/70 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
              <Button type="submit" className="bg-accent px-6 font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90">
                Buscar
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowSearch(false)} className="border-border text-foreground hover:bg-secondary">
                <X size={20} />
              </Button>
            </form>
          </div>
        </div>
      )}

      <div
        className={cn(
          'fixed inset-0 top-[96px] z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <nav className="container mx-auto flex flex-col gap-2 px-4 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                'border-b border-border py-3 font-display text-3xl uppercase transition-colors hover:text-accent',
                location.pathname === link.href && 'text-accent',
                link.highlight && 'text-accent'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-8 border-t border-border pt-8">
            {user ? (
              <>
                <Link to="/minha-conta" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-3 text-lg">
                  <UserCircle size={24} />
                  Minha Conta
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 text-lg text-accent"
                >
                  <LogOut size={24} />
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-3 text-lg">
                <User size={24} />
                Entrar / Cadastrar
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
