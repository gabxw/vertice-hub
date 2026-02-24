import { useState } from 'react';
import { Mail, Gift, Check } from 'lucide-react';
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
      description: 'Verifique seu e-mail para resgatar seu desconto.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
            <Gift size={16} />
            <span className="text-sm font-semibold">Oferta Exclusiva</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ganhe 10% de desconto
          </h2>
          <p className="text-primary-foreground/70 mb-8 text-lg">
            Inscreva-se e receba ofertas exclusivas direto no seu e-mail.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-11 bg-primary-foreground text-primary placeholder:text-muted-foreground rounded-xl border-0"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl"
            >
              {isLoading ? 'Enviando...' : 'Quero meu cupom'}
            </Button>
          </form>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-1">
              <Check size={14} className="text-success" />
              <span>Sem spam</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={14} className="text-success" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
