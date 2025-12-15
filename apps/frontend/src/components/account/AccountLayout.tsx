import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Package, MapPin, Lock, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/minha-conta', label: 'Meu Perfil', icon: User },
  { path: '/minha-conta/pedidos', label: 'Meus Pedidos', icon: Package },
  { path: '/minha-conta/enderecos', label: 'Endereços', icon: MapPin },
  { path: '/minha-conta/senha', label: 'Alterar Senha', icon: Lock },
];

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Minha Conta</h1>
          <p className="text-gray-600 mt-1">
            Olá, {profile?.full_name || 'Cliente'}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start',
                        isActive && 'bg-primary text-white'
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </aside>

          {/* Content */}
          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
