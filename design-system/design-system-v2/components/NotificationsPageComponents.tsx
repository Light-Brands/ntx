
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';

// ============================================================================
// ICONS
// ============================================================================

export const NotificationIcons = {
  Heart: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  UserPlus: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Target: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ============================================================================
// 1. NOTIFICATION ITEM - Individual notification
// ============================================================================

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'connection' | 'message' | 'like' | 'comment' | 'practice' | 'system';
    title: string;
    message: string;
    timestamp: string;
    read?: boolean;
    avatar?: string;
    actionable?: boolean;
  };
  onAccept?: () => void;
  onDecline?: () => void;
  onClick?: () => void;
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onAccept,
  onDecline,
  onClick,
  className = ''
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'connection': return <NotificationIcons.UserPlus />;
      case 'message': return <NotificationIcons.MessageCircle />;
      case 'like': return <NotificationIcons.Heart />;
      case 'comment': return <NotificationIcons.MessageCircle />;
      case 'practice': return <NotificationIcons.Target />;
      default: return <NotificationIcons.Bell />;
    }
  };

  const getColor = () => {
    switch (notification.type) {
      case 'connection': return '#97D9C4';
      case 'message': return '#6BC7A8';
      case 'like': return '#f87171';
      case 'practice': return '#fbbf24';
      default: return '#97D9C4';
    }
  };

  const color = getColor();

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
                 ${notification.read
                   ? 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                   : 'border-aqua-light/30 bg-gradient-to-br from-aqua-light/8 to-aqua-light/3 hover:from-aqua-light/12 hover:to-aqua-light/5'
                 } ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon or Avatar */}
        {notification.avatar ? (
          <div className="relative flex-shrink-0">
            <Avatar size="md" src={notification.avatar} />
            {!notification.read && (
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-aqua-light border-2 border-abyss-base" />
            )}
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${color}15`,
              border: `2px solid ${color}30`,
              color: color
            }}
          >
            {getIcon()}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className={`text-base font-black uppercase tracking-tight ${
              notification.read ? 'text-white/85' : 'text-white'
            }`}>
              {notification.title}
            </h4>
            <span className="text-xs text-muted/70 font-medium uppercase tracking-wide whitespace-nowrap">
              {notification.timestamp}
            </span>
          </div>

          <p className={`text-sm leading-relaxed mb-3 ${
            notification.read ? 'text-pearl/70' : 'text-pearl/85'
          }`}>
            {notification.message}
          </p>

          {/* Actions for connection requests */}
          {notification.actionable && notification.type === 'connection' && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                className="flex items-center gap-1.5"
              >
                <NotificationIcons.Check />
                <span>Accept</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline?.();
                }}
                className="flex items-center gap-1.5"
              >
                <NotificationIcons.X />
                <span>Decline</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. NOTIFICATION CATEGORY TABS - Filter by type
// ============================================================================

interface NotificationCategoryTabsProps {
  categories: { id: string; label: string; count?: number }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  className?: string;
}

export const NotificationCategoryTabs: React.FC<NotificationCategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}) => (
  <div className={`p-2 rounded-2xl bg-white/[0.02] border border-white/10 ${className}`}>
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5
                     text-xs font-black uppercase tracking-widest transition-all duration-300
                     ${activeCategory === category.id
                       ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/20'
                       : 'bg-transparent text-muted hover:bg-white/5 hover:text-white'
                     }`}
        >
          <span>{category.label}</span>
          {category.count !== undefined && category.count > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black
                           ${activeCategory === category.id
                             ? 'bg-abyss-base/30 text-abyss-base'
                             : 'bg-aqua-light/20 text-aqua-light'
                           }`}>
              {category.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 3. UNREAD INDICATOR - Show unread count
// ============================================================================

interface UnreadIndicatorProps {
  count: number;
  className?: string;
}

export const UnreadIndicator: React.FC<UnreadIndicatorProps> = ({ count, className = '' }) => {
  if (count === 0) return null;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
                    bg-gradient-to-br from-aqua-light/20 to-aqua-light/10
                    border-2 border-aqua-light/40 shadow-lg shadow-aqua-light/20 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-aqua-light animate-pulse" />
      <span className="text-sm font-black text-aqua-light">
        {count} New {count === 1 ? 'Notification' : 'Notifications'}
      </span>
    </div>
  );
};

// ============================================================================
// 4. NOTIFICATION EMPTY STATE - No notifications placeholder
// ============================================================================

interface NotificationEmptyStateProps {
  type?: 'all' | 'filtered';
  className?: string;
}

export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({
  type = 'all',
  className = ''
}) => (
  <div className={`rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent
                  p-20 text-center ${className}`}>
    <div className="w-24 h-24 rounded-3xl bg-aqua-light/10 border-2 border-aqua-light/20
                  flex items-center justify-center text-aqua-light mx-auto mb-6
                  animate-in zoom-in-50 duration-500">
      <div className="scale-150">
        <NotificationIcons.Bell />
      </div>
    </div>
    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
      {type === 'all' ? 'All Caught Up!' : 'No Notifications'}
    </h3>
    <p className="text-base text-muted/80 max-w-sm mx-auto leading-relaxed">
      {type === 'all'
        ? "You're all set. New notifications will appear here."
        : "No notifications in this category yet."
      }
    </p>
  </div>
);

// ============================================================================
// 5. MARK ALL READ BUTTON - Mark all as read action
// ============================================================================

interface MarkAllReadButtonProps {
  unreadCount: number;
  onClick?: () => void;
  className?: string;
}

export const MarkAllReadButton: React.FC<MarkAllReadButtonProps> = ({
  unreadCount,
  onClick,
  className = ''
}) => {
  if (unreadCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10
                 text-aqua-light hover:bg-aqua-light/10 hover:border-aqua-light/30
                 transition-all duration-300 flex items-center gap-2
                 text-xs font-bold uppercase tracking-wide ${className}`}
    >
      <NotificationIcons.Check />
      <span>Mark All Read</span>
    </button>
  );
};

