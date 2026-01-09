// =============================================================================
// CMS Storage - Supabase implementation (following feedbackStorage pattern)
// =============================================================================

import { supabase, isSupabaseConfigured, TABLES, BUCKETS, STORAGE_PATHS } from '../lib/supabase';
import type {
  BlogPost,
  CMSStorage,
  CMSStats,
  GetPostsOptions,
  PostStatus,
} from './cmsTypes';

// =============================================================================
// Type Transformations
// =============================================================================

// Supabase row format (snake_case)
interface SupabasePost {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  category: string | null;
  thumbnail_url: string | null;
  tags: string[] | null;
  status: string;
  author: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// Transform Supabase row to BlogPost (snake_case to camelCase)
function transformFromSupabase(row: SupabasePost): BlogPost {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    summary: row.summary || '',
    category: row.category || 'uncategorized',
    thumbnailUrl: row.thumbnail_url || undefined,
    tags: row.tags || [],
    status: (row.status as PostStatus) || 'draft',
    author: row.author || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at || undefined,
  };
}

// Transform BlogPost to Supabase format (camelCase to snake_case)
function transformToSupabase(post: Partial<BlogPost>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (post.title !== undefined) result.title = post.title;
  if (post.content !== undefined) result.content = post.content;
  if (post.summary !== undefined) result.summary = post.summary || null;
  if (post.category !== undefined) result.category = post.category || null;
  if (post.thumbnailUrl !== undefined) result.thumbnail_url = post.thumbnailUrl || null;
  if (post.tags !== undefined) result.tags = post.tags || [];
  if (post.status !== undefined) result.status = post.status;
  if (post.author !== undefined) result.author = post.author || null;
  if (post.publishedAt !== undefined) result.published_at = post.publishedAt || null;

  return result;
}

// =============================================================================
// Supabase CMS Storage Implementation
// =============================================================================

class SupabaseCMSStorage implements CMSStorage {
  // ---------------------------------------------------------------------------
  // Post Operations
  // ---------------------------------------------------------------------------

  async getPosts(options?: GetPostsOptions): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty posts');
      return [];
    }

    try {
      let query = supabase.from(TABLES.POSTS).select('*');

      // Apply filters
      if (options?.status) {
        query = query.eq('status', options.status);
      }
      if (options?.category) {
        query = query.eq('category', options.category);
      }

      // Apply sorting
      const sortColumn = options?.sortBy === 'title'
        ? 'title'
        : options?.sortBy === 'publishedAt'
          ? 'published_at'
          : options?.sortBy === 'updatedAt'
            ? 'updated_at'
            : 'created_at';
      const ascending = options?.sortOrder === 'asc';
      query = query.order(sortColumn, { ascending });

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading posts from Supabase:', error);
        throw error;
      }

      return (data || []).map(transformFromSupabase);
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Post not found
          return null;
        }
        console.error('Error getting post by ID:', error);
        throw error;
      }

      return data ? transformFromSupabase(data) : null;
    } catch (error) {
      console.error('Error getting post by ID:', error);
      return null;
    }
  }

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const insertData = transformToSupabase(post);

      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        throw error;
      }

      console.log(`Post created: "${data.title}" (ID: ${data.id})`);
      return transformFromSupabase(data);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const updateData = transformToSupabase(updates);

      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        throw error;
      }

      console.log(`Post updated: "${data.title}" (ID: ${id})`);
      return transformFromSupabase(data);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  async deletePost(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      // First get the post to check if it has a thumbnail
      const post = await this.getPostById(id);

      // Delete the post
      const { error } = await supabase
        .from(TABLES.POSTS)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        throw error;
      }

      // If post had a thumbnail, delete it from storage
      if (post?.thumbnailUrl) {
        await this.deleteImage(post.thumbnailUrl).catch(err => {
          console.warn('Failed to delete thumbnail image:', err);
        });
      }

      console.log(`Post deleted (ID: ${id})`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // ---------------------------------------------------------------------------
  // Image Operations
  // ---------------------------------------------------------------------------

  async uploadImage(file: File | Blob, filename?: string): Promise<string> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 15);
      const name = filename || `image-${timestamp}-${randomStr}.jpg`;
      const filePath = `${STORAGE_PATHS.UPLOADS}/${name}`;

      const { data, error } = await supabase.storage
        .from(BUCKETS.BLOG_IMAGES)
        .upload(filePath, file, {
          contentType: file instanceof File ? file.type : 'image/jpeg',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading image:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKETS.BLOG_IMAGES)
        .getPublicUrl(data.path);

      console.log(`Image uploaded: ${urlData.publicUrl}`);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deleteImage(url: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      // Extract the file path from the URL
      let filePath = url;

      if (url.includes('supabase.co/storage')) {
        const urlParts = url.split(`/${BUCKETS.BLOG_IMAGES}/`);
        if (urlParts.length > 1) {
          filePath = urlParts[1];
        }
      } else if (url.startsWith('/uploads/')) {
        filePath = url.substring(1);
      }

      const { error } = await supabase.storage
        .from(BUCKETS.BLOG_IMAGES)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        throw error;
      }

      console.log(`Image deleted: ${filePath}`);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // ---------------------------------------------------------------------------
  // Stats
  // ---------------------------------------------------------------------------

  async getStats(): Promise<CMSStats> {
    if (!isSupabaseConfigured()) {
      return {
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        archivedPosts: 0,
        totalImages: 0,
        byCategory: {},
      };
    }

    try {
      const { data: posts, error } = await supabase
        .from(TABLES.POSTS)
        .select('status, category');

      if (error) {
        console.error('Error getting stats:', error);
        throw error;
      }

      const stats: CMSStats = {
        totalPosts: posts?.length || 0,
        publishedPosts: 0,
        draftPosts: 0,
        archivedPosts: 0,
        totalImages: 0,
        byCategory: {},
      };

      for (const post of posts || []) {
        // Status counts
        switch (post.status) {
          case 'published':
            stats.publishedPosts++;
            break;
          case 'draft':
            stats.draftPosts++;
            break;
          case 'archived':
            stats.archivedPosts++;
            break;
        }

        // Category counts
        const category = post.category || 'uncategorized';
        stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
      }

      // Get image count from storage
      try {
        const { data: files } = await supabase.storage
          .from(BUCKETS.BLOG_IMAGES)
          .list(STORAGE_PATHS.UPLOADS);
        stats.totalImages = files?.length || 0;
      } catch {
        // Ignore storage errors for stats
      }

      return stats;
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
}

// =============================================================================
// Export Singleton Instance
// =============================================================================

export const cmsStorage = new SupabaseCMSStorage();

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get recent posts (shorthand for getPosts with limit)
 */
export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
  return cmsStorage.getPosts({ sortBy: 'createdAt', sortOrder: 'desc', limit });
}

/**
 * Get published posts
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return cmsStorage.getPosts({ status: 'published' as PostStatus, sortBy: 'publishedAt', sortOrder: 'desc' });
}

/**
 * Get draft posts
 */
export async function getDraftPosts(): Promise<BlogPost[]> {
  return cmsStorage.getPosts({ status: 'draft' as PostStatus, sortBy: 'updatedAt', sortOrder: 'desc' });
}

/**
 * Upload image from base64 data (browser-compatible version)
 */
export async function uploadImageFromBase64(base64Data: string, filename?: string): Promise<string> {
  // Remove data URL prefix if present
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');

  // Convert base64 to blob
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/jpeg' });

  return cmsStorage.uploadImage(blob, filename);
}

/**
 * Get public URL for a storage path
 */
export function getPublicUrl(path: string): string {
  const { data } = supabase.storage
    .from(BUCKETS.BLOG_IMAGES)
    .getPublicUrl(path);

  return data.publicUrl;
}
