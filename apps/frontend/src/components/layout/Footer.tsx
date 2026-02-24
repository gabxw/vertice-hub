import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone, Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

const trustBadges = [
  { icon: Truck, label: 'Frete Gratis +R$299' },
  { icon: Shield, label: 'Compra Segura' },
  { icon: RefreshCw, label: '30 Dias Troca' },
  { icon: CreditCard, label: '12x Sem Juros' },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border/70 bg-primary text-primary-foreground">
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="panel-surface flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                  <badge.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-5 font-display text-4xl tracking-[0.08em]">VERTICE</h2>
            <p className="mb-6 text-sm font-light leading-relaxed text-primary-foreground/65">
              Streetwear autentico para quem faz as proprias regras. Atitude, exclusividade e movimento em cada peca.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xl tracking-wider">NAVEGACAO</h3>
            <ul className="space-y-3 text-sm uppercase tracking-wider">
              <li>
                <Link to="/categoria/tenis" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Tenis
                </Link>
              </li>
              <li>
                <Link to="/categoria/calcas" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Calcas
                </Link>
              </li>
              <li>
                <Link to="/categoria/blusas" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Blusas
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-neon transition-colors hover:text-neon/75">
                  Drops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xl tracking-wider">INSTITUCIONAL</h3>
            <ul className="space-y-3 text-sm uppercase tracking-wider">
              <li>
                <Link to="/sobre" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/politica-troca" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Trocas e Devolucoes
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-primary-foreground/65 transition-colors hover:text-accent">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xl tracking-wider">CONTATO</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/65">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                contato@vertice.com.br
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                Sao Paulo, SP
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/45">© 2026 VERTICE. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 text-xs text-primary-foreground/65">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Pix</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-accent via-neon to-electric" />
    </footer>
  );
};
