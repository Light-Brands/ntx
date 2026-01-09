
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';

// ============================================================================
// ICONS - Inline SVG icons
// ============================================================================

export const MessageIcons = {
  Send: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  CheckDouble: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18 7 11 14 7 10" />
      <polyline points="22 7 15 14 13 12" />
    </svg>
  ),
  MoreVertical: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  Smile: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  Paperclip: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  Image: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
};

// ============================================================================
// 1. CONVERSATION LIST ITEM - Inbox conversation preview
// ============================================================================

interface ConversationListItemProps {
  conversation: {
    id: string;
    avatar?: string;
    name: string;
    lastMessage?: string;
    timestamp?: string;
    unreadCount?: number;
    isOnline?: boolean;
    isRead?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  onClick,
  className = ''
}) => (
  <div
    onClick={onClick}
    className={`p-5 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01]
               hover:bg-white/[0.07] hover:border-aqua-light/40 hover:shadow-xl hover:shadow-aqua-light/5
               hover:scale-[1.01] transition-all duration-300 cursor-pointer group ${className}`}
  >
    <div className="flex items-center gap-4">
      {/* Avatar with status */}
      <div className="relative flex-shrink-0">
        <div className="relative">
          <Avatar size="lg" src={conversation.avatar} />
          {/* Subtle ring on hover */}
          <div className="absolute inset-0 rounded-full ring-2 ring-transparent
                       group-hover:ring-aqua-light/20 transition-all duration-300" />
        </div>
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full
                       border-3 border-abyss-base shadow-xl shadow-green-500/50
                       animate-pulse" />
        )}
        {conversation.unreadCount && conversation.unreadCount > 0 && (
          <div className="absolute -top-1.5 -right-1.5 min-w-[26px] h-6 px-1.5 bg-aqua-light rounded-full
                       border-3 border-abyss-base flex items-center justify-center
                       text-xs font-black text-abyss-base shadow-xl shadow-aqua-light/40
                       animate-in zoom-in-50 duration-300">
            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-black truncate text-lg group-hover:text-aqua-light transition-colors
                        ${conversation.unreadCount ? 'text-white' : 'text-white/85'}`}>
            {conversation.name}
          </h3>
          <span className={`text-xs ml-3 flex-shrink-0 font-bold uppercase tracking-wider
                          ${conversation.unreadCount ? 'text-aqua-light' : 'text-muted/60'}`}>
            {conversation.timestamp || 'Now'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <p className={`text-sm flex-1 truncate leading-relaxed
                       ${conversation.unreadCount
                         ? 'text-white font-semibold'
                         : 'text-muted/70 font-normal'}`}>
            {conversation.lastMessage || 'No messages yet'}
          </p>
          {conversation.isRead === true && (
            <div className="text-aqua-light flex-shrink-0">
              <MessageIcons.CheckDouble />
            </div>
          )}
          {conversation.isRead === false && (
            <div className="text-muted/40 flex-shrink-0">
              <MessageIcons.Check />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// 2. MESSAGE BUBBLE - Individual chat message
// ============================================================================

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    timestamp?: string;
    isOwn?: boolean;
    isRead?: boolean;
    avatar?: string;
  };
  showAvatar?: boolean;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true,
  className = ''
}) => {
  if (message.isOwn) {
    return (
      <div className={`flex justify-end gap-3 items-end animate-in fade-in slide-in-from-right-4 duration-300 ${className}`}>
        <div className="flex flex-col items-end max-w-[75%] space-y-2">
          <div className="px-6 py-4 rounded-3xl rounded-br-md bg-gradient-to-br from-aqua-light to-aqua-medium
                       text-abyss-base shadow-xl shadow-aqua-light/25
                       hover:shadow-2xl hover:shadow-aqua-light/30 transition-all duration-300">
            <p className="text-base font-medium leading-relaxed">{message.content}</p>
          </div>
          <div className="flex items-center gap-2.5 px-2">
            {message.timestamp && (
              <span className="text-xs text-muted/70 font-bold uppercase tracking-wider">{message.timestamp}</span>
            )}
            {message.isRead ? (
              <div className="text-aqua-light">
                <MessageIcons.CheckDouble />
              </div>
            ) : (
              <div className="text-muted/50">
                <MessageIcons.Check />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-start gap-3 items-end animate-in fade-in slide-in-from-left-4 duration-300 ${className}`}>
      {showAvatar && (
        <div className="flex-shrink-0">
          <Avatar size="sm" src={message.avatar} />
        </div>
      )}
      <div className="flex flex-col items-start max-w-[75%] space-y-2">
        <div className="px-6 py-4 rounded-3xl rounded-bl-md bg-white/[0.05] border-2 border-white/10
                     text-white shadow-lg hover:bg-white/[0.08] hover:border-white/20
                     transition-all duration-300">
          <p className="text-base font-medium leading-relaxed">{message.content}</p>
        </div>
        {message.timestamp && (
          <span className="text-xs text-muted/70 font-bold uppercase tracking-wider px-2">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 3. MESSAGE INPUT - Chat input with send button
// ============================================================================

interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
  disabled?: boolean;
  showAttach?: boolean;
  showEmoji?: boolean;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value = '',
  onChange,
  onSend,
  placeholder = "Type a message...",
  disabled = false,
  showAttach = true,
  showEmoji = true,
  className = ''
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div className={`p-5 bg-gradient-to-b from-abyss-depths/95 to-abyss-base/95
                    border-t-2 border-white/10 backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-4 max-w-4xl mx-auto">
        {/* Attachment buttons */}
        {(showAttach || showEmoji) && (
          <div className="flex items-center gap-2">
            {showAttach && (
              <button className="p-2.5 rounded-xl text-muted hover:text-aqua-light hover:bg-aqua-light/10
                               hover:scale-110 active:scale-95
                               transition-all duration-300 border border-transparent hover:border-aqua-light/20">
                <MessageIcons.Paperclip />
              </button>
            )}
            {showEmoji && (
              <button className="p-2.5 rounded-xl text-muted hover:text-aqua-light hover:bg-aqua-light/10
                               hover:scale-110 active:scale-95
                               transition-all duration-300 border border-transparent hover:border-aqua-light/20">
                <MessageIcons.Smile />
              </button>
            )}
          </div>
        )}

        {/* Input */}
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10
                     text-white placeholder-white/30 resize-none font-medium leading-tight
                     focus:outline-none focus:border-aqua-light/50 focus:bg-white/10
                     focus:ring-4 focus:ring-aqua-light/10
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 max-h-32 shadow-inner
                     hover:border-white/20"
            style={{ minHeight: '52px', maxHeight: '52px', overflow: 'hidden' }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="w-[52px] h-[52px] flex items-center justify-center rounded-2xl
                   bg-gradient-to-br from-aqua-light to-aqua-medium
                   text-abyss-base font-black flex-shrink-0
                   hover:from-aqua-medium hover:to-aqua-light hover:scale-110
                   active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                   disabled:hover:scale-100 transition-all duration-300
                   shadow-xl shadow-aqua-light/30 disabled:shadow-none
                   hover:shadow-2xl hover:shadow-aqua-light/40"
        >
          <MessageIcons.Send />
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// 4. ONLINE STATUS INDICATOR - Show user online/offline status
// ============================================================================

interface OnlineStatusProps {
  isOnline: boolean;
  lastSeen?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const OnlineStatus: React.FC<OnlineStatusProps> = ({
  isOnline,
  lastSeen,
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  if (showLabel) {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full
                      ${isOnline ? 'bg-green-500/15 border border-green-500/30' : 'bg-white/5 border border-white/10'}
                      ${className}`}>
        <div className={`${sizes[size]} rounded-full flex-shrink-0 ${
          isOnline
            ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse'
            : 'bg-muted/50'
        }`} />
        <span className={`text-xs font-bold uppercase tracking-wide ${
          isOnline ? 'text-green-400' : 'text-muted/70'
        }`}>
          {isOnline ? 'Online' : lastSeen || 'Offline'}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full flex-shrink-0 ${
      isOnline
        ? 'bg-green-500 shadow-xl shadow-green-500/60 ring-2 ring-green-500/20 animate-pulse'
        : 'bg-muted/40'
    } ${className}`} />
  );
};

// ============================================================================
// 5. TYPING INDICATOR - Show when other user is typing
// ============================================================================

interface TypingIndicatorProps {
  userName?: string;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  userName = 'Someone',
  className = ''
}) => (
  <div className={`flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500 ${className}`}>
    <div className="flex-shrink-0">
      <div className="relative">
        <Avatar size="sm" />
        {/* Pulsing ring around avatar */}
        <div className="absolute inset-0 rounded-full ring-2 ring-aqua-light/30 animate-pulse" />
      </div>
    </div>
    <div className="flex flex-col items-start space-y-2">
      {/* Typing bubble - matching message bubble size */}
      <div className="relative px-6 py-4 rounded-3xl rounded-bl-md bg-gradient-to-br from-white/[0.06] to-white/[0.03]
                   border-2 border-aqua-light/20 shadow-lg">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-aqua-light/5 blur-sm -z-10" />

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-aqua-light to-aqua-medium
                       shadow-md shadow-aqua-light/30 animate-bounce"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Typing label with icon */}
      <div className="flex items-center gap-2 px-2">
        <div className="w-1.5 h-1.5 rounded-full bg-aqua-light animate-pulse" />
        <span className="text-xs text-aqua-light/80 font-bold uppercase tracking-wider">
          {userName} is typing
        </span>
      </div>
    </div>
  </div>
);

// ============================================================================
// 6. UNREAD BADGE - Unread message count
// ============================================================================

interface UnreadBadgeProps {
  count: number;
  className?: string;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({
  count,
  className = ''
}) => {
  if (count === 0) return null;

  return (
    <div className={`min-w-[28px] h-7 px-2 rounded-full bg-gradient-to-br from-aqua-light to-aqua-medium
                    text-abyss-base flex items-center justify-center text-xs font-black
                    shadow-xl shadow-aqua-light/40 border-3 border-abyss-base
                    animate-in zoom-in-50 duration-300 ${className}`}>
      {count > 99 ? '99+' : count}
    </div>
  );
};

// ============================================================================
// 7. MESSAGE TIMESTAMP - Formatted timestamp display
// ============================================================================

interface MessageTimestampProps {
  timestamp: string;
  format?: 'relative' | 'absolute';
  className?: string;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  timestamp,
  format = 'relative',
  className = ''
}) => (
  <span className={`text-xs text-muted/60 font-medium ${className}`}>
    {timestamp}
  </span>
);

// ============================================================================
// 8. MESSAGE EMPTY STATE - No messages placeholder
// ============================================================================

interface MessageEmptyStateProps {
  type: 'no-conversations' | 'no-messages' | 'start-conversation';
  userName?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export const MessageEmptyState: React.FC<MessageEmptyStateProps> = ({
  type,
  userName = 'this person',
  onAction,
  actionLabel = 'Start Chatting',
  className = ''
}) => {
  const configs = {
    'no-conversations': {
      title: 'No Messages Yet',
      message: 'Start a conversation with your connections',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      bgColor: 'bg-aqua-light/15',
      borderColor: 'border-aqua-light/30',
      iconColor: 'text-aqua-light',
    },
    'no-messages': {
      title: 'No Messages',
      message: 'This conversation is empty',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      bgColor: 'bg-teal-light/15',
      borderColor: 'border-teal-light/30',
      iconColor: 'text-teal-light',
    },
    'start-conversation': {
      title: `Chat with ${userName}`,
      message: 'Send a message to start the conversation',
      icon: <div className="scale-[2]"><MessageIcons.Send /></div>,
      bgColor: 'bg-aqua-light/15',
      borderColor: 'border-aqua-light/30',
      iconColor: 'text-aqua-light',
    },
  };

  const config = configs[type];

  return (
    <div className={`flex flex-col items-center justify-center py-24 px-8 text-center ${className}`}>
      <div className={`w-32 h-32 rounded-3xl ${config.bgColor} border-2 ${config.borderColor}
                    flex items-center justify-center ${config.iconColor} mb-8
                    shadow-2xl animate-in zoom-in-50 duration-500`}>
        {config.icon}
      </div>
      <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tight mb-4">
        {config.title}
      </h3>
      <p className="text-base text-muted/80 mb-10 max-w-sm leading-relaxed">
        {config.message}
      </p>
      {onAction && (
        <Button variant="primary" onClick={onAction} className="px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// ============================================================================
// 9. CONVERSATION HEADER - Chat header with user info
// ============================================================================

interface ConversationHeaderProps {
  user: {
    name: string;
    avatar?: string;
    isOnline?: boolean;
    lastSeen?: string;
  };
  onBack?: () => void;
  onMenu?: () => void;
  className?: string;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  user,
  onBack,
  onMenu,
  className = ''
}) => (
  <div className={`px-6 py-5 bg-gradient-to-b from-abyss-depths/95 to-abyss-base/95
                  backdrop-blur-xl border-b-2 border-white/10
                  flex items-center justify-between shadow-lg ${className}`}>
    <div className="flex items-center gap-4 flex-1 min-w-0">
      {onBack && (
        <button
          onClick={onBack}
          className="flex-shrink-0 w-11 h-11 rounded-xl hover:bg-white/10 border border-white/10
                   hover:border-aqua-light/30 text-white hover:text-aqua-light
                   transition-all duration-300 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      )}

      <div className="relative flex-shrink-0">
        <div className="relative">
          <Avatar size="md" src={user.avatar} />
          <div className="absolute inset-0 rounded-full ring-2 ring-transparent
                       group-hover:ring-aqua-light/20 transition-all" />
        </div>
        <OnlineStatus
          isOnline={user.isOnline || false}
          size="md"
          className="absolute -bottom-0.5 -right-0.5 border-3 border-abyss-depths"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-black font-heading text-white truncate mb-1">{user.name}</h2>
        <OnlineStatus
          isOnline={user.isOnline || false}
          lastSeen={user.lastSeen}
          showLabel
          size="sm"
        />
      </div>
    </div>

    {onMenu && (
      <button
        onClick={onMenu}
        className="flex-shrink-0 w-11 h-11 rounded-xl hover:bg-white/10 border border-white/10
                 hover:border-white/20 text-muted hover:text-white
                 transition-all duration-300 flex items-center justify-center"
      >
        <MessageIcons.MoreVertical />
      </button>
    )}
  </div>
);

// ============================================================================
// 10. MESSAGE DAY SEPARATOR - Date divider in chat
// ============================================================================

interface MessageDaySeparatorProps {
  date: string;
  className?: string;
}

export const MessageDaySeparator: React.FC<MessageDaySeparatorProps> = ({
  date,
  className = ''
}) => (
  <div className={`flex items-center justify-center my-8 ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 blur-sm bg-aqua-light/5 rounded-full" />
      <div className="relative px-6 py-2 rounded-full bg-white/[0.05] border-2 border-white/10
                   backdrop-blur-sm shadow-lg">
        <span className="text-xs font-black font-heading text-white uppercase tracking-[0.2em]">{date}</span>
      </div>
    </div>
  </div>
);

