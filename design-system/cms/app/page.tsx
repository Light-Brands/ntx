'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import BlogEditor from '@/components/blog/BlogEditor';
import BlogList from '@/components/blog/BlogList';
import AIGenerator from '@/components/blog/AIGenerator';
import BatchQueue from '@/components/blog/BatchQueue';
import Dashboard from '@/components/dashboard/Dashboard';
import MediaLibrary from '@/components/media/MediaLibrary';
import Settings from '@/components/settings/Settings';
import { View, BlogPost } from '@/types';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  
  // All hooks must be called BEFORE any conditional returns
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [editPostId, setEditPostId] = useState<string | undefined>();
  const [aiGeneratedData, setAiGeneratedData] = useState<Partial<BlogPost> | undefined>();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && !isAdmin) {
      router.push('/unauthorized');
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {user ? 'Verifying permissions...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleNavigate = (view: View, postId?: string) => {
    setCurrentView(view);
    if (view === 'editor') {
      setEditPostId(postId);
      if (!postId) {
        // Clear AI data if starting a fresh manual post
        setAiGeneratedData(undefined);
      }
    } else {
      setEditPostId(undefined);
    }
  };

  const handleAIGenerated = (data: Partial<BlogPost>) => {
    setAiGeneratedData(data);
    setCurrentView('editor');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'posts':
        return <BlogList onNavigate={handleNavigate} editPostId={editPostId} />;
      case 'ai-generate':
        return <AIGenerator onGenerated={handleAIGenerated} onCancel={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />;
      case 'queue':
        return <BatchQueue onNavigate={handleNavigate} />;
      case 'editor':
        return <BlogEditor postId={editPostId} onNavigate={handleNavigate} aiGeneratedData={aiGeneratedData} />;
      case 'media':
        return <MediaLibrary />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-secondary/10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

