// =============================================================================
// Blog Editor Components - Post editor with rich text support
// Using a custom textarea-based editor (React 19 compatible)
// =============================================================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { BlogPost, PostStatus, CMSView } from '../../data/cmsTypes';
import { defaultCategories, postStatusConfig } from '../../data/cmsTypes';
import { uploadBlogImage } from '../../lib/imageGeneration';

// =============================================================================
// Icons
// =============================================================================

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Toolbar icons
const BoldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const HeadingIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12h8" />
    <path d="M4 18V6" />
    <path d="M12 18V6" />
    <path d="M17 12l3-2v8" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

// =============================================================================
// Rich Text Editor (Markdown-style with toolbar)
// =============================================================================

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...\n\nSupports HTML formatting. Use the toolbar buttons or type directly.',
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newText);

    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: <HeadingIcon />, action: () => insertFormatting('<h2>', '</h2>'), title: 'Heading' },
    { icon: <BoldIcon />, action: () => insertFormatting('<strong>', '</strong>'), title: 'Bold' },
    { icon: <ItalicIcon />, action: () => insertFormatting('<em>', '</em>'), title: 'Italic' },
    { icon: <LinkIcon />, action: () => insertFormatting('<a href="">', '</a>'), title: 'Link' },
    { icon: <ListIcon />, action: () => insertFormatting('<ul>\n  <li>', '</li>\n</ul>'), title: 'List' },
    { icon: <QuoteIcon />, action: () => insertFormatting('<blockquote>', '</blockquote>'), title: 'Quote' },
    { icon: <CodeIcon />, action: () => insertFormatting('<code>', '</code>'), title: 'Code' },
  ];

  return (
    <div className="rich-text-editor rounded-xl overflow-hidden border border-abyss-light bg-abyss-base">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-3 bg-abyss-mystic border-b border-abyss-light">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            disabled={disabled}
            title={btn.title}
            className="p-2 rounded-lg text-moonlight-muted hover:text-aqua-light hover:bg-abyss-light transition-all disabled:opacity-50"
          >
            {btn.icon}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-xs text-moonlight-muted/60 uppercase tracking-wider font-bold">HTML Editor</span>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full min-h-[350px] p-5 bg-abyss-base text-moonlight placeholder-moonlight-muted/50
                   font-mono text-sm leading-relaxed resize-y focus:outline-none
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Footer hint */}
      <div className="px-4 py-2 bg-abyss-mystic/50 border-t border-abyss-light/50">
        <p className="text-[10px] text-moonlight-muted/60 uppercase tracking-wider">
          Tip: Use HTML tags for formatting. Content will render on the blog.
        </p>
      </div>
    </div>
  );
};

// =============================================================================
// Thumbnail Uploader
// =============================================================================

interface ThumbnailUploaderProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  disabled?: boolean;
}

export const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await uploadBlogImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Thumbnail"
            className="w-full h-48 object-cover rounded-lg border border-abyss-light"
          />
          {!disabled && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-abyss-base/80 rounded-lg text-moonlight-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove thumbnail"
            >
              <XIcon />
            </button>
          )}
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full h-48 bg-abyss-base border-2 border-dashed border-abyss-light rounded-lg cursor-pointer hover:border-aqua-light/50 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center text-moonlight-muted">
              <div className="relative w-10 h-10 mb-2">
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua-light animate-spin" />
              </div>
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-moonlight-muted">
              <ImageIcon />
              <span className="mt-2">Click to upload thumbnail</span>
              <span className="text-xs mt-1">PNG, JPG up to 10MB</span>
            </div>
          )}
        </label>
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

// =============================================================================
// Tag Manager
// =============================================================================

interface TagManagerProps {
  value: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
}

export const TagManager: React.FC<TagManagerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = inputValue.trim().toLowerCase();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map(tag => (
          <span
            key={tag}
            className="flex items-center gap-1 px-3 py-1 bg-abyss-light rounded-full text-sm text-moonlight"
          >
            {tag}
            {!disabled && (
              <button
                onClick={() => removeTag(tag)}
                className="text-moonlight-muted hover:text-error"
              >
                <XIcon />
              </button>
            )}
          </span>
        ))}
      </div>
      {!disabled && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (press Enter)"
          className="w-full px-4 py-2 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
        />
      )}
    </div>
  );
};

// =============================================================================
// Blog Editor
// =============================================================================

interface BlogEditorProps {
  postId?: string | null;
  initialData?: Partial<BlogPost>;
  onSave: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<BlogPost>;
  onUpdate?: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>;
  onNavigate: (view: CMSView) => void;
  getPost?: (id: string) => Promise<BlogPost | null>;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  postId,
  initialData,
  onSave,
  onUpdate,
  onNavigate,
  getPost,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || defaultCategories[0].slug);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [status, setStatus] = useState<PostStatus>(initialData?.status as PostStatus || 'draft');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(initialData?.thumbnailUrl);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load existing post if editing
  useEffect(() => {
    if (postId && getPost) {
      setIsLoading(true);
      getPost(postId)
        .then(post => {
          if (post) {
            setTitle(post.title);
            setSummary(post.summary);
            setContent(post.content);
            setCategory(post.category);
            setTags(post.tags);
            setStatus(post.status as PostStatus);
            setThumbnailUrl(post.thumbnailUrl);
          }
        })
        .catch(err => {
          setError(err instanceof Error ? err.message : 'Failed to load post');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [postId, getPost]);

  // Update from initial data (for AI-generated content)
  useEffect(() => {
    if (initialData && !postId) {
      if (initialData.title) setTitle(initialData.title);
      if (initialData.summary) setSummary(initialData.summary);
      if (initialData.content) setContent(initialData.content);
      if (initialData.category) setCategory(initialData.category);
      if (initialData.tags) setTags(initialData.tags);
      if (initialData.thumbnailUrl) setThumbnailUrl(initialData.thumbnailUrl);
    }
  }, [initialData, postId]);

  const handleSave = async (saveStatus: PostStatus = status) => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const postData = {
      title: title.trim(),
      summary: summary.trim(),
      content,
      category,
      tags,
      status: saveStatus,
      thumbnailUrl,
      publishedAt: saveStatus === 'published' ? new Date().toISOString() : undefined,
    };

    try {
      if (postId && onUpdate) {
        await onUpdate(postId, postData);
        setSuccessMessage('Post updated successfully');
      } else {
        await onSave(postData);
        setSuccessMessage('Post created successfully');
      }
      setStatus(saveStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua-light animate-spin" />
          <div className="absolute inset-3 rounded-full bg-aqua-light/30 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('posts')}
            className="p-2 text-moonlight-muted hover:text-moonlight hover:bg-abyss-light rounded-lg transition-colors"
          >
            <ArrowLeftIcon />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-moonlight">
              {postId ? 'Edit Post' : 'New Post'}
            </h1>
            <p className="text-moonlight-muted mt-1">
              {postId ? 'Update your blog post' : 'Create a new blog post'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status !== 'published' && (
            <button
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-abyss-light text-moonlight font-semibold rounded-lg border border-abyss-lighter hover:bg-abyss-lighter transition-colors disabled:opacity-50"
            >
              <SaveIcon />
              Save Draft
            </button>
          )}
          <button
            onClick={() => handleSave('published')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-aqua-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <SaveIcon />
            {status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-success/10 border border-success/30 rounded-lg text-success">
          {successMessage}
        </div>
      )}

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight text-lg placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary for SEO and previews..."
              rows={3}
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Content *
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog post content..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-5">
            <label className="block text-sm font-medium text-moonlight mb-3">
              Thumbnail
            </label>
            <ThumbnailUploader
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
            />
          </div>

          {/* Category */}
          <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-5">
            <label className="block text-sm font-medium text-moonlight mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-abyss-base border border-abyss-light rounded-lg text-moonlight focus:outline-none focus:border-aqua-light transition-colors"
            >
              {defaultCategories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-5">
            <label className="block text-sm font-medium text-moonlight mb-3">
              Tags
            </label>
            <TagManager
              value={tags}
              onChange={setTags}
            />
          </div>

          {/* Status */}
          <div className="bg-abyss-mystic rounded-xl border border-abyss-light p-5">
            <label className="block text-sm font-medium text-moonlight mb-3">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {(['draft', 'published', 'archived'] as PostStatus[]).map(s => {
                const config = postStatusConfig[s];
                const isActive = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? `${config.color} ${config.bgColor} ring-2 ring-current`
                        : 'text-moonlight-muted hover:bg-abyss-light'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
