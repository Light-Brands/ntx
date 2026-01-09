
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';

// ============================================================================
// ICONS
// ============================================================================

export const ImpactIcons = {
  Vote: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Award: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ChevronUp: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
};

// ============================================================================
// 1. IMPACT STAT CARD - Individual stat display
// ============================================================================

interface ImpactStatCardProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export const ImpactStatCard: React.FC<ImpactStatCardProps> = ({
  label,
  value,
  icon,
  color = '#97D9C4',
  onClick,
  className = ''
}) => (
  <div
    onClick={onClick}
    className={`p-5 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]
               transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-aqua-light/40 hover:scale-105' : ''}
               ${className}`}
  >
    <div className="flex items-center justify-between mb-3">
      {icon && (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
             style={{ backgroundColor: `${color}15`, border: `2px solid ${color}30`, color }}>
          {icon}
        </div>
      )}
    </div>
    <div className="text-3xl font-black text-white mb-2">{value.toLocaleString()}</div>
    <div className="text-xs text-muted/70 uppercase tracking-wider font-bold">{label}</div>
  </div>
);

// ============================================================================
// 2. VOTING CARD - Votable feature/initiative card
// ============================================================================

interface VotingCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: 'feature' | 'initiative';
    status: 'active' | 'planned' | 'in_development' | 'launched';
    voteCount: number;
    commentCount: number;
    viewCount?: number;
    userHasVoted?: boolean;
    image?: string;
  };
  onVote?: () => void;
  onClick?: () => void;
  votingInProgress?: boolean;
  className?: string;
}

export const VotingCard: React.FC<VotingCardProps> = ({
  item,
  onVote,
  onClick,
  votingInProgress = false,
  className = ''
}) => {
  const statusConfigs = {
    active: { label: 'Active', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    planned: { label: 'Planned', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    in_development: { label: 'In Progress', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
    launched: { label: 'Launched', color: '#97D9C4', bg: 'rgba(151, 217, 196, 0.15)' },
  };

  const status = statusConfigs[item.status];

  return (
    <Card
      className={`overflow-hidden hover:border-aqua-light/40 hover:shadow-xl hover:shadow-aqua-light/10
                 transition-all duration-500 group ${className}`}
    >
      {/* Image */}
      {item.image && (
        <div
          className="h-40 bg-gradient-to-br from-teal-light/20 to-abyss-base bg-cover bg-center relative cursor-pointer"
          style={{ backgroundImage: `url(${item.image})` }}
          onClick={onClick}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-abyss-base/40 to-transparent" />
          <div className="absolute top-4 right-4">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide backdrop-blur-md border-2"
              style={{
                backgroundColor: status.bg,
                borderColor: status.color,
                color: status.color,
                boxShadow: `0 0 15px ${status.color}30`
              }}
            >
              {status.label}
            </div>
          </div>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Title & Description */}
        <div onClick={onClick} className="cursor-pointer">
          <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-aqua-light
                       transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-pearl/75 line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <ImpactIcons.MessageCircle />
            <span className="font-medium">{item.commentCount}</span>
          </div>
          {item.viewCount && (
            <div className="flex items-center gap-1.5">
              <ImpactIcons.Eye />
              <span className="font-medium">{item.viewCount}</span>
            </div>
          )}
        </div>

        {/* Vote Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVote?.();
          }}
          disabled={votingInProgress}
          className={`w-full px-6 py-3 rounded-xl border-2 transition-all duration-300
                     flex items-center justify-center gap-3 font-black uppercase text-sm tracking-wide
                     ${item.userHasVoted
                       ? 'bg-gradient-to-br from-aqua-light/20 to-aqua-light/10 border-aqua-light text-aqua-light shadow-lg shadow-aqua-light/20'
                       : 'bg-white/[0.02] border-white/10 text-white hover:border-aqua-light/30 hover:bg-aqua-light/5'
                     } ${votingInProgress ? 'opacity-50 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
        >
          <div className={item.userHasVoted ? 'text-aqua-light' : 'text-muted'}>
            <ImpactIcons.ChevronUp />
          </div>
          <span>{item.voteCount.toLocaleString()}</span>
          <span className="text-xs opacity-70">{item.userHasVoted ? 'Voted' : 'Vote'}</span>
        </button>
      </div>
    </Card>
  );
};

// ============================================================================
// 3. IMPACT STATS BAR - Summary of user impact
// ============================================================================

interface ImpactStatsBarProps {
  votesCast: number;
  featuresInfluenced: number;
  initiativesInfluenced: number;
  impactScore: number;
  className?: string;
}

export const ImpactStatsBar: React.FC<ImpactStatsBarProps> = ({
  votesCast,
  featuresInfluenced,
  initiativesInfluenced,
  impactScore,
  className = ''
}) => (
  <div className={`p-4 rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
    <div className="grid grid-cols-4 gap-4">
      <ImpactStatCard label="Votes Cast" value={votesCast} icon={<ImpactIcons.Vote />} />
      <ImpactStatCard label="Features" value={featuresInfluenced} icon={<ImpactIcons.TrendingUp />} />
      <ImpactStatCard label="Initiatives" value={initiativesInfluenced} icon={<ImpactIcons.Award />} />
      <ImpactStatCard label="Impact Score" value={impactScore} icon={<ImpactIcons.Sparkles />} color="#fbbf24" />
    </div>
  </div>
);

// ============================================================================
// 4. STATUS BADGE - Item status indicator
// ============================================================================

interface StatusBadgeProps {
  status: 'active' | 'planned' | 'in_development' | 'launched';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const configs = {
    active: { label: 'Active', color: '#10b981', bg: 'rgba(16, 185, 129, 0.2)' },
    planned: { label: 'Planned', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' },
    in_development: { label: 'In Progress', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.2)' },
    launched: { label: 'Launched', color: '#97D9C4', bg: 'rgba(151, 217, 196, 0.2)' },
  };

  const config = configs[status];

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border-2 ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.color,
        color: config.color
      }}
    >
      {config.label}
    </div>
  );
};

// ============================================================================
// 5. IMPACT DASHBOARD - Complete impact page with tabs
// ============================================================================

interface ImpactDashboardProps {
  className?: string;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'features' | 'initiatives'>('features');

  const mockFeatures = [
    {
      id: '1',
      title: 'Dark Mode Support',
      description: 'Add comprehensive dark mode theming across the entire platform for better nighttime usage.',
      category: 'feature' as const,
      status: 'in_development' as const,
      voteCount: 247,
      commentCount: 32,
      viewCount: 1420,
      userHasVoted: true,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
    },
    {
      id: '2',
      title: 'Voice Journaling',
      description: 'Record voice notes for your journal entries instead of typing.',
      category: 'feature' as const,
      status: 'planned' as const,
      voteCount: 189,
      commentCount: 18,
      viewCount: 876,
      userHasVoted: false,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
    },
  ];

  const mockInitiatives = [
    {
      id: '3',
      title: 'Mental Health Awareness Campaign',
      description: 'Partner with mental health organizations to raise awareness and provide resources.',
      category: 'initiative' as const,
      status: 'active' as const,
      voteCount: 542,
      commentCount: 67,
      viewCount: 2341,
      userHasVoted: true,
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400',
    },
  ];

  const items = activeTab === 'features' ? mockFeatures : mockInitiatives;

  return (
    <div className={`space-y-6 pb-6 ${className}`}>
      {/* Header */}
      <div className="text-center py-8 px-6 bg-gradient-to-b from-aqua-light/5 to-transparent">
        <div className="w-16 h-16 rounded-2xl bg-aqua-light/10 border-2 border-aqua-light/20
                     flex items-center justify-center text-aqua-light mx-auto mb-4">
          <ImpactIcons.Award />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
          Your Impact
        </h2>
        <p className="text-sm text-muted/80">Help shape the future of VIBEUP</p>
      </div>

      {/* Stats */}
      <div className="px-6">
        <ImpactStatsBar
          votesCast={15}
          featuresInfluenced={3}
          initiativesInfluenced={5}
          impactScore={247}
        />
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex gap-2">
            {[
              { id: 'features' as const, label: 'Features', count: 12 },
              { id: 'initiatives' as const, label: 'Initiatives', count: 8 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest
                         transition-all duration-300 flex items-center justify-center gap-2
                         ${activeTab === tab.id
                           ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/20'
                           : 'text-muted hover:bg-white/5 hover:text-white'
                         }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black
                               ${activeTab === tab.id
                                 ? 'bg-abyss-base/30 text-abyss-base'
                                 : 'bg-aqua-light/20 text-aqua-light'
                               }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 grid gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <VotingCard
              item={item}
              onVote={() => console.log('Vote', item.id)}
              onClick={() => console.log('View', item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

