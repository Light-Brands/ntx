
/**
 * Dashboard Components implementing the Onyx Design System
 * Tokens: ../tokens/
 * Design Spec: ../spec/design/COMPONENT-CATALOG.md
 */
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { colors } from '../tokens';

// ============================================================================
// ICONS - Dashboard-specific icons
// ============================================================================

export const DashboardIcons = {
  // Epic Icons
  Foundation: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  ),
  Mira: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V6a4 4 0 0 1 4-4zM5 10a7 7 0 0 0 14 0M4 20a9 9 0 0 1 16 0" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  Crypto: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M9 9l3-3 3 3M9 15l3 3 3-3" />
    </svg>
  ),
  Karma: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Humans: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Practices: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Discovery: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="m11 8-3 3 3 3" />
      <path d="m14 8 3 3-3 3" />
    </svg>
  ),
  Impact: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Business: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Community: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  ),
  Monetization: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  // Utility Icons
  ChevronRight: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Command: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Code: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Book: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Flame: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

// ============================================================================
// EPIC CONFIGURATIONS
// ============================================================================

export interface EpicConfig {
  number: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  status: 'foundation' | 'mvp' | 'growth' | 'future';
  componentCount: number;
  sidebarKey: string;
}

export const epicConfigs: EpicConfig[] = [
  {
    number: 0,
    name: 'Foundation',
    description: 'Infrastructure, database, testing, observability',
    icon: <DashboardIcons.Foundation />,
    color: colors['moonlight-muted'],
    bgColor: `${colors['moonlight-muted']}1A`,
    borderColor: 'rgba(160, 160, 160, 0.3)',
    status: 'foundation',
    componentCount: 12,
    sidebarKey: 'spec-epic-00',
  },
  {
    number: 1,
    name: 'Mira',
    description: 'AI companion, onboarding, account creation',
    icon: <DashboardIcons.Mira />,
    color: colors['aqua-light'],
    bgColor: `${colors['aqua-light']}1A`,
    borderColor: 'rgba(151, 217, 196, 0.3)',
    status: 'mvp',
    componentCount: 8,
    sidebarKey: 'spec-epic-01',
  },
  {
    number: 1.1,
    name: 'Crypto',
    description: 'Wallets, VIBES token, payments, handle resolution',
    icon: <DashboardIcons.Crypto />,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    status: 'mvp',
    componentCount: 10,
    sidebarKey: 'spec-epic-1a',
  },
  {
    number: 1.2,
    name: 'Karma',
    description: 'Recognition, badges, planetary impact, leaderboards',
    icon: <DashboardIcons.Karma />,
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    status: 'mvp',
    componentCount: 8,
    sidebarKey: 'spec-epic-1b',
  },
  {
    number: 2,
    name: 'Humans',
    description: 'Profiles, chemistry, connections',
    icon: <DashboardIcons.Humans />,
    color: colors['teal-light'],
    bgColor: `${colors['teal-light']}1A`,
    borderColor: 'rgba(91, 184, 176, 0.3)',
    status: 'mvp',
    componentCount: 15,
    sidebarKey: 'spec-epic-02',
  },
  {
    number: 3,
    name: 'Practices',
    description: 'Tracking, streaks, accountability',
    icon: <DashboardIcons.Practices />,
    color: colors['gold-accent'],
    bgColor: 'rgba(251, 191, 36, 0.1)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    status: 'mvp',
    componentCount: 16,
    sidebarKey: 'spec-epic-03',
  },
  {
    number: 4,
    name: 'Discovery',
    description: 'Social discovery, search, messaging',
    icon: <DashboardIcons.Discovery />,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    status: 'mvp',
    componentCount: 14,
    sidebarKey: 'spec-epic-04',
  },
  {
    number: 5,
    name: 'Impact',
    description: 'Voting, feedback, co-creation',
    icon: <DashboardIcons.Impact />,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    status: 'mvp',
    componentCount: 6,
    sidebarKey: 'spec-epic-05',
  },
  {
    number: 6,
    name: 'Business',
    description: 'Business profiles, services, verification',
    icon: <DashboardIcons.Business />,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    status: 'growth',
    componentCount: 10,
    sidebarKey: 'spec-epic-06',
  },
  {
    number: 7,
    name: 'Community',
    description: 'Constellations, posts, moderation',
    icon: <DashboardIcons.Community />,
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    status: 'growth',
    componentCount: 12,
    sidebarKey: 'spec-epic-07',
  },
  {
    number: 8,
    name: 'Monetization',
    description: 'Memberships, Stripe, affiliates',
    icon: <DashboardIcons.Monetization />,
    color: colors['gold-accent'],
    bgColor: `${colors['gold-accent']}1A`,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    status: 'growth',
    componentCount: 8,
    sidebarKey: 'spec-epic-08',
  },
];

// ============================================================================
// 1. EPIC CARD - Navigation card for each epic
// ============================================================================

interface EpicCardProps {
  epic: EpicConfig;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const EpicCard: React.FC<EpicCardProps> = ({
  epic,
  onClick,
  isActive = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    foundation: { label: 'Foundation', bg: 'rgba(160, 160, 160, 0.15)', text: '#A0A0A0', border: 'rgba(160, 160, 160, 0.3)' },
    mvp: { label: 'MVP Phase', bg: 'rgba(151, 217, 196, 0.15)', text: '#97D9C4', border: 'rgba(151, 217, 196, 0.3)' },
    growth: { label: 'Growth Phase', bg: 'rgba(212, 175, 55, 0.15)', text: '#D4AF37', border: 'rgba(212, 175, 55, 0.3)' },
    future: { label: 'Future', bg: 'rgba(139, 92, 246, 0.15)', text: '#8b5cf6', border: 'rgba(139, 92, 246, 0.3)' },
  };

  const status = statusConfig[epic.status];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full p-5 rounded-2xl border text-left
        transition-all duration-300 group overflow-hidden
        hover:scale-[1.01] active:scale-[0.99]
        min-h-[180px] flex flex-col
        ${className}
      `}
      style={{
        backgroundColor: isHovered || isActive ? epic.bgColor : 'rgba(255, 255, 255, 0.02)',
        borderColor: isHovered || isActive ? `${epic.color}50` : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered || isActive ? `0 8px 32px ${epic.color}15` : 'none',
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${epic.color}08 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-w-0">
        {/* Top Row: Icon + Status Badge */}
        <div className="flex items-center justify-between gap-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${epic.color}15`,
              border: `1.5px solid ${epic.color}30`,
              color: epic.color,
            }}
          >
            {epic.icon}
          </div>
          <div
            className="px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-wider flex-shrink-0"
            style={{
              backgroundColor: status.bg,
              color: status.text,
              border: `1px solid ${status.border}`,
            }}
          >
            {status.label}
          </div>
        </div>

        {/* Epic Label + Title */}
        <div className="mt-4 min-w-0">
          <div
            className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5"
            style={{ color: `${epic.color}80` }}
          >
            Epic {epic.number === 1.1 ? '1A' : epic.number === 1.2 ? '1B' : epic.number.toString().padStart(2, '0')}
          </div>
          <h3
            className="text-base font-black font-heading uppercase tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? epic.color : 'var(--color-moonlight)' }}
          >
            {epic.name}
          </h3>
        </div>

        {/* Description - constrained height */}
        <p className="text-[11px] font-body text-moonlight-soft leading-relaxed mt-2 flex-1 line-clamp-2">
          {epic.description}
        </p>

        {/* Footer: Component Count */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div
            className="text-[9px] font-bold uppercase tracking-wider"
            style={{ color: 'rgba(255, 255, 255, 0.35)' }}
          >
            <span style={{ color: epic.color }}>{epic.componentCount}</span> Components
          </div>
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300
                      opacity-0 group-hover:opacity-100"
            style={{
              backgroundColor: `${epic.color}20`,
              color: epic.color,
            }}
          >
            <DashboardIcons.ChevronRight />
          </div>
        </div>
      </div>
    </button>
  );
};

// ============================================================================
// 2. QUICK STATS BAR - Platform-wide statistics
// ============================================================================

interface QuickStatsBarProps {
  totalComponents: number;
  totalEpics: number;
  specPages: number;
  completedFeatures?: number;
  className?: string;
}

export const QuickStatsBar: React.FC<QuickStatsBarProps> = ({
  totalComponents = 58,
  totalEpics = 11,
  specPages = 220,
  completedFeatures = 115,
  className = ''
}) => {
  const stats = [
    { label: 'Components', value: totalComponents, icon: <DashboardIcons.Layers />, color: '#97D9C4' },
    { label: 'Epics', value: totalEpics, icon: <DashboardIcons.Command />, color: '#5BB8B0' },
    { label: 'Spec Pages', value: specPages, icon: <DashboardIcons.Book />, color: '#8b5cf6' },
    { label: 'Sections', value: completedFeatures, icon: <DashboardIcons.Check />, color: '#10b981' },
  ];

  return (
    <div className={`p-4 rounded-2xl border border-white/10 bg-abyss-mystic/30 ${className}`}>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-abyss-light/30 border border-white/5 text-center
                      hover:bg-abyss-light hover:border-white/10 transition-all duration-300
                      animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
              style={{
                backgroundColor: `${stat.color}15`,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-black font-heading text-moonlight mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold font-ui text-moonlight-muted uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 3. COMPONENT WIDGET - Mini preview container
// ============================================================================

interface ComponentWidgetProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ComponentWidget: React.FC<ComponentWidgetProps> = ({
  title,
  subtitle,
  icon,
  color = '#97D9C4',
  onClick,
  children,
  className = ''
}) => (
  <Card
    className={`overflow-hidden hover:border-white/20 transition-all duration-300 group ${className}`}
    onClick={onClick}
  >
    {/* Header */}
    <div className="p-4 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <h4 className="text-sm font-black font-heading text-moonlight uppercase tracking-tight">{title}</h4>
          {subtitle && (
            <p className="text-[10px] font-ui text-moonlight-muted uppercase tracking-wider mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {onClick && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    group-hover:translate-x-1"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          <DashboardIcons.ChevronRight />
        </div>
      )}
    </div>
    {/* Content */}
    <div className="p-4">
      {children}
    </div>
  </Card>
);

// ============================================================================
// 4. SPEC DOC LINK - Quick link to documentation
// ============================================================================

interface SpecDocLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  sidebarKey: string;
  color?: string;
  onClick?: (key: string) => void;
  className?: string;
}

export const SpecDocLink: React.FC<SpecDocLinkProps> = ({
  title,
  description,
  icon,
  sidebarKey,
  color = '#97D9C4',
  onClick,
  className = ''
}) => (
  <button
    onClick={() => onClick?.(sidebarKey)}
    className={`
      w-full p-4 rounded-xl border border-white/10 bg-white/[0.02]
      hover:border-white/20 hover:bg-white/[0.04]
      transition-all duration-300 text-left group
      hover:scale-[1.01] active:scale-[0.99]
      ${className}
    `}
  >
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  group-hover:scale-110 transition-transform duration-300"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black font-heading text-moonlight uppercase tracking-tight group-hover:text-aqua-light transition-colors">
          {title}
        </h4>
        <p className="text-[10px] font-ui text-moonlight-muted uppercase tracking-wider mt-0.5 truncate">
          {description}
        </p>
      </div>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  group-hover:translate-x-1"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        <DashboardIcons.ExternalLink />
      </div>
    </div>
  </button>
);

// ============================================================================
// 5. DASHBOARD HEADER - Hero section with Mira
// ============================================================================

interface DashboardHeaderProps {
  userName?: string;
  greeting?: string;
  onActionClick?: () => void;
  className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = 'Developer',
  greeting,
  onActionClick,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [miraMessage, setMiraMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let timeGreeting = '';
    let contextMessage = '';

    if (hour < 12) {
      timeGreeting = 'Good morning';
      contextMessage = 'Ready to explore the design system?';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
      contextMessage = 'What would you like to build today?';
    } else {
      timeGreeting = 'Good evening';
      contextMessage = 'Wrapping up some component work?';
    }

    setMiraMessage(greeting || `${timeGreeting}, ${userName}. ${contextMessage}`);
  }, [currentTime, userName, greeting]);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-aqua-light/5 via-transparent to-teal-light/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-aqua-light/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <DashboardIcons.Clock />
                <span className="text-xs font-bold font-ui text-moonlight-muted">{formattedTime}</span>
              </div>
              <span className="text-xs font-body text-moonlight-muted/60">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-black font-ui text-success uppercase tracking-wider">System Online</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-start gap-6">
            {/* Mira Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aqua-light/20 to-teal-light/10
                            border-2 border-aqua-light/30 flex items-center justify-center
                            shadow-xl shadow-aqua-light/20 animate-pulse-slow">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-aqua-light to-teal-light
                              flex items-center justify-center">
                  <DashboardIcons.Sparkles />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-aqua-light
                            flex items-center justify-center border-2 border-abyss-base">
                <svg className="w-3 h-3 text-abyss-base" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight mb-2">
                Command Center
              </h1>
              <p className="text-lg text-aqua-light font-medium font-body mb-4 leading-relaxed">
                {miraMessage}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  onClick={onActionClick}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider
                           shadow-lg shadow-aqua-light/20 hover:shadow-xl hover:shadow-aqua-light/30"
                >
                  <DashboardIcons.Zap />
                  <span className="ml-2">Quick Start</span>
                </Button>
                <Button
                  variant="ghost"
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider
                           border border-white/10 hover:border-aqua-light/30"
                >
                  <DashboardIcons.Book />
                  <span className="ml-2">View Docs</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. PLATFORM STATUS BAR - System health indicators
// ============================================================================

interface PlatformStatusBarProps {
  className?: string;
}

export const PlatformStatusBar: React.FC<PlatformStatusBarProps> = ({
  className = ''
}) => {
  const services = [
    { name: 'Components', status: 'operational', count: '58+' },
    { name: 'Epics', status: 'operational', count: '11' },
    { name: 'Spec Docs', status: 'operational', count: '220+' },
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {services.map((service) => (
        <div key={service.name} className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              service.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-bold text-muted">
            {service.name}: <span className="text-white">{service.count}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// 7. RECENT ACTIVITY - Activity feed preview
// ============================================================================

interface ActivityItem {
  id: string;
  type: 'component' | 'epic' | 'spec';
  title: string;
  timestamp: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  onViewAll?: () => void;
  className?: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [],
  onViewAll,
  className = ''
}) => {
  const defaultActivities: ActivityItem[] = [
    { id: '1', type: 'component', title: 'Practice Dashboard', timestamp: '2 min ago', icon: <DashboardIcons.Practices /> },
    { id: '2', type: 'epic', title: 'Epic 03: Practices', timestamp: '5 min ago', icon: <DashboardIcons.Book /> },
    { id: '3', type: 'spec', title: 'API Reference', timestamp: '10 min ago', icon: <DashboardIcons.Code /> },
  ];

  const items = activities.length > 0 ? activities : defaultActivities;

  const typeColors = {
    component: '#97D9C4',
    epic: '#8b5cf6',
    spec: '#f59e0b',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-black font-heading text-moonlight uppercase tracking-wider">Recent Activity</h4>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[10px] font-bold font-ui text-aqua-light uppercase tracking-wider hover:underline"
          >
            View All
          </button>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-abyss-mystic/30 border border-white/5
                      hover:bg-abyss-light hover:border-white/10 transition-all duration-300
                      animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `${typeColors[item.type]}15`,
                color: typeColors[item.type],
              }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold font-heading text-moonlight truncate">{item.title}</p>
              <p className="text-[10px] font-ui text-moonlight-muted uppercase tracking-wider">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 8. MINI STREAK WIDGET - Practice streak preview
// ============================================================================

interface MiniStreakWidgetProps {
  currentStreak?: number;
  completed?: number;
  total?: number;
  className?: string;
}

export const MiniStreakWidget: React.FC<MiniStreakWidgetProps> = ({
  currentStreak = 7,
  completed = 2,
  total = 3,
  className = ''
}) => (
  <div className={`flex items-center justify-between ${className}`}>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-orange-500/15 border-2 border-orange-500/40
                    flex items-center justify-center text-orange-400 animate-pulse">
        <DashboardIcons.Flame />
      </div>
      <div>
        <div className="text-2xl font-black text-orange-400">{currentStreak}</div>
        <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Day Streak</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-lg font-black text-white">
        {completed}<span className="text-muted/50">/{total}</span>
      </div>
      <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Today</div>
    </div>
  </div>
);

// ============================================================================
// 9. MINI PROFILE WIDGET - Profile completion preview
// ============================================================================

interface MiniProfileWidgetProps {
  completionPercent?: number;
  sectionsComplete?: number;
  totalSections?: number;
  className?: string;
}

export const MiniProfileWidget: React.FC<MiniProfileWidgetProps> = ({
  completionPercent = 75,
  sectionsComplete = 9,
  totalSections = 12,
  className = ''
}) => {
  const radius = 30;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg width="72" height="72" className="transform -rotate-90">
            <circle
              cx="36"
              cy="36"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="36"
              cy="36"
              r={radius}
              stroke={colors['teal-light']}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 6px rgba(91, 184, 176, 0.4))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-black text-teal-light">{completionPercent}%</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-black text-white uppercase tracking-tight">Profile</div>
          <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">
            {sectionsComplete}/{totalSections} Sections
          </div>
        </div>
      </div>
      <Button variant="ghost" className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
        Complete
      </Button>
    </div>
  );
};

// ============================================================================
// 10. SECTION DIVIDER - Visual section separator
// ============================================================================

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = ''
}) => (
  <div className={`flex items-center justify-between py-6 ${className}`}>
    <div className="flex items-center gap-4">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-aqua-light/10 border border-aqua-light/20
                      flex items-center justify-center text-aqua-light">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-xl font-black font-heading text-moonlight uppercase tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs font-ui text-moonlight-muted uppercase tracking-wider mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

