import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone, Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

const trustBadges = [
  { icon: Truck, label: 'Frete Grátis +R$299' },
  { icon: Shield, label: 'Compra Segura' },
  { icon: RefreshCw, label: '30 Dias Troca' },
  { icon: CreditCard, label: '12x Sem Juros' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-4xl tracking-[0.1em] mb-6">
              VÉRTICE
            </h2>
            <p className="text-sm text-primary-foreground/60 mb-6 font-light leading-relaxed">
              Streetwear autêntico para quem faz suas próprias regras. Atitude, exclusividade e movimento em cada peça.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" 
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xl tracking-wider mb-6">NAVEGAÇÃO</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categoria/tenis" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Tênis
                </Link>
              </li>
              <li>
                <Link to="/categoria/calcas" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Calças
                </Link>
              </li>
              <li>
                <Link to="/categoria/blusas" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Blusas
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-sm text-accent hover:text-accent/80 transition-colors uppercase tracking-wider">
                  Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-display text-xl tracking-wider mb-6">INSTITUCIONAL</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/politica-troca" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors uppercase tracking-wider">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl tracking-wider mb-6">CONTATO</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail size={16} className="text-accent" />
                contato@vertice.com.br
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Phone size={16} className="text-accent" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} className="text-accent" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">
              © 2024 VÉRTICE. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6 opacity-50" />
              <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-6 opacity-50" />
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968144.png" alt="Pix" className="h-6 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-1 bg-gradient-to-r from-accent via-neon to-electric" />
    </footer>
  );
};
