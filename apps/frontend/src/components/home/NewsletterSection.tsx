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
        title: 'Campo obrigatorio',
        description: 'Por favor, informe seu e-mail.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Cadastro confirmado',
      description: 'Use o codigo VERTICE10 para 10% OFF.',
    });

    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80)',
        }}
      />

      {/* Texture */}
      <div className="absolute inset-0 texture-grunge" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block font-gothic text-xs text-accent tracking-[0.4em] uppercase mb-6 border border-accent/30 px-4 py-2">
            Insider list
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
            ENTRE NA LISTA PRIORITARIA
          </h2>

          <p className="text-muted-foreground font-body text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Receba os proximos drops, reposicoes e ofertas antes de todo mundo, com
            <span className="text-accent font-medium"> 10% OFF </span>
            na primeira compra.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent font-body"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-[0.15em] transition-all duration-300"
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  ENTRAR
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground/60 mt-6 font-body">Sem spam. Conteudo objetivo. Saida com um clique.</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
    </section>
  );
};
