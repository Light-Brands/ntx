// =============================================================================
// CMS Context - Global state management for CMS functionality
// =============================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type {
  BlogPost,
  CMSView,
  CMSStats,
  QueueItem,
  QueueItemStatus,
  PostStatus,
  GetPostsOptions,
} from '../data/cmsTypes';
import { cmsStorage, getRecentPosts } from '../data/cmsStorage';
import { generateBlogText } from '../lib/geminiClient';
import { generateBlogImage } from '../lib/imageGeneration';

// =============================================================================
// Types
// =============================================================================

interface CMSContextValue {
  // Posts state
  posts: BlogPost[];
  recentPosts: BlogPost[];
  stats: CMSStats | null;
  isLoading: boolean;
  error: string | null;

  // Navigation
  currentView: CMSView;
  editingPostId: string | null;
  navigateTo: (view: CMSView, postId?: string) => void;

  // CRUD Operations
  refreshPosts: (options?: GetPostsOptions) => Promise<void>;
  getPost: (id: string) => Promise<BlogPost | null>;
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<BlogPost>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<void>;

  // Queue state and operations
  queue: QueueItem[];
  isProcessingQueue: boolean;
  addToQueue: (items: { topic: string; category: string }[]) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
  processQueue: () => Promise<void>;

  // AI Generation
  generatePost: (topic: string, category: string) => Promise<Partial<BlogPost>>;

  // Helpers
  clearError: () => void;
}

// =============================================================================
// Context
// =============================================================================

const CMSContext = createContext<CMSContextValue | null>(null);

// =============================================================================
// Provider
// =============================================================================

interface CMSProviderProps {
  children: ReactNode;
}

export function CMSProvider({ children }: CMSProviderProps) {
  // Posts state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<CMSStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation state
  const [currentView, setCurrentView] = useState<CMSView>('dashboard');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  // ---------------------------------------------------------------------------
  // Load initial data
  // ---------------------------------------------------------------------------
  useEffect(() => {
    refreshPosts();
    loadRecentPosts();
    loadStats();
  }, []);

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  const navigateTo = useCallback((view: CMSView, postId?: string) => {
    setCurrentView(view);
    setEditingPostId(postId || null);
    setError(null);
  }, []);

  // ---------------------------------------------------------------------------
  // CRUD Operations
  // ---------------------------------------------------------------------------
  const refreshPosts = useCallback(async (options?: GetPostsOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedPosts = await cmsStorage.getPosts(options);
      setPosts(loadedPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load posts';
      setError(errorMessage);
      console.error('Error loading posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRecentPosts = useCallback(async () => {
    try {
      const recent = await getRecentPosts(5);
      setRecentPosts(recent);
    } catch (err) {
      console.error('Error loading recent posts:', err);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const loadedStats = await cmsStorage.getStats();
      setStats(loadedStats);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }, []);

  const getPost = useCallback(async (id: string): Promise<BlogPost | null> => {
    try {
      return await cmsStorage.getPostById(id);
    } catch (err) {
      console.error('Error getting post:', err);
      return null;
    }
  }, []);

  const createPost = useCallback(async (
    post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BlogPost> => {
    setError(null);

    try {
      const newPost = await cmsStorage.createPost(post);
      await refreshPosts();
      await loadRecentPosts();
      await loadStats();
      return newPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      setError(errorMessage);
      throw err;
    }
  }, [refreshPosts, loadRecentPosts, loadStats]);

  const updatePost = useCallback(async (
    id: string,
    updates: Partial<BlogPost>
  ): Promise<BlogPost> => {
    setError(null);

    try {
      const updatedPost = await cmsStorage.updatePost(id, updates);
      await refreshPosts();
      await loadRecentPosts();
      await loadStats();
      return updatedPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      setError(errorMessage);
      throw err;
    }
  }, [refreshPosts, loadRecentPosts, loadStats]);

  const deletePost = useCallback(async (id: string): Promise<void> => {
    setError(null);

    try {
      await cmsStorage.deletePost(id);
      await refreshPosts();
      await loadRecentPosts();
      await loadStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      throw err;
    }
  }, [refreshPosts, loadRecentPosts, loadStats]);

  // ---------------------------------------------------------------------------
  // Queue Operations
  // ---------------------------------------------------------------------------
  const generateQueueItemId = () => `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addToQueue = useCallback((items: { topic: string; category: string }[]) => {
    const newItems: QueueItem[] = items.map(item => ({
      id: generateQueueItemId(),
      topic: item.topic,
      category: item.category,
      status: 'pending' as QueueItemStatus,
      progress: 0,
      createdAt: new Date().toISOString(),
    }));

    setQueue(prev => [...prev, ...newItems]);
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const updateQueueItem = useCallback((id: string, updates: Partial<QueueItem>) => {
    setQueue(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessingQueue) return;

    setIsProcessingQueue(true);

    const pendingItems = queue.filter(q => q.status === 'pending');

    for (const item of pendingItems) {
      try {
        // Update status: processing
        updateQueueItem(item.id, {
          status: 'processing' as QueueItemStatus,
          progress: 10,
          startedAt: new Date().toISOString(),
        });

        // Generate text
        updateQueueItem(item.id, {
          status: 'generating-text' as QueueItemStatus,
          progress: 20,
        });

        const textResult = await generateBlogText(item.topic, item.category);

        updateQueueItem(item.id, { progress: 50 });

        // Generate image
        updateQueueItem(item.id, {
          status: 'generating-image' as QueueItemStatus,
          progress: 60,
        });

        let thumbnailUrl: string | undefined;
        try {
          thumbnailUrl = await generateBlogImage({
            title: textResult.title,
            summary: textResult.summary,
            content: textResult.content,
            category: item.category,
          });
        } catch (imageError) {
          console.warn('Image generation failed, continuing without thumbnail:', imageError);
        }

        updateQueueItem(item.id, { progress: 80 });

        // Save post as draft
        const post = await createPost({
          title: textResult.title,
          summary: textResult.summary,
          content: textResult.content,
          category: item.category,
          tags: [],
          status: 'draft' as PostStatus,
          thumbnailUrl,
        });

        // Mark as completed
        updateQueueItem(item.id, {
          status: 'completed' as QueueItemStatus,
          progress: 100,
          completedAt: new Date().toISOString(),
          result: post,
        });

      } catch (err) {
        console.error(`Queue item ${item.id} failed:`, err);
        updateQueueItem(item.id, {
          status: 'failed' as QueueItemStatus,
          error: err instanceof Error ? err.message : 'Unknown error',
          completedAt: new Date().toISOString(),
        });
      }
    }

    setIsProcessingQueue(false);
  }, [queue, isProcessingQueue, updateQueueItem, createPost]);

  // ---------------------------------------------------------------------------
  // AI Generation (single post)
  // ---------------------------------------------------------------------------
  const generatePost = useCallback(async (
    topic: string,
    category: string
  ): Promise<Partial<BlogPost>> => {
    setError(null);

    try {
      // Generate text
      const textResult = await generateBlogText(topic, category);

      // Generate image
      let thumbnailUrl: string | undefined;
      try {
        thumbnailUrl = await generateBlogImage({
          title: textResult.title,
          summary: textResult.summary,
          content: textResult.content,
          category,
        });
      } catch (imageError) {
        console.warn('Image generation failed:', imageError);
      }

      return {
        title: textResult.title,
        summary: textResult.summary,
        content: textResult.content,
        category,
        thumbnailUrl,
        tags: [],
        status: 'draft' as PostStatus,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate post';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ---------------------------------------------------------------------------
  // Context value
  // ---------------------------------------------------------------------------
  const value: CMSContextValue = {
    // Posts state
    posts,
    recentPosts,
    stats,
    isLoading,
    error,

    // Navigation
    currentView,
    editingPostId,
    navigateTo,

    // CRUD Operations
    refreshPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,

    // Queue
    queue,
    isProcessingQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    processQueue,

    // AI Generation
    generatePost,

    // Helpers
    clearError,
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

// =============================================================================
// Hooks
// =============================================================================

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

// Convenience hooks for specific functionality
export function useCMSPosts() {
  const { posts, recentPosts, isLoading, refreshPosts, createPost, updatePost, deletePost } = useCMS();
  return { posts, recentPosts, isLoading, refreshPosts, createPost, updatePost, deletePost };
}

export function useCMSNavigation() {
  const { currentView, editingPostId, navigateTo } = useCMS();
  return { currentView, editingPostId, navigateTo };
}

export function useCMSQueue() {
  const { queue, isProcessingQueue, addToQueue, removeFromQueue, clearQueue, processQueue } = useCMS();
  return { queue, isProcessingQueue, addToQueue, removeFromQueue, clearQueue, processQueue };
}

export function useCMSGeneration() {
  const { generatePost, error, clearError } = useCMS();
  return { generatePost, error, clearError };
}
