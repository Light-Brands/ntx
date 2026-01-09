'use client';

import React from 'react';
import { LayoutDashboard, FileText, Edit, Image as ImageIcon, Settings, LogOut, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { View } from '../../types';
import { useAuth } from '@/lib/auth';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' as View },
    { icon: FileText, label: 'All Posts', id: 'posts' as View },
    { icon: Edit, label: 'Write Post', id: 'editor' as View },
    { icon: ImageIcon, label: 'Media Library', id: 'media' as View },
    { icon: Settings, label: 'Settings', id: 'settings' as View },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex h-screen fixed left-0 top-0 z-30">
      <div className="flex h-16 items-center border-b px-6">
        <img 
          src="/header-logo-white_1.png" 
          alt="VibeUp" 
          className="h-12 w-auto"
        />
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="mb-4 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Blog Management
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              currentView === item.id
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
        
        <div className="mt-6 mb-4 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          AI Tools
        </div>
        <button
          onClick={() => onNavigate('ai-generate')}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            currentView === 'ai-generate'
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-primary border border-purple-500/30"
              : "text-muted-foreground hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-primary"
          )}
        >
          <Sparkles className="h-4 w-4" />
          AI Generator
        </button>
        <button
          onClick={() => onNavigate('queue')}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            currentView === 'queue'
              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-primary border border-blue-500/30"
              : "text-muted-foreground hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:text-primary"
          )}
        >
          <FileText className="h-4 w-4" />
          Batch Queue
        </button>
      </nav>
      <div className="border-t p-4">
        <div className="mb-4 rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-muted-foreground">VibeUp CMS</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
                Blog Management System
            </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
