// =============================================================================
// CMS Module - Type Definitions
// =============================================================================

// Post status enum
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

// Queue item status for batch processing
export enum QueueItemStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  GENERATING_TEXT = 'generating-text',
  GENERATING_IMAGE = 'generating-image',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Main blog post interface
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author?: string;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Queue item for batch generation
export interface QueueItem {
  id: string;
  topic: string;
  category: string;
  status: QueueItemStatus;
  progress?: number;
  error?: string;
  result?: Partial<BlogPost>;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

// CMS view types for internal navigation
export type CMSView = 'dashboard' | 'posts' | 'editor' | 'ai-generate' | 'queue' | 'media';

// Filter options for post queries
export interface GetPostsOptions {
  status?: PostStatus;
  category?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// CMS Statistics
export interface CMSStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  archivedPosts: number;
  totalImages: number;
  byCategory: Record<string, number>;
}

// Storage abstraction interface (following FeedbackStorage pattern)
export interface CMSStorage {
  // Post operations
  getPosts(options?: GetPostsOptions): Promise<BlogPost[]>;
  getPostById(id: string): Promise<BlogPost | null>;
  createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost>;
  updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost>;
  deletePost(id: string): Promise<void>;

  // Image operations
  uploadImage(file: File | Blob, filename?: string): Promise<string>;
  deleteImage(url: string): Promise<void>;

  // Stats
  getStats(): Promise<CMSStats>;
}

// AI Generation types
export interface GenerateTextResult {
  title: string;
  summary: string;
  content: string;
  category: string;
}

export interface GenerateImageOptions {
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  customPrompt?: string;
}

// Form data for creating/editing posts
export interface PostFormData {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  status: PostStatus;
  thumbnailUrl?: string;
}

// Default categories
export const defaultCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Business', slug: 'business' },
  { id: '3', name: 'Lifestyle', slug: 'lifestyle' },
  { id: '4', name: 'Health', slug: 'health' },
  { id: '5', name: 'Science', slug: 'science' },
  { id: '6', name: 'Entertainment', slug: 'entertainment' },
];

// Status display config (following feedbackTypes pattern)
export const postStatusConfig: Record<PostStatus, { label: string; color: string; bgColor: string }> = {
  [PostStatus.DRAFT]: {
    label: 'Draft',
    color: 'text-gold-accent',
    bgColor: 'bg-gold-accent/20'
  },
  [PostStatus.PUBLISHED]: {
    label: 'Published',
    color: 'text-success',
    bgColor: 'bg-success/20'
  },
  [PostStatus.ARCHIVED]: {
    label: 'Archived',
    color: 'text-moonlight-muted',
    bgColor: 'bg-moonlight-muted/20'
  },
};

// Queue status display config
export const queueStatusConfig: Record<QueueItemStatus, { label: string; color: string; bgColor: string }> = {
  [QueueItemStatus.PENDING]: {
    label: 'Pending',
    color: 'text-moonlight-muted',
    bgColor: 'bg-moonlight-muted/20'
  },
  [QueueItemStatus.PROCESSING]: {
    label: 'Processing',
    color: 'text-aqua-light',
    bgColor: 'bg-aqua-light/20'
  },
  [QueueItemStatus.GENERATING_TEXT]: {
    label: 'Generating Text',
    color: 'text-teal-light',
    bgColor: 'bg-teal-light/20'
  },
  [QueueItemStatus.GENERATING_IMAGE]: {
    label: 'Generating Image',
    color: 'text-gold-accent',
    bgColor: 'bg-gold-accent/20'
  },
  [QueueItemStatus.COMPLETED]: {
    label: 'Completed',
    color: 'text-success',
    bgColor: 'bg-success/20'
  },
  [QueueItemStatus.FAILED]: {
    label: 'Failed',
    color: 'text-error',
    bgColor: 'bg-error/20'
  },
};
