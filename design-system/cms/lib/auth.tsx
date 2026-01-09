'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseBrowser } from './supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithOTP: (email: string) => Promise<{ error: any }>;
  verifyOTP: (email: string, token: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Check if user is admin
  const checkAdminStatus = async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabaseBrowser
        .from('admins')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to handle 0 results gracefully

      // Log for debugging (remove in production)
      if (error) {
        console.error('Admin check error:', error);
      }

      setIsAdmin(!error && data !== null);
    } catch (error) {
      console.error('Admin check exception:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabaseBrowser.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      await checkAdminStatus(session?.user?.id);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      await checkAdminStatus(session?.user?.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error && data.user) {
      // Check admin status after successful login
      await checkAdminStatus(data.user.id);
      // Redirect will be handled by the page components based on admin status
      router.push('/');
    }
    
    return { error };
  };

  const signInWithOTP = async (email: string) => {
    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Only allow existing users (admins)
      },
    });
    
    return { error };
  };

  const verifyOTP = async (email: string, token: string) => {
    const { error, data } = await supabaseBrowser.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    
    if (!error && data.user) {
      // Check admin status after successful login and wait for it to complete
      await checkAdminStatus(data.user.id);
      // Small delay to ensure state updates propagate
      await new Promise(resolve => setTimeout(resolve, 100));
      // Redirect will be handled by the page components based on admin status
      router.push('/');
    }
    
    return { error };
  };

  const signOut = async () => {
    await supabaseBrowser.auth.signOut();
    router.push('/login');
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabaseBrowser.auth.updateUser({
      password: newPassword,
    });
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signInWithOTP, verifyOTP, signOut, resetPassword, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
