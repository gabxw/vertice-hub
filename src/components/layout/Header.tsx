import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar - Promotional */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-xs md:text-sm font-medium animate-pulse-slow">
          🔥 FRETE GRÁTIS em compras acima de R$ 299 | Use o cupom: <span className="font-bold">PRIMEIRA10</span>
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
              URBAN<span className="text-accent">.</span>STYLE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-medium text-sm uppercase tracking-wide transition-colors hover:text-accent',
                  location.pathname === link.href && 'text-accent',
                  link.highlight && 'text-destructive font-semibold'
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
            <button className="p-2 hover:text-accent transition-colors hidden md:block" aria-label="Conta">
              <User size={20} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:text-accent transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
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
