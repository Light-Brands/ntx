import React from 'react';
import { Avatar } from './Avatar';
import { User } from '../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  badge?: 'New' | 'Premium';
  path: string;
}

interface FeatureNavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
  user?: Partial<User>;
}

const Icons = {
  Guide: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  Discover: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
  ),
  Practices: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
  ),
  Impact: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
  ),
  Membership: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
  ),
  Perks: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 8V4" /><path d="M3 12h18" /><path d="M12 12V8" /><path d="M12 8c0-2 2-2 2-2s2 0 2 2-2 2-2 2" /><path d="M12 8c0-2-2-2-2-2s-2 0-2 2 2 2 2 2" /></svg>
  ),
  Library: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M8 6h10" /><path d="M8 10h10" /><path d="M8 14h10" /></svg>
  ),
  Affiliate: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-8" /><path d="M17 7h4v4" /></svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Help: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  LogOut: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
  ),
  ArrowRight: () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  )
};

const navigationItems: NavItem[] = [
  { id: "guide", label: "The Guide", icon: <Icons.Guide />, description: "Human-Driven AI", path: "/" },
  { id: "discover", label: "Discovery", icon: <Icons.Discover />, description: "Find your tribe", path: "/discover" },
  { id: "practices", label: "Practices", icon: <Icons.Practices />, description: "Build better habits", path: "/practices" },
  { id: "impact", label: "Impact", icon: <Icons.Impact />, description: "Shape the future", path: "/impact" },
  { id: "membership", label: "Membership", icon: <Icons.Membership />, description: "Plant trees 🌳", badge: "New", path: "/membership" },
  { id: "perks", label: "Perks", icon: <Icons.Perks />, description: "100+ offers", badge: "Premium", path: "/perks" },
  { id: "library", label: "Library", icon: <Icons.Library />, description: "Wellness wisdom", path: "/library" },
  { id: "affiliate", label: "Affiliate", icon: <Icons.Affiliate />, description: "Earn 10%", path: "/affiliate" }
];

export const FeatureNavigationSidebar: React.FC<FeatureNavigationSidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeId = "guide",
  user = { name: "Architect", username: "node_zero" }
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[9999] w-80 bg-abyss-base border-r border-abyss-light shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col h-full overflow-hidden
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-abyss-light flex items-center justify-between bg-abyss-mystic/50">
          <button className="flex items-center gap-3 group hover:opacity-80 transition-opacity text-left">
            <Avatar size="md" className="border-2 border-aqua-light/20" />
            <div>
              <p className="font-black text-moonlight uppercase tracking-tight text-sm leading-none">{user.name}</p>
              <p className="text-xs text-aqua-light font-bold mt-1 opacity-60">@{user.username}</p>
            </div>
          </button>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-abyss-light flex items-center justify-center text-muted hover:text-moonlight hover:bg-teal-light transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Microcopy Section */}
          <div className="p-6 border-b border-abyss-light bg-abyss-mystic/20">
            <p className="text-xs text-aqua-light font-black uppercase tracking-[0.4em] mb-2 leading-relaxed">
              Building positive change, together.
            </p>
            <button className="flex items-center gap-2 group text-[10px] font-black text-muted uppercase tracking-widest hover:text-aqua-light transition-colors">
              Share your thoughts
              <span className="group-hover:translate-x-1 transition-transform">
                <Icons.ArrowRight />
              </span>
            </button>
          </div>

          {/* Navigation Grid */}
          <div className="p-4">
            <h3 className="px-2 text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.4em] mb-4 opacity-60">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button 
                    key={item.id}
                    className={`
                      p-3 rounded-2xl flex flex-col items-start gap-2 text-left transition-all duration-300 group
                      ${isActive 
                        ? 'bg-aqua-light/10 border border-aqua-light/20 shadow-[0_0_20px_rgba(151,217,196,0.05)]' 
                        : 'hover:bg-abyss-light/50 border border-transparent'}
                    `}
                  >
                    <div className="flex justify-between w-full items-start">
                      <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-aqua-light text-abyss-base' : 'bg-abyss-light text-muted group-hover:text-aqua-light'}`}>
                        {item.icon}
                      </div>
                      {item.badge && (
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter ${item.badge === 'New' ? 'bg-aqua-light text-abyss-base' : 'bg-gold-accent text-abyss-base'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-aqua-light' : 'text-moonlight'}`}>
                        {item.label}
                      </p>
                      <p className="text-[9px] font-bold text-muted truncate w-full opacity-40 uppercase tracking-widest">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-6">
            <h3 className="px-2 text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.4em] mb-4 opacity-60">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Map Discovery', icon: '📍', sub: 'Explore local nodes' },
                { label: 'Establish Feed', icon: '📡', sub: 'Apply custom filters' }
              ].map((action, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-4 p-3 bg-abyss-mystic border border-abyss-light rounded-2xl hover:bg-abyss-light hover:border-teal-light transition-all group active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-xl bg-aqua-light/5 flex items-center justify-center text-lg shadow-inner">
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-moonlight uppercase tracking-tight">{action.label}</p>
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest opacity-40">{action.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="p-4 border-t border-abyss-light">
            <h3 className="px-2 text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.4em] mb-4 opacity-60">Account Settings</h3>
            <div className="space-y-1">
              {[
                { label: 'Profile Resonance', icon: <Icons.Practices /> },
                { label: 'Neural Settings', icon: <Icons.Settings /> },
                { label: 'Billing & Node Plan', icon: <Icons.Impact /> }
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-abyss-light/50 group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted opacity-60 group-hover:text-aqua-light transition-colors">{item.icon}</span>
                    <span className="text-sm font-bold text-muted group-hover:text-moonlight uppercase tracking-tight">{item.label}</span>
                  </div>
                  <span className="text-muted opacity-20 group-hover:translate-x-1 transition-transform">
                    <Icons.ChevronRight />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="p-4 border-t border-abyss-light">
            <h3 className="px-2 text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.4em] mb-4 opacity-60">Collective</h3>
            <div className="space-y-1">
              {[
                { label: 'Knowledge Hub', icon: <Icons.Library /> },
                { label: 'Neural Support', icon: <Icons.Help /> },
                { label: 'Community Guidelines', icon: <Icons.Users /> }
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-abyss-light/50 group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted opacity-60 group-hover:text-aqua-light transition-colors">{item.icon}</span>
                    <span className="text-sm font-bold text-muted group-hover:text-moonlight uppercase tracking-tight">{item.label}</span>
                  </div>
                  <span className="text-muted opacity-20 group-hover:translate-x-1 transition-transform">
                    <Icons.ChevronRight />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-abyss-light bg-abyss-mystic/20">
          <button 
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-500/10 group transition-all text-red-400 mb-4"
          >
            <div className="flex items-center gap-4">
              <Icons.LogOut />
              <span className="text-sm font-black uppercase tracking-tight">Sever Neural Link</span>
            </div>
            <span className="opacity-40 group-hover:translate-x-1 transition-transform">
              <Icons.ChevronRight />
            </span>
          </button>
          
          <div className="text-center">
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em] opacity-30">Abyss v1.4.2</p>
            <p className="text-[9px] font-bold text-teal-light uppercase tracking-widest mt-1 opacity-20">Established 2024 • Node Zero</p>
          </div>
        </div>
      </aside>
    </>
  );
};
