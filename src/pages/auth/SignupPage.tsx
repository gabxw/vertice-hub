import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'Mínimo 6 caracteres', met: password.length >= 6 },
    { label: 'Senhas coincidem', met: password === confirmPassword && password.length > 0 },
  ];

  const isFormValid = fullName && email && password.length >= 6 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast({
        title: 'Verifique os campos',
        description: 'Por favor, preencha todos os campos corretamente.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message === 'User already registered'
          ? 'Este email já está cadastrado.'
          : 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você já pode fazer login.',
      });
      navigate('/login');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Cadastre-se | VÉRTICE</title>
        <meta name="description" content="Crie sua conta na VÉRTICE" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-card">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="font-display text-3xl font-bold">VÉRTICE</h1>
              </Link>
              <p className="text-muted-foreground mt-2">Crie sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={cn(
                      'flex items-center gap-2 text-sm transition-colors',
                      req.met ? 'text-success' : 'text-muted-foreground'
                    )}
                  >
                    <Check
                      size={16}
                      className={cn(
                        'transition-opacity',
                        req.met ? 'opacity-100' : 'opacity-30'
                      )}
                    />
                    <span>{req.label}</span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Já tem uma conta? </span>
              <Link to="/login" className="text-accent hover:underline font-semibold">
                Faça login
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link to="/termos" className="hover:text-foreground">Termos de Uso</Link>
            {' '}e{' '}
            <Link to="/privacidade" className="hover:text-foreground">Política de Privacidade</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
