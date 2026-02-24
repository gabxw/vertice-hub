import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AuthShellProps {
  children: ReactNode;
}

export const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="urban-grid absolute inset-0 opacity-20" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-electric/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <Card className="panel-surface relative z-10 w-full max-w-md border-border/70">{children}</Card>
    </div>
  );
};
