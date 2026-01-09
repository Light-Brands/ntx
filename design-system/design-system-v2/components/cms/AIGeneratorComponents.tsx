// =============================================================================
// AI Generator Components - AI content generation and batch queue
// =============================================================================

import React, { useState } from 'react';
import type { BlogPost, QueueItem, QueueItemStatus, CMSView } from '../../data/cmsTypes';
import { defaultCategories, queueStatusConfig } from '../../data/cmsTypes';

// =============================================================================
// Icons
// =============================================================================

const SparklesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ClearIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// =============================================================================
// Generation Status
// =============================================================================

type GenerationStatus = 'idle' | 'generating-text' | 'generating-image' | 'saving' | 'complete' | 'error';

interface GenerationProgressProps {
  status: GenerationStatus;
  progress?: number;
  message?: string;
}

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  status,
  progress = 0,
  message,
}) => {
  const getMessage = () => {
    if (message) return message;
    switch (status) {
      case 'generating-text':
        return 'Generating article content with AI...';
      case 'generating-image':
        return 'Creating thumbnail image...';
      case 'saving':
        return 'Saving as draft...';
      case 'complete':
        return 'Generation complete!';
      case 'error':
        return 'An error occurred';
      default:
        return '';
    }
  };

  if (status === 'idle') return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Animated loader */}
      {status !== 'complete' && status !== 'error' && (
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua-light animate-spin" />
          <div className="absolute inset-4 rounded-full bg-aqua-light/30 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-aqua-light animate-ping" />
          </div>
        </div>
      )}

      {/* Success icon */}
      {status === 'complete' && (
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      {/* Error icon */}
      {status === 'error' && (
        <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      )}

      {/* Progress bar */}
      {progress > 0 && status !== 'complete' && status !== 'error' && (
        <div className="w-full max-w-sm">
          <div className="h-2 rounded-full bg-abyss-lighter overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-aqua-light to-teal-light transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <p className={`text-lg font-medium ${status === 'error' ? 'text-error' : 'text-moonlight'}`}>
        {getMessage()}
      </p>
    </div>
  );
};

// =============================================================================
// AI Generator
// =============================================================================

interface AIGeneratorProps {
  onGenerate: (topic: string, category: string) => Promise<Partial<BlogPost>>;
  onNavigate: (view: CMSView, postId?: string) => void;
  onSaveAsDraft?: (post: Partial<BlogPost>) => Promise<BlogPost>;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({
  onGenerate,
  onNavigate,
  onSaveAsDraft,
}) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState(defaultCategories[0].slug);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedPost, setGeneratedPost] = useState<Partial<BlogPost> | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    if (topic.length < 10) {
      setError('Topic must be at least 10 characters');
      return;
    }

    setError(null);
    setStatus('generating-text');
    setProgress(20);
    setGeneratedPost(null);

    try {
      // Generate content
      setProgress(40);
      const result = await onGenerate(topic, category);
      setProgress(80);

      // Set status based on whether image was generated
      setStatus('complete');
      setProgress(100);
      setGeneratedPost(result);

    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Generation failed');
    }
  };

  const handleSaveAndEdit = async () => {
    if (!generatedPost || !onSaveAsDraft) return;

    try {
      setStatus('saving');
      const saved = await onSaveAsDraft({
        ...generatedPost,
        status: 'draft' as any,
      });
      onNavigate('editor', saved.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setTopic('');
    setStatus('idle');
    setProgress(0);
    setError(null);
    setGeneratedPost(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-moonlight flex items-center gap-3">
          <SparklesIcon />
          AI Content Generator
        </h1>
        <p className="text-moonlight-muted mt-1">
          Generate blog articles using AI
        </p>
      </div>

      {/* Generator Form */}
      {status === 'idle' && !generatedPost && (
        <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-6 space-y-6">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Topic *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for your blog post (e.g., 'The future of renewable energy' or 'Tips for remote work productivity')..."
              rows={4}
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors resize-none"
            />
            <p className="text-xs text-moonlight-muted mt-2">
              {topic.length}/500 characters (minimum 10)
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight focus:outline-none focus:border-aqua-light transition-colors"
            >
              {defaultCategories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-aqua-light to-teal-light text-abyss-base font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SparklesIcon />
            Generate Article
          </button>
        </div>
      )}

      {/* Generation Progress */}
      {(status !== 'idle' || generatedPost) && !generatedPost && (
        <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-6">
          <GenerationProgress status={status} progress={progress} />
          {error && (
            <div className="mt-4 p-4 bg-error/10 border border-error/30 rounded-lg text-error text-center">
              {error}
              <button
                onClick={handleReset}
                className="block mx-auto mt-3 text-sm underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Generated Content Preview */}
      {generatedPost && status === 'complete' && (
        <div className="bg-abyss-mystic rounded-xl border border-abyss-light overflow-hidden">
          {/* Thumbnail Preview */}
          {generatedPost.thumbnailUrl && (
            <img
              src={generatedPost.thumbnailUrl}
              alt={generatedPost.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs text-aqua-light font-medium uppercase tracking-wider">
                Generated Title
              </p>
              <h2 className="text-xl font-bold text-moonlight mt-1">
                {generatedPost.title}
              </h2>
            </div>

            <div>
              <p className="text-xs text-aqua-light font-medium uppercase tracking-wider">
                Summary
              </p>
              <p className="text-moonlight-soft mt-1">
                {generatedPost.summary}
              </p>
            </div>

            <div>
              <p className="text-xs text-aqua-light font-medium uppercase tracking-wider mb-2">
                Content Preview
              </p>
              <div
                className="prose prose-invert max-h-60 overflow-y-auto text-moonlight-soft text-sm"
                dangerouslySetInnerHTML={{ __html: generatedPost.content?.substring(0, 1000) + '...' || '' }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-abyss-light">
              <button
                onClick={handleSaveAndEdit}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-aqua-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <EditIcon />
                Save & Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-abyss-light text-moonlight font-semibold rounded-lg border border-abyss-lighter hover:bg-abyss-lighter transition-colors"
              >
                <SparklesIcon />
                Generate Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Batch Queue
// =============================================================================

interface BatchQueueProps {
  queue: QueueItem[];
  isProcessing: boolean;
  onAddToQueue: (items: { topic: string; category: string }[]) => void;
  onRemoveFromQueue: (id: string) => void;
  onClearQueue: () => void;
  onProcessQueue: () => void;
  onNavigate: (view: CMSView, postId?: string) => void;
}

export const BatchQueue: React.FC<BatchQueueProps> = ({
  queue,
  isProcessing,
  onAddToQueue,
  onRemoveFromQueue,
  onClearQueue,
  onProcessQueue,
  onNavigate,
}) => {
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState(defaultCategories[0].slug);

  const handleAddItem = () => {
    if (!newTopic.trim()) return;
    onAddToQueue([{ topic: newTopic.trim(), category: newCategory }]);
    setNewTopic('');
  };

  const pendingCount = queue.filter(q => q.status === 'pending').length;
  const completedCount = queue.filter(q => q.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-moonlight">Batch Queue</h1>
          <p className="text-moonlight-muted mt-1">
            Generate multiple posts at once
          </p>
        </div>
        <div className="flex gap-3">
          {queue.length > 0 && (
            <button
              onClick={onClearQueue}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 text-moonlight-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors disabled:opacity-50"
            >
              <ClearIcon />
              Clear
            </button>
          )}
          {pendingCount > 0 && (
            <button
              onClick={onProcessQueue}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-aqua-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <PlayIcon />
              {isProcessing ? 'Processing...' : `Process ${pendingCount} Items`}
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-6">
        <h2 className="text-lg font-semibold text-moonlight mb-4">Add to Queue</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Enter topic..."
            className="flex-1 px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight focus:outline-none focus:border-aqua-light transition-colors"
          >
            {defaultCategories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            disabled={!newTopic.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-abyss-light text-moonlight font-semibold rounded-lg border border-abyss-lighter hover:bg-abyss-lighter transition-colors disabled:opacity-50"
          >
            <PlusIcon />
            Add
          </button>
        </div>
      </div>

      {/* Queue Stats */}
      {queue.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-abyss-mystic rounded-lg p-4 border border-abyss-light">
            <p className="text-moonlight-muted text-sm">Total</p>
            <p className="text-2xl font-bold text-moonlight">{queue.length}</p>
          </div>
          <div className="bg-abyss-mystic rounded-lg p-4 border border-abyss-light">
            <p className="text-moonlight-muted text-sm">Pending</p>
            <p className="text-2xl font-bold text-gold-accent">{pendingCount}</p>
          </div>
          <div className="bg-abyss-mystic rounded-lg p-4 border border-abyss-light">
            <p className="text-moonlight-muted text-sm">Completed</p>
            <p className="text-2xl font-bold text-success">{completedCount}</p>
          </div>
        </div>
      )}

      {/* Queue List */}
      {queue.length === 0 ? (
        <div className="text-center py-16 bg-abyss-mystic rounded-xl border border-abyss-light">
          <SparklesIcon />
          <p className="mt-2 text-moonlight-muted">Queue is empty</p>
          <p className="text-sm text-moonlight-muted mt-1">
            Add topics above to start batch generation
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map(item => (
            <QueueItemCard
              key={item.id}
              item={item}
              onRemove={() => onRemoveFromQueue(item.id)}
              onEdit={item.result?.id ? () => onNavigate('editor', item.result?.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Queue Item Card
// =============================================================================

interface QueueItemCardProps {
  item: QueueItem;
  onRemove: () => void;
  onEdit?: () => void;
}

const QueueItemCard: React.FC<QueueItemCardProps> = ({
  item,
  onRemove,
  onEdit,
}) => {
  const statusConfig = queueStatusConfig[item.status as QueueItemStatus] || queueStatusConfig.pending;

  return (
    <div className="flex items-center gap-4 p-4 bg-abyss-mystic rounded-lg border border-abyss-light">
      {/* Progress/Status indicator */}
      <div className="w-12 h-12 flex-shrink-0">
        {item.status === 'pending' ? (
          <div className="w-full h-full rounded-full bg-abyss-light flex items-center justify-center text-moonlight-muted">
            <SparklesIcon />
          </div>
        ) : item.status === 'completed' ? (
          <div className="w-full h-full rounded-full bg-success/20 flex items-center justify-center text-success">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : item.status === 'failed' ? (
          <div className="w-full h-full rounded-full bg-error/20 flex items-center justify-center text-error">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-abyss-light"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${(item.progress || 0) * 0.94} 94`}
                className="text-aqua-light"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-moonlight">
              {item.progress || 0}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-moonlight truncate">{item.topic}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm text-moonlight-muted">{item.category}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}>
            {statusConfig.label}
          </span>
        </div>
        {item.error && (
          <p className="text-xs text-error mt-1">{item.error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onEdit && item.status === 'completed' && (
          <button
            onClick={onEdit}
            className="p-2 text-moonlight-muted hover:text-aqua-light hover:bg-abyss-light rounded-lg transition-colors"
            title="Edit"
          >
            <EditIcon />
          </button>
        )}
        {item.status === 'pending' && (
          <button
            onClick={onRemove}
            className="p-2 text-moonlight-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
            title="Remove"
          >
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
};
