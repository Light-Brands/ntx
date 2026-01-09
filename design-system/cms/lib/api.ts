const API_BASE_URL = '/api';

export interface GenerateTextParams {
  topic: string;
  category: string;
  provider: string;
}

export interface GenerateTextResponse {
  title: string;
  summary: string;
  content: string;
  category: string;
  provider: string;
}

export interface GenerateImageParams {
  prompt?: string; // Full custom prompt (overrides everything)
  subject?: string; // Detailed subject description (combined with master style)
  title?: string; // Article title (used to generate subject if not provided)
  summary?: string; // Article summary (used to generate subject if not provided)
  content?: string; // Article content (used for AI analysis to generate better subjects)
  category?: string; // Category for context-specific visuals
  imageModel?: string; // AI model to use
}

export interface GenerateImageResponse {
  imageUrl?: string; // Primary: file URL from backend (e.g., /uploads/ai-thumbnail-123.jpg)
  imageData?: string; // Fallback: base64 data if backend doesn't save files
  mimeType?: string;
  processed?: boolean;
  dimensions?: { width: number; height: number };
  savedLocally?: boolean;
  fallback?: boolean;
  message?: string;
}

/**
 * Generate article text using Gemini API
 */
export async function generateText(params: GenerateTextParams): Promise<GenerateTextResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to generate text. Please check your connection and try again.');
  }
}

/**
 * Generate image using Gemini Imagen API
 */
export async function generateImage(params: GenerateImageParams): Promise<GenerateImageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to generate image. Please check your connection and try again.');
  }
}

/**
 * Check backend health status
 */
export async function checkHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Backend is not responding');
    }
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', geminiConfigured: false };
  }
}

// ============================================
// STORAGE API FUNCTIONS
// ============================================

/**
 * Save a blog post to JSON storage
 */
export async function saveBlogPost(post: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Error saving blog post:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to save blog post');
  }
}

/**
 * Get all saved blog posts
 */
export async function getAllPosts(options?: { status?: string; category?: string; sortOrder?: string }): Promise<any[]> {
  try {
    const params = new URLSearchParams();
    if (options?.status) params.append('status', options.status);
    if (options?.category) params.append('category', options.category);
    if (options?.sortOrder) params.append('sortOrder', options.sortOrder);
    
    const url = `${API_BASE_URL}/posts${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch blog posts');
  }
}

/**
 * Get a specific blog post by ID
 */
export async function getPostById(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch blog post');
  }
}

/**
 * Update a blog post
 */
export async function updatePost(id: string, updates: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to update blog post');
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to delete blog post');
  }
}

