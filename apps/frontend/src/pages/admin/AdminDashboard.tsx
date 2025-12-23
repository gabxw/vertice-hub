import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
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
        const productsRes = await api.get('/products');
        const products = productsRes.data.data || [];
        
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
      change: '+12%',
      changeType: 'positive' as const,
      href: '/admin/produtos',
    },
    {
      title: 'Pedidos Totais',
      value: stats.totalOrders,
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'positive' as const,
      href: '/admin/pedidos',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+23%',
      changeType: 'positive' as const,
      href: '/admin/pedidos',
    },
    {
      title: 'Pedidos Pendentes',
      value: stats.pendingOrders,
      icon: TrendingUp,
      change: '-5%',
      changeType: 'negative' as const,
      href: '/admin/pedidos?status=pending',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-display tracking-wide">BEM-VINDO DE VOLTA</h2>
        <p className="text-muted-foreground mt-1">Aqui está um resumo da sua loja hoje.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="hover:shadow-card-hover transition-all duration-300 cursor-pointer border-border hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span>{stat.change} vs mês anterior</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-sm bg-muted">
                    <stat.icon className="h-6 w-6 text-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-display tracking-wide mb-4">AÇÕES RÁPIDAS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/produtos/novo">
            <Card className="hover:shadow-card-hover transition-all cursor-pointer group border-border hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-4 rounded-sm bg-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Novo Produto</h4>
                <p className="text-sm text-muted-foreground mt-1">Adicionar produto</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/pedidos">
            <Card className="hover:shadow-card-hover transition-all cursor-pointer group border-border hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-4 rounded-sm bg-success text-success-foreground mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Ver Pedidos</h4>
                <p className="text-sm text-muted-foreground mt-1">Gerenciar pedidos</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/produtos">
            <Card className="hover:shadow-card-hover transition-all cursor-pointer group border-border hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-4 rounded-sm bg-electric text-electric-foreground mb-4 group-hover:scale-110 transition-transform">
                  <Package className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Produtos</h4>
                <p className="text-sm text-muted-foreground mt-1">Gerenciar estoque</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/">
            <Card className="hover:shadow-card-hover transition-all cursor-pointer group border-border hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-4 rounded-sm bg-muted mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">Ver Loja</h4>
                <p className="text-sm text-muted-foreground mt-1">Visitar site</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
