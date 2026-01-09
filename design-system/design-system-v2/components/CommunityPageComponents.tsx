
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';

// ============================================================================
// ICONS
// ============================================================================

export const CommunityIcons = {
  Users: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Crown: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m2 12 7-7 10 7-10 7-7-7z"/>
      <path d="M12 2v7.4"/>
      <path d="m2 12 7 7"/>
      <path d="M22 12l-7 7"/>
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

// ============================================================================
// 1. COMMUNITY CARD - Discovery/browse card
// ============================================================================

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description?: string;
    coverImage?: string;
    memberCount: number;
    accessType: 'public' | 'semi_private' | 'private';
    tags?: string[];
  };
  onClick?: () => void;
  onJoin?: () => void;
  className?: string;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  onClick,
  onJoin,
  className = ''
}) => (
  <Card
    className={`overflow-hidden hover:border-aqua-light/40 hover:scale-[1.02] hover:shadow-2xl
               hover:shadow-aqua-light/10 transition-all duration-500 cursor-pointer group ${className}`}
    onClick={onClick}
  >
    {/* Cover Image */}
    <div
      className="h-36 bg-gradient-to-br from-teal-light/20 to-abyss-base bg-cover bg-center relative"
      style={community.coverImage ? { backgroundImage: `url(${community.coverImage})` } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-abyss-base/50 to-transparent" />
      {/* Access Badge - More Visible */}
      <div className="absolute top-4 right-4">
        <AccessTypeBadge type={community.accessType} />
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-aqua-light transition-colors mb-2">
          {community.name}
        </h3>
        {community.description && (
          <p className="text-sm text-pearl/75 line-clamp-2 leading-relaxed">
            {community.description}
          </p>
        )}
      </div>

      {/* Member Count */}
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
        <div className="text-aqua-light">
          <CommunityIcons.Users />
        </div>
        <span className="text-sm font-bold text-white">{community.memberCount.toLocaleString()} members</span>
      </div>

      {/* Tags */}
      {community.tags && community.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {community.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-aqua-light/15 border border-aqua-light/30
                       text-aqua-light text-xs font-bold uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Join Button */}
      <Button
        variant="primary"
        className="w-full flex items-center justify-center gap-2 py-3 shadow-lg shadow-aqua-light/20"
        onClick={(e) => {
          e.stopPropagation();
          onJoin?.();
        }}
      >
        <CommunityIcons.UserPlus />
        <span>Join Community</span>
      </Button>
    </div>
  </Card>
);

// ============================================================================
// 2. ACCESS TYPE BADGE - Public/Private indicator
// ============================================================================

interface AccessTypeBadgeProps {
  type: 'public' | 'semi_private' | 'private';
  className?: string;
}

export const AccessTypeBadge: React.FC<AccessTypeBadgeProps> = ({ type, className = '' }) => {
  const configs = {
    public: {
      label: 'Public',
      icon: <CommunityIcons.Globe />,
      color: '#97D9C4',
      bg: 'rgba(4, 40, 47, 0.95)' // Dark bg for visibility
    },
    semi_private: {
      label: 'Semi-Private',
      icon: <CommunityIcons.Users />,
      color: '#fbbf24',
      bg: 'rgba(4, 40, 47, 0.95)'
    },
    private: {
      label: 'Private',
      icon: <CommunityIcons.Lock />,
      color: '#8b5cf6',
      bg: 'rgba(4, 40, 47, 0.95)'
    },
  };

  const config = configs[type];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 backdrop-blur-md
                 shadow-lg ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.color,
        color: config.color,
        boxShadow: `0 0 20px ${config.color}40`
      }}
    >
      {config.icon}
      <span className="text-xs font-black uppercase tracking-wide">{config.label}</span>
    </div>
  );
};

// ============================================================================
// 3. MEMBER ROLE BADGE - Owner/Moderator/Member indicator
// ============================================================================

interface MemberRoleBadgeProps {
  role: 'owner' | 'moderator' | 'member';
  className?: string;
}

export const MemberRoleBadge: React.FC<MemberRoleBadgeProps> = ({ role, className = '' }) => {
  const configs = {
    owner: {
      label: 'Owner',
      icon: <CommunityIcons.Crown />,
      color: '#fbbf24'
    },
    moderator: {
      label: 'Mod',
      icon: <CommunityIcons.Shield />,
      color: '#97D9C4'
    },
    member: {
      label: 'Member',
      icon: <CommunityIcons.Users />,
      color: '#cbd5e1'
    },
  };

  const config = configs[role];

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${className}`}
      style={{
        backgroundColor: `${config.color}15`,
        borderColor: `${config.color}30`,
        color: config.color
      }}
    >
      {config.icon}
      <span className="text-[10px] font-black uppercase tracking-wide">{config.label}</span>
    </div>
  );
};

// ============================================================================
// 4. COMMUNITY MEMBER CARD - Individual member item
// ============================================================================

interface CommunityMemberCardProps {
  member: {
    name: string;
    avatar?: string;
    role: 'owner' | 'moderator' | 'member';
    joinedDate?: string;
  };
  onViewProfile?: () => void;
  onMessage?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const CommunityMemberCard: React.FC<CommunityMemberCardProps> = ({
  member,
  onViewProfile,
  onMessage,
  onRemove,
  className = ''
}) => (
  <Card className={`p-5 hover:border-aqua-light/30 hover:shadow-lg transition-all duration-300 group ${className}`}>
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer" onClick={onViewProfile}>
        <Avatar size="md" src={member.avatar} />
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-white group-hover:text-aqua-light transition-colors truncate">
            {member.name}
          </h4>
          <div className="flex items-center gap-2 mt-1.5">
            <MemberRoleBadge role={member.role} />
            {member.joinedDate && (
              <span className="text-[10px] text-muted/60 uppercase tracking-wide">
                {member.joinedDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onMessage && (
          <button
            onClick={onMessage}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-aqua-light/10 text-muted hover:text-aqua-light
                     border border-white/10 hover:border-aqua-light/30
                     transition-all duration-300 hover:scale-105"
          >
            <CommunityIcons.MessageCircle />
          </button>
        )}
        {onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  </Card>
);

// ============================================================================
// 5. COMMUNITY STATS BAR - Display community statistics
// ============================================================================

interface CommunityStatsBarProps {
  members: number;
  posts: number;
  activeToday?: number;
  className?: string;
}

export const CommunityStatsBar: React.FC<CommunityStatsBarProps> = ({
  members,
  posts,
  activeToday,
  className = ''
}) => (
  <div className={`p-4 rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-3 rounded-xl bg-white/5">
        <p className="text-xl font-black text-aqua-light">{members.toLocaleString()}</p>
        <p className="text-[9px] text-muted uppercase tracking-wider">Members</p>
      </div>
      <div className="text-center p-3 rounded-xl bg-white/5">
        <p className="text-xl font-black text-white">{posts.toLocaleString()}</p>
        <p className="text-[9px] text-muted uppercase tracking-wider">Posts</p>
      </div>
      {activeToday !== undefined && (
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-xl font-black text-green-400">{activeToday}</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Online</p>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// 6. COMMUNITY JOIN/LEAVE BUTTON - Membership action
// ============================================================================

interface CommunityMembershipButtonProps {
  isMember: boolean;
  isPending?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  className?: string;
}

export const CommunityMembershipButton: React.FC<CommunityMembershipButtonProps> = ({
  isMember,
  isPending = false,
  onJoin,
  onLeave,
  className = ''
}) => {
  if (isPending) {
    return (
      <Button variant="ghost" disabled className={className}>
        Request Pending
      </Button>
    );
  }

  if (isMember) {
    return (
      <Button
        variant="ghost"
        onClick={onLeave}
        className={`flex items-center gap-2 ${className}`}
      >
        <CommunityIcons.Check />
        <span>Member</span>
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      onClick={onJoin}
      className={`flex items-center gap-2 ${className}`}
    >
      <CommunityIcons.UserPlus />
      <span>Join Community</span>
    </Button>
  );
};

// ============================================================================
// 7. COMMUNITY HEADER BANNER - Full community header with cover
// ============================================================================

interface CommunityHeaderBannerProps {
  community: {
    name: string;
    description?: string;
    coverImage?: string;
    icon?: string;
    memberCount: number;
    accessType: 'public' | 'semi_private' | 'private';
  };
  isMember?: boolean;
  onJoin?: () => void;
  onShare?: () => void;
  className?: string;
}

export const CommunityHeaderBanner: React.FC<CommunityHeaderBannerProps> = ({
  community,
  isMember = false,
  onJoin,
  onShare,
  className = ''
}) => (
  <div className={`space-y-5 ${className}`}>
    {/* Cover */}
    <div
      className="h-40 rounded-t-3xl bg-gradient-to-br from-aqua-light/20 to-abyss-base bg-cover bg-center relative"
      style={community.coverImage ? { backgroundImage: `url(${community.coverImage})` } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-abyss-base/60 to-transparent rounded-t-3xl" />
      <div className="absolute top-4 right-4">
        <AccessTypeBadge type={community.accessType} />
      </div>
    </div>

    {/* Info */}
    <div className="px-2 -mt-16 relative z-10">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          {/* Community Icon */}
          <div className="w-24 h-24 rounded-2xl bg-abyss-depths border-4 border-abyss-base
                       shadow-2xl flex items-center justify-center overflow-hidden">
            {community.icon ? (
              <img src={community.icon} alt={community.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl text-aqua-light">
                <CommunityIcons.Users />
              </div>
            )}
          </div>

          {/* Name & Stats */}
          <div className="pb-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
              {community.name}
            </h2>
            <div className="flex items-center gap-2 text-muted text-xs">
              <CommunityIcons.Users />
              <span className="font-bold">{community.memberCount.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pb-2 flex items-center gap-3">
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-aqua-light
                       transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          )}
          <CommunityMembershipButton isMember={isMember} onJoin={onJoin} />
        </div>
      </div>

      {/* Description */}
      {community.description && (
        <p className="text-sm text-pearl/80 leading-relaxed mt-4">
          {community.description}
        </p>
      )}
    </div>
  </div>
);

// ============================================================================
// 8. COMMUNITY POST ITEM - Post in community feed
// ============================================================================

interface CommunityPostItemProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      role?: 'owner' | 'moderator' | 'member';
    };
    content: string;
    timestamp: string;
    likes?: number;
    comments?: number;
  };
  onLike?: () => void;
  onComment?: () => void;
  className?: string;
}

export const CommunityPostItem: React.FC<CommunityPostItemProps> = ({
  post,
  onLike,
  onComment,
  className = ''
}) => (
  <Card className={`p-6 hover:border-aqua-light/30 hover:shadow-lg transition-all duration-300 group ${className}`}>
    {/* Author */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <Avatar size="md" src={post.author.avatar} />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-base font-black text-white">{post.author.name}</p>
            {post.author.role && post.author.role !== 'member' && (
              <MemberRoleBadge role={post.author.role} />
            )}
          </div>
          <p className="text-xs text-muted/70 font-medium uppercase tracking-wide">{post.timestamp}</p>
        </div>
      </div>
    </div>

    {/* Content */}
    <p className="text-base text-pearl/85 leading-relaxed mb-5 px-1">
      {post.content}
    </p>

    {/* Actions */}
    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
      <button
        onClick={onLike}
        className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-aqua-light/10
                 text-muted hover:text-aqua-light transition-all duration-300 hover:scale-105"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-sm font-black">{post.likes || 0}</span>
      </button>
      <button
        onClick={onComment}
        className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-aqua-light/10
                 text-muted hover:text-aqua-light transition-all duration-300 hover:scale-105"
      >
        <CommunityIcons.MessageCircle />
        <span className="text-sm font-black">{post.comments || 0}</span>
      </button>
    </div>
  </Card>
);

// ============================================================================
// 9. CREATE COMMUNITY BUTTON - Start new community
// ============================================================================

interface CreateCommunityButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CreateCommunityButton: React.FC<CreateCommunityButtonProps> = ({
  onClick,
  className = ''
}) => (
  <button
    onClick={onClick}
    className={`w-full p-8 rounded-3xl border-2 border-dashed border-aqua-light/30
               bg-gradient-to-br from-aqua-light/8 to-aqua-light/3
               hover:from-aqua-light/15 hover:to-aqua-light/5
               hover:border-aqua-light/50 hover:shadow-xl hover:shadow-aqua-light/20
               hover:scale-[1.01] active:scale-95
               transition-all duration-300 group ${className}`}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-aqua-light/20 border-2 border-aqua-light/40
                   flex items-center justify-center text-aqua-light
                   group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
        <CommunityIcons.Plus />
      </div>
      <div className="text-center">
        <p className="text-lg font-black text-aqua-light uppercase tracking-tight mb-1">
          Create Community
        </p>
        <p className="text-xs text-muted/70">Start your own community space</p>
      </div>
    </div>
  </button>
);

// ============================================================================
// 10. COMMUNITY FULL VIEW - Complete community page with tabs
// ============================================================================

interface CommunityFullViewProps {
  className?: string;
}

export const CommunityFullView: React.FC<CommunityFullViewProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>('posts');

  const mockPosts = [
    {
      id: '1',
      author: { name: 'Lena River', avatar: 'https://i.pravatar.cc/150?u=lena', role: 'moderator' as const },
      content: 'Just finished an amazing meditation session. The practice has transformed my perspective.',
      timestamp: '2h ago',
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      author: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'member' as const },
      content: 'Grateful for this community and all the wisdom shared here daily.',
      timestamp: '5h ago',
      likes: 18,
      comments: 5,
    },
  ];

  const mockMembers = [
    { name: 'Lena River', avatar: 'https://i.pravatar.cc/150?u=lena', role: 'owner' as const, joinedDate: '6 months ago' },
    { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'moderator' as const, joinedDate: '3 months ago' },
    { name: 'Maya Patel', avatar: 'https://i.pravatar.cc/150?u=maya', role: 'member' as const, joinedDate: '2 weeks ago' },
    { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?u=jordan', role: 'member' as const, joinedDate: '1 week ago' },
  ];

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Header */}
      <CommunityHeaderBanner
        community={{
          name: 'Mindful Living',
          description: 'A vibrant community for conscious living and authentic connection.',
          coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          memberCount: 1420,
          accessType: 'public',
        }}
        isMember={true}
        onShare={() => console.log('Share')}
      />

      {/* Stats */}
      <div className="px-5">
        <CommunityStatsBar members={1420} posts={3847} activeToday={124} />
      </div>

      {/* Tabs */}
      <div className="px-5">
        <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex gap-2">
            {[
              { id: 'posts' as const, label: 'Posts' },
              { id: 'members' as const, label: 'Members' },
              { id: 'about' as const, label: 'About' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest
                         transition-all duration-300
                         ${activeTab === tab.id
                           ? 'bg-aqua-light text-abyss-base shadow-lg'
                           : 'text-muted hover:bg-white/5 hover:text-white'
                         }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5">
        {activeTab === 'posts' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            {mockPosts.map((post) => (
              <CommunityPostItem
                key={post.id}
                post={post}
                onLike={() => console.log('Like', post.id)}
                onComment={() => console.log('Comment', post.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-white uppercase tracking-tight">
                {mockMembers.length} Members
              </h3>
            </div>
            {mockMembers.map((member) => (
              <CommunityMemberCard
                key={member.name}
                member={member}
                onViewProfile={() => console.log('View', member.name)}
                onMessage={() => console.log('Message', member.name)}
              />
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-5">
              <h3 className="text-base font-black text-white uppercase tracking-tight mb-3">
                About This Community
              </h3>
              <p className="text-sm text-pearl/80 leading-relaxed mb-4">
                We believe that true growth happens when we come together with shared intention.
                This community is a space for mindful living, authentic conversations, and supporting
                each other's journey toward consciousness and well-being.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-1">Founded</p>
                  <p className="text-sm font-bold text-white">June 2024</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-1">Access</p>
                  <p className="text-sm font-bold text-aqua-light">Public</p>
                </div>
              </div>
            </Card>

            <CommunityRulesCard
              rules={[
                'Be respectful and kind to all community members',
                'No spam, self-promotion, or commercial content',
                'Keep discussions relevant to mindfulness and growth',
                'Respect privacy - no sharing personal information',
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 11. COMMUNITY RULES CARD - Display community guidelines
// ============================================================================

interface CommunityRulesCardProps {
  rules: string[];
  className?: string;
}

export const CommunityRulesCard: React.FC<CommunityRulesCardProps> = ({
  rules,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <h3 className="text-base font-black text-white uppercase tracking-tight mb-4">
      Community Rules
    </h3>
    <div className="space-y-3">
      {rules.map((rule, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-aqua-light/10 border border-aqua-light/20
                       flex items-center justify-center text-aqua-light flex-shrink-0 mt-0.5">
            <span className="text-xs font-black">{index + 1}</span>
          </div>
          <p className="text-sm text-pearl/80 leading-relaxed flex-1">{rule}</p>
        </div>
      ))}
    </div>
  </Card>
);

