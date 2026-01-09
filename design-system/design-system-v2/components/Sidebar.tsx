
import React, { useState, useEffect, useMemo } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  group: string;
  items?: NavItem[];
  subgroups?: NavGroup[];
  icon?: React.ReactNode;
}

interface SidebarProps {
  activeKey: string;
  onSelect: (key: string) => void;
}

// Icons for sidebar navigation
const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const TrackerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const FeedbackIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
    <circle cx="8" cy="10" r="1" fill="currentColor" />
    <circle cx="16" cy="10" r="1" fill="currentColor" />
  </svg>
);

const AutodevIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
    <path d="M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83" />
  </svg>
);

const CMSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </svg>
);

// Chevron icon for collapse indicator
const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg 
    className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Group icons
const GroupIcons: Record<string, React.ReactNode> = {
  'Foundations': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  ),
  'Home Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  'Profile Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  'Discover Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  'Messages Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  'Practices Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  'My Profile Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'Settings Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
    </svg>
  ),
  'Community Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'Business Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'Notifications Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  'Impact Page': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M2 12h20" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  'Core: Auth & Layout': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  ),
  'Epics': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  'Architecture': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  'Operations': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6" />
    </svg>
  ),
  'Brand': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  'Design Specs': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  'Development': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Components': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

const navItems: NavGroup[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATIONS - Design system basics
  // ═══════════════════════════════════════════════════════════════════════════
  { group: 'Foundations', items: [
    { id: 'identity', label: 'Identity' },
    { id: 'colors', label: 'Palette' },
    { id: 'typography', label: 'Typography' },
  ]},

  // ═══════════════════════════════════════════════════════════════════════════
  // EPICS - Product feature specifications
  // ═══════════════════════════════════════════════════════════════════════════
  { group: 'Epics', items: [
    { id: 'spec-epic-00', label: 'Epic 00: Foundation' },
    { id: 'spec-epic-01', label: 'Epic 01: Mira' },
    { id: 'spec-epic-1a', label: 'Epic 1A: Crypto' },
    { id: 'spec-epic-1b', label: 'Epic 1B: Karma' },
    { id: 'spec-epic-02', label: 'Epic 02: Humans' },
    { id: 'spec-epic-03', label: 'Epic 03: Practices' },
    { id: 'spec-epic-04', label: 'Epic 04: Discovery' },
    { id: 'spec-epic-05', label: 'Epic 05: Impact' },
    { id: 'spec-epic-06', label: 'Epic 06: Business' },
    { id: 'spec-epic-07', label: 'Epic 07: Community' },
    { id: 'spec-epic-08', label: 'Epic 08: Monetization' },
  ]},

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENTS - All UI component groups (collapsible with subgroups)
  // ═══════════════════════════════════════════════════════════════════════════
  { group: 'Components', subgroups: [
    { group: 'Home Page', items: [
      { id: 'home-loading', label: 'Sacred Loading' },
      { id: 'home-arrival', label: 'Soft Arrival' },
      { id: 'home-auth', label: 'Email Capture' },
      { id: 'home-onboarding', label: 'Onboarding Form' },
      { id: 'home-containers', label: 'Containers' },
    ]},
    { group: 'Profile Page', items: [
      { id: 'profile-stats', label: 'Stats & Badges' },
      { id: 'profile-actions', label: 'Action Buttons' },
      { id: 'profile-attributes', label: 'Attributes & Pills' },
      { id: 'profile-media', label: 'Photos & Uploads' },
      { id: 'profile-sections', label: 'Sections & Layout' },
    ]},
    { group: 'Discover Page', items: [
      { id: 'discover-search', label: 'Search & Navigation' },
      { id: 'discover-cards', label: 'Recommendation Cards' },
      { id: 'discover-filters', label: 'Filters & Chips' },
      { id: 'discover-states', label: 'Loading & Empty States' },
    ]},
    { group: 'Messages Page', items: [
      { id: 'messages-conversations', label: 'Conversation List' },
      { id: 'messages-bubbles', label: 'Message Bubbles' },
      { id: 'messages-input', label: 'Input & Actions' },
      { id: 'messages-states', label: 'Status & Empty States' },
    ]},
    { group: 'Practices Page', items: [
      { id: 'practices-cards', label: 'Practice Cards' },
      { id: 'practices-stats', label: 'Stats & Streaks' },
      { id: 'practices-timer', label: 'Timer & Sessions' },
      { id: 'practices-calendar', label: 'Calendar & History' },
      { id: 'practices-dashboard', label: 'Full Dashboard' },
      { id: 'practices-modals', label: 'Modals & Flows' },
    ]},
    { group: 'My Profile Page', items: [
      { id: 'myprofile-own-view', label: 'My Profile (Own View)' },
      { id: 'myprofile-public-view', label: 'Public Profile View' },
      { id: 'myprofile-editing', label: 'Edit Mode & Controls' },
      { id: 'myprofile-sections', label: 'Quick Edit Sections' },
      { id: 'myprofile-photos', label: 'Photo Management' },
      { id: 'myprofile-settings', label: 'Account Settings' },
    ]},
    { group: 'Settings Page', items: [
      { id: 'settings-account', label: 'Account & Profile' },
      { id: 'settings-notifications', label: 'Notifications' },
      { id: 'settings-privacy', label: 'Privacy & Security' },
      { id: 'settings-data', label: 'Data & Preferences' },
    ]},
    { group: 'Community Page', items: [
      { id: 'community-full-view', label: 'Full Community View' },
      { id: 'community-cards', label: 'Community Cards' },
      { id: 'community-header', label: 'Community Header' },
      { id: 'community-members', label: 'Members & Roles' },
      { id: 'community-content', label: 'Posts & Rules' },
    ]},
    { group: 'Business Page', items: [
      { id: 'business-full-view', label: 'Full Business Profile' },
      { id: 'business-cards', label: 'Business Cards' },
      { id: 'business-services', label: 'Services & Listings' },
      { id: 'business-reviews', label: 'Reviews & Ratings' },
    ]},
    { group: 'Notifications Page', items: [
      { id: 'notifications-items', label: 'Notification Items' },
      { id: 'notifications-types', label: 'Notification Types' },
      { id: 'notifications-controls', label: 'Controls & Filters' },
    ]},
    { group: 'Impact Page', items: [
      { id: 'impact-dashboard', label: 'Full Impact Dashboard' },
      { id: 'impact-stats', label: 'Impact Statistics' },
      { id: 'impact-voting', label: 'Voting Cards' },
    ]},
    { group: 'Core: Auth & Layout', items: [
      { id: 'ai-guide', label: 'Mira AI Guide' },
      { id: 'auth-onboarding', label: 'Auth & Onboarding' },
      { id: 'layout-nav', label: 'Navigation & Headers' },
      { id: 'profile-enhanced', label: 'Profile Systems' },
      { id: 'social-discovery', label: 'Social & Discovery' },
      { id: 'error-handling', label: 'Error Systems' },
    ]},
  ]},

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNICAL - Architecture, Operations, Brand, Design, Development
  // ═══════════════════════════════════════════════════════════════════════════
  { group: 'Architecture', items: [
    { id: 'spec-data-models', label: 'Data Models' },
    { id: 'spec-api-reference', label: 'API Reference' },
    { id: 'spec-service-layer', label: 'Service Layer' },
    { id: 'spec-ai-model-router', label: 'AI Model Router' },
    { id: 'spec-ai-coding-config', label: 'AI Coding Config' },
    { id: 'spec-deployment', label: 'Deployment Infrastructure' },
    { id: 'spec-vibe-tokenomics', label: '$VIBES Tokenomics' },
    { id: 'spec-crypto-router', label: 'Crypto Router' },
    { id: 'spec-karma-layer', label: 'Karma Layer' },
    { id: 'spec-adr-crypto-safety', label: 'ADR: Crypto Safety' },
  ]},
  { group: 'Operations', items: [
    { id: 'spec-admin-panel', label: 'Admin Panel' },
    { id: 'spec-feature-flags', label: 'Feature Flags' },
    { id: 'spec-observability', label: 'Observability' },
    { id: 'spec-testing', label: 'Testing Strategy' },
    { id: 'spec-env-vars', label: 'Environment Variables' },
  ]},
  { group: 'Brand', items: [
    { id: 'spec-visual-identity', label: 'Visual Identity' },
    { id: 'spec-brand-deck', label: 'Brand Deck' },
    { id: 'spec-voice-messaging', label: 'Voice & Messaging' },
    { id: 'spec-mira-personality', label: 'Mira Personality' },
    { id: 'spec-product-vision', label: 'Product Vision' },
    { id: 'spec-ux-wireframes', label: 'UX Wireframes' },
    { id: 'spec-brand-integration', label: 'Brand Integration' },
    { id: 'spec-conscious-dev', label: 'Conscious Development' },
  ]},
  { group: 'Design Specs', items: [
    { id: 'spec-ui-components', label: 'UI Component Library' },
    { id: 'spec-user-journeys', label: 'User Journey Maps' },
    { id: 'spec-guidelines', label: 'Design Guidelines' },
    { id: 'spec-codex', label: 'Codex Usage' },
    { id: 'spec-templates', label: 'Templates' },
    { id: 'spec-tools', label: 'Design Tools' },
  ]},
  { group: 'Development', items: [
    { id: 'spec-rules', label: 'Coding Rules' },
    { id: 'spec-commands', label: 'Commands' },
    { id: 'spec-agents', label: 'AI Agents' },
    { id: 'spec-plugins', label: 'Plugins' },
    { id: 'spec-skills', label: 'Skills' },
    { id: 'spec-dev-templates', label: 'Dev Templates' },
    { id: 'spec-impl-plan', label: 'Implementation Plan' },
  ]},
];

// Helper to find which group (including nested) contains an item
const findGroupForItem = (items: NavGroup[], itemId: string): string[] => {
  for (const group of items) {
    if (group.items?.some(i => i.id === itemId)) {
      return [group.group];
    }
    if (group.subgroups) {
      for (const subgroup of group.subgroups) {
        if (subgroup.items?.some(i => i.id === itemId)) {
          return [group.group, subgroup.group];
        }
      }
    }
  }
  return [];
};

// Helper to count all items in a group (including subgroups)
const countGroupItems = (group: NavGroup): number => {
  let count = group.items?.length || 0;
  if (group.subgroups) {
    count += group.subgroups.reduce((acc, sg) => acc + (sg.items?.length || 0), 0);
  }
  return count;
};

// Helper to check if a group has an active item
const groupHasActiveItem = (group: NavGroup, activeKey: string): boolean => {
  if (group.items?.some(i => i.id === activeKey)) return true;
  if (group.subgroups) {
    return group.subgroups.some(sg => sg.items?.some(i => i.id === activeKey));
  }
  return false;
};

export const Sidebar: React.FC<SidebarProps> = ({ activeKey, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const groups = findGroupForItem(navItems, activeKey);
    return groups.length > 0 ? new Set(groups) : new Set(['Foundations']);
  });

  // Filter navigation items based on search
  const filteredNavItems = useMemo(() => {
    if (!searchQuery.trim()) return navItems;

    const query = searchQuery.toLowerCase();

    return navItems
      .map(group => {
        // Filter direct items
        const filteredItems = group.items?.filter(item =>
          item.label.toLowerCase().includes(query) ||
          group.group.toLowerCase().includes(query)
        );

        // Filter subgroups
        const filteredSubgroups = group.subgroups?.map(subgroup => ({
          ...subgroup,
          items: subgroup.items?.filter(item =>
            item.label.toLowerCase().includes(query) ||
            subgroup.group.toLowerCase().includes(query) ||
            group.group.toLowerCase().includes(query)
          )
        })).filter(sg => sg.items && sg.items.length > 0);

        return {
          ...group,
          items: filteredItems,
          subgroups: filteredSubgroups
        };
      })
      .filter(group =>
        (group.items && group.items.length > 0) ||
        (group.subgroups && group.subgroups.length > 0)
      );
  }, [searchQuery]);

  // Auto-expand group when active item changes
  useEffect(() => {
    const groups = findGroupForItem(navItems, activeKey);
    if (groups.length > 0) {
      setExpandedGroups(prev => {
        const next = new Set(prev);
        groups.forEach(g => next.add(g));
        return next;
      });
    }
  }, [activeKey]);

  // Auto-expand all groups when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const allGroups = new Set<string>();
      filteredNavItems.forEach(g => {
        allGroups.add(g.group);
        g.subgroups?.forEach(sg => allGroups.add(sg.group));
      });
      setExpandedGroups(allGroups);
    }
  }, [searchQuery, filteredNavItems]);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const isTechnicalGroup = (groupName: string) => {
    return ['Architecture', 'Operations', 'Brand', 'Design Specs', 'Development'].includes(groupName);
  };

  // Check which primary nav is active
  const isDashboardActive = activeKey === 'dashboard';
  const isTrackerActive = activeKey === 'tracker';
  const isFeedbackActive = activeKey === 'feedback';
  const isAutodevActive = activeKey === 'autodev';
  const isCMSActive = activeKey === 'cms';

  return (
    <nav className="space-y-2 pb-24">
      {/* Dashboard & Tracker - Primary Navigation (Always visible at top) */}
      <div className="mb-4 space-y-2">
        <button
          onClick={() => onSelect('dashboard')}
          className={`
            w-full flex items-center gap-3 px-5 py-3.5
            rounded-xl transition-all duration-300 font-heading
            ${isDashboardActive
              ? 'bg-gradient-to-r from-aqua-light to-teal-light text-abyss-base shadow-lg shadow-aqua-light/30 scale-[1.02]'
              : 'bg-white/5 text-moonlight hover:bg-white/10 hover:scale-[1.01] border border-white/10 hover:border-aqua-light/30'}
          `}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isDashboardActive
              ? 'bg-abyss-base/20'
              : 'bg-aqua-light/10 text-aqua-light'}
          `}>
            <DashboardIcon />
          </div>
          <div className="text-left flex-1">
            <span className="text-sm font-black uppercase tracking-tight block font-heading">
              Dashboard
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider font-ui ${isDashboardActive ? 'text-abyss-base/60' : 'text-moonlight-muted/50'}`}>
              Command Center
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('tracker')}
          className={`
            w-full flex items-center gap-3 px-5 py-3.5
            rounded-xl transition-all duration-300
            ${isTrackerActive
              ? 'bg-gradient-to-r from-gold-accent to-amber-400 text-abyss-base shadow-lg shadow-gold-accent/30 scale-[1.02]'
              : 'bg-white/5 text-moonlight hover:bg-white/10 hover:scale-[1.01] border border-white/10 hover:border-gold-accent/30'}
          `}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isTrackerActive
              ? 'bg-abyss-base/20'
              : 'bg-gold-accent/10 text-gold-accent'}
          `}>
            <TrackerIcon />
          </div>
          <div className="text-left">
            <span className="text-sm font-black uppercase tracking-tight block">
              Tracker
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${isTrackerActive ? 'text-abyss-base/60' : 'text-muted/50'}`}>
              Dev Progress
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('feedback')}
          className={`
            w-full flex items-center gap-3 px-5 py-3.5
            rounded-xl transition-all duration-300
            ${isFeedbackActive
              ? 'bg-gradient-to-r from-teal-light to-aqua-light text-abyss-base shadow-lg shadow-teal-light/30 scale-[1.02]'
              : 'bg-white/5 text-moonlight hover:bg-white/10 hover:scale-[1.01] border border-white/10 hover:border-teal-light/30'}
          `}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isFeedbackActive
              ? 'bg-abyss-base/20'
              : 'bg-teal-light/10 text-teal-light'}
          `}>
            <FeedbackIcon />
          </div>
          <div className="text-left">
            <span className="text-sm font-black uppercase tracking-tight block">
              Feedback
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${isFeedbackActive ? 'text-abyss-base/60' : 'text-muted/50'}`}>
              Review Center
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('autodev')}
          className={`
            w-full flex items-center gap-3 px-5 py-3.5
            rounded-xl transition-all duration-300
            ${isAutodevActive
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
              : 'bg-white/5 text-moonlight hover:bg-white/10 hover:scale-[1.01] border border-white/10 hover:border-purple-500/30'}
          `}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isAutodevActive
              ? 'bg-white/20'
              : 'bg-purple-500/10 text-purple-400'}
          `}>
            <AutodevIcon />
          </div>
          <div className="text-left flex-1">
            <span className="text-sm font-black uppercase tracking-tight block">
              AUTODEV
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${isAutodevActive ? 'text-white/60' : 'text-muted/50'}`}>
              AI Intelligence
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('cms')}
          className={`
            w-full flex items-center gap-3 px-5 py-3.5
            rounded-xl transition-all duration-300
            ${isCMSActive
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]'
              : 'bg-white/5 text-moonlight hover:bg-white/10 hover:scale-[1.01] border border-white/10 hover:border-emerald-500/30'}
          `}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isCMSActive
              ? 'bg-white/20'
              : 'bg-emerald-500/10 text-emerald-400'}
          `}>
            <CMSIcon />
          </div>
          <div className="text-left flex-1">
            <span className="text-sm font-black uppercase tracking-tight block">
              CMS
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${isCMSActive ? 'text-white/60' : 'text-muted/50'}`}>
              Blog Manager
            </span>
          </div>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 px-2">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-moonlight-muted/50">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2.5 bg-abyss-light/50 border border-white/10 rounded-xl 
                     text-sm text-moonlight placeholder-moonlight-muted/40 
                     focus:outline-none focus:border-aqua-light/30 focus:bg-abyss-light
                     transition-all duration-200 font-body"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-moonlight-muted/50 hover:text-moonlight transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      {!searchQuery && (
        <div className="px-5 pb-2">
          <div className="border-t border-white/5" />
        </div>
      )}

      {/* Navigation Groups */}
      <div className="space-y-1">
        {filteredNavItems.map((group, groupIndex) => {
          const isExpanded = expandedGroups.has(group.group);
          const hasActiveItem = groupHasActiveItem(group, activeKey);
          const isTechnical = isTechnicalGroup(group.group);
          const isComponentsGroup = group.group === 'Components';
          const showTechnicalSeparator = groupIndex === 3 && !searchQuery; // After Components
          const groupIcon = GroupIcons[group.group];
          const itemCount = countGroupItems(group);

          return (
            <React.Fragment key={group.group}>
              {showTechnicalSeparator && (
                <div className="py-4 px-5">
                  <div className="border-t border-white/10" />
                  <p className="mt-4 text-[8px] font-black text-gold-accent uppercase tracking-[0.5em] opacity-60 font-ui">
                    Technical
                  </p>
                </div>
              )}
              <div>
                {/* Collapsible Header */}
                <button
                  onClick={() => toggleGroup(group.group)}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5
                    text-[10px] font-black uppercase tracking-[0.3em]
                    transition-all duration-200 rounded-lg group
                    ${hasActiveItem
                      ? 'text-aqua-light bg-aqua-light/5'
                      : isTechnical
                        ? 'text-gold-accent/70 hover:text-gold-accent hover:bg-white/5'
                        : isComponentsGroup
                          ? 'text-violet-400/70 hover:text-violet-400 hover:bg-white/5'
                          : 'text-teal-light/70 hover:text-teal-light hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {groupIcon && (
                      <div className={`flex-shrink-0 transition-colors ${
                        hasActiveItem ? 'text-aqua-light' : isTechnical ? 'text-gold-accent/70' : isComponentsGroup ? 'text-violet-400/70' : 'text-teal-light/70'
                      }`}>
                        {groupIcon}
                      </div>
                    )}
                    <span className="truncate font-heading">{group.group}</span>
                    {itemCount > 0 && (
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-ui ${
                        hasActiveItem
                          ? 'bg-aqua-light/20 text-aqua-light'
                          : isTechnical
                            ? 'bg-gold-accent/10 text-gold-accent/60'
                            : isComponentsGroup
                              ? 'bg-violet-400/10 text-violet-400/60'
                              : 'bg-teal-light/10 text-teal-light/60'
                      }`}>
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <ChevronIcon expanded={isExpanded} />
                </button>

                {/* Collapsible Content */}
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isExpanded ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  {/* Direct items (for groups without subgroups) */}
                  {group.items && group.items.length > 0 && (
                    <div className="space-y-0.5 mt-1.5 ml-3 pl-3 border-l border-white/5">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelect(item.id);
                            setSearchQuery('');
                          }}
                          className={`
                            w-full flex items-center px-3 py-2 text-[12px] font-bold
                            uppercase tracking-tight rounded-lg transition-all duration-200 font-heading
                            ${activeKey === item.id
                              ? 'bg-aqua-light text-abyss-base shadow-md shadow-aqua-light/20 scale-[1.01]'
                              : 'text-moonlight-soft/60 hover:bg-white/5 hover:text-moonlight'}
                          `}
                        >
                          <span className="truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Nested subgroups (for Components) */}
                  {group.subgroups && group.subgroups.length > 0 && (
                    <div className="mt-1.5 ml-3 pl-2 border-l border-white/5 space-y-1">
                      {group.subgroups.map((subgroup) => {
                        const isSubgroupExpanded = expandedGroups.has(subgroup.group);
                        const subgroupHasActive = subgroup.items?.some(i => i.id === activeKey);
                        const subgroupIcon = GroupIcons[subgroup.group];

                        return (
                          <div key={subgroup.group}>
                            {/* Subgroup Header */}
                            <button
                              onClick={() => toggleGroup(subgroup.group)}
                              className={`
                                w-full flex items-center justify-between px-3 py-2
                                text-[9px] font-black uppercase tracking-[0.2em]
                                transition-all duration-200 rounded-lg
                                ${subgroupHasActive
                                  ? 'text-aqua-light bg-aqua-light/5'
                                  : 'text-moonlight-muted/60 hover:text-moonlight-muted hover:bg-white/5'}
                              `}
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {subgroupIcon && (
                                  <div className={`flex-shrink-0 transition-colors ${
                                    subgroupHasActive ? 'text-aqua-light' : 'text-moonlight-muted/50'
                                  }`}>
                                    {subgroupIcon}
                                  </div>
                                )}
                                <span className="truncate font-heading">{subgroup.group}</span>
                                {subgroup.items && subgroup.items.length > 0 && (
                                  <span className={`text-[7px] font-bold px-1 py-0.5 rounded font-ui ${
                                    subgroupHasActive
                                      ? 'bg-aqua-light/20 text-aqua-light'
                                      : 'bg-white/5 text-moonlight-muted/50'
                                  }`}>
                                    {subgroup.items.length}
                                  </span>
                                )}
                              </div>
                              <ChevronIcon expanded={isSubgroupExpanded} />
                            </button>

                            {/* Subgroup Items */}
                            <div className={`
                              overflow-hidden transition-all duration-200 ease-in-out
                              ${isSubgroupExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                              <div className="space-y-0.5 mt-1 ml-2 pl-2 border-l border-white/5">
                                {subgroup.items?.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      onSelect(item.id);
                                      setSearchQuery('');
                                    }}
                                    className={`
                                      w-full flex items-center px-2.5 py-1.5 text-[11px] font-bold
                                      uppercase tracking-tight rounded-md transition-all duration-200 font-heading
                                      ${activeKey === item.id
                                        ? 'bg-aqua-light text-abyss-base shadow-md shadow-aqua-light/20'
                                        : 'text-moonlight-soft/50 hover:bg-white/5 hover:text-moonlight'}
                                    `}
                                  >
                                    <span className="truncate">{item.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* No Results Message */}
      {searchQuery && filteredNavItems.length === 0 && (
        <div className="px-5 py-8 text-center">
          <p className="text-moonlight-muted text-sm font-body">No results found</p>
          <p className="text-moonlight-muted/60 text-xs mt-1 font-body">Try a different search term</p>
        </div>
      )}
    </nav>
  );
};
