import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  FolderTree,
  Ticket,
} from 'lucide-react';
import api from '@/lib/api';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products count
        const productsRes = await api.get('/products');
        const products = productsRes.data.data || [];
        
        // For now, we'll use mock data for orders since admin endpoints may not exist yet
        setStats({
          totalProducts: products.length,
          totalOrders: 0,
          totalRevenue: 0,
          pendingOrders: 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/produtos',
    },
    {
      title: 'Pedidos Totais',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      link: '/admin/pedidos',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      link: '/admin/pedidos',
    },
    {
      title: 'Pedidos Pendentes',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      link: '/admin/pedidos?status=pending',
    },
  ];

  const quickActions = [
    {
      title: 'Adicionar Produto',
      description: 'Cadastre um novo produto na loja',
      icon: Plus,
      link: '/admin/produtos/novo',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Ver Pedidos',
      description: 'Gerencie os pedidos da loja',
      icon: ShoppingCart,
      link: '/admin/pedidos',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Gerenciar Produtos',
      description: 'Edite ou remova produtos existentes',
      icon: Package,
      link: '/admin/produtos',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Configurações',
      description: 'Configure a loja',
      icon: Settings,
      link: '/admin/configuracoes',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Gerencie sua loja VÉRTICE</p>
            </div>
            <Link to="/">
              <Button variant="outline">Voltar para Loja</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full ${action.color} mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Menu de Administração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Link to="/admin/produtos">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Produtos
                </Button>
              </Link>
              <Link to="/admin/pedidos">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Pedidos
                </Button>
              </Link>
              <Link to="/admin/categorias">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FolderTree className="h-4 w-4" />
                  Categorias
                </Button>
              </Link>
              <Link to="/admin/cupons">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Ticket className="h-4 w-4" />
                  Cupons
                </Button>
              </Link>
              <Link to="/admin/configuracoes">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Ver Loja
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
