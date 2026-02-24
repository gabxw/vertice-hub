import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Package, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/minha-conta', label: 'Meu Perfil', icon: User },
  { path: '/minha-conta/pedidos', label: 'Meus Pedidos', icon: Package },
];

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl">Minha Conta</h1>
          <p className="mt-1 text-muted-foreground">Ola, {profile?.full_name || 'Cliente'}!</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <aside className="md:col-span-1">
            <div className="panel-surface space-y-2 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'accent' : 'ghost'}
                      className={cn('w-full justify-start', !isActive && 'hover:bg-secondary/70')}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}

              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="panel-surface p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
