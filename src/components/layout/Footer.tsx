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
    <footer className="bg-gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 justify-center group">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <badge.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-bold tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-4 tracking-[0.1em]">
              VÉRTICE
            </h2>
            <p className="text-sm text-primary-foreground/60 mb-6 leading-relaxed">
              Streetwear autêntico pra quem faz suas próprias regras. Estilo, atitude e originalidade em cada peça.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-5 tracking-wide">Navegação</h3>
            <ul className="space-y-3">
              <li><Link to="/categoria/tenis" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Tênis</Link></li>
              <li><Link to="/categoria/calcas" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Calças</Link></li>
              <li><Link to="/categoria/blusas" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Blusas</Link></li>
              <li><Link to="/ofertas" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-display text-lg font-bold mb-5 tracking-wide">Institucional</h3>
            <ul className="space-y-3">
              <li><Link to="/sobre" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Quem Somos</Link></li>
              <li><Link to="/politica-troca" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Política de Troca</Link></li>
              <li><Link to="/privacidade" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold mb-5 tracking-wide">Contato</h3>
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

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40 tracking-wide">
              © 2024 VÉRTICE. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-7 opacity-60 hover:opacity-100 transition-opacity" />
              <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-7 opacity-60 hover:opacity-100 transition-opacity" />
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968144.png" alt="Pix" className="h-7 opacity-60 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
