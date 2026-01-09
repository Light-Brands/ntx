// =============================================================================
// CMS Components - Dashboard, Stats, Post Cards, Blog List
// Styled to match VIBEUP Design System brand
// =============================================================================

import React, { useState } from 'react';
import type { BlogPost, CMSStats, CMSView, PostStatus } from '../../data/cmsTypes';
import { postStatusConfig, defaultCategories } from '../../data/cmsTypes';

// =============================================================================
// Icons (inline SVG following design-system pattern)
// =============================================================================

const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

const QueueIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// =============================================================================
// Stats Card
// =============================================================================

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'text-aqua-light',
  bgColor = 'bg-aqua-light/10',
}) => (
  <div className="bg-abyss-mystic rounded-xl p-6 border border-abyss-light hover:border-abyss-lighter transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-moonlight-muted text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        {subtitle && (
          <p className="text-moonlight-muted text-xs mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <span className={color}>{icon}</span>
      </div>
    </div>
  </div>
);

// =============================================================================
// CMS Dashboard
// =============================================================================

interface CMSDashboardProps {
  stats: CMSStats | null;
  recentPosts: BlogPost[];
  onNavigate: (view: CMSView, postId?: string) => void;
}

export const CMSDashboard: React.FC<CMSDashboardProps> = ({
  stats,
  recentPosts,
  onNavigate,
}) => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-moonlight">CMS Dashboard</h1>
        <p className="text-moonlight-muted mt-1">Manage your blog content</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onNavigate('ai-generate')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-aqua-light to-teal-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <SparklesIcon />
          AI Generate
        </button>
        <button
          onClick={() => onNavigate('editor')}
          className="flex items-center gap-2 px-4 py-2 bg-abyss-light text-moonlight font-semibold rounded-lg border border-abyss-lighter hover:bg-abyss-lighter transition-colors"
        >
          <PlusIcon />
          New Post
        </button>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Posts"
        value={stats?.totalPosts ?? 0}
        icon={<FileTextIcon />}
        color="text-aqua-light"
        bgColor="bg-aqua-light/10"
      />
      <StatsCard
        title="Published"
        value={stats?.publishedPosts ?? 0}
        icon={<FileTextIcon />}
        color="text-success"
        bgColor="bg-success/10"
      />
      <StatsCard
        title="Drafts"
        value={stats?.draftPosts ?? 0}
        icon={<EditIcon />}
        color="text-gold-accent"
        bgColor="bg-gold-accent/10"
      />
      <StatsCard
        title="Images"
        value={stats?.totalImages ?? 0}
        icon={<ImageIcon />}
        color="text-teal-light"
        bgColor="bg-teal-light/10"
      />
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => onNavigate('posts')}
        className="flex items-center gap-4 p-6 bg-abyss-mystic rounded-xl border border-abyss-light hover:border-aqua-light/50 transition-all group"
      >
        <div className="p-3 rounded-lg bg-abyss-light group-hover:bg-aqua-light/20 transition-colors">
          <FileTextIcon />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-moonlight">All Posts</h3>
          <p className="text-sm text-moonlight-muted">View and manage posts</p>
        </div>
      </button>
      <button
        onClick={() => onNavigate('queue')}
        className="flex items-center gap-4 p-6 bg-abyss-mystic rounded-xl border border-abyss-light hover:border-aqua-light/50 transition-all group"
      >
        <div className="p-3 rounded-lg bg-abyss-light group-hover:bg-aqua-light/20 transition-colors">
          <QueueIcon />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-moonlight">Batch Queue</h3>
          <p className="text-sm text-moonlight-muted">Generate multiple posts</p>
        </div>
      </button>
      <button
        onClick={() => onNavigate('media')}
        className="flex items-center gap-4 p-6 bg-abyss-mystic rounded-xl border border-abyss-light hover:border-aqua-light/50 transition-all group"
      >
        <div className="p-3 rounded-lg bg-abyss-light group-hover:bg-aqua-light/20 transition-colors">
          <ImageIcon />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-moonlight">Media Library</h3>
          <p className="text-sm text-moonlight-muted">Manage images</p>
        </div>
      </button>
    </div>

    {/* Recent Posts */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-moonlight">Recent Posts</h2>
        <button
          onClick={() => onNavigate('posts')}
          className="text-sm text-aqua-light hover:underline"
        >
          View all
        </button>
      </div>
      <div className="space-y-3">
        {recentPosts.length === 0 ? (
          <div className="text-center py-12 bg-abyss-mystic rounded-xl border border-abyss-light">
            <FileTextIcon />
            <p className="mt-2 text-moonlight-muted">No posts yet</p>
            <button
              onClick={() => onNavigate('editor')}
              className="mt-4 text-sm text-aqua-light hover:underline"
            >
              Create your first post
            </button>
          </div>
        ) : (
          recentPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => onNavigate('editor', post.id)}
              compact
            />
          ))
        )}
      </div>
    </div>
  </div>
);

// =============================================================================
// Post Card
// =============================================================================

interface PostCardProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
  compact?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  compact = false,
}) => {
  const statusStyle = postStatusConfig[post.status as PostStatus] || postStatusConfig.draft;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (compact) {
    return (
      <div
        className="flex items-center gap-4 p-4 bg-abyss-mystic rounded-lg border border-abyss-light hover:border-abyss-lighter cursor-pointer transition-all"
        onClick={onEdit}
      >
        {post.thumbnailUrl && (
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-16 h-12 object-cover rounded"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-moonlight truncate">{post.title}</h3>
          <p className="text-sm text-moonlight-muted">{formattedDate}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${statusStyle.color} ${statusStyle.bgColor}`}>
          {statusStyle.label}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-abyss-mystic rounded-xl border border-abyss-light hover:border-abyss-lighter transition-all overflow-hidden">
      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-moonlight text-lg truncate">{post.title}</h3>
            <p className="text-sm text-moonlight-muted mt-1 line-clamp-2">{post.summary}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${statusStyle.color} ${statusStyle.bgColor}`}>
            {statusStyle.label}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-abyss-light">
          <div className="flex items-center gap-4 text-sm text-moonlight-muted">
            <span>{post.category}</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-moonlight-muted hover:text-aqua-light hover:bg-abyss-light rounded-lg transition-colors"
              title="Edit"
            >
              <EditIcon />
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-moonlight-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                title="Delete"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Blog List
// =============================================================================

interface BlogListProps {
  posts: BlogPost[];
  isLoading: boolean;
  onNavigate: (view: CMSView, postId?: string) => void;
  onDelete: (id: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading,
  onNavigate,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | PostStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-moonlight">All Posts</h1>
          <p className="text-moonlight-muted mt-1">{posts.length} total posts</p>
        </div>
        <button
          onClick={() => onNavigate('editor')}
          className="flex items-center gap-2 px-4 py-2 bg-aqua-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <PlusIcon />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-moonlight-muted">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | PostStatus)}
          className="px-4 py-2 bg-abyss-base border border-abyss-light rounded-lg text-moonlight focus:outline-none focus:border-aqua-light transition-colors"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 bg-abyss-base border border-abyss-light rounded-lg text-moonlight focus:outline-none focus:border-aqua-light transition-colors"
        >
          <option value="all">All Categories</option>
          {defaultCategories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua-light animate-spin" />
            <div className="absolute inset-3 rounded-full bg-aqua-light/30 animate-pulse" />
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-abyss-mystic rounded-xl border border-abyss-light">
          <FileTextIcon />
          <p className="mt-2 text-moonlight-muted">
            {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
              ? 'No posts match your filters'
              : 'No posts yet'}
          </p>
          {!searchTerm && filterStatus === 'all' && filterCategory === 'all' && (
            <button
              onClick={() => onNavigate('editor')}
              className="mt-4 text-sm text-aqua-light hover:underline"
            >
              Create your first post
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => onNavigate('editor', post.id)}
              onDelete={() => onDelete(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// CMS Sidebar Navigation
// =============================================================================

interface CMSSidebarProps {
  currentView: CMSView;
  onNavigate: (view: CMSView) => void;
}

export const CMSSidebar: React.FC<CMSSidebarProps> = ({ currentView, onNavigate }) => {
  const navItems: { id: CMSView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'posts', label: 'All Posts', icon: <FileTextIcon /> },
    { id: 'editor', label: 'New Post', icon: <EditIcon /> },
    { id: 'ai-generate', label: 'AI Generator', icon: <SparklesIcon /> },
    { id: 'queue', label: 'Batch Queue', icon: <QueueIcon /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon /> },
  ];

  return (
    <nav className="flex flex-wrap gap-2 p-4 bg-abyss-mystic rounded-xl border border-abyss-light mb-6">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            currentView === item.id
              ? 'bg-aqua-light text-abyss-base'
              : 'text-moonlight-muted hover:text-moonlight hover:bg-abyss-light'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

// =============================================================================
// Login Form
// =============================================================================

interface CMSLoginFormProps {
  onLogin: (email: string, password: string) => Promise<{ error: string | null }>;
  error: string | null;
  isLoading: boolean;
}

export const CMSLoginForm: React.FC<CMSLoginFormProps> = ({
  onLogin,
  error,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-abyss-mystic rounded-xl border border-abyss-light">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-moonlight">CMS Login</h1>
          <p className="text-moonlight-muted mt-2">Sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-moonlight mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-abyss-base border border-abyss-light rounded-lg text-moonlight placeholder-moonlight-muted focus:outline-none focus:border-aqua-light transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-aqua-light text-abyss-base font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
