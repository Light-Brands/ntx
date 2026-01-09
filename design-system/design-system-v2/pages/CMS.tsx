// =============================================================================
// CMS Page - Main content management system page
// Auth is handled by the vault gate - users are trusted once they reach CMS
// =============================================================================

import React, { useState } from 'react';
import { CMSProvider, useCMS, useCMSNavigation, useCMSQueue } from '../contexts/CMSContext';
import type { CMSView, BlogPost } from '../data/cmsTypes';

// Components
import {
  CMSDashboard,
  BlogList,
  CMSSidebar,
} from '../components/cms/CMSComponents';
import { BlogEditor } from '../components/cms/BlogEditorComponents';
import { AIGenerator, BatchQueue } from '../components/cms/AIGeneratorComponents';

// =============================================================================
// CMS Content - Direct access (vault handles authentication)
// =============================================================================

interface CMSContentProps {
  onNavigate?: (section: string) => void;
}

const CMSContent: React.FC<CMSContentProps> = ({ onNavigate: externalNavigate }) => {
  const {
    posts,
    recentPosts,
    stats,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPost,
    generatePost,
  } = useCMS();
  const { currentView, editingPostId, navigateTo } = useCMSNavigation();
  const {
    queue,
    isProcessingQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    processQueue,
  } = useCMSQueue();

  // Local state for AI-generated content
  const [generatedContent, setGeneratedContent] = useState<Partial<BlogPost> | null>(null);

  // Handle save from AI generator
  const handleSaveAsDraft = async (post: Partial<BlogPost>): Promise<BlogPost> => {
    const saved = await createPost({
      title: post.title || 'Untitled',
      summary: post.summary || '',
      content: post.content || '',
      category: post.category || 'technology',
      tags: post.tags || [],
      status: 'draft',
      thumbnailUrl: post.thumbnailUrl,
    });
    return saved;
  };

  // Handle navigation with external callback
  const handleNavigate = (view: CMSView, postId?: string) => {
    navigateTo(view, postId);
    // Clear generated content when navigating away from editor
    if (view !== 'editor') {
      setGeneratedContent(null);
    }
  };

  // Handle AI generation
  const handleGenerate = async (topic: string, category: string): Promise<Partial<BlogPost>> => {
    const result = await generatePost(topic, category);
    setGeneratedContent(result);
    return result;
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <CMSDashboard
            stats={stats}
            recentPosts={recentPosts}
            onNavigate={handleNavigate}
          />
        );

      case 'posts':
        return (
          <BlogList
            posts={posts}
            isLoading={isLoading}
            onNavigate={handleNavigate}
            onDelete={deletePost}
          />
        );

      case 'editor':
        return (
          <BlogEditor
            postId={editingPostId}
            initialData={generatedContent || undefined}
            onSave={createPost}
            onUpdate={updatePost}
            onNavigate={handleNavigate}
            getPost={getPost}
          />
        );

      case 'ai-generate':
        return (
          <AIGenerator
            onGenerate={handleGenerate}
            onNavigate={handleNavigate}
            onSaveAsDraft={handleSaveAsDraft}
          />
        );

      case 'queue':
        return (
          <BatchQueue
            queue={queue}
            isProcessing={isProcessingQueue}
            onAddToQueue={addToQueue}
            onRemoveFromQueue={removeFromQueue}
            onClearQueue={clearQueue}
            onProcessQueue={processQueue}
            onNavigate={handleNavigate}
          />
        );

      case 'media':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-moonlight">Media Library</h1>
              <p className="text-moonlight-muted mt-1">Manage your images</p>
            </div>
            <div className="text-center py-20 bg-abyss-mystic rounded-xl border border-abyss-light">
              <svg className="w-12 h-12 mx-auto text-moonlight-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="mt-4 text-moonlight-muted">Coming soon</p>
              <p className="text-sm text-moonlight-muted mt-1">
                Media library functionality is being developed
              </p>
            </div>
          </div>
        );

      default:
        return (
          <CMSDashboard
            stats={stats}
            recentPosts={recentPosts}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* CMS Navigation */}
      <CMSSidebar currentView={currentView} onNavigate={handleNavigate} />

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error">
          {error}
        </div>
      )}

      {/* Current View */}
      {renderView()}
    </div>
  );
};

// =============================================================================
// CMS Page (with provider)
// =============================================================================

interface CMSPageProps {
  onNavigate?: (section: string) => void;
}

export default function CMS({ onNavigate }: CMSPageProps) {
  return (
    <CMSProvider>
      <CMSContent onNavigate={onNavigate} />
    </CMSProvider>
  );
}
