// =============================================================================
// CMS Auth Context - Supabase authentication for CMS
// =============================================================================

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, TABLES } from '../lib/supabase';

// =============================================================================
// Types
// =============================================================================

interface CMSAuthContextValue {
  // State
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;

  // Auth actions
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithOTP: (email: string) => Promise<{ error: string | null }>;
  verifyOTP: (email: string, token: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;

  // Helpers
  clearError: () => void;
}

// =============================================================================
// Context
// =============================================================================

const CMSAuthContext = createContext<CMSAuthContextValue | null>(null);

// =============================================================================
// Provider
// =============================================================================

interface CMSAuthProviderProps {
  children: ReactNode;
}

export function CMSAuthProvider({ children }: CMSAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Check if user is admin
  // ---------------------------------------------------------------------------
  const checkAdminStatus = useCallback(async (userId: string | undefined) => {
    if (!userId || !isSupabaseConfigured()) {
      setIsAdmin(false);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.ADMINS)
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        return false;
      }

      const adminStatus = data !== null;
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Admin check exception:', error);
      setIsAdmin(false);
      return false;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Initialize auth state
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      await checkAdminStatus(session?.user?.id);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        await checkAdminStatus(session?.user?.id);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  // ---------------------------------------------------------------------------
  // Sign in with email/password
  // ---------------------------------------------------------------------------
  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase not configured' };
    }

    setError(null);
    setLoading(true);

    try {
      const { error: authError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        const errorMessage = authError.message || 'Failed to sign in';
        setError(errorMessage);
        setLoading(false);
        return { error: errorMessage };
      }

      if (data.user) {
        const adminStatus = await checkAdminStatus(data.user.id);
        if (!adminStatus) {
          // Sign out non-admin users
          await supabase.auth.signOut();
          const errorMessage = 'Access denied. Admin privileges required.';
          setError(errorMessage);
          setLoading(false);
          return { error: errorMessage };
        }
      }

      setLoading(false);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  }, [checkAdminStatus]);

  // ---------------------------------------------------------------------------
  // Sign in with OTP
  // ---------------------------------------------------------------------------
  const signInWithOTP = useCallback(async (email: string) => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase not configured' };
    }

    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Only allow existing users
        },
      });

      if (authError) {
        const errorMessage = authError.message || 'Failed to send OTP';
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { error: errorMessage };
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Verify OTP
  // ---------------------------------------------------------------------------
  const verifyOTP = useCallback(async (email: string, token: string) => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase not configured' };
    }

    setError(null);
    setLoading(true);

    try {
      const { error: authError, data } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (authError) {
        const errorMessage = authError.message || 'Failed to verify OTP';
        setError(errorMessage);
        setLoading(false);
        return { error: errorMessage };
      }

      if (data.user) {
        const adminStatus = await checkAdminStatus(data.user.id);
        if (!adminStatus) {
          await supabase.auth.signOut();
          const errorMessage = 'Access denied. Admin privileges required.';
          setError(errorMessage);
          setLoading(false);
          return { error: errorMessage };
        }
      }

      setLoading(false);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  }, [checkAdminStatus]);

  // ---------------------------------------------------------------------------
  // Sign out
  // ---------------------------------------------------------------------------
  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) return;

    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setError(null);
  }, []);

  // ---------------------------------------------------------------------------
  // Reset password
  // ---------------------------------------------------------------------------
  const resetPassword = useCallback(async (email: string) => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase not configured' };
    }

    setError(null);

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (authError) {
        const errorMessage = authError.message || 'Failed to send reset email';
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { error: errorMessage };
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Update password
  // ---------------------------------------------------------------------------
  const updatePassword = useCallback(async (newPassword: string) => {
    if (!isSupabaseConfigured()) {
      return { error: 'Supabase not configured' };
    }

    setError(null);

    try {
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authError) {
        const errorMessage = authError.message || 'Failed to update password';
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { error: errorMessage };
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Clear error
  // ---------------------------------------------------------------------------
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ---------------------------------------------------------------------------
  // Context value
  // ---------------------------------------------------------------------------
  const value: CMSAuthContextValue = {
    user,
    session,
    isAdmin,
    loading,
    error,
    signIn,
    signInWithOTP,
    verifyOTP,
    signOut,
    resetPassword,
    updatePassword,
    clearError,
  };

  return (
    <CMSAuthContext.Provider value={value}>
      {children}
    </CMSAuthContext.Provider>
  );
}

// =============================================================================
// Hooks
// =============================================================================

export function useCMSAuth() {
  const context = useContext(CMSAuthContext);
  if (!context) {
    throw new Error('useCMSAuth must be used within a CMSAuthProvider');
  }
  return context;
}

// Hook to check if user is authenticated and admin
export function useRequireAdmin() {
  const { isAdmin, loading, user } = useCMSAuth();
  return {
    isAdmin,
    loading,
    isAuthenticated: !!user,
    canAccess: !loading && isAdmin,
  };
}
