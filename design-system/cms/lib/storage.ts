import { supabaseAdmin, Database } from './supabase';

// Type definitions
interface SupabasePost {
  id: string;
  title: string;
  content: string;
  summary?: string | null;
  category?: string | null;
  thumbnail_url?: string | null;
  tags?: string[] | null;
  status?: string;
  author?: string | null;
  created_at: string;
  updated_at: string;
}

type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

interface Post {
  id: string;
  title: string;
  content: string;
  summary?: string;
  category?: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

// Transform Supabase post to frontend format
function transformSupabasePost(supabasePost: SupabasePost): Post {
  return {
    id: supabasePost.id,
    title: supabasePost.title,
    content: supabasePost.content,
    summary: supabasePost.summary || undefined,
    category: supabasePost.category || undefined,
    thumbnailUrl: supabasePost.thumbnail_url || undefined,
    tags: supabasePost.tags || [],
    status: supabasePost.status || 'draft',
    author: supabasePost.author || undefined,
    createdAt: supabasePost.created_at,
    updatedAt: supabasePost.updated_at,
  };
}

interface GetAllPostsOptions {
  status?: string;
  category?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// POST CRUD OPERATIONS
// ============================================

/**
 * Load all posts from Supabase
 */
export async function loadPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading posts from Supabase:', error);
      throw error;
    }

    return (data || []).map(transformSupabasePost);
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

/**
 * Add a new post to Supabase
 */
export async function addPost(postData: Partial<Post>): Promise<Post> {
  try {
    const newPost: PostInsert = {
      title: postData.title || '',
      content: postData.content || '',
      summary: postData.summary || null,
      category: postData.category || null,
      thumbnail_url: postData.thumbnail_url || postData.thumbnailUrl || null,
      tags: postData.tags || [],
      status: postData.status || 'draft',
      author: postData.author || null,
    };

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error('Error adding post to Supabase:', error);
      throw error;
    }

    console.log(`✅ Post saved to Supabase: "${data.title}" (ID: ${data.id})`);
    return transformSupabasePost(data);
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

/**
 * Get a post by ID from Supabase
 */
export async function getPostById(id: string): Promise<Post | undefined> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Post not found
        return undefined;
      }
      console.error('Error getting post by ID from Supabase:', error);
      throw error;
    }

    return data ? transformSupabasePost(data) : undefined;
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
}

/**
 * Update a post in Supabase
 */
export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  try {
    // Transform thumbnailUrl to thumbnail_url if present
    const updateData: any = { ...updates };
    if (updates.thumbnailUrl) {
      updateData.thumbnail_url = updates.thumbnailUrl;
      delete updateData.thumbnailUrl;
    }

    // Remove fields that shouldn't be updated
    delete updateData.id;
    delete updateData.created_at;

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post in Supabase:', error);
      throw error;
    }

    console.log(`✅ Post updated in Supabase: "${data.title}" (ID: ${id})`);
    return transformSupabasePost(data);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

/**
 * Delete a post from Supabase
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    // First get the post to check if it has a thumbnail
    const post = await getPostById(id);
    
    // Delete the post
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post from Supabase:', error);
      throw error;
    }

    // If post had a thumbnail, delete it from storage
    if (post && post.thumbnail_url) {
      await deleteImage(post.thumbnail_url).catch(err => {
        console.warn('Failed to delete thumbnail image:', err);
      });
    }

    console.log(`🗑️ Post deleted from Supabase (ID: ${id})`);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

/**
 * Get all posts with optional filtering and sorting
 */
export async function getAllPosts(options: GetAllPostsOptions = {}): Promise<Post[]> {
  try {
    let query = supabaseAdmin.from('posts').select('*');

    // Filter by status if provided
    if (options.status) {
      query = query.eq('status', options.status);
    }

    // Filter by category if provided
    if (options.category) {
      query = query.eq('category', options.category);
    }

    // Sort by date (newest first by default)
    const ascending = options.sortOrder === 'asc';
    query = query.order('created_at', { ascending });

    const { data, error } = await query;

    if (error) {
      console.error('Error getting all posts from Supabase:', error);
      throw error;
    }

    return (data || []).map(transformSupabasePost);
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw error;
  }
}

// ============================================
// IMAGE STORAGE OPERATIONS
// ============================================

/**
 * Upload an image to Supabase Storage
 * @param file File object or buffer to upload
 * @param fileName Optional custom filename
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  file: File | Buffer,
  fileName?: string
): Promise<string> {
  try {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const name = fileName || `image-${timestamp}-${randomStr}.jpg`;
    
    const filePath = `uploads/${name}`;

    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(filePath, file, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image to Supabase Storage:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    console.log(`✅ Image uploaded to Supabase Storage: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url Full public URL or storage path of the image
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extract the file path from the URL
    // URL format: https://[project-id].supabase.co/storage/v1/object/public/blog-images/uploads/filename.jpg
    let filePath = url;
    
    if (url.includes('supabase.co/storage')) {
      const urlParts = url.split('/blog-images/');
      if (urlParts.length > 1) {
        filePath = urlParts[1];
      }
    } else if (url.startsWith('/uploads/')) {
      // Local path reference, convert to storage path
      filePath = url.substring(1); // Remove leading slash
    }

    const { error } = await supabaseAdmin.storage
      .from('blog-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image from Supabase Storage:', error);
      throw error;
    }

    console.log(`🗑️ Image deleted from Supabase Storage: ${filePath}`);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Get public URL for an image in Supabase Storage
 * @param path Storage path of the image
 */
export function getPublicUrl(path: string): string {
  const { data } = supabaseAdmin.storage
    .from('blog-images')
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Upload image from base64 data
 * @param base64Data Base64 encoded image data
 * @param fileName Optional custom filename
 */
export async function uploadImageFromBase64(
  base64Data: string,
  fileName?: string
): Promise<string> {
  try {
    // Remove data URL prefix if present
    const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64String, 'base64');
    
    return await uploadImage(buffer, fileName);
  } catch (error) {
    console.error('Error uploading base64 image:', error);
    throw error;
  }
}

// Legacy function compatibility (for backward compatibility during migration)
export async function savePosts(posts: Post[]): Promise<boolean> {
  console.warn('savePosts() is deprecated when using Supabase. Use addPost() or updatePost() instead.');
  return true;
}
