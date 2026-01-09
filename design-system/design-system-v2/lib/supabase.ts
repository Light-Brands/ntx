// =============================================================================
// Supabase Client - Browser client for CMS operations
// =============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (set in vite.config.ts)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables not configured. CMS features will be disabled.',
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create Supabase client
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Database table names
export const TABLES = {
  POSTS: 'posts',
  ADMINS: 'admins',
} as const;

// Storage bucket names
export const BUCKETS = {
  BLOG_IMAGES: 'blog-images',
} as const;

// Storage paths
export const STORAGE_PATHS = {
  UPLOADS: 'uploads',
} as const;
