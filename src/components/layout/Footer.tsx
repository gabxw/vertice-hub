import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Shield, Truck, RefreshCw, CreditCard } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'Compra Segura' },
  { icon: Truck, label: 'Entrega Rápida' },
  { icon: RefreshCw, label: '30 Dias Troca' },
  { icon: CreditCard, label: 'Parcelamos' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 justify-center">
                <badge.icon className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              URBAN<span className="text-accent">.</span>STYLE
            </h2>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Moda urbana para quem não aceita o comum. Estilo, conforto e atitude em cada peça.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/categoria/tenis" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Tênis</Link></li>
              <li><Link to="/categoria/calcas" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Calças</Link></li>
              <li><Link to="/categoria/blusas" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Blusas</Link></li>
              <li><Link to="/ofertas" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Quem Somos</Link></li>
              <li><Link to="/politica-troca" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Política de Troca</Link></li>
              <li><Link to="/privacidade" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail size={16} />
                contato@urbanstyle.com.br
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone size={16} />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={16} />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/50">
              © 2024 Urban Style. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-6 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968144.png" alt="Pix" className="h-6 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
