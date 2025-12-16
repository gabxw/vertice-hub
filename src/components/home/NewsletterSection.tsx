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
    <section className="py-20 md:py-32 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/30 backdrop-blur-sm text-accent-foreground px-5 py-2.5 rounded-full mb-8 border border-accent/30">
            <Gift size={18} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">Oferta Exclusiva</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            GANHE <span className="text-gradient-neon">10% OFF</span>
          </h2>
          <p className="text-primary-foreground/60 mb-10 text-lg max-w-lg mx-auto">
            Inscreva-se e receba 10% de desconto na sua primeira compra + acesso antecipado a drops exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 bg-primary-foreground text-primary placeholder:text-muted-foreground rounded-full border-0 text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold btn-glow rounded-full uppercase tracking-wider"
            >
              {isLoading ? 'Enviando...' : 'Quero meu cupom'}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/40 mt-6">
            Ao se inscrever, você concorda com nossa política de privacidade. Zero spam.
          </p>
        </div>
      </div>
    </section>
  );
};
