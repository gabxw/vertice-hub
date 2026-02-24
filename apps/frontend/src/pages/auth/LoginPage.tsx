import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthShell } from '@/components/auth/AuthShell';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fromPath = (location.state as { from?: { pathname: string; search?: string } } | null)?.from;
  const redirectFromQuery = new URLSearchParams(location.search).get('redirect');
  const safeRedirectFromQuery =
    redirectFromQuery && redirectFromQuery.startsWith('/') && !redirectFromQuery.startsWith('//')
      ? redirectFromQuery
      : null;
  const redirectTo = safeRedirectFromQuery || (fromPath ? `${fromPath.pathname}${fromPath.search || ''}` : '/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Entrar</CardTitle>
        <CardDescription className="text-center">
          {redirectTo === '/checkout'
            ? 'Entre para continuar seu checkout com seguranca'
            : 'Entre com seu email e senha para acessar sua conta'}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="bg-secondary/55"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link to="/recuperar-senha" className="text-sm text-accent hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-secondary/55"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Nao tem uma conta?{' '}
            <Link
              to={`/cadastro${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-medium text-accent hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </CardFooter>
      </form>
    </AuthShell>
  );
}
