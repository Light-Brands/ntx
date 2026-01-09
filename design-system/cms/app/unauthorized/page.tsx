'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user becomes admin, redirect to dashboard
    if (!loading && user && isAdmin) {
      router.push('/');
    }
    // If user logs out, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, isAdmin, router]);

  // Show loading state briefly after login to allow admin check to complete
  if (loading || (user && isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <ShieldX className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this area. This CMS is restricted to administrators only.
          </p>
          {user && (
            <p className="text-sm text-muted-foreground mb-6">
              You are logged in as: <span className="font-medium">{user.email}</span>
            </p>
          )}
        </div>
        <Button
          onClick={() => router.push('/login')}
          variant="outline"
          className="w-full"
        >
          {user ? 'Sign Out' : 'Go to Login'}
        </Button>
      </Card>
    </div>
  );
}
