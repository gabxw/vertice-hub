import { useState } from 'react';
import { Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Campo obrigatório',
        description: 'Por favor, insira seu e-mail.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: '🎉 Cupom enviado!',
      description: 'Verifique seu e-mail para resgatar seu desconto de 10%!',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
            <Gift size={18} />
            <span className="text-sm font-semibold uppercase tracking-wide">Oferta Exclusiva</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            GANHE <span className="text-accent">10% OFF</span>
          </h2>
          <p className="text-primary-foreground/70 mb-8 text-lg">
            Inscreva-se e receba 10% de desconto na sua primeira compra + acesso antecipado a lançamentos e promoções.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-10 bg-primary-foreground text-primary placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold btn-glow"
            >
              {isLoading ? 'Enviando...' : 'Quero meu cupom'}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/50 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade. Nunca enviamos spam.
          </p>
        </div>
      </div>
    </section>
  );
};
