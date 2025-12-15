import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      toast({
        title: 'Erro ao enviar email',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } else {
      setEmailSent(true);
      toast({
        title: 'Email enviado!',
        description: 'Verifique sua caixa de entrada.',
      });
    }

    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <>
        <Helmet>
          <title>Email Enviado | VÉRTICE</title>
        </Helmet>

        <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
          <div className="w-full max-w-md">
            <div className="bg-card p-8 rounded-2xl shadow-card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-accent" />
              </div>

              <h2 className="font-display text-2xl font-bold mb-4">Email enviado!</h2>
              <p className="text-muted-foreground mb-8">
                Enviamos um link de recuperação para <strong>{email}</strong>.
                Verifique sua caixa de entrada e spam.
              </p>

              <Link to="/login">
                <Button className="w-full" size="lg">
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar para o login
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Recuperar Senha | VÉRTICE</title>
        <meta name="description" content="Recupere sua senha da VÉRTICE" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-card">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={16} />
              Voltar
            </Link>

            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Recuperar senha</h1>
              <p className="text-muted-foreground">
                Digite seu email e enviaremos um link para redefinir sua senha.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
