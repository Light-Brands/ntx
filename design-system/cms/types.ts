export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface BlogPost {
  id?: string;
  title: string;
  summary: string;
  content: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  status: PostStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  publishedAt?: Date | string;
  author?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type View = 'dashboard' | 'posts' | 'editor' | 'ai-generate' | 'media' | 'settings' | 'queue';

export enum QueueItemStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  GENERATING_TEXT = 'generating-text',
  GENERATING_IMAGE = 'generating-image',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface QueueItem {
  id: string;
  topic: string;
  category: string;
  status: QueueItemStatus;
  progress?: number;
  error?: string;
  result?: Partial<BlogPost>;
  createdAt: Date | string;
  startedAt?: Date | string;
  completedAt?: Date | string;
}
