import { useState } from 'react';
import { Mail, ArrowRight, Zap } from 'lucide-react';
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
      title: 'Bem-vindo à crew! 🔥',
      description: 'Use VERTICE10 para 10% OFF na primeira compra.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-concrete opacity-50" />
      <div className="absolute inset-0 urban-grid" />
      
      {/* Accent stripes */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent mb-8">
            <Zap size={28} className="text-accent-foreground" />
          </div>
          
          {/* Headline */}
          <h2 className="font-display text-4xl md:text-6xl text-primary-foreground tracking-wider mb-4">
            ENTRA PRO BONDE
          </h2>
          
          <p className="text-primary-foreground/70 mb-10 font-body text-lg max-w-lg mx-auto">
            Receba acesso antecipado a drops exclusivos e <span className="text-accent font-bold">10% OFF</span> na primeira compra.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-12 bg-primary border-2 border-border text-primary-foreground placeholder:text-muted-foreground focus:border-accent font-body"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-widest font-bold transition-all duration-300 hover:shadow-glow-neon"
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Trust text */}
          <p className="text-xs text-primary-foreground/40 mt-6 font-body">
            Sem spam. Só conteúdo que importa.
          </p>
        </div>
      </div>
    </section>
  );
};
