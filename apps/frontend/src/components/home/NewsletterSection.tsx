import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
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
      title: 'Bem-vindo à comunidade!',
      description: 'Use VERTICE10 para 10% OFF na primeira compra.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-noise opacity-20" />
      <div className="absolute inset-0 gothic-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 border border-accent/30 mb-8">
            <Mail size={24} className="text-accent" strokeWidth={1.5} />
          </div>
          
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground tracking-wide mb-4">
            ENTRE PARA O CULTO
          </h2>
          
          <p className="text-primary-foreground/60 mb-8 font-body">
            Receba acesso antecipado a drops exclusivos e <span className="text-accent font-medium">10% OFF</span> na primeira compra.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-secondary/50 border-border/30 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-glow-purple"
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  Inscrever
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Trust text */}
          <p className="text-xs text-primary-foreground/40 mt-6">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 gothic-line-accent" />
      <div className="absolute bottom-0 left-0 right-0 gothic-line-accent" />
    </section>
  );
};