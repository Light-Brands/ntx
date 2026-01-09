// =============================================================================
// Feedback Module - Type Definitions
// =============================================================================

export type FeedbackCategory = 'bug' | 'enhancement' | 'question' | 'content';
export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
export type FeedbackStatus = 'new' | 'in-progress' | 'resolved' | 'blocked';
export type PageId = 'dashboard' | 'tracker' | 'showcase' | 'feedback';

export interface FeedbackPosition {
  x: number;           // % from left (0-100)
  y: number;           // % from top of document
  scrollY: number;     // scroll position when created
  viewportY: number;   // % from top of viewport when clicked
}

export interface TextContext {
  // The actual text content around the clicked area
  textBefore: string;  // ~50 lines before click point
  textAfter: string;   // ~50 lines after click point
  clickedText: string; // The specific text element clicked on

  // For precise location
  elementTag: string;  // e.g., 'div', 'span', 'p'
  elementId?: string;  // DOM element id if present
  elementClasses: string[]; // CSS classes on element
  dataAttributes: Record<string, string>; // data-* attributes
}

export interface FeedbackItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;         // For future user tracking

  // Context - where in the app
  sectionPath: string;        // "Dashboard > Epic Cards > Epic 01"
  componentName?: string;     // "EpicCard"
  pageId: PageId;

  // Position - for marker placement
  position: FeedbackPosition;

  // Text Context - the actual content around click point
  textContext: TextContext;

  // Content - what the user wants to say
  category: FeedbackCategory;
  priority: FeedbackPriority;
  title: string;
  notes: string;
  screenshot?: string;        // base64 data URL (html2canvas)

  // Status tracking
  status: FeedbackStatus;
  resolution?: string;        // Notes when resolved
  resolvedAt?: string;        // Timestamp when resolved
  resolvedBy?: string;        // For future user tracking
}

// What we capture when user clicks
export interface CapturedContext {
  sectionPath: string;
  componentName?: string;
  pageId: PageId;
  position: FeedbackPosition;
  textContext: TextContext;
  screenshot?: string;
}

// UI-only state (not persisted)
export interface FeedbackUIState {
  feedbackMode: boolean;
  showMarkers: boolean;
  selectedFeedbackId: string | null;
  pendingCapture: CapturedContext | null;
}

// Storage abstraction interface
export interface FeedbackStorage {
  getAll(): Promise<FeedbackItem[]>;
  getById(id: string): Promise<FeedbackItem | null>;
  create(item: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FeedbackItem>;
  update(id: string, updates: Partial<FeedbackItem>): Promise<FeedbackItem>;
  delete(id: string): Promise<void>;
}

// Form data for creating feedback
export interface FeedbackFormData {
  category: FeedbackCategory;
  priority: FeedbackPriority;
  title: string;
  notes: string;
  includeScreenshot: boolean;
}

// Category display config
export const categoryConfig: Record<FeedbackCategory, { label: string; icon: string; color: string }> = {
  bug: { label: 'Bug', icon: '🐛', color: 'text-red-400 bg-red-500/20' },
  enhancement: { label: 'Enhancement', icon: '✨', color: 'text-aqua-light bg-aqua-light/20' },
  question: { label: 'Question', icon: '❓', color: 'text-gold-accent bg-gold-accent/20' },
  content: { label: 'Content', icon: '📝', color: 'text-teal-light bg-teal-light/20' },
};

// Priority display config
export const priorityConfig: Record<FeedbackPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: 'text-white/50 bg-white/10' },
  medium: { label: 'Medium', color: 'text-teal-light bg-teal-light/20' },
  high: { label: 'High', color: 'text-gold-accent bg-gold-accent/20' },
  critical: { label: 'Critical', color: 'text-red-400 bg-red-500/20' },
};

// Status display config
export const statusConfig: Record<FeedbackStatus, { label: string; color: string; markerColor: string }> = {
  new: { label: 'New', color: 'text-gold-accent bg-gold-accent/20', markerColor: 'bg-gold-accent' },
  'in-progress': { label: 'In Progress', color: 'text-aqua-light bg-aqua-light/20', markerColor: 'bg-aqua-light' },
  resolved: { label: 'Resolved', color: 'text-teal-light bg-teal-light/20', markerColor: 'bg-teal-light' },
  blocked: { label: 'Blocked', color: 'text-red-400 bg-red-500/20', markerColor: 'bg-red-500' },
};
