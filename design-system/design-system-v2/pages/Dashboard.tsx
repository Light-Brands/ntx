
import React, { useState } from 'react';
import {
  DashboardHeader,
  QuickStatsBar,
  EpicCard,
  ComponentWidget,
  SpecDocLink,
  SectionDivider,
  MiniStreakWidget,
  MiniProfileWidget,
  RecentActivity,
  epicConfigs,
  DashboardIcons,
} from '../components/DashboardComponents';
import { Button } from '../components/Button';

// ============================================================================
// DASHBOARD PAGE - Command Center for VIBEUP Design System
// ============================================================================

interface DashboardProps {
  onNavigate: (sectionKey: string) => void;
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  className = ''
}) => {
  const [hoveredEpic, setHoveredEpic] = useState<number | null>(null);

  // Spec documentation quick links
  const specLinks = [
    {
      title: 'Architecture',
      description: 'Data models, APIs, services',
      icon: <DashboardIcons.Code />,
      sidebarKey: 'spec-data-models',
      color: '#8b5cf6',
    },
    {
      title: 'Operations',
      description: 'Admin, feature flags, testing',
      icon: <DashboardIcons.Settings />,
      sidebarKey: 'spec-admin-panel',
      color: '#f59e0b',
    },
    {
      title: 'Brand',
      description: 'Visual identity, voice, Mira',
      icon: <DashboardIcons.Sparkles />,
      sidebarKey: 'spec-visual-identity',
      color: '#ec4899',
    },
    {
      title: 'Development',
      description: 'Coding rules, agents, commands',
      icon: <DashboardIcons.Layers />,
      sidebarKey: 'spec-rules',
      color: '#10b981',
    },
  ];

  // Component showcase sections for quick access
  const componentSections = [
    { id: 'home-loading', label: 'Home Page', color: '#97D9C4' },
    { id: 'profile-stats', label: 'Profile', color: '#5BB8B0' },
    { id: 'discover-search', label: 'Discovery', color: '#8b5cf6' },
    { id: 'messages-conversations', label: 'Messages', color: '#ec4899' },
    { id: 'practices-cards', label: 'Practices', color: '#fbbf24' },
    { id: 'community-full-view', label: 'Community', color: '#10b981' },
  ];

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Hero Header with Mira */}
      <DashboardHeader
        userName="Developer"
        onActionClick={() => onNavigate('identity')}
      />

      {/* Main Content */}
      <div className="px-6 py-8 space-y-12">
        {/* Quick Stats */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <QuickStatsBar
            totalComponents={50}
            totalEpics={9}
            specPages={200}
            completedFeatures={103}
          />
        </div>

        {/* Epic Navigation Grid */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
          <SectionDivider
            title="Epic Navigation"
            subtitle="9 Platform Domains"
            icon={<DashboardIcons.Command />}
            action={
              <Button
                variant="ghost"
                onClick={() => onNavigate('spec-epic-00')}
                className="text-xs font-bold uppercase tracking-wider"
              >
                View All Specs
                <DashboardIcons.ChevronRight />
              </Button>
            }
          />

          {/* 3x3 Grid of Epic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {epicConfigs.map((epic, index) => (
              <div
                key={epic.number}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-w-0"
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
                onMouseEnter={() => setHoveredEpic(epic.number)}
                onMouseLeave={() => setHoveredEpic(null)}
              >
                <EpicCard
                  epic={epic}
                  onClick={() => onNavigate(epic.sidebarKey)}
                  isActive={hoveredEpic === epic.number}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Live Component Widgets */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          <SectionDivider
            title="Live Widgets"
            subtitle="Component Previews"
            icon={<DashboardIcons.Layers />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Practice Streak Widget */}
            <ComponentWidget
              title="Practice Tracker"
              subtitle="Epic 03: Practices"
              icon={<DashboardIcons.Practices />}
              color="#fbbf24"
              onClick={() => onNavigate('practices-dashboard')}
            >
              <MiniStreakWidget
                currentStreak={7}
                completed={2}
                total={3}
              />
            </ComponentWidget>

            {/* Profile Completion Widget */}
            <ComponentWidget
              title="Profile Progress"
              subtitle="Epic 02: Humans"
              icon={<DashboardIcons.Humans />}
              color="#5BB8B0"
              onClick={() => onNavigate('myprofile-own-view')}
            >
              <MiniProfileWidget
                completionPercent={75}
                sectionsComplete={9}
                totalSections={12}
              />
            </ComponentWidget>

            {/* Impact Preview Widget */}
            <ComponentWidget
              title="Impact Voting"
              subtitle="Epic 05: Impact"
              icon={<DashboardIcons.Impact />}
              color="#10b981"
              onClick={() => onNavigate('impact-dashboard')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/40
                                flex items-center justify-center text-emerald-400">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-black font-heading text-success">15</div>
                    <div className="text-[10px] text-moonlight-muted uppercase tracking-wider font-bold font-ui">Votes Cast</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-heading text-moonlight">3</div>
                  <div className="text-[10px] text-moonlight-muted uppercase tracking-wider font-bold font-ui">Features</div>
                </div>
              </div>
            </ComponentWidget>

            {/* Discovery Match Widget */}
            <ComponentWidget
              title="Discovery"
              subtitle="Epic 04: Discovery"
              icon={<DashboardIcons.Discovery />}
              color="#8b5cf6"
              onClick={() => onNavigate('discover-cards')}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-abyss-base"
                      style={{
                        background: `linear-gradient(135deg, ${
                          i === 1 ? '#8b5cf6' : i === 2 ? '#ec4899' : '#fbbf24'
                        }40, transparent)`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black font-heading text-moonlight">12 Matches</div>
                  <div className="text-[10px] text-moonlight-muted uppercase tracking-wider font-bold font-ui">87% Aligned</div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-abyss-mystic border border-aqua-light/30 text-aqua-light text-xs font-bold font-ui">
                  New
                </div>
              </div>
            </ComponentWidget>

            {/* Community Activity Widget */}
            <ComponentWidget
              title="Community"
              subtitle="Epic 07: Community"
              icon={<DashboardIcons.Community />}
              color="#ec4899"
              onClick={() => onNavigate('community-full-view')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/15 border-2 border-pink-500/40
                                flex items-center justify-center text-pink-400">
                    <DashboardIcons.Community />
                  </div>
                  <div>
                    <div className="text-lg font-black font-heading text-moonlight">5</div>
                    <div className="text-[10px] text-moonlight-muted uppercase tracking-wider font-bold font-ui">Communities</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-aqua-light">
                    <div className="w-2 h-2 rounded-full bg-aqua-light animate-pulse" />
                    <span className="text-xs font-bold font-ui">3 Active</span>
                  </div>
                </div>
              </div>
            </ComponentWidget>

            {/* Mira AI Widget */}
            <ComponentWidget
              title="Mira Intelligence"
              subtitle="Epic 01: Mira"
              icon={<DashboardIcons.Mira />}
              color="#97D9C4"
              onClick={() => onNavigate('ai-guide')}
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-aqua-light/5 border border-aqua-light/20">
                  <p className="text-sm text-aqua-light/90 italic leading-relaxed font-body">
                    "Ready to explore? I'm here to guide you through the design system."
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-moonlight-muted uppercase tracking-wider font-bold font-ui">Context Aware</span>
                  <div className="flex items-center gap-1 text-aqua-light">
                    <div className="w-2 h-2 rounded-full bg-aqua-light animate-pulse" />
                    <span className="font-bold font-ui">Online</span>
                  </div>
                </div>
              </div>
            </ComponentWidget>

            {/* Crypto/VIBES Wallet Widget */}
            <ComponentWidget
              title="VIBES Wallet"
              subtitle="Epic 1A: Crypto"
              icon={<DashboardIcons.Crypto />}
              color="#3b82f6"
              onClick={() => onNavigate('spec-epic-1a')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 border-2 border-blue-500/40
                                flex items-center justify-center text-blue-400">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black text-blue-400">1,247</div>
                    <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">VIBES</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-white">$52.30</div>
                  <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">USDC</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-muted/60 uppercase tracking-wider font-bold">@yourusername</span>
                <div className="flex items-center gap-1 text-blue-400">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="font-bold">Verified</span>
                </div>
              </div>
            </ComponentWidget>

            {/* Karma Recognition Widget */}
            <ComponentWidget
              title="KARMA Score"
              subtitle="Epic 1B: Karma"
              icon={<DashboardIcons.Karma />}
              color="#22c55e"
              onClick={() => onNavigate('spec-epic-1b')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/15 border-2 border-green-500/40
                                flex items-center justify-center text-green-400">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black text-green-400">2,847</div>
                    <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Karma</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold">
                    Flourishing
                  </div>
                  <div className="text-[10px] text-muted/60 uppercase tracking-wider font-bold mt-1">Level 5</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-muted/60 uppercase tracking-wider font-bold">1.25x VIBES</span>
                <div className="flex items-center gap-1 text-green-400">
                  <span className="font-bold">🌳 47 Trees</span>
                </div>
              </div>
            </ComponentWidget>
          </div>
        </section>

        {/* Quick Component Access */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
          <SectionDivider
            title="Component Library"
            subtitle="Quick Access"
            icon={<DashboardIcons.Zap />}
          />

          <div className="flex flex-wrap gap-2">
            {componentSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className="px-4 py-2.5 rounded-xl border-2 transition-all duration-300
                         hover:scale-105 active:scale-95 font-bold text-sm uppercase tracking-tight
                         animate-in fade-in slide-in-from-bottom-2"
                style={{
                  animationDelay: `${(index + 1) * 50}ms`,
                  backgroundColor: `${section.color}10`,
                  borderColor: `${section.color}30`,
                  color: section.color,
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </section>

        {/* Spec Documentation */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
          <SectionDivider
            title="Spec Documentation"
            subtitle="200+ Pages of Specs"
            icon={<DashboardIcons.Book />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specLinks.map((link, index) => (
              <div
                key={link.sidebarKey}
                className="animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${(index + 1) * 50}ms` }}
              >
                <SpecDocLink
                  title={link.title}
                  description={link.description}
                  icon={link.icon}
                  sidebarKey={link.sidebarKey}
                  color={link.color}
                  onClick={onNavigate}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '500ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <div className="p-6 rounded-2xl border border-white/10 bg-abyss-mystic/30">
              <RecentActivity />
            </div>

            {/* Platform Overview */}
            <div className="p-6 rounded-2xl border border-white/10 bg-abyss-mystic/30">
              <h4 className="text-xs font-black font-heading text-moonlight uppercase tracking-wider mb-4">Platform Overview</h4>
              <div className="space-y-4">
                {/* Phase Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-moonlight-muted" />
                      <span className="text-sm font-bold font-body text-moonlight-muted">Foundation</span>
                    </div>
                    <span className="text-xs font-bold font-heading text-moonlight">1 Epic</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-aqua-light" />
                      <span className="text-sm font-bold font-body text-moonlight-muted">MVP Phase</span>
                    </div>
                    <span className="text-xs font-bold font-heading text-moonlight">7 Epics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gold-accent" />
                      <span className="text-sm font-bold font-body text-moonlight-muted">Growth Phase</span>
                    </div>
                    <span className="text-xs font-bold font-heading text-moonlight">3 Epics</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold font-ui text-moonlight-muted uppercase tracking-wider">Design System Coverage</span>
                    <span className="text-xs font-bold font-heading text-aqua-light">100%</span>
                  </div>
                  <div className="h-2 rounded-full bg-abyss-lighter overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-aqua-light to-teal-light"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/Asset-1.png"
              alt="VIBEUP Icon"
              className="w-8 h-8 object-contain opacity-60"
              style={{ filter: 'drop-shadow(0 0 15px color-mix(in srgb, var(--color-aqua-light) 20%, transparent))' }}
            />
            <img
              src="/VIBEUP-LOGO.svg"
              alt="VIBEUP"
              className="h-5 object-contain opacity-60"
            />
          </div>
          <p className="text-xs text-moonlight-muted uppercase tracking-widest font-bold font-heading">
            Unified Design System v2.0
          </p>
          <p className="text-[10px] text-moonlight-muted/60 uppercase tracking-wider mt-1 font-body">
            58+ Components • 11 Epics • 220+ Spec Pages
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;

