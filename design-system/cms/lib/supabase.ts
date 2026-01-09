import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  const errorMsg = `
❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable.

Please ensure:
1. Your .env.local file exists in the project root
2. It contains: NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
3. You have restarted your Next.js dev server after creating/updating .env.local

Environment variables are only loaded when Next.js starts, so you must restart the dev server.
  `.trim();
  throw new Error(errorMsg);
}

if (!supabaseAnonKey) {
  const errorMsg = `
❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.

Please ensure:
1. Your .env.local file exists in the project root
2. It contains: NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
3. You have restarted your Next.js dev server after creating/updating .env.local

Environment variables are only loaded when Next.js starts, so you must restart the dev server.
  `.trim();
  throw new Error(errorMsg);
}

// Database types for type safety
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          summary: string | null;
          category: string | null;
          tags: string[] | null;
          status: string;
          thumbnail_url: string | null;
          author: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          summary?: string | null;
          category?: string | null;
          tags?: string[] | null;
          status?: string;
          thumbnail_url?: string | null;
          author?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          summary?: string | null;
          category?: string | null;
          tags?: string[] | null;
          status?: string;
          thumbnail_url?: string | null;
          author?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          created_by?: string | null;
        };
      };
    };
  };
}

// Browser client (for client-side operations)
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

// Server client (for server-side operations with elevated privileges)
// Only create if service key is available (for server-side use)
export const supabaseServer = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : createClient(supabaseUrl, supabaseAnonKey); // Fallback to anon key for build

// Typed Supabase clients
export const supabase = supabaseBrowser;
export const supabaseAdmin = supabaseServer;

