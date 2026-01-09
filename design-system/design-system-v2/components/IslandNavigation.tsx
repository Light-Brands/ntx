import React, { useEffect } from 'react';
import { Avatar } from './Avatar';

// --- Icons for the Island (Refined Minimalist Version) ---
const IslandIcons = {
  Discover: (active: boolean) => (
    <svg className={`w-5 h-5 transition-all duration-300 ${active ? 'text-aqua-light scale-110' : 'text-white/40'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Practices: (active: boolean) => (
    <svg className={`w-5 h-5 transition-all duration-300 ${active ? 'text-aqua-light scale-110' : 'text-white/40'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7v10"/><path d="M8 11l4-4 4 4"/>
    </svg>
  ),
  Guide: (active: boolean) => (
    <div className={`relative transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
      {active && (
        <div className="absolute inset-0 bg-aqua-light blur-xl opacity-40 animate-pulse rounded-full" />
      )}
      <div className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${active ? 'abyss-gradient-primary text-abyss-base shadow-[0_0_25px_rgba(151,217,196,0.5)]' : 'bg-white/5 text-white/40 border border-white/5'}`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>
  ),
  Impact: (active: boolean) => (
    <svg className={`w-5 h-5 transition-all duration-300 ${active ? 'text-aqua-light scale-110' : 'text-white/40'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Profile: (active: boolean) => (
    <div className={`p-0.5 rounded-full border-2 transition-all duration-300 ${active ? 'border-aqua-light scale-110 shadow-[0_0_15px_rgba(151,217,196,0.3)]' : 'border-transparent opacity-50'}`}>
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=me" className="border-0" />
    </div>
  )
};

type AppRoute = 'guide' | 'discover' | 'practices' | 'impact' | 'my-profile' | 'messages' | 'search';

interface IslandNavigationProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

// The core UI component for the floating island - Highly Optimized for Mobile
const IslandNavigationUI: React.FC<IslandNavigationProps> = ({ activeRoute, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9000] flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom,24px)] mb-6 animate-in slide-in-from-bottom-12 duration-1000">
      <nav className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-4 px-2 py-2 bg-[#04282F]/70 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] mira-glow min-w-[320px] max-w-[90vw] transition-all duration-500">
        
        <button 
          onClick={() => onNavigate('discover')}
          className="relative group p-4 rounded-full transition-all active:scale-90"
          aria-label="Discover"
        >
          {IslandIcons.Discover(activeRoute === 'discover')}
          {activeRoute === 'discover' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-aqua-light rounded-full shadow-[0_0_8px_rgba(151,217,196,0.8)]" />
          )}
        </button>
        
        <button 
          onClick={() => onNavigate('practices')}
          className="relative group p-4 rounded-full transition-all active:scale-90"
          aria-label="Practices"
        >
          {IslandIcons.Practices(activeRoute === 'practices')}
          {activeRoute === 'practices' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-aqua-light rounded-full shadow-[0_0_8px_rgba(151,217,196,0.8)]" />
          )}
        </button>

        <button 
          onClick={() => onNavigate('guide')}
          className="relative p-1 transition-all active:scale-95"
          aria-label="Mira Guide"
        >
          {IslandIcons.Guide(activeRoute === 'guide')}
        </button>

        <button 
          onClick={() => onNavigate('impact')}
          className="relative group p-4 rounded-full transition-all active:scale-90"
          aria-label="Impact"
        >
          {IslandIcons.Impact(activeRoute === 'impact')}
          {activeRoute === 'impact' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-aqua-light rounded-full shadow-[0_0_8px_rgba(151,217,196,0.8)]" />
          )}
        </button>

        <button 
          onClick={() => onNavigate('my-profile')}
          className="relative p-4 transition-all active:scale-90"
          aria-label="My Profile"
        >
          {IslandIcons.Profile(activeRoute === 'my-profile')}
          {activeRoute === 'my-profile' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-aqua-light rounded-full shadow-[0_0_8px_rgba(151,217,196,0.8)]" />
          )}
        </button>
      </nav>
    </div>
  );
};

// 6. Persistent Island Navigation Wrapper
export const PersistentIslandNavigation: React.FC<{ 
  pathname: string; 
  chatState: { currentAgent: string }; 
  onNavigate: (route: string) => void;
}> = ({ pathname, chatState, onNavigate }) => {
  
  const getCurrentRoute = (): AppRoute => {
    if (pathname.includes("/my-profile") || pathname.includes("/profile"))
      return "my-profile";
    if (pathname.includes("/discover")) return "discover";
    if (pathname.includes("/practices")) return "practices";
    if (pathname.includes("/impact")) return "impact";
    if (pathname.includes("/messages")) return "messages";
    if (pathname.includes("/search")) return "search";

    if (pathname === "/" || pathname === "") {
      if (chatState.currentAgent === "guide" ||
          chatState.currentAgent === "journal" ||
          chatState.currentAgent === "chat") {
        return "guide";
      }
      return "discover";
    }

    return "discover";
  };

  const currentRoute = getCurrentRoute();

  return (
    <IslandNavigationUI 
      activeRoute={currentRoute} 
      onNavigate={(route) => onNavigate(`/${route}`)} 
    />
  );
};

// 7. Conditional Island Navigation Wrapper
export const ConditionalIslandNavigation: React.FC<{
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  footerMenuEnabled: boolean;
  pathname: string;
  chatState: { currentAgent: string };
  onNavigate: (route: string) => void;
}> = ({ 
  isLoading, 
  isInitialized, 
  isAuthenticated, 
  footerMenuEnabled,
  pathname,
  chatState,
  onNavigate
}) => {
  
  const isVisible = isInitialized && isAuthenticated && !isLoading && footerMenuEnabled;

  useEffect(() => {
    if (isVisible) {
      console.debug('Island Navigation active at node:', pathname);
    }
  }, [isVisible, pathname]);

  if (!isVisible) return null;

  return (
    <PersistentIslandNavigation 
      pathname={pathname} 
      chatState={chatState} 
      onNavigate={onNavigate} 
    />
  );
};
