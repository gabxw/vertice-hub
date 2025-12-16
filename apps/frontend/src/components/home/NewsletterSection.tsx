import { useState } from 'react';
import { Mail, Zap } from 'lucide-react';
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
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Cupom enviado!',
      description: 'Verifique seu e-mail para resgatar 10% de desconto.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Urban Grid */}
      <div className="absolute inset-0 urban-grid opacity-10" />
      
      {/* Accent Elements */}
      <div className="absolute top-0 left-0 w-32 h-1 bg-accent" />
      <div className="absolute top-0 left-0 w-1 h-32 bg-accent" />
      <div className="absolute bottom-0 right-0 w-32 h-1 bg-neon" />
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-neon" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 mb-8">
            <Zap size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Oferta Exclusiva</span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            GANHE <span className="text-accent">10% OFF</span>
          </h2>
          
          <p className="text-primary-foreground/60 mb-10 text-lg font-light max-w-lg mx-auto">
            Inscreva-se e receba desconto na primeira compra + acesso antecipado a drops exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 bg-primary-foreground text-primary placeholder:text-muted-foreground border-none text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider"
            >
              {isLoading ? 'Enviando...' : 'Quero Desconto'}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/40 mt-6 uppercase tracking-wider">
            Nunca enviamos spam. Prometemos.
          </p>
        </div>
      </div>
    </section>
  );
};
