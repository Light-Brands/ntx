
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { AttributePill } from './ProfilePageComponents';

// ============================================================================
// ICONS - Inline SVG icons
// ============================================================================

export const DiscoverIcons = {
  Search: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Bookmark: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  UserPlus: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ============================================================================
// 1. SEARCH BAR - Discovery search input
// ============================================================================

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  placeholder = "Search people, events, content...",
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300
                      ${isFocused ? 'text-aqua-light' : 'text-muted/40'}`}>
        <DiscoverIcons.Search />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-white/10 bg-white/[0.02] py-4 pl-14 pr-5
                 text-white placeholder-white/30 backdrop-blur-sm font-medium
                 focus:border-aqua-light/50 focus:bg-white/5 focus:outline-none focus:ring-4
                 focus:ring-aqua-light/10 shadow-inner
                 transition-all duration-300 group-hover:border-white/20"
      />
      {isFocused && (
        <div className="absolute inset-0 rounded-2xl bg-aqua-light/5 -z-10 blur-xl transition-opacity" />
      )}
    </div>
  );
};

// ============================================================================
// 2. CATEGORY TABS - Discover category navigation
// ============================================================================

interface CategoryTabsProps {
  categories: { id: string; label: string; icon?: React.ReactNode }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}) => (
  <div className={`p-2 rounded-2xl bg-white/[0.02] border border-white/5 ${className}`}>
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-6 py-3
                     text-xs font-black uppercase tracking-widest transition-all duration-300
                     ${activeCategory === category.id
                       ? 'bg-aqua-light text-abyss-base shadow-xl shadow-aqua-light/30 scale-[1.02]'
                       : 'bg-transparent text-muted hover:bg-white/5 hover:text-white'
                     }`}
        >
          <div className={activeCategory === category.id ? 'scale-110' : ''}>
            {category.icon}
          </div>
          {category.label}
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 3. MATCH SCORE BADGE - Display compatibility percentage
// ============================================================================

interface MatchScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  className?: string;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  showLabel = true,
  className = ''
}) => {
  const getScoreColor = () => {
    if (score >= 90) return { bg: 'rgba(16, 185, 129, 0.2)', border: '#10b981', text: '#10b981', glow: '0 0 20px rgba(16, 185, 129, 0.3)' };
    if (score >= 80) return { bg: 'rgba(151, 217, 196, 0.2)', border: '#97D9C4', text: '#97D9C4', glow: '0 0 20px rgba(151, 217, 196, 0.3)' };
    if (score >= 70) return { bg: 'rgba(251, 191, 36, 0.2)', border: '#fbbf24', text: '#fbbf24', glow: '0 0 20px rgba(251, 191, 36, 0.3)' };
    return { bg: 'rgba(203, 213, 225, 0.15)', border: '#cbd5e1', text: '#cbd5e1', glow: 'none' };
  };

  const colors = getScoreColor();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 ${className}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        boxShadow: colors.glow
      }}
    >
      <div className="animate-pulse">
        <DiscoverIcons.Sparkles />
      </div>
      <span className="text-base font-black">{score}%</span>
      {showLabel && <span className="text-[9px] font-black uppercase tracking-wider opacity-80">Match</span>}
    </div>
  );
};

// ============================================================================
// 4. RECOMMENDATION CARD - User recommendation card
// ============================================================================

interface RecommendationCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    interests?: string[];
    mutualConnections?: number;
    matchScore?: number;
    verified?: boolean;
  };
  onConnect?: () => void;
  onViewProfile?: () => void;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  user,
  onConnect,
  onViewProfile,
  className = ''
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await onConnect?.();
    setTimeout(() => setIsConnecting(false), 1000);
  };

  return (
    <Card
      className={`p-8 hover:border-aqua-light/40 hover:scale-[1.02] hover:shadow-2xl
                 hover:shadow-aqua-light/10 transition-all duration-500
                 cursor-pointer group overflow-hidden relative ${className}`}
      onClick={onViewProfile}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-aqua-light/0 to-aqua-light/0
                    group-hover:from-aqua-light/5 group-hover:to-transparent transition-all duration-500 -z-10 rounded-2xl" />

      <div className="text-center space-y-5 relative z-10">
        {/* Match Score Badge - Centered at Top */}
        {user.matchScore && user.matchScore >= 70 && (
          <div className="flex justify-center mb-2 animate-in fade-in zoom-in-50 duration-500">
            <MatchScoreBadge score={user.matchScore} showLabel={true} />
          </div>
        )}
        {/* Avatar */}
        <div className="relative inline-block mb-2">
          <div className="relative p-1">
            <Avatar size="xl" src={user.avatar} />
            <div className="absolute inset-0 rounded-full ring-2 ring-transparent
                         group-hover:ring-aqua-light/30 transition-all duration-300" />
          </div>
          {user.verified && (
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold-accent
                         border-3 border-abyss-base flex items-center justify-center
                         shadow-xl shadow-gold-accent/40 animate-in zoom-in-0 duration-300">
              <DiscoverIcons.Check />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white group-hover:text-aqua-light transition-colors duration-300">
            {user.name}
          </h3>
          {user.location && (
            <div className="flex items-center justify-center gap-2 text-muted text-sm mt-2
                         group-hover:text-teal-light transition-colors">
              <DiscoverIcons.MapPin />
              <span className="font-medium">{user.location}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-base text-pearl/85 line-clamp-3 leading-relaxed min-h-[4rem] px-1">
            {user.bio}
          </p>
        )}

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 min-h-[3rem] py-2">
            {user.interests.slice(0, 3).map((interest, index) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full bg-aqua-light/15 border border-aqua-light/30
                         text-aqua-light text-sm font-black uppercase tracking-wide
                         hover:bg-aqua-light/25 transition-all duration-300
                         animate-in fade-in zoom-in-50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Mutual Connections */}
        {user.mutualConnections !== undefined && user.mutualConnections > 0 && (
          <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl
                       bg-aqua-light/10 border-2 border-aqua-light/30 mt-2">
            <div className="flex -space-x-3">
              {/* Mini avatar images for mutual friends */}
              <div className="w-9 h-9 rounded-full border-3 border-abyss-base overflow-hidden bg-aqua-light/20">
                <img
                  src="https://i.pravatar.cc/50?u=mutual1"
                  alt="Mutual"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-3 border-abyss-base overflow-hidden bg-teal-light/20">
                <img
                  src="https://i.pravatar.cc/50?u=mutual2"
                  alt="Mutual"
                  className="w-full h-full object-cover"
                />
              </div>
              {user.mutualConnections > 2 && (
                <div className="w-9 h-9 rounded-full border-3 border-abyss-base bg-aqua-light/30
                             flex items-center justify-center text-xs font-black text-aqua-light">
                  +{user.mutualConnections - 2}
                </div>
              )}
            </div>
            <span className="text-sm font-black text-aqua-light uppercase tracking-wide">
              {user.mutualConnections} mutual
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2 font-black uppercase tracking-wide"
            onClick={(e) => {
              e.stopPropagation();
              handleConnect();
            }}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-abyss-base border-t-transparent rounded-full animate-spin" />
                <span>Connecting</span>
              </>
            ) : (
              <>
                <DiscoverIcons.UserPlus />
                <span>Connect</span>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-bold uppercase tracking-wide"
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile?.();
            }}
          >
            View
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ============================================================================
// 5. FILTER BUTTON - Open filter modal
// ============================================================================

interface FilterButtonProps {
  activeFiltersCount?: number;
  onClick?: () => void;
  className?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  activeFiltersCount = 0,
  onClick,
  className = ''
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-3 px-6 py-3.5 rounded-xl
               bg-white/[0.02] border-2 border-white/10 text-white
               hover:bg-aqua-light/5 hover:border-aqua-light/40 hover:shadow-lg
               hover:shadow-aqua-light/10 hover:scale-105
               transition-all duration-300 font-black text-sm uppercase tracking-widest group ${className}`}
  >
    <div className="text-muted group-hover:text-aqua-light transition-colors">
      <DiscoverIcons.Filter />
    </div>
    <span>Filters</span>
    {activeFiltersCount > 0 && (
      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-accent
                     text-abyss-base text-xs font-black flex items-center justify-center
                     shadow-xl shadow-gold-accent/40 border-2 border-abyss-base
                     animate-in zoom-in-50 duration-300">
        {activeFiltersCount}
      </span>
    )}
  </button>
);

// ============================================================================
// 6. DISCOVERY EMPTY STATE - No results placeholder
// ============================================================================

interface DiscoveryEmptyStateProps {
  type: 'recommendations' | 'search' | 'events' | 'content';
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const DiscoveryEmptyState: React.FC<DiscoveryEmptyStateProps> = ({
  type,
  message,
  actionLabel,
  onAction,
  className = ''
}) => {
  const configs = {
    recommendations: {
      icon: <DiscoverIcons.Users />,
      iconBg: 'bg-aqua-light/15',
      iconBorder: 'border-aqua-light/30',
      iconColor: 'text-aqua-light',
      title: 'No Recommendations Yet',
      defaultMessage: 'Complete your profile to get personalized recommendations',
    },
    search: {
      icon: <DiscoverIcons.Search />,
      iconBg: 'bg-teal-light/15',
      iconBorder: 'border-teal-light/30',
      iconColor: 'text-teal-light',
      title: 'No Results Found',
      defaultMessage: 'Try adjusting your search or filters',
    },
    events: {
      icon: <DiscoverIcons.Calendar />,
      iconBg: 'bg-gold-accent/15',
      iconBorder: 'border-gold-accent/30',
      iconColor: 'text-gold-accent',
      title: 'Events Coming Soon',
      defaultMessage: 'Discover mindful gatherings and community events',
    },
    content: {
      icon: <DiscoverIcons.Bookmark />,
      iconBg: 'bg-aqua-light/15',
      iconBorder: 'border-aqua-light/30',
      iconColor: 'text-aqua-light',
      title: 'No Content Yet',
      defaultMessage: 'Curated content recommendations coming soon',
    },
  };

  const config = configs[type];

  return (
    <div className={`rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent
                    p-16 text-center backdrop-blur-sm ${className}`}>
      <div className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl
                    ${config.iconBg} border-2 ${config.iconBorder} ${config.iconColor}
                    shadow-2xl animate-in zoom-in-50 duration-500`}>
        <div className="scale-150">
          {config.icon}
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-black text-white uppercase tracking-tight">
        {config.title}
      </h3>
      <p className="text-base text-muted/80 mb-8 max-w-md mx-auto leading-relaxed">
        {message || config.defaultMessage}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} className="px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// ============================================================================
// 7. DISTANCE BADGE - Show distance from user
// ============================================================================

interface DistanceBadgeProps {
  distance: number;
  unit?: 'km' | 'mi';
  className?: string;
}

export const DistanceBadge: React.FC<DistanceBadgeProps> = ({
  distance,
  unit = 'mi',
  className = ''
}) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-teal-light/20 border-2 border-teal-light/40 text-teal-light
                  shadow-sm hover:shadow-lg hover:shadow-teal-light/20
                  transition-all duration-300 ${className}`}>
    <DiscoverIcons.MapPin />
    <span className="text-xs font-black uppercase tracking-wide">
      {distance < 1 ? '< 1' : Math.round(distance)} {unit} away
    </span>
  </div>
);

// ============================================================================
// 8. FILTER CHIP - Individual filter tag
// ============================================================================

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onRemove,
  className = ''
}) => (
  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                  bg-aqua-light/15 border-2 border-aqua-light/40 text-aqua-light
                  shadow-sm hover:shadow-lg hover:shadow-aqua-light/20
                  transition-all duration-300 group ${className}`}>
    <span className="text-xs font-black uppercase tracking-wide">{label}</span>
    {onRemove && (
      <button
        onClick={onRemove}
        className="w-5 h-5 rounded-full bg-aqua-light/20 hover:bg-aqua-light/30
                 flex items-center justify-center transition-all duration-200
                 hover:scale-110"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    )}
  </div>
);

// ============================================================================
// 9. ACTIVE FILTERS BAR - Display active filters
// ============================================================================

interface ActiveFiltersBarProps {
  filters: { id: string; label: string }[];
  onRemoveFilter: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  className = ''
}) => {
  if (filters.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border-2 border-white/10
                    backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-aqua-light/10 flex items-center justify-center text-aqua-light">
          <DiscoverIcons.Filter />
        </div>
        <span className="text-xs font-black text-white uppercase tracking-widest whitespace-nowrap">
          Active:
        </span>
      </div>
      <div className="flex flex-wrap gap-2 flex-1">
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            onRemove={() => onRemoveFilter(filter.id)}
          />
        ))}
      </div>
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10
                   text-xs font-bold text-muted hover:text-white hover:bg-white/10
                   hover:border-white/20 uppercase tracking-wide whitespace-nowrap
                   transition-all duration-300"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

// ============================================================================
// 10. DISCOVER LOADING - Loading state for recommendations
// ============================================================================

interface DiscoverLoadingProps {
  message?: string;
  className?: string;
}

export const DiscoverLoading: React.FC<DiscoverLoadingProps> = ({
  message = "Finding your perfect matches...",
  className = ''
}) => (
  <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
    <div className="relative w-20 h-20 mb-8">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-aqua-light
                    animate-spin shadow-[0_0_30px_rgba(151,217,196,0.3)]" />
      {/* Middle ring */}
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-teal-light animate-spin"
           style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
      {/* Inner circle */}
      <div className="absolute inset-4 rounded-full bg-aqua-light/10 border border-aqua-light/20" />
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center text-aqua-light animate-pulse">
        <DiscoverIcons.Sparkles />
      </div>
    </div>
    <div className="text-center space-y-2">
      <p className="text-white text-base font-medium">{message}</p>
      <div className="flex justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-aqua-light/60 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// 11. QUICK FILTER BUTTONS - Quick filter shortcuts
// ============================================================================

interface QuickFilterButtonsProps {
  filters: { id: string; label: string; icon?: React.ReactNode }[];
  activeFilters: string[];
  onToggleFilter: (id: string) => void;
  className?: string;
}

export const QuickFilterButtons: React.FC<QuickFilterButtonsProps> = ({
  filters,
  activeFilters,
  onToggleFilter,
  className = ''
}) => (
  <div className={`flex flex-wrap gap-3 ${className}`}>
    {filters.map((filter) => {
      const isActive = activeFilters.includes(filter.id);
      return (
        <button
          key={filter.id}
          onClick={() => onToggleFilter(filter.id)}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-black uppercase
                     tracking-widest transition-all duration-300 border-2 hover:scale-105
                     ${isActive
                       ? 'bg-aqua-light/20 border-aqua-light text-aqua-light shadow-xl shadow-aqua-light/20'
                       : 'bg-white/[0.02] border-white/10 text-muted hover:border-white/30 hover:bg-white/5 hover:text-white'
                     }`}
        >
          <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
            {filter.icon}
          </div>
          <span>{filter.label}</span>
          {isActive && (
            <div className="w-5 h-5 rounded-full bg-aqua-light/30 flex items-center justify-center">
              <DiscoverIcons.Check />
            </div>
          )}
        </button>
      );
    })}
  </div>
);

// ============================================================================
// 12. RECOMMENDATION GRID - Grid layout for recommendation cards
// ============================================================================

interface RecommendationGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const RecommendationGrid: React.FC<RecommendationGridProps> = ({
  children,
  columns = 3,
  className = ''
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
};

// ============================================================================
// 13. SECTION HEADER - Discovery section title
// ============================================================================

interface DiscoverSectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  count?: number;
  action?: React.ReactNode;
  className?: string;
}

export const DiscoverSectionHeader: React.FC<DiscoverSectionHeaderProps> = ({
  title,
  icon,
  count,
  action,
  className = ''
}) => (
  <div className={`flex items-center justify-between pb-6 border-b border-white/5 ${className}`}>
    <div className="flex items-center gap-4">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-aqua-light/10 border border-aqua-light/20
                     flex items-center justify-center text-aqua-light">
          {icon}
        </div>
      )}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black font-heading text-white uppercase tracking-tight">
          {title}
        </h2>
        {count !== undefined && (
          <span className="px-3 py-1.5 rounded-full bg-aqua-light/10 border border-aqua-light/20
                       text-aqua-light text-xs font-black font-ui">
            {count}
          </span>
        )}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

