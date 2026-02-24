import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-accent" />
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // For now, we'll allow any logged-in user to access admin
  // In production, you should check for admin role:
  // const isAdmin = user.user_metadata?.role === 'admin' || user.email === 'admin@vertice.com';
  
  // List of admin emails (temporary solution)
  const adminEmails = [
    'gabriel.jmaciel13@gmail.com',
    'admin@vertice.com',
  ];
  
  const isAdmin = adminEmails.includes(user.email || '');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
