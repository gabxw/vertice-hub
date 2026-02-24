import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter-popup-seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Cupom enviado',
      description: 'Voce recebeu 10% OFF para o primeiro pedido.',
    });

    handleClose();
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className={cn('relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in')}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="h-40 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
            alt="Oferta de boas-vindas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              <Gift size={16} />
              Oferta para novos clientes
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="font-display text-3xl font-bold mb-2">
            ENTRE E GANHE <span className="text-accent">10% OFF</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Cadastre seu e-mail e receba acesso antecipado aos drops + desconto de boas-vindas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-center"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold btn-glow"
            >
              {isLoading ? 'Enviando...' : 'Quero meu cupom'}
            </Button>
          </form>

          <button
            onClick={handleClose}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Agora nao
          </button>
        </div>
      </div>
    </div>
  );
};
