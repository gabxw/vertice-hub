import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, LogOut, UserCircle, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categoria/tenis', label: 'Tênis' },
  { href: '/categoria/calcas', label: 'Calças' },
  { href: '/categoria/blusas', label: 'Blusas' },
  { href: '/ofertas', label: 'Ofertas', highlight: true },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Top bar - Promotional */}
      <div className="bg-gradient-to-r from-accent via-accent/90 to-accent text-accent-foreground text-center py-2.5 px-4">
        <p className="text-xs md:text-sm font-bold tracking-wide">
          ⚡ FRETE GRÁTIS acima de R$ 299 | Cupom: <span className="bg-background/20 px-2 py-0.5 rounded">PRIMEIRA10</span>
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2 hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] group-hover:text-accent transition-colors">
              VÉRTICE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-medium text-sm uppercase tracking-[0.15em] transition-all hover:text-accent relative py-2',
                  location.pathname === link.href && 'text-accent',
                  link.highlight && 'text-destructive font-bold',
                  location.pathname === link.href && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:text-accent transition-colors" aria-label="Buscar">
              <Search size={20} />
            </button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:text-accent transition-colors hidden md:flex items-center gap-2" aria-label="Conta">
                    <User size={20} />
                    {profile?.full_name && (
                      <span className="text-sm font-medium hidden lg:inline">
                        {profile.full_name.split(' ')[0]}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-semibold">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/minha-conta" className="cursor-pointer">
                      <UserCircle size={16} className="mr-2" />
                      Minha Conta
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/minha-conta/pedidos" className="cursor-pointer">
                      <Package size={16} className="mr-2" />
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="p-2 hover:text-accent transition-colors hidden md:block" aria-label="Entrar">
                <User size={20} />
              </Link>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:text-accent transition-colors group"
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in neon-glow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                'font-medium text-lg py-2 border-b border-border/50 transition-colors hover:text-accent',
                location.pathname === link.href && 'text-accent',
                link.highlight && 'text-destructive font-semibold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
