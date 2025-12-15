import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos.'
          : 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta!',
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login | VÉRTICE</title>
        <meta name="description" content="Faça login na sua conta VÉRTICE" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-card">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="font-display text-3xl font-bold">VÉRTICE</h1>
              </Link>
              <p className="text-muted-foreground mt-2">Entre na sua conta</p>
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

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link to="/recuperar-senha" className="text-accent hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link to="/cadastro" className="text-accent hover:underline font-semibold">
                Cadastre-se
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Ao continuar, você concorda com nossos{' '}
            <Link to="/termos" className="hover:text-foreground">Termos de Uso</Link>
            {' '}e{' '}
            <Link to="/privacidade" className="hover:text-foreground">Política de Privacidade</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
