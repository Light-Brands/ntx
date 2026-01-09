import React, { useState } from 'react';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { NotificationBadge } from './NotificationBadge';

// --- Icons for Header ---
const HeaderIcons = {
  Menu: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  Search: () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Filter: () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Map: () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Messages: () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Notifications: () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  Back: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  Close: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  )
};

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showMap?: boolean;
  showMessages?: boolean;
  showNotifications?: boolean;
  hasUnreadMessages?: boolean;
  hasUnreadNotifications?: boolean;
  onMenuClick?: () => void;
  onMessagesClick?: () => void;
  onNotificationsClick?: () => void;
  onFilterClick?: () => void;
  onMapClick?: () => void;
  filterCount?: number;
  searchPlaceholder?: string;
  showBack?: boolean;
  onBackClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "Abyss",
  subtitle,
  showSearch = true,
  showFilters = true,
  showMap = true,
  showMessages = true,
  showNotifications = true,
  hasUnreadMessages = true,
  hasUnreadNotifications = true,
  onMenuClick,
  onMessagesClick,
  onNotificationsClick,
  onFilterClick,
  onMapClick,
  filterCount = 0,
  searchPlaceholder = "Search the void...",
  showBack = false,
  onBackClick
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const headerHeight = "h-[49px] sm:h-[57px]";
  const btnClass = "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all active:scale-95 text-white flex-shrink-0 relative";
  const iconSize = "w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]";

  return (
    <header className={`sticky top-0 z-50 bg-abyss-base border-b border-white/10 w-full ${headerHeight}`}>
      <div className="max-w-4xl mx-auto h-full px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Left Section */}
        <div className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3">
          {showBack ? (
            <button onClick={onBackClick} className={btnClass} aria-label="Back">
              <HeaderIcons.Back />
            </button>
          ) : (
            <button onClick={onMenuClick} className={`${btnClass} w-9 h-9 sm:w-9 sm:h-9`} aria-label="Menu">
              <HeaderIcons.Menu />
            </button>
          )}

          {/* Title and Subtitle - Fades when search expanded */}
          <div className={`flex flex-col min-w-0 transition-all duration-200 transform ${isSearchExpanded ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
            <h1 className="text-base sm:text-lg font-semibold font-heading text-white truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-aqua-light/70 font-light font-body truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Search Input - Expands left */}
        {showSearch && isSearchExpanded && (
          <div className="absolute left-[44px] sm:left-[52px] right-[144px] sm:right-[184px] z-10 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="relative">
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-abyss-light/40 border border-white/10 rounded-lg pl-3 pr-8 py-1.5 sm:py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-aqua-light/30 transition-all"
              />
              <button 
                onClick={() => { setIsSearchExpanded(false); setSearchValue(""); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <HeaderIcons.Close />
              </button>
            </div>
          </div>
        )}

        {/* Right Section Actions */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          {showSearch && !isSearchExpanded && (
            <button onClick={() => setIsSearchExpanded(true)} className={btnClass} aria-label="Search">
              <div className={iconSize}><HeaderIcons.Search /></div>
            </button>
          )}

          {isSearchExpanded && (
            <>
              {showFilters && (
                <button onClick={onFilterClick} className={btnClass} aria-label="Filters">
                  <div className={iconSize}><HeaderIcons.Filter /></div>
                  {filterCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-aqua-light text-[9px] text-abyss-base font-bold rounded-full flex items-center justify-center">
                      {filterCount}
                    </span>
                  )}
                </button>
              )}
              {showMap && (
                <button onClick={onMapClick} className={btnClass} aria-label="Map">
                  <div className={iconSize}><HeaderIcons.Map /></div>
                </button>
              )}
            </>
          )}

          {showMessages && (
            <button onClick={onMessagesClick} className={btnClass} aria-label="Messages">
              <div className={iconSize}><HeaderIcons.Messages /></div>
              {hasUnreadMessages && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-aqua-light rounded-full border border-abyss-base" />
              )}
            </button>
          )}

          {showNotifications && (
            <button onClick={onNotificationsClick} className={btnClass} aria-label="Notifications">
              <div className={iconSize}><HeaderIcons.Notifications /></div>
              {hasUnreadNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-abyss-base" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Search Overlay/Suggestions could go here if isSearchExpanded is true */}
    </header>
  );
};

export const ChatHeaderSphere: React.FC<{ name: string; status: string }> = ({ name, status }) => (
  <div className="flex items-center justify-between bg-abyss-mystic p-5 rounded-[2rem] border border-abyss-light shadow-2xl">
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar size="md" src="https://i.pravatar.cc/150?u=chat" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-abyss-mystic rounded-full" />
      </div>
      <div>
        <h4 className="font-black text-moonlight uppercase text-sm tracking-tight">{name}</h4>
        <p className="text-[10px] text-aqua-light font-bold uppercase tracking-widest">{status}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 bg-abyss-light border-0">📞</Button>
      <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 bg-abyss-light border-0">📹</Button>
      <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 bg-abyss-light border-0">⚙️</Button>
    </div>
  </div>
);

export const NativeHeader: React.FC = () => (
  <div className="px-6 py-4 flex items-center justify-between bg-abyss-base lg:hidden">
    <div className="w-8 h-8 abyss-gradient-primary rounded-lg flex items-center justify-center font-black text-xs text-abyss-base">A</div>
    <h1 className="text-sm font-black text-aqua-light uppercase tracking-[0.3em]">Resonance</h1>
    <Button variant="ghost" className="p-0 border-0">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
    </Button>
  </div>
);

// Internal placeholder removed as it's now in its own file components/FeatureNavigationSidebar.tsx
