
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { PostFeedItem } from '../components/PostFeedItem';
import { ProfileHeader } from '../components/ProfileHeader';
import { Tabs } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { Toggle } from '../components/Toggle';
import { AccordionItem } from '../components/Accordion';
import { Tag } from '../components/Tag';
import { CommentInput } from '../components/CommentInput';
import { Textarea } from '../components/Textarea';
import { Dropdown } from '../components/Dropdown';
import { MediaEmbed } from '../components/MediaEmbed';
import { MiraIntelligence } from '../components/MiraIntelligence';

// Specialized Flow Components
import { AuthenticationFlow, QuickOnboardingFlow, SacredLoading } from '../components/AuthComponents';
import { AppHeader, ChatHeaderSphere, NativeHeader } from '../components/LayoutComponents';
import { FeatureNavigationSidebar } from '../components/FeatureNavigationSidebar';
import { ConditionalIslandNavigation } from '../components/IslandNavigation';
import { ProfileEditingInterface, EnhancedProfileView, DetailedProfileSetupFlow } from '../components/ProfileComponents';
import { NotificationsPanel, DiscoveryFilterModal, MapViewModal } from '../components/SocialComponents';
import { ErrorBoundary, ProfileErrorFallback } from '../components/ErrorComponents';

// Business & Community Modules
import {
  ListingCard,
  BusinessAdminManager,
  VerificationBadge,
  BusinessProfileEditor,
  CreateListingModal,
  ImageUpload,
  EditListingModal,
  InviteAdminModal
} from '../components/BusinessComponents';
import { AffiliateSignupFlow } from '../components/AffiliateComponents';

import {
  CommunityHeader,
  CommunityModeratorManager,
  CommunityTabs,
  CommunityPostCard,
  CommunityAboutSection,
  CreatePostModal,
  InviteModeratorModal
} from '../components/CommunityComponents';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { DocumentTOC, TOCTriggerButton } from '../components/DocumentTOC';
import { extractHeadings, generateTableOfContents, type Heading } from '../utils/markdown';

// Practice Modules (Old - keeping only what's not recreated)
import {
  PracticeTimer,
  PremiumComingSoonModal,
  PracticesHistoryTab
} from '../components/PracticeComponents';

// Home Page Components
import {
  SacredLoading as HomeSacredLoading,
  SoftArrival,
  EmailCapture,
  OnboardingForm,
  ErrorContainer,
  PageContainer
} from '../components/HomeComponents';

// Profile Page Components
import {
  ProfileStats,
  LocationBadge,
  AttributePill,
  ConnectionButtons,
  ProfileTabs,
  BioSection,
  ProfileCompletionBar,
  PhotoUploadArea,
  ProfileGallery,
  PrivacyControl,
  ProfileCard,
  ConnectionStatusBadge,
  ProfileSection,
  AttributeCategory,
  ProfileActionMenu,
  Icons
} from '../components/ProfilePageComponents';

// Discover Page Components
import {
  SearchBar,
  CategoryTabs,
  MatchScoreBadge,
  RecommendationCard,
  FilterButton,
  DiscoveryEmptyState,
  DistanceBadge,
  FilterChip,
  ActiveFiltersBar,
  DiscoverLoading,
  QuickFilterButtons,
  RecommendationGrid,
  DiscoverSectionHeader,
  DiscoverIcons
} from '../components/DiscoverPageComponents';

// Messages Page Components
import {
  ConversationListItem,
  MessageBubble,
  MessageInput,
  OnlineStatus,
  TypingIndicator,
  UnreadBadge,
  MessageTimestamp,
  MessageEmptyState,
  ConversationHeader,
  MessageDaySeparator,
  MessageIcons
} from '../components/MessagesPageComponents';

// Practices Page Components
import {
  PracticeCard,
  StreakDisplay,
  ProgressCircle,
  TimeOfDayBadge,
  SessionHistoryItem,
  DailyStatsBar,
  PracticeTimerDisplay,
  CompletionCheckmark,
  PracticeCategoryBadge,
  WeeklyCalendar,
  PracticeEmptyState,
  PracticeQuickActions,
  AddPracticeButton,
  RefinedPracticesDashboard,
  RefinedLogSessionModal,
  RefinedChoosePracticeModal,
  PracticeIcons
} from '../components/PracticesPageComponents';

// My Profile Page Components
import {
  EditModeToggle,
  ProfileCompletionPrompt,
  QuickEditSection,
  BasicInfoEditor,
  ProfilePreviewCard,
  SettingItem,
  ProfileVisibilityToggle,
  AccountSettingCard,
  AttributeEditor,
  PhotoUploadSection,
  MyProfileView,
  PublicProfileView,
  MyProfileIcons
} from '../components/MyProfilePageComponents';

// Settings Page Components
import {
  SettingsSection,
  SettingRow,
  NotificationPreference,
  AccountInfoCard,
  DangerZoneCard,
  SettingsTabs,
  BlockedUserItem,
  DataPrivacyCard,
  PreferenceSelector,
  LogoutButton,
  SettingsIcons
} from '../components/SettingsPageComponents';

// Community Page Components
import {
  CommunityCard,
  AccessTypeBadge,
  MemberRoleBadge,
  CommunityMemberCard,
  CommunityStatsBar,
  CommunityMembershipButton,
  CommunityHeaderBanner,
  CommunityPostItem,
  CreateCommunityButton,
  CommunityRulesCard,
  CommunityFullView,
  CommunityIcons
} from '../components/CommunityPageComponents';

// Business Page Components
import {
  VerifiedBadge,
  BusinessCard,
  ServiceListingCard,
  BusinessContactInfo,
  BusinessStats,
  ReviewCard,
  BusinessHeaderBanner,
  BusinessCategoryBadge,
  PriceTag,
  BusinessFullView,
  BusinessIcons
} from '../components/BusinessPageComponents';

// Notifications Page Components
import {
  NotificationItem,
  NotificationCategoryTabs,
  UnreadIndicator,
  NotificationEmptyState,
  MarkAllReadButton,
  NotificationIcons
} from '../components/NotificationsPageComponents';

// Impact Page Components
import {
  ImpactStatCard,
  VotingCard,
  ImpactStatsBar,
  StatusBadge,
  ImpactDashboard,
  ImpactIcons
} from '../components/ImpactPageComponents';

interface ShowcaseProps {
  activeSection: string;
}

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
    <h1 className="text-7xl font-black font-heading tracking-tighter text-moonlight mb-4 uppercase leading-none italic select-none">
      {title}<span className="text-aqua-light">.</span>
    </h1>
    {subtitle && <p className="text-muted text-sm font-black uppercase tracking-[0.4em] opacity-40 leading-relaxed max-w-2xl">{subtitle}</p>}
    <div className="h-px w-32 bg-gradient-to-r from-aqua-light to-transparent mt-10" />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// Spec Document Viewer Component
// ═══════════════════════════════════════════════════════════════════════════
const SpecDocumentView: React.FC<{ title: string; filePath: string; description?: string }> = ({ title, filePath, description }) => {
  const [content, setContent] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setIsTocOpen(false);
    
    fetch(`/spec/${filePath}`)
      .then(res => {
        if (!res.ok) throw new Error('Document not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        // Extract headings for table of contents
        const extractedHeadings = extractHeadings(text);
        const tocHeadings = generateTableOfContents(extractedHeadings);
        setHeadings(tocHeadings);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [filePath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 rounded-full border-2 border-aqua-light border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold font-heading text-moonlight mb-2">Document Not Available</h3>
        <p className="text-moonlight/60 font-body text-sm">
          The spec document at <code className="text-aqua-light/80 bg-white/5 px-2 py-0.5 rounded">{filePath}</code> could not be loaded.
        </p>
        <p className="text-moonlight/40 font-body text-xs mt-4">
          Make sure the spec folder is properly served by the dev server.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-gold-accent animate-pulse" />
          <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.4em]">Spec Document</span>
        </div>
        <h1 className="text-4xl font-black font-heading text-aqua-light mb-4">{title}</h1>
        {description && (
          <p className="text-moonlight/60 font-body text-lg">{description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-moonlight/40">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {filePath}
          </span>
        </div>
      </div>

      {/* Content - Rendered Markdown */}
      <div className="markdown-content">
        <MarkdownRenderer content={content} />
      </div>

      {/* Table of Contents - Floating Trigger Button */}
      <TOCTriggerButton 
        onClick={() => setIsTocOpen(true)} 
        headingCount={headings.length} 
      />

      {/* Table of Contents - Slide-out Panel */}
      <DocumentTOC 
        headings={headings} 
        isOpen={isTocOpen} 
        onClose={() => setIsTocOpen(false)} 
      />
    </div>
  );
};

const ComponentDemo: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
    <div className="flex items-center gap-6 mb-10">
      <h3 className="text-[10px] font-black font-heading text-aqua-light uppercase tracking-[0.5em] whitespace-nowrap">{title}</h3>
      <div className="h-px flex-1 bg-white/5 shadow-inner"></div>
    </div>
    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-16 flex flex-wrap gap-10 items-center justify-center lg:justify-start overflow-hidden backdrop-blur-xl shadow-2xl relative">
       {/* Ambient card background glow */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-aqua-light/5 blur-3xl rounded-full" />
       <div className="relative z-10 w-full flex flex-wrap gap-10 items-center justify-center lg:justify-start">
        {children}
       </div>
    </div>
  </div>
);

export const Showcase: React.FC<ShowcaseProps> = ({ activeSection }) => {
  const { colorPalette, fontTheme, headingFont, bodyFont } = useTheme();
  const [demoPathname, setDemoPathname] = useState('/discover');
  const [demoAuth, setDemoAuth] = useState(true);
  const [demoLoading, setDemoLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const demoUser = {
    id: 'u1',
    name: 'Lena River',
    username: 'lenariver',
    avatarUrl: 'https://i.pravatar.cc/150?u=lena',
    bio: 'Navigating the digital ocean with focused intent.',
    followersCount: 14200,
    followingCount: 382,
    isVerified: true
  };

  const demoPost = {
    id: 'p1',
    author: demoUser,
    content: 'The pressure at these depths is where true light begins to shine. Synchronizing frequency with the collective.',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    likesCount: 124,
    commentsCount: 18,
    isLiked: false,
    createdAt: '4h ago'
  };

  const demoListing = { title: 'Minimalist Void Space', price: '$95/cycle', location: 'Sector 4', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' };

  // This router ensures every Sidebar ID has a corresponding high-fidelity view
  switch (activeSection) {
    case 'identity':
      return (
        <div className="space-y-16">
          <SectionHeader title="System Identity" subtitle="Core architectural primitives of the Abyss ecosystem." />
          <ComponentDemo title="Standard Buttons">
             <div className="flex flex-wrap gap-6">
               <Button>Primary Sync</Button>
               <Button variant="secondary">Gold Calibration</Button>
               <Button variant="ghost">Ghost Protocol</Button>
               <Button variant="danger">Sever Link</Button>
             </div>
          </ComponentDemo>
          <ComponentDemo title="Form Surfaces">
             <div className="w-full max-w-md space-y-8">
                <Input label="Neural Identifier" placeholder="@handle" icon={<span>@</span>} />
                <Textarea label="Memory Signature" placeholder="Describe your frequency..." />
                <Toggle label="Continuous Pulse" enabled={true} onChange={() => {}} />
             </div>
          </ComponentDemo>
          <ComponentDemo title="Identity Markers">
             <div className="flex items-center gap-8">
               <Avatar size="sm" />
               <Avatar size="md" />
               <Avatar size="lg" src="https://i.pravatar.cc/150?u=lena" />
               <Avatar size="xl" />
             </div>
          </ComponentDemo>
        </div>
      );

    case 'colors':
      // Helper function to convert hex to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
      };

      // Get palette-specific names based on palette ID
      const getPaletteColorNames = () => {
        const baseName = colorPalette.id;
        
        // Map palette IDs to their thematic names
        const themeNames: Record<string, { bg: string, accent1: string, accent2: string, accent3: string, text: string }> = {
          'onyx': { bg: 'Onyx', accent1: 'Aqua', accent2: 'Teal', accent3: 'Gold', text: 'Moonlight' },
          'deep-ocean': { bg: 'Ocean', accent1: 'Aqua', accent2: 'Teal', accent3: 'Gold', text: 'Pearl' },
          'midnight-purple': { bg: 'Midnight', accent1: 'Violet', accent2: 'Purple', accent3: 'Gold', text: 'Lavender' },
          'forest-night': { bg: 'Forest', accent1: 'Lime', accent2: 'Green', accent3: 'Amber', text: 'Mist' },
          'ruby-noir': { bg: 'Ruby', accent1: 'Rose', accent2: 'Crimson', accent3: 'Gold', text: 'Blush' },
          'amber-dusk': { bg: 'Amber', accent1: 'Gold', accent2: 'Bronze', accent3: 'Copper', text: 'Cream' },
          'moss-green': { bg: 'Moss', accent1: 'Mint', accent2: 'Sage', accent3: 'Gold', text: 'Ivory' },
          'desert-sand': { bg: 'Sand', accent1: 'Cream', accent2: 'Tan', accent3: 'Gold', text: 'Bone' },
          'clay': { bg: 'Clay', accent1: 'Terracotta', accent2: 'Sienna', accent3: 'Bronze', text: 'Linen' },
          'sage': { bg: 'Sage', accent1: 'Mint', accent2: 'Olive', accent3: 'Wheat', text: 'Frost' },
          'terracotta': { bg: 'Terra', accent1: 'Coral', accent2: 'Rust', accent3: 'Gold', text: 'Peach' },
          'pinewood': { bg: 'Pine', accent1: 'Celadon', accent2: 'Forest', accent3: 'Tan', text: 'Mist' },
          'earth-brown': { bg: 'Earth', accent1: 'Beige', accent2: 'Mocha', accent3: 'Gold', text: 'Ivory' },
          'riverbank': { bg: 'River', accent1: 'Aqua', accent2: 'Teal', accent3: 'Gold', text: 'Fog' },
          'canyon': { bg: 'Canyon', accent1: 'Adobe', accent2: 'Rust', accent3: 'Gold', text: 'Shell' },
          'meadow': { bg: 'Meadow', accent1: 'Spring', accent2: 'Grass', accent3: 'Butter', text: 'Dew' },
          'pebble': { bg: 'Pebble', accent1: 'Stone', accent2: 'Slate', accent3: 'Wheat', text: 'Cloud' },
        };
        
        return themeNames[baseName] || themeNames['onyx'];
      };

      const themeNames = getPaletteColorNames();

      // Dynamically build color groups from current theme
      const colorGroups = [
        {
          category: 'Background Scale',
          colors: [
            { 
              hex: colorPalette.colors['abyss-base'], 
              name: `${themeNames.bg} Base`, 
              desc: 'Primary background',
              rgb: hexToRgb(colorPalette.colors['abyss-base'])
            },
            { 
              hex: colorPalette.colors['abyss-mystic'], 
              name: `${themeNames.bg} Mystic`, 
              desc: 'Elevated surfaces',
              rgb: hexToRgb(colorPalette.colors['abyss-mystic'])
            },
            { 
              hex: colorPalette.colors['abyss-light'], 
              name: `${themeNames.bg} Light`, 
              desc: 'Interactive backgrounds',
              rgb: hexToRgb(colorPalette.colors['abyss-light'])
            },
            { 
              hex: colorPalette.colors['abyss-lighter'], 
              name: `${themeNames.bg} Lighter`, 
              desc: 'Subtle separators',
              rgb: hexToRgb(colorPalette.colors['abyss-lighter'])
            },
          ]
        },
        {
          category: 'Accent Colors',
          colors: [
            { 
              hex: colorPalette.colors['aqua-light'], 
              name: `${themeNames.accent1} Light`, 
              desc: 'Primary accent',
              rgb: hexToRgb(colorPalette.colors['aqua-light'])
            },
            { 
              hex: colorPalette.colors['aqua-medium'], 
              name: `${themeNames.accent1} Medium`, 
              desc: 'Hover states',
              rgb: hexToRgb(colorPalette.colors['aqua-medium'])
            },
            { 
              hex: colorPalette.colors['teal-light'], 
              name: `${themeNames.accent2} Light`, 
              desc: 'Interactive elements',
              rgb: hexToRgb(colorPalette.colors['teal-light'])
            },
            { 
              hex: colorPalette.colors['gold-accent'], 
              name: `${themeNames.accent3} Accent`, 
              desc: 'Premium highlights',
              rgb: hexToRgb(colorPalette.colors['gold-accent'])
            },
          ]
        },
        {
          category: 'Text Scale',
          colors: [
            { 
              hex: colorPalette.colors['moonlight'], 
              name: `${themeNames.text}`, 
              desc: 'Primary text',
              rgb: hexToRgb(colorPalette.colors['moonlight'])
            },
            { 
              hex: colorPalette.colors['moonlight-soft'], 
              name: `${themeNames.text} Soft`, 
              desc: 'Secondary text',
              rgb: hexToRgb(colorPalette.colors['moonlight-soft'])
            },
            { 
              hex: colorPalette.colors['moonlight-muted'], 
              name: `${themeNames.text} Muted`, 
              desc: 'Tertiary text',
              rgb: hexToRgb(colorPalette.colors['moonlight-muted'])
            },
          ]
        },
        {
          category: 'Semantic Colors',
          colors: [
            { 
              hex: colorPalette.colors['success'], 
              name: 'Success', 
              desc: 'Positive feedback',
              rgb: hexToRgb(colorPalette.colors['success'])
            },
            { 
              hex: colorPalette.colors['warning'], 
              name: 'Warning', 
              desc: 'Caution states',
              rgb: hexToRgb(colorPalette.colors['warning'])
            },
            { 
              hex: colorPalette.colors['error'], 
              name: 'Error', 
              desc: 'Error states',
              rgb: hexToRgb(colorPalette.colors['error'])
            },
            { 
              hex: colorPalette.colors['info'], 
              name: 'Info', 
              desc: 'Informational',
              rgb: hexToRgb(colorPalette.colors['info'])
            },
          ]
        }
      ];

      return (
        <div className="space-y-20">
          <SectionHeader 
            title="Color Palette" 
            subtitle={`${colorPalette.name} - Dynamic color system with semantic tokens.`} 
          />

          {/* Color Groups */}
          {colorGroups.map((group) => (
            <div key={group.category} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="font-heading text-xl font-black text-moonlight uppercase tracking-tight">{group.category}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-aqua-light/20 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.colors.map((color) => (
                  <div
                    key={color.hex}
                    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]
                             hover:border-aqua-light/30 transition-all duration-500 hover:scale-[1.02]
                             hover:shadow-2xl hover:shadow-aqua-light/10 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(color.hex);
                      console.log(`Copied ${color.hex} to clipboard!`);
                    }}
                  >
                    {/* Color Swatch */}
                    <div
                      className="h-40 relative overflow-hidden"
                      style={{ backgroundColor: color.hex }}
                    >
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300
                                    flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300
                                      transform scale-90 group-hover:scale-100">
                          <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                            <p className="text-xs font-bold text-white">Click to Copy</p>
                          </div>
                        </div>
                      </div>

                      {/* Gradient Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0
                                    group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Color Info */}
                    <div className="p-5 space-y-3">
                      {/* Name */}
                      <div className="space-y-1">
                        <p className="text-xs font-black text-aqua-light uppercase tracking-widest font-ui">
                          {color.name}
                        </p>
                        <p className="text-[10px] text-moonlight-muted font-medium opacity-60 font-body">
                          {color.desc}
                        </p>
                      </div>

                      {/* Color Values */}
                      <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center">
                          <span className="text-[9px] text-moonlight-muted font-black uppercase tracking-wider font-ui">HEX</span>
                          <code className="text-xs font-bold text-moonlight font-mono">{color.hex}</code>
                  </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-moonlight-muted font-black uppercase tracking-wider font-ui">RGB</span>
                          <code className="text-xs font-bold text-moonlight-soft font-mono">{color.rgb}</code>
                </div>
                      </div>
                    </div>

                    {/* Copy Indicator */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                                    flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Color Pairing Examples */}
          <div className="space-y-8 pt-12">
            <div className="flex items-center gap-4">
              <h3 className="font-heading text-xl font-black text-moonlight uppercase tracking-tight">Color Pairings</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold-accent/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Pairing */}
              <div 
                className="rounded-3xl overflow-hidden border border-white/5 p-8 hover:border-aqua-light/30 transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${colorPalette.colors['abyss-base']}, ${colorPalette.colors['abyss-mystic']})`
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ 
                        backgroundColor: colorPalette.colors['aqua-light'],
                        boxShadow: `0 0 20px ${colorPalette.colors['aqua-light']}66`
                      }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: colorPalette.colors['abyss-base'],
                        borderColor: colorPalette.colors['aqua-light']
                      }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-aqua-light uppercase tracking-wide font-ui">Primary</p>
                    <p className="text-xs text-moonlight-muted mt-1 font-body">Aqua on Abyss</p>
                  </div>
                </div>
              </div>

              {/* Accent Pairing */}
              <div 
                className="rounded-3xl overflow-hidden border border-white/5 p-8 hover:border-gold-accent/30 transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${colorPalette.colors['abyss-mystic']}, ${colorPalette.colors['abyss-light']})`
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ 
                        backgroundColor: colorPalette.colors['gold-accent'],
                        boxShadow: `0 0 20px ${colorPalette.colors['gold-accent']}66`
                      }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: colorPalette.colors['abyss-mystic'],
                        borderColor: colorPalette.colors['gold-accent']
                      }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gold-accent uppercase tracking-wide font-ui">Accent</p>
                    <p className="text-xs text-moonlight-muted mt-1 font-body">Gold on Teal</p>
                  </div>
                </div>
              </div>

              {/* Contrast Pairing */}
              <div 
                className="rounded-3xl overflow-hidden border border-white/5 p-8 hover:border-moonlight/30 transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${colorPalette.colors['abyss-light']}, ${colorPalette.colors['abyss-base']})`
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ 
                        backgroundColor: colorPalette.colors['moonlight'],
                        boxShadow: `0 0 20px ${colorPalette.colors['moonlight']}50`
                      }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: colorPalette.colors['abyss-base'],
                        borderColor: colorPalette.colors['moonlight']
                      }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-moonlight uppercase tracking-wide font-ui">Contrast</p>
                    <p className="text-xs text-moonlight-muted mt-1 font-body">Moonlight on Abyss</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'typography':
      return (
        <div className="space-y-20">
          <SectionHeader 
            title="Typography System" 
            subtitle={`Headings: ${headingFont.name} • Body: ${bodyFont.name}`} 
          />

          {/* Display & Headings */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Display & Headings</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-aqua-light/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Display XL */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Display XL</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-display text-7xl</code>
            </div>
                  <h1 className="font-display text-6xl lg:text-7xl font-black text-moonlight uppercase tracking-tighter leading-none">
                    {fontTheme.fonts.display}
                  </h1>
                  <p className="text-xs text-moonlight-muted font-body">Hero sections, landing pages</p>
                </div>
              </Card>

              {/* H1 */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Heading 1</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-heading text-5xl</code>
                  </div>
                  <h1 className="font-heading text-4xl lg:text-5xl font-bold text-moonlight tracking-tight">
                    Page Title
                  </h1>
                  <p className="text-xs text-moonlight-muted font-body">Main page headings</p>
                </div>
              </Card>

              {/* H2 */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Heading 2</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-heading text-3xl</code>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-moonlight">
                    Section Heading
                  </h2>
                  <p className="text-xs text-moonlight-muted font-body">Major sections, cards</p>
                </div>
              </Card>

              {/* H3 */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Heading 3</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-heading text-2xl</code>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-moonlight">
                    Subsection Title
                  </h3>
                  <p className="text-xs text-moonlight-muted font-body">Subsections, modals</p>
                </div>
              </Card>

              {/* H4 */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Heading 4</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-heading text-xl</code>
                  </div>
                  <h4 className="font-heading text-xl font-semibold text-moonlight">
                    Card Header
                  </h4>
                  <p className="text-xs text-moonlight-muted font-body">Cards, panels</p>
                </div>
              </Card>

              {/* H5 */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Heading 5</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-heading text-lg</code>
                  </div>
                  <h5 className="font-heading text-lg font-semibold text-moonlight">
                    List Header
                  </h5>
                  <p className="text-xs text-moonlight-muted font-body">Lists, small sections</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Font Hierarchy Showcase */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-moonlight uppercase tracking-tight font-heading">Font Hierarchy</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-aqua-light/20 to-transparent"></div>
            </div>
            
            <Card className="p-8 bg-abyss-mystic/40 border-aqua-light/10" elevation="deep">
              <div className="space-y-8">
                {/* Display Font */}
                <div className="pb-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-aqua-light uppercase tracking-widest font-ui">Display Font</p>
                    <span className="text-xs text-moonlight-muted font-mono">{headingFont.name}</span>
                  </div>
                  <p className="font-display text-5xl font-black text-moonlight mb-2">
                    {headingFont.fonts.display}
                  </p>
                  <p className="text-sm text-moonlight-muted font-body">Hero sections, landing pages, impactful moments</p>
                </div>
                
                {/* Heading Font */}
                <div className="pb-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-aqua-light uppercase tracking-widest font-ui">Heading Font</p>
                    <span className="text-xs text-moonlight-muted font-mono">{headingFont.name}</span>
                  </div>
                  <p className="font-heading text-3xl font-bold text-moonlight mb-2">
                    {headingFont.fonts.heading}
                  </p>
                  <p className="text-sm text-moonlight-muted font-body">H1-H5, section titles, card headers</p>
                </div>
                
                {/* Body Font */}
                <div className="pb-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-teal-light uppercase tracking-widest font-ui">Body Font</p>
                    <span className="text-xs text-moonlight-muted font-mono">{bodyFont.name}</span>
                  </div>
                  <p className="font-body text-base text-moonlight mb-2">
                    {bodyFont.fonts.body} — The quick brown fox jumps over the lazy dog. Navigate your journey with intentional clarity.
                  </p>
                  <p className="text-sm text-moonlight-muted font-body">Paragraphs, descriptions, general content</p>
                </div>
                
                {/* UI Font */}
                <div className="pb-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-teal-light uppercase tracking-widest font-ui">UI Font</p>
                    <span className="text-xs text-moonlight-muted font-mono">{bodyFont.name}</span>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <button className="px-4 py-2 bg-aqua-light text-abyss-base rounded-xl font-ui font-semibold text-sm">
                      {bodyFont.fonts.ui}
                    </button>
                    <button className="px-4 py-2 bg-abyss-light border border-aqua-light/30 text-aqua-light rounded-xl font-ui font-semibold text-sm">
                      Secondary
                    </button>
                  </div>
                  <p className="text-sm text-moonlight-muted font-body">Buttons, labels, badges, UI elements</p>
                </div>
                
                {/* Mono Font */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-teal-light uppercase tracking-widest font-ui">Monospace Font</p>
                    <span className="text-xs text-moonlight-muted font-mono">{bodyFont.name}</span>
                  </div>
                  <code className="font-mono text-sm text-moonlight bg-abyss-light px-4 py-3 rounded-lg block mb-2">
                    {bodyFont.fonts.mono}<br/>
                    const theme = useTheme();<br/>
                    console.log(theme.headingFont, theme.bodyFont);
                  </code>
                  <p className="text-sm text-moonlight-muted font-body">Code blocks, technical content, data</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Body Text */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-moonlight uppercase tracking-tight font-heading">Body Text</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-aqua-light/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Body Large */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest font-ui">Body Large</p>
                    <code className="text-[10px] text-moonlight-muted font-mono">font-body text-lg</code>
                  </div>
                  <p className="font-body text-lg text-moonlight-soft leading-relaxed">
                    Navigate your journey with intentional clarity. Every interaction brings you closer to your purpose.
                  </p>
                  <p className="text-xs text-moonlight-muted font-body">Introductory text, lead paragraphs</p>
            </div>
          </Card>

              {/* Body Regular */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Body Regular</p>
                    <code className="text-[10px] text-muted/60 font-mono">text-base font-normal</code>
                  </div>
                  <p className="text-base text-pearl/90 leading-relaxed">
                    The standard reading experience. Clear, comfortable, and accessible for extended content consumption.
                  </p>
                  <p className="text-xs text-muted/60">Main body text, descriptions</p>
                </div>
              </Card>

              {/* Body Small */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Body Small</p>
                    <code className="text-[10px] text-muted/60 font-mono">text-sm font-normal</code>
                  </div>
                  <p className="text-sm text-pearl/80 leading-relaxed">
                    Supporting information and secondary content. Maintains readability while conserving space.
                  </p>
                  <p className="text-xs text-muted/60">Helper text, secondary info</p>
                </div>
              </Card>

              {/* Body Emphasized */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Emphasized</p>
                    <code className="text-[10px] text-muted/60 font-mono">text-base font-medium</code>
                  </div>
                  <p className="text-base text-white font-medium leading-relaxed">
                    Draw attention to important information without overwhelming the visual hierarchy.
                  </p>
                  <p className="text-xs text-muted/60">Important messages, highlights</p>
                </div>
              </Card>
            </div>
          </div>

          {/* UI Elements */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">UI Elements</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold-accent/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Button Text */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Button Text</p>
                  <div className="space-y-3">
                    <button className="text-sm font-bold uppercase tracking-wide text-white">PRIMARY ACTION</button>
                    <button className="text-sm font-medium text-white">Secondary Action</button>
                    <button className="text-xs font-medium text-muted">Tertiary Link</button>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">font-bold uppercase</code>
                </div>
              </Card>

              {/* Form Labels */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Form Labels</p>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white block">Field Label</label>
                    <label className="text-xs font-medium text-muted/80 block">Helper Text</label>
                    <label className="text-xs font-normal text-muted/60 block">Optional hint</label>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">text-sm font-semibold</code>
                </div>
              </Card>

              {/* Captions */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Captions</p>
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-pearl/70">Image caption text</p>
                    <p className="text-xs font-normal text-muted/60">Timestamp or meta</p>
                    <p className="text-[10px] font-medium text-muted/50 uppercase tracking-wider">LABEL TAG</p>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">text-xs font-medium</code>
                </div>
              </Card>

              {/* Links */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Links</p>
                  <div className="space-y-3">
                    <a href="#" className="text-base text-aqua-light hover:underline font-medium">Primary Link</a>
                    <a href="#" className="text-sm text-aqua-light/80 hover:text-aqua-light font-normal">Secondary Link</a>
                    <a href="#" className="text-xs text-muted/60 hover:text-white font-normal">Subtle Link</a>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">text-aqua-light</code>
                </div>
              </Card>

              {/* Code/Mono */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Code & Mono</p>
                  <div className="space-y-3">
                    <code className="text-sm font-mono text-aqua-light bg-white/5 px-2 py-1 rounded">API_KEY</code>
                    <code className="text-xs font-mono text-pearl/80 block">#97D9C4</code>
                    <code className="text-[11px] font-mono text-muted/60">rgb(151, 217, 196)</code>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">font-mono</code>
                </div>
              </Card>

              {/* Status & Badges */}
              <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-aqua-light uppercase tracking-widest">Status & Badges</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black text-aqua-light uppercase tracking-widest px-3 py-1 rounded-full bg-aqua-light/10 border border-aqua-light/20">ACTIVE</span>
                    <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wide px-3 py-1 rounded-full bg-gold-accent/10 border border-gold-accent/20">NEW</span>
                    <span className="text-[10px] font-medium text-muted uppercase tracking-wide px-3 py-1 rounded-full bg-white/5 border border-white/10">PENDING</span>
                  </div>
                  <code className="text-[10px] text-muted/60 font-mono block">text-[10px] font-black</code>
                </div>
              </Card>
            </div>
          </div>

          {/* Text Colors */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Text Colors</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-aqua-light/20 to-transparent"></div>
            </div>

            <Card className="p-8 bg-white/[0.02] border-white/5" elevation="deep">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <p className="text-base text-white font-bold">Primary (Moonlight)</p>
                  <p className="text-sm text-white/90">Main headings, important text</p>
                  <code className="text-xs text-muted/60 font-mono block">text-white</code>
                </div>
                <div className="space-y-3">
                  <p className="text-base text-pearl font-bold">Secondary (Pearl)</p>
                  <p className="text-sm text-pearl/90">Body text, paragraphs</p>
                  <code className="text-xs text-muted/60 font-mono block">text-pearl</code>
                </div>
                <div className="space-y-3">
                  <p className="text-base text-muted font-bold">Tertiary (Muted)</p>
                  <p className="text-sm text-muted/90">Captions, helper text</p>
                  <code className="text-xs text-muted/60 font-mono block">text-muted</code>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );

    case 'ai-guide':
      return (
        <div className="space-y-16">
          <SectionHeader title="MIRA Intelligence" subtitle="Conversational architecture for deep digital submersion." />
          <div className="w-full flex justify-center">
            <MiraIntelligence />
          </div>
        </div>
      );

    case 'auth-onboarding':
      return (
        <div className="space-y-32">
          <SectionHeader title="Sacred Entry" subtitle="Authentication and neural calibration dispatch flows." />
          <div className="flex flex-col items-center gap-32">
            <div className="w-full max-w-md">
               <p className="text-[10px] font-black text-gold-accent uppercase tracking-[0.6em] text-center mb-12">Flow 01: Social Dispatch</p>
               <AuthenticationFlow onVerified={() => {}} />
            </div>
            <div className="w-full flex flex-col items-center">
               <p className="text-[10px] font-black text-gold-accent uppercase tracking-[0.6em] text-center mb-12">Flow 02: Calibration Loop</p>
               <QuickOnboardingFlow prefillName="Architect" />
            </div>
          </div>
        </div>
      );

    case 'layout-nav':
      return (
        <div className="space-y-16">
          <SectionHeader title="Global Navigation" subtitle="Persistent headers and floating neural island bars." />
          <ComponentDemo title="Standard Shells">
            <div className="w-full space-y-10">
               <AppHeader title="Resonance Feed" subtitle="Sector 4 Active" />
               <NativeHeader />
               <ChatHeaderSphere name="Neural Collective" status="14 Nodes Active" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Neural Island (Floating below)">
            <div className="w-full max-w-2xl mx-auto space-y-8">
               <Card className="p-10 border-aqua-light/10" elevation="deep">
                  <div className="grid grid-cols-2 gap-8 mb-8">
                     <Toggle label="Authenticated" enabled={demoAuth} onChange={setDemoAuth} />
                     <Toggle label="System Loading" enabled={demoLoading} onChange={setDemoLoading} />
                  </div>
                  <div className="flex flex-wrap gap-3 pt-8 border-t border-white/5">
                     {['/discover', '/practices', '/', '/impact', '/my-profile'].map(path => (
                        <button key={path} onClick={() => setDemoPathname(path)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all ${demoPathname === path ? 'bg-aqua-light text-abyss-base border-aqua-light' : 'border-white/5 text-muted hover:border-white/20'}`}>
                           {path === '/' ? '/guide' : path}
                        </button>
                     ))}
                  </div>
               </Card>
            </div>
            <ConditionalIslandNavigation
               isLoading={demoLoading} isInitialized={true} isAuthenticated={demoAuth} footerMenuEnabled={true}
               pathname={demoPathname} chatState={{ currentAgent: demoPathname === '/' ? 'guide' : 'none' }}
               onNavigate={(route) => setDemoPathname(route)}
            />
          </ComponentDemo>
          <div className="flex justify-center">
             <Button variant="primary" onClick={() => setIsSidebarOpen(true)} className="px-16 py-6 font-black uppercase tracking-widest">Open Feature Sidebar</Button>
             <FeatureNavigationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      );

    case 'profile-enhanced':
      return (
        <div className="space-y-20">
          <SectionHeader title="Profile Systems" subtitle="Identity surfaces and detailed resonance calibration." />
          <DetailedProfileSetupFlow />
          <ComponentDemo title="Resonance Overview"><EnhancedProfileView user={demoUser} /></ComponentDemo>
          <ComponentDemo title="Editing Portal"><ProfileEditingInterface /></ComponentDemo>
        </div>
      );

    case 'social-discovery':
      return (
        <div className="space-y-16">
          <SectionHeader title="Social Resonance" subtitle="Mapping community pulse across the neural void." />
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="space-y-12">
                <ComponentDemo title="Resonations Feed"><NotificationsPanel /></ComponentDemo>
                <PostFeedItem post={demoPost} />
             </div>
             <div className="space-y-12">
                <ComponentDemo title="Geographic Presence"><MapViewModal /></ComponentDemo>
                <ComponentDemo title="Neural Filtering"><DiscoveryFilterModal /></ComponentDemo>
                <ComponentDemo title="Comment Context"><CommentInput userAvatar="https://i.pravatar.cc/150?u=me" /></ComponentDemo>
             </div>
          </div>
        </div>
      );

    case 'error-handling':
      return (
        <div className="space-y-16">
          <SectionHeader title="Error Protocols" subtitle="Handling neural link severing and data voids." />
          <ComponentDemo title="System Boundary"><ErrorBoundary /></ComponentDemo>
          <ComponentDemo title="Missing Node"><ProfileErrorFallback /></ComponentDemo>
        </div>
      );

    case 'home-loading':
      return (
        <div className="space-y-16">
          <SectionHeader title="Sacred Loading" subtitle="Progressive loading states with animated spinners and timeout handling." />
          <ComponentDemo title="Loading Component">
            <div className="w-full h-[500px] relative rounded-2xl overflow-hidden">
              <HomeSacredLoading
                onTimeout={() => console.log('Timeout!')}
                onRetry={() => console.log('Retry!')}
                maxTimeout={20000}
                compact={true}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'home-arrival':
      return (
        <div className="space-y-16">
          <SectionHeader title="Soft Arrival" subtitle="Breathing circle transition screen with calming animation." />
          <ComponentDemo title="Breathing Arrival">
            <div className="w-full h-[500px] relative rounded-2xl overflow-hidden">
              <SoftArrival
                onComplete={() => console.log('Arrival complete!')}
                isReturningUser={false}
                compact={true}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'home-auth':
      return (
        <div className="space-y-16">
          <SectionHeader title="Email Capture" subtitle="Multi-step email authentication flow with OTP verification." />
          <ComponentDemo title="Authentication Flow">
            <div className="w-full h-[600px] relative rounded-2xl overflow-hidden">
              <EmailCapture onComplete={() => console.log('Auth complete!')} compact={true} />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'home-onboarding':
      return (
        <div className="space-y-16">
          <SectionHeader title="Onboarding Form" subtitle="4-step wizard collecting user preferences with auto-advance." />
          <ComponentDemo title="Onboarding Wizard">
            <div className="w-full h-[550px] relative rounded-2xl overflow-hidden">
              <OnboardingForm
                onComplete={(data) => console.log('Onboarding complete:', data)}
                prefillName="Demo User"
                compact={true}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'home-containers':
      return (
        <div className="space-y-16">
          <SectionHeader title="Layout Containers" subtitle="Reusable wrappers for consistent page layouts and error states." />
          <ComponentDemo title="Page Container">
            <div className="w-full h-[300px] relative rounded-2xl overflow-hidden">
              <PageContainer className="!min-h-0 !h-full">
                <div className="flex items-center justify-center h-full">
                  <p className="text-white text-2xl font-light">Page Content Goes Here</p>
                </div>
              </PageContainer>
            </div>
          </ComponentDemo>
          <ComponentDemo title="Error Container">
            <div className="w-full h-[300px] relative rounded-2xl overflow-hidden">
              <ErrorContainer
                message="Failed to load the data. Please try again."
                onRetry={() => console.log('Retry clicked!')}
                className="!min-h-0 !h-full"
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'profile-stats':
      return (
        <div className="space-y-16">
          <SectionHeader title="Stats & Badges" subtitle="User statistics, completion tracking, and status indicators." />
          <ComponentDemo title="Profile Stats - Full">
            <div className="w-full">
              <ProfileStats connections={1420} views={8943} completion={85} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Stats - Without Completion">
            <div className="w-full">
              <ProfileStats connections={567} views={2341} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Location Badge">
            <div className="flex flex-wrap gap-3">
              <LocationBadge location="San Francisco, CA" />
              <LocationBadge location="New York, NY" />
              <LocationBadge location="Remote" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Connection Status Badges">
            <div className="flex flex-wrap gap-4">
              <ConnectionStatusBadge status="mutual" />
              <ConnectionStatusBadge status="connected" />
              <ConnectionStatusBadge status="pending" />
              <ConnectionStatusBadge status="none" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Completion Bars">
            <div className="space-y-4 w-full">
              <ProfileCompletionBar percentage={100} />
              <ProfileCompletionBar percentage={85} />
              <ProfileCompletionBar percentage={45} />
              <ProfileCompletionBar percentage={15} />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'profile-actions':
      return (
        <div className="space-y-16">
          <SectionHeader title="Action Buttons" subtitle="Connection buttons, messaging, and profile actions." />
          <ComponentDemo title="Connection Buttons - Not Connected">
            <div className="w-full">
              <ConnectionButtons
                status="none"
                onConnect={() => console.log('Connect')}
                onMessage={() => console.log('Message')}
                onShare={() => console.log('Share')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Connection Buttons - Connected">
            <div className="w-full">
              <ConnectionButtons
                status="connected"
                onConnect={() => console.log('Connected')}
                onMessage={() => console.log('Message')}
                onShare={() => console.log('Share')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Connection Buttons - Pending">
            <div className="w-full">
              <ConnectionButtons
                status="pending"
                onMessage={() => console.log('Message')}
                onShare={() => console.log('Share')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Connection Buttons - Own Profile">
            <div className="w-full">
              <ConnectionButtons isOwnProfile={true} onShare={() => console.log('Share')} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Action Menu">
            <div className="flex justify-center">
              <ProfileActionMenu
                options={[
                  { id: 'share', label: 'Share Profile', icon: <Icons.Share /> },
                  { id: 'copy', label: 'Copy Link', icon: <Icons.Share /> },
                  { id: 'report', label: 'Report User', icon: <Icons.X />, danger: true },
                  { id: 'block', label: 'Block User', icon: <Icons.X />, danger: true },
                ]}
                onSelect={(id) => console.log('Selected:', id)}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'profile-attributes':
      return (
        <div className="space-y-16">
          <SectionHeader title="Attributes & Pills" subtitle="Values, interests, skills, and attribute tags." />
          <ComponentDemo title="Attribute Pills - Various Colors">
            <div className="flex flex-wrap gap-3">
              <AttributePill label="Mindfulness" color="#97D9C4" />
              <AttributePill label="Growth" color="#6BC7A8" />
              <AttributePill label="Creativity" color="#fbbf24" />
              <AttributePill label="Community" color="#0A4651" />
              <AttributePill label="Authenticity" color="#97D9C4" onClick={() => console.log('Clicked')} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Attribute Pills - Removable">
            <div className="flex flex-wrap gap-3">
              <AttributePill label="Yoga" color="#97D9C4" removable onRemove={() => console.log('Remove Yoga')} />
              <AttributePill label="Meditation" color="#6BC7A8" removable onRemove={() => console.log('Remove Meditation')} />
              <AttributePill label="Writing" color="#fbbf24" removable onRemove={() => console.log('Remove Writing')} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Attribute Category - Core Values">
            <div className="w-full">
              <AttributeCategory
                title="Core Values"
                attributes={[
                  { id: '1', label: 'Mindfulness', color: '#97D9C4' },
                  { id: '2', label: 'Growth', color: '#6BC7A8' },
                  { id: '3', label: 'Authenticity', color: '#97D9C4' },
                  { id: '4', label: 'Connection', color: '#fbbf24' },
                  { id: '5', label: 'Purpose', color: '#97D9C4' },
                  { id: '6', label: 'Balance', color: '#6BC7A8' },
                ]}
                maxDisplay={4}
                onAttributeClick={(id) => console.log('Clicked:', id)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Attribute Category - Interests">
            <div className="w-full">
              <AttributeCategory
                title="Wellness Interests"
                attributes={[
                  { id: '1', label: 'Yoga', color: '#97D9C4' },
                  { id: '2', label: 'Meditation', color: '#6BC7A8' },
                  { id: '3', label: 'Fitness', color: '#fbbf24' },
                ]}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'profile-media':
      return (
        <div className="space-y-16">
          <SectionHeader title="Photos & Uploads" subtitle="Avatar uploads, cover photos, and photo galleries." />
          <ComponentDemo title="Photo Upload - Avatar">
            <div className="flex justify-center">
              <PhotoUploadArea
                type="avatar"
                currentPhoto="https://i.pravatar.cc/150?u=demo"
                onUpload={(file) => console.log('Upload:', file.name)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Photo Upload - Cover Photo">
            <div className="w-full">
              <PhotoUploadArea
                type="cover"
                currentPhoto="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                onUpload={(file) => console.log('Upload:', file.name)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Photo Upload - No Cover">
            <div className="w-full">
              <PhotoUploadArea
                type="cover"
                onUpload={(file) => console.log('Upload:', file.name)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Gallery - With Photos">
            <div className="w-full">
              <ProfileGallery
                photos={[
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                  'https://images.unsplash.com/photo-1508673010502-1c34c68f8e7c?w=400',
                  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400',
                  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
                  'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400',
                ]}
                editable={true}
                onPhotoClick={(i) => console.log('Photo', i)}
                onAddPhoto={() => console.log('Add photo')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'profile-sections':
      return (
        <div className="space-y-16">
          <SectionHeader title="Sections & Layout" subtitle="Profile sections, tabs, bio, and privacy controls." />
          <ComponentDemo title="Profile Tabs">
            <div className="w-full">
              <ProfileTabs
                tabs={[
                  { id: 'about', label: 'About' },
                  { id: 'posts', label: 'Posts' },
                  { id: 'photos', label: 'Photos' },
                  { id: 'insights', label: 'Insights', badge: 'NEW' },
                ]}
                activeTab="about"
                onTabChange={(id) => console.log('Tab:', id)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Bio Section - Read Only">
            <div className="w-full">
              <BioSection
                bio="Navigating the digital ocean with focused intent. Seeking meaningful connections and authentic conversations in the depths of consciousness."
                editable={false}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Bio Section - Editable">
            <div className="w-full">
              <BioSection
                bio="Click the edit button to update this bio."
                editable={true}
                onEdit={(bio) => console.log('New bio:', bio)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Privacy Control">
            <div className="w-full">
              <PrivacyControl
                value="friends"
                onChange={(val) => console.log('Privacy:', val)}
                label="Profile Visibility"
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Section - Collapsible">
            <div className="w-full">
              <ProfileSection
                title="Core Values"
                subtitle="What guides your journey"
                action={<Button variant="ghost">Edit</Button>}
                collapsible={true}
                defaultOpen={true}
              >
                <div className="flex flex-wrap gap-2.5">
                  <AttributePill label="Mindfulness" color="#97D9C4" />
                  <AttributePill label="Growth" color="#6BC7A8" />
                  <AttributePill label="Authenticity" color="#97D9C4" />
                  <AttributePill label="Connection" color="#fbbf24" />
                </div>
              </ProfileSection>
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Card">
            <div className="w-full">
              <ProfileCard
                user={{
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  location: 'San Francisco, CA',
                  bio: 'Exploring consciousness through technology and human connection. Seeking authentic conversations in the digital age.',
                  mutual: 12,
                }}
                onConnect={() => console.log('Connect')}
                onView={() => console.log('View profile')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'discover-search':
      return (
        <div className="space-y-16">
          <SectionHeader title="Search & Navigation" subtitle="Search bars, category tabs, and navigation controls." />
          <ComponentDemo title="Search Bar">
            <div className="w-full">
              <SearchBar placeholder="Search people, events, content..." />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Category Tabs">
            <div className="w-full">
              <CategoryTabs
                categories={[
                  { id: 'for-you', label: 'For You', icon: <DiscoverIcons.Star /> },
                  { id: 'people', label: 'People', icon: <DiscoverIcons.Users /> },
                  { id: 'events', label: 'Events', icon: <DiscoverIcons.Calendar /> },
                  { id: 'content', label: 'Content', icon: <DiscoverIcons.Bookmark /> },
                  { id: 'local', label: 'Local', icon: <DiscoverIcons.MapPin /> },
                ]}
                activeCategory="for-you"
                onCategoryChange={(id) => console.log('Category:', id)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Section Header">
            <div className="w-full">
              <DiscoverSectionHeader
                title="People You Might Know"
                icon={<DiscoverIcons.Users />}
                count={42}
                action={<Button variant="ghost">See All</Button>}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'discover-cards':
      return (
        <div className="space-y-16">
          <SectionHeader title="Recommendation Cards" subtitle="User recommendation cards with match scores and quick actions." />
          <ComponentDemo title="Recommendation Card - High Match">
            <div className="w-full max-w-md mx-auto">
              <RecommendationCard
                user={{
                  id: '1',
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  bio: 'Exploring consciousness through technology and human connection. Passionate about mindful living and authentic conversations.',
                  location: 'San Francisco, CA',
                  interests: ['Mindfulness', 'Tech', 'Art'],
                  mutualConnections: 12,
                  matchScore: 92,
                  verified: true,
                }}
                onConnect={() => console.log('Connect')}
                onViewProfile={() => console.log('View')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Recommendation Grid">
            <RecommendationGrid columns={2}>
              {[1, 2].map((i) => (
                <RecommendationCard
                  key={i}
                  user={{
                    id: String(i),
                    name: `User ${i}`,
                    avatar: `https://i.pravatar.cc/150?u=user${i}`,
                    bio: 'Passionate about personal growth and meaningful connections through intentional living.',
                    location: 'Remote',
                    interests: ['Wellness', 'Growth'],
                    mutualConnections: i * 3,
                    matchScore: 75 + i * 5,
                  }}
                  onConnect={() => console.log('Connect', i)}
                  onViewProfile={() => console.log('View', i)}
                />
              ))}
            </RecommendationGrid>
          </ComponentDemo>
          <ComponentDemo title="Match Score Badges">
            <div className="flex flex-wrap gap-4">
              <MatchScoreBadge score={95} />
              <MatchScoreBadge score={82} />
              <MatchScoreBadge score={73} />
              <MatchScoreBadge score={65} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Distance Badges">
            <div className="flex flex-wrap gap-3">
              <DistanceBadge distance={0.5} unit="mi" />
              <DistanceBadge distance={3.2} unit="mi" />
              <DistanceBadge distance={15} unit="mi" />
              <DistanceBadge distance={2.8} unit="km" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'discover-filters':
      return (
        <div className="space-y-16">
          <SectionHeader title="Filters & Chips" subtitle="Filter controls, active filters, and quick filter buttons." />
          <ComponentDemo title="Filter Button">
            <div className="flex gap-4">
              <FilterButton onClick={() => console.log('Open filters')} />
              <FilterButton activeFiltersCount={3} onClick={() => console.log('Open filters')} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Filter Chips">
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Nearby" onRemove={() => console.log('Remove')} />
              <FilterChip label="High Match" onRemove={() => console.log('Remove')} />
              <FilterChip label="Verified" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Active Filters Bar">
            <div className="w-full">
              <ActiveFiltersBar
                filters={[
                  { id: '1', label: 'Within 5 miles' },
                  { id: '2', label: 'Match 80%+' },
                  { id: '3', label: 'Verified Users' },
                ]}
                onRemoveFilter={(id) => console.log('Remove:', id)}
                onClearAll={() => console.log('Clear all')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Quick Filter Buttons">
            <div className="w-full">
              <QuickFilterButtons
                filters={[
                  { id: 'nearby', label: 'Nearby', icon: <DiscoverIcons.MapPin /> },
                  { id: 'high-match', label: 'High Match', icon: <DiscoverIcons.Sparkles /> },
                  { id: 'verified', label: 'Verified', icon: <DiscoverIcons.Star /> },
                  { id: 'mutual', label: 'Mutual Friends', icon: <DiscoverIcons.Users /> },
                ]}
                activeFilters={['nearby', 'high-match']}
                onToggleFilter={(id) => console.log('Toggle:', id)}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'discover-states':
      return (
        <div className="space-y-16">
          <SectionHeader title="Loading & Empty States" subtitle="Loading spinners and empty state placeholders for different scenarios." />
          <ComponentDemo title="Discover Loading">
            <div className="w-full">
              <DiscoverLoading message="Finding your perfect matches..." />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - No Recommendations">
            <div className="w-full">
              <DiscoveryEmptyState
                type="recommendations"
                actionLabel="Complete Profile"
                onAction={() => console.log('Complete profile')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - No Search Results">
            <div className="w-full">
              <DiscoveryEmptyState
                type="search"
                message="We couldn't find anyone matching 'John Doe'"
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - Events Coming Soon">
            <div className="w-full">
              <DiscoveryEmptyState
                type="events"
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'messages-conversations':
      return (
        <div className="space-y-16">
          <SectionHeader title="Conversation List" subtitle="Inbox conversation items with avatars, previews, and status indicators." />
          <ComponentDemo title="Conversation - Unread">
            <div className="w-full">
              <ConversationListItem
                conversation={{
                  id: '1',
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  lastMessage: 'Hey! Are you free for coffee tomorrow?',
                  timestamp: '2m ago',
                  unreadCount: 3,
                  isOnline: true,
                }}
                onClick={() => console.log('Open conversation')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Conversation - Read">
            <div className="w-full">
              <ConversationListItem
                conversation={{
                  id: '2',
                  name: 'Alex Chen',
                  avatar: 'https://i.pravatar.cc/150?u=alex',
                  lastMessage: 'Thanks for the recommendation!',
                  timestamp: '1h ago',
                  unreadCount: 0,
                  isOnline: false,
                  isRead: true,
                }}
                onClick={() => console.log('Open conversation')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Conversation - Offline with Unread">
            <div className="w-full">
              <ConversationListItem
                conversation={{
                  id: '3',
                  name: 'Maya Patel',
                  avatar: 'https://i.pravatar.cc/150?u=maya',
                  lastMessage: "Let's catch up soon",
                  timestamp: '3d ago',
                  unreadCount: 1,
                  isOnline: false,
                }}
                onClick={() => console.log('Open conversation')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'messages-bubbles':
      return (
        <div className="space-y-16">
          <SectionHeader title="Message Bubbles" subtitle="Chat message bubbles with timestamps and read receipts." />
          <ComponentDemo title="Outgoing Messages (Your Messages)">
            <div className="w-full space-y-4 bg-abyss-depths/50 p-6 rounded-2xl">
              <MessageBubble
                message={{
                  id: '1',
                  content: 'Hey! How are you doing?',
                  timestamp: '2:30 PM',
                  isOwn: true,
                  isRead: true,
                }}
                showAvatar={false}
              />
              <MessageBubble
                message={{
                  id: '2',
                  content: 'Would you like to grab coffee tomorrow?',
                  timestamp: '2:31 PM',
                  isOwn: true,
                  isRead: false,
                }}
                showAvatar={false}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Incoming Messages (Other Person)">
            <div className="w-full space-y-4 bg-abyss-depths/50 p-6 rounded-2xl">
              <MessageBubble
                message={{
                  id: '3',
                  content: "I'm doing great! Thanks for asking.",
                  timestamp: '2:32 PM',
                  isOwn: false,
                  avatar: 'https://i.pravatar.cc/150?u=other',
                }}
              />
              <MessageBubble
                message={{
                  id: '4',
                  content: "Coffee sounds perfect! What time works for you?",
                  timestamp: '2:33 PM',
                  isOwn: false,
                  avatar: 'https://i.pravatar.cc/150?u=other',
                }}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Conversation Flow">
            <div className="w-full space-y-4 bg-abyss-depths/50 p-6 rounded-2xl max-h-[500px] overflow-y-auto">
              <MessageDaySeparator date="Today" />
              <MessageBubble
                message={{
                  id: '1',
                  content: "Hey! How's your day going?",
                  timestamp: '2:30 PM',
                  isOwn: true,
                  isRead: true,
                }}
                showAvatar={false}
              />
              <MessageBubble
                message={{
                  id: '2',
                  content: "Pretty good! Just finished a meditation session.",
                  timestamp: '2:35 PM',
                  isOwn: false,
                  avatar: 'https://i.pravatar.cc/150?u=chat',
                }}
              />
              <MessageBubble
                message={{
                  id: '3',
                  content: "That's awesome! How was it?",
                  timestamp: '2:36 PM',
                  isOwn: true,
                  isRead: false,
                }}
                showAvatar={false}
              />
              <TypingIndicator userName="Alex" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'messages-input':
      return (
        <div className="space-y-16">
          <SectionHeader title="Input & Actions" subtitle="Message input fields, send buttons, and attachment controls." />
          <ComponentDemo title="Message Input - Full Features">
            <div className="w-full bg-abyss-depths/30 rounded-2xl overflow-hidden">
              <MessageInput
                placeholder="Type your message..."
                showAttach={true}
                showEmoji={true}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Message Input - With Text">
            <div className="w-full bg-abyss-depths/30 rounded-2xl overflow-hidden">
              <MessageInput
                value="Hey! Would you like to grab coffee tomorrow?"
                placeholder="Type your message..."
                showAttach={true}
                showEmoji={true}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Conversation Header">
            <div className="w-full">
              <ConversationHeader
                user={{
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  isOnline: true,
                }}
                onBack={() => console.log('Back')}
                onMenu={() => console.log('Menu')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Typing Indicator">
            <div className="w-full bg-abyss-depths/50 p-6 rounded-2xl">
              <TypingIndicator userName="Lena" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'messages-states':
      return (
        <div className="space-y-16">
          <SectionHeader title="Status & Empty States" subtitle="Online status, unread badges, and empty state placeholders." />
          <ComponentDemo title="Online Status Indicators">
            <div className="flex flex-wrap items-center gap-6">
              <OnlineStatus isOnline={true} showLabel size="lg" />
              <OnlineStatus isOnline={false} lastSeen="2h ago" showLabel size="lg" />
              <OnlineStatus isOnline={true} size="md" />
              <OnlineStatus isOnline={false} size="sm" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Unread Badges">
            <div className="flex flex-wrap items-center gap-4">
              <UnreadBadge count={1} />
              <UnreadBadge count={5} />
              <UnreadBadge count={12} />
              <UnreadBadge count={99} />
              <UnreadBadge count={150} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Message Day Separator">
            <div className="w-full bg-abyss-depths/50 p-6 rounded-2xl">
              <MessageDaySeparator date="Today" />
              <MessageDaySeparator date="Yesterday" />
              <MessageDaySeparator date="Dec 15, 2024" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - No Conversations">
            <div className="w-full">
              <MessageEmptyState
                type="no-conversations"
                onAction={() => console.log('Start chatting')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - Start Conversation">
            <div className="w-full">
              <MessageEmptyState
                type="start-conversation"
                userName="Lena River"
                onAction={() => console.log('Send message')}
                actionLabel="Send First Message"
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'practices-cards':
      return (
        <div className="space-y-16">
          <SectionHeader title="Practice Cards" subtitle="Individual practice items with completion status and quick actions." />
          <ComponentDemo title="Practice Card - Pending">
            <div className="w-full max-w-lg">
              <PracticeCard
                practice={{
                  id: '1',
                  name: 'Morning Meditation',
                  category: 'Mindfulness',
                  icon: <PracticeIcons.Target />,
                  streak: 7,
                  completedToday: false,
                  duration: 10,
                  timeOfDay: 'morning',
                }}
                onComplete={() => console.log('Complete')}
                onTimer={() => console.log('Timer')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Practice Card - Completed">
            <div className="w-full max-w-lg">
              <PracticeCard
                practice={{
                  id: '2',
                  name: 'Evening Gratitude',
                  category: 'Reflection',
                  icon: <PracticeIcons.Heart />,
                  streak: 12,
                  completedToday: true,
                  duration: 5,
                  timeOfDay: 'evening',
                }}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Completion Checkmarks">
            <div className="flex items-center gap-4">
              <CompletionCheckmark completed={false} size="sm" />
              <CompletionCheckmark completed={true} size="sm" />
              <CompletionCheckmark completed={false} size="md" />
              <CompletionCheckmark completed={true} size="md" />
              <CompletionCheckmark completed={false} size="lg" onClick={() => console.log('Toggle')} />
              <CompletionCheckmark completed={true} size="lg" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Practice Category Badges">
            <div className="flex flex-wrap gap-3">
              <PracticeCategoryBadge category="Mindfulness" icon={<PracticeIcons.Target />} color="#97D9C4" />
              <PracticeCategoryBadge category="Movement" icon={<PracticeIcons.Zap />} color="#fbbf24" />
              <PracticeCategoryBadge category="Reflection" icon={<PracticeIcons.Heart />} color="#f59e0b" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'practices-stats':
      return (
        <div className="space-y-16">
          <SectionHeader title="Stats & Streaks" subtitle="Progress tracking, streak displays, and daily statistics." />
          <ComponentDemo title="Daily Stats Bar - Full">
            <div className="w-full">
              <DailyStatsBar streak={7} completed={3} total={5} totalMinutes={45} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Daily Stats Bar - Without Time">
            <div className="w-full">
              <DailyStatsBar streak={0} completed={1} total={4} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Streak Displays">
            <div className="flex flex-wrap items-center gap-6">
              <StreakDisplay streak={0} size="sm" />
              <StreakDisplay streak={7} size="sm" showLabel />
              <StreakDisplay streak={14} size="md" showLabel />
              <StreakDisplay streak={30} size="lg" showLabel />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Progress Circles">
            <div className="flex items-center gap-8">
              <ProgressCircle completed={0} total={5} size="sm" />
              <ProgressCircle completed={3} total={5} size="md" />
              <ProgressCircle completed={5} total={5} size="lg" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Time of Day Badges">
            <div className="flex flex-wrap gap-3">
              <TimeOfDayBadge timeOfDay="morning" />
              <TimeOfDayBadge timeOfDay="afternoon" />
              <TimeOfDayBadge timeOfDay="evening" />
              <TimeOfDayBadge timeOfDay="morning" size="sm" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'practices-timer':
      return (
        <div className="space-y-16">
          <SectionHeader title="Timer & Sessions" subtitle="Practice timers, session logging, and quick actions." />
          <ComponentDemo title="Practice Timer - Running">
            <div className="w-full max-w-md mx-auto">
              <PracticeTimerDisplay
                practiceName="Meditation"
                duration={10}
                isRunning={true}
                onPause={() => console.log('Pause')}
                onComplete={() => console.log('Complete')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Session History Item">
            <div className="w-full">
              <SessionHistoryItem
                session={{
                  id: '1',
                  practiceName: 'Morning Meditation',
                  date: 'Dec 19, 2024',
                  duration: 15,
                  timeOfDay: 'morning',
                  reflection: 'Felt very centered and calm. Great way to start the day.',
                }}
                onView={() => console.log('View session')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Quick Actions">
            <div className="flex flex-wrap gap-4">
              <PracticeQuickActions
                onLog={() => console.log('Log')}
                onTimer={() => console.log('Timer')}
                onEdit={() => console.log('Edit')}
              />
              <PracticeQuickActions
                onLog={() => console.log('Log')}
                onTimer={() => console.log('Timer')}
                disabled={true}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'practices-calendar':
      return (
        <div className="space-y-16">
          <SectionHeader title="Calendar & History" subtitle="Weekly calendar views and practice history displays." />
          <ComponentDemo title="Weekly Calendar - Active Week">
            <div className="w-full">
              <WeeklyCalendar
                weekData={[
                  { day: 'Mon', completed: true, date: '16' },
                  { day: 'Tue', completed: true, date: '17' },
                  { day: 'Wed', completed: true, date: '18' },
                  { day: 'Thu', completed: true, date: '19' },
                  { day: 'Fri', completed: false, date: '20' },
                  { day: 'Sat', completed: false, date: '21' },
                  { day: 'Sun', completed: false, date: '22' },
                ]}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Session History - Recent Sessions">
            <div className="w-full grid gap-4">
              <SessionHistoryItem
                session={{
                  id: '1',
                  practiceName: 'Morning Meditation',
                  date: 'Dec 19, 2024',
                  duration: 15,
                  timeOfDay: 'morning',
                  reflection: 'Felt very centered and calm. Great way to start the day.',
                }}
                onView={() => console.log('View session')}
              />
              <SessionHistoryItem
                session={{
                  id: '2',
                  practiceName: 'Evening Gratitude',
                  date: 'Dec 19, 2024',
                  duration: 5,
                  timeOfDay: 'evening',
                  reflection: 'Grateful for meaningful connections and personal growth.',
                }}
                onView={() => console.log('View session')}
              />
              <SessionHistoryItem
                session={{
                  id: '3',
                  practiceName: 'Movement Practice',
                  date: 'Dec 18, 2024',
                  duration: 20,
                  timeOfDay: 'afternoon',
                }}
                onView={() => console.log('View session')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - No Practices">
            <div className="w-full">
              <PracticeEmptyState
                type="no-practices"
                onAction={() => console.log('Add practice')}
                actionLabel="Create Your First Practice"
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - No Sessions">
            <div className="w-full">
              <PracticeEmptyState
                type="no-sessions"
                onAction={() => console.log('Log session')}
                actionLabel="Log Your First Session"
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'practices-dashboard':
      return (
        <div className="space-y-16">
          <SectionHeader title="Full Dashboard" subtitle="Complete daily practices dashboard with all elements integrated." />
          <ComponentDemo title="Refined Practices Dashboard">
            <div className="w-full bg-abyss-depths/50 border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
             <RefinedPracticesDashboard />
          </div>
          </ComponentDemo>
          </div>
      );

    case 'practices-modals':
      return (
        <div className="space-y-16">
          <SectionHeader title="Modals & Flows" subtitle="Practice creation, session logging, and modal interactions." />
          <ComponentDemo title="Log Session Modal">
            <div className="w-full max-w-2xl mx-auto bg-abyss-depths/50 p-12 rounded-3xl border-2 border-white/10">
              <RefinedLogSessionModal />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Choose Practice Modal">
            <div className="w-full max-w-2xl mx-auto bg-abyss-depths/50 p-12 rounded-3xl border-2 border-white/10">
              <RefinedChoosePracticeModal />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'myprofile-own-view':
      return (
        <div className="space-y-16">
          <SectionHeader title="My Profile (Own View)" subtitle="Complete profile view as seen by the profile owner with edit controls." />
          <div className="w-full max-w-3xl mx-auto bg-abyss-depths/30 rounded-3xl border-2 border-white/10 shadow-2xl">
            <MyProfileView />
          </div>
        </div>
      );

    case 'myprofile-public-view':
      return (
        <div className="space-y-16">
          <SectionHeader title="Public Profile View" subtitle="How your profile appears to other users with connection actions." />
          <div className="w-full max-w-3xl mx-auto bg-abyss-depths/30 rounded-3xl border-2 border-white/10 shadow-2xl">
            <PublicProfileView />
          </div>
        </div>
      );

    case 'myprofile-editing':
      return (
        <div className="space-y-16">
          <SectionHeader title="Edit Mode & Controls" subtitle="Toggle between view and edit modes, save flows, and completion prompts." />
          <ComponentDemo title="Edit Mode Toggle - View Mode">
            <EditModeToggle
              isEditing={false}
              onToggle={() => console.log('Start editing')}
            />
          </ComponentDemo>
          <ComponentDemo title="Edit Mode Toggle - Editing with Changes">
            <EditModeToggle
              isEditing={true}
              hasChanges={true}
              onSave={() => console.log('Save')}
              onCancel={() => console.log('Cancel')}
            />
          </ComponentDemo>
          <ComponentDemo title="Profile Completion Prompt - 65%">
            <div className="w-full">
              <ProfileCompletionPrompt
                percentage={65}
                missingItems={['Profile Photo', 'Bio', 'Interests']}
                onComplete={() => console.log('Complete profile')}
              />
             </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Completion Prompt - 85%">
            <div className="w-full">
              <ProfileCompletionPrompt
                percentage={85}
                missingItems={['Cover Photo']}
                onComplete={() => console.log('Complete profile')}
              />
          </div>
          </ComponentDemo>
        </div>
      );

    case 'myprofile-sections':
      return (
        <div className="space-y-16">
          <SectionHeader title="Quick Edit Sections" subtitle="Inline editing sections for different profile parts." />
          <ComponentDemo title="Basic Info Editor">
            <div className="w-full">
              <QuickEditSection
                title="Basic Information"
                icon={<MyProfileIcons.Edit />}
                isEditing={false}
                onEdit={() => console.log('Edit')}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Name</p>
                    <p className="text-base text-white font-medium">Lena River</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-base text-white font-medium">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Bio</p>
                    <p className="text-base text-pearl/80 leading-relaxed">Exploring consciousness through technology and human connection.</p>
                  </div>
                </div>
              </QuickEditSection>
            </div>
          </ComponentDemo>
          <ComponentDemo title="Basic Info Editor - Edit Mode">
            <div className="w-full">
              <QuickEditSection
                title="Basic Information"
                icon={<MyProfileIcons.Edit />}
                isEditing={true}
                onSave={() => console.log('Save')}
                onCancel={() => console.log('Cancel')}
              >
                <BasicInfoEditor
                  initialData={{
                    name: 'Lena River',
                    bio: 'Exploring consciousness through technology and human connection.',
                    location: 'San Francisco, CA'
                  }}
                />
              </QuickEditSection>
            </div>
          </ComponentDemo>
          <ComponentDemo title="Attribute Editor">
            <div className="w-full">
              <AttributeEditor
                title="Core Values"
                attributes={[
                  { id: '1', label: 'Mindfulness', color: '#97D9C4' },
                  { id: '2', label: 'Growth', color: '#6BC7A8' },
                  { id: '3', label: 'Authenticity', color: '#97D9C4' },
                ]}
                availableAttributes={[
                  { id: '4', label: 'Connection', color: '#fbbf24' },
                  { id: '5', label: 'Purpose', color: '#97D9C4' },
                  { id: '6', label: 'Balance', color: '#6BC7A8' },
                ]}
                maxSelection={5}
                onAdd={(id) => console.log('Add', id)}
                onRemove={(id) => console.log('Remove', id)}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'myprofile-photos':
      return (
        <div className="space-y-16">
          <SectionHeader title="Photo Management" subtitle="Upload and manage profile and cover photos." />
          <ComponentDemo title="Photo Upload Section">
            <div className="w-full">
              <PhotoUploadSection
                avatarUrl="https://i.pravatar.cc/150?u=demo"
                coverUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                onAvatarUpload={(file) => console.log('Avatar:', file.name)}
                onCoverUpload={(file) => console.log('Cover:', file.name)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Preview - How Others See You">
            <div className="w-full max-w-md mx-auto">
              <ProfilePreviewCard
                user={{
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  bio: 'Exploring consciousness through technology and human connection.',
                  location: 'San Francisco, CA',
                  stats: {
                    connections: 1420,
                    views: 8943,
                  },
                }}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'myprofile-settings':
      return (
        <div className="space-y-16">
          <SectionHeader title="Account Settings" subtitle="Privacy controls, visibility toggles, and account management." />
          <ComponentDemo title="Profile Visibility Toggle - Public">
            <div className="w-full">
              <ProfileVisibilityToggle
                isPublic={true}
                onChange={(val) => console.log('Set public:', val)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Profile Visibility Toggle - Private">
            <div className="w-full">
              <ProfileVisibilityToggle
                isPublic={false}
                onChange={(val) => console.log('Set public:', val)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Setting Items">
            <div className="w-full space-y-3">
              <SettingItem
                label="Email Address"
                value="lena@example.com"
                description="Manage your email preferences"
                onClick={() => console.log('Email settings')}
              />
              <SettingItem
                label="Privacy Settings"
                description="Control who can see your profile"
                onClick={() => console.log('Privacy')}
              />
              <SettingItem
                label="Notifications"
                value="Enabled"
                description="Manage notification preferences"
                onClick={() => console.log('Notifications')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Account Setting Cards">
            <div className="w-full space-y-4">
              <AccountSettingCard
                title="Download Your Data"
                description="Get a copy of all your profile data, practices, and messages."
                action="Request Download"
                onClick={() => console.log('Download data')}
              />
              <AccountSettingCard
                title="Delete Account"
                description="Permanently delete your account and all associated data. This action cannot be undone."
                action="Delete Account"
                variant="danger"
                onClick={() => console.log('Delete account')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'settings-account':
      return (
        <div className="space-y-16">
          <SectionHeader title="Account & Profile" subtitle="Manage your account information and profile settings." />
          <ComponentDemo title="Account Information Cards">
            <div className="w-full space-y-3">
              <AccountInfoCard label="Email" value="lena@example.com" verified={true} onEdit={() => console.log('Edit email')} />
              <AccountInfoCard label="Phone" value="+1 (555) 123-4567" verified={false} onEdit={() => console.log('Edit phone')} />
              <AccountInfoCard label="Password" value="••••••••" onEdit={() => console.log('Change password')} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Setting Rows">
            <div className="w-full space-y-2">
              <SettingRow
                icon={<SettingsIcons.User />}
                label="Profile Settings"
                description="Manage your public profile"
                onClick={() => console.log('Profile settings')}
              />
              <SettingRow
                icon={<SettingsIcons.Lock />}
                label="Privacy & Security"
                value="Customized"
                onClick={() => console.log('Privacy')}
              />
              <SettingRow
                icon={<SettingsIcons.Bell />}
                label="Notifications"
                value="Enabled"
                onClick={() => console.log('Notifications')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Logout Button">
            <LogoutButton onLogout={() => console.log('Logout')} />
          </ComponentDemo>
        </div>
      );

    case 'settings-notifications':
      return (
        <div className="space-y-16">
          <SectionHeader title="Notifications" subtitle="Control how and when you receive notifications." />
          <ComponentDemo title="Notification Preferences">
            <div className="w-full space-y-4">
              <NotificationPreference
                title="New Messages"
                description="Get notified when someone sends you a message"
                email={true}
                push={true}
                onEmailToggle={(val) => console.log('Email:', val)}
                onPushToggle={(val) => console.log('Push:', val)}
              />
              <NotificationPreference
                title="Connection Requests"
                description="When someone wants to connect with you"
                email={false}
                push={true}
                onEmailToggle={(val) => console.log('Email:', val)}
                onPushToggle={(val) => console.log('Push:', val)}
              />
              <NotificationPreference
                title="Practice Reminders"
                description="Daily reminders for your practice routine"
                email={true}
                push={false}
                onEmailToggle={(val) => console.log('Email:', val)}
                onPushToggle={(val) => console.log('Push:', val)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Toggle Settings">
            <div className="w-full space-y-2">
              <SettingRow
                label="Email Notifications"
                description="Receive notifications via email"
                type="toggle"
                enabled={true}
                onToggle={(val) => console.log('Email:', val)}
              />
              <SettingRow
                label="Push Notifications"
                description="Receive push notifications on your device"
                type="toggle"
                enabled={false}
                onToggle={(val) => console.log('Push:', val)}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'settings-privacy':
      return (
        <div className="space-y-16">
          <SectionHeader title="Privacy & Security" subtitle="Control your privacy and manage blocked users." />
          <ComponentDemo title="Preference Selector">
            <div className="w-full">
              <PreferenceSelector
                label="Who can message you?"
                options={[
                  { id: 'everyone', label: 'Everyone', description: 'Anyone can send you messages' },
                  { id: 'connections', label: 'Connections Only', description: 'Only people you\'re connected with' },
                  { id: 'none', label: 'No One', description: 'Disable all messages' },
                ]}
                selected="connections"
                onSelect={(id) => console.log('Selected:', id)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Blocked Users">
            <div className="w-full space-y-3">
              <BlockedUserItem
                user={{ name: 'John Doe', blockedDate: '2 weeks ago' }}
                onUnblock={() => console.log('Unblock')}
              />
              <BlockedUserItem
                user={{ name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane', blockedDate: '1 month ago' }}
                onUnblock={() => console.log('Unblock')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'settings-data':
      return (
        <div className="space-y-16">
          <SectionHeader title="Data & Preferences" subtitle="Manage your data, downloads, and account actions." />
          <ComponentDemo title="Data Privacy Cards">
            <div className="w-full space-y-4">
              <DataPrivacyCard
                title="Download Your Data"
                description="Get a copy of all your data including profile, messages, and activity."
                icon={<SettingsIcons.Download />}
                actionLabel="Request Download"
                onAction={() => console.log('Download')}
              />
              <DataPrivacyCard
                title="Data Export"
                description="Export your practices, journal entries, and progress data."
                icon={<SettingsIcons.Download />}
                actionLabel="Export Data"
                processing={false}
                onAction={() => console.log('Export')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Danger Zone">
            <div className="w-full">
              <DangerZoneCard
                title="Delete Account"
                description="Permanently delete your account and all associated data. This action cannot be undone and all your data will be lost forever."
                actionLabel="Delete Account"
                onAction={() => console.log('Delete account')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Settings Tabs Navigation">
            <div className="w-full">
              <SettingsTabs
                tabs={[
                  { id: 'general', label: 'General', icon: <SettingsIcons.User /> },
                  { id: 'notifications', label: 'Notifications', icon: <SettingsIcons.Bell /> },
                  { id: 'privacy', label: 'Privacy', icon: <SettingsIcons.Lock /> },
                  { id: 'security', label: 'Security', icon: <SettingsIcons.Shield /> },
                  { id: 'data', label: 'Data', icon: <SettingsIcons.Download /> },
                ]}
                activeTab="general"
                onTabChange={(id) => console.log('Tab:', id)}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'community-full-view':
      return (
        <div className="space-y-16">
          <SectionHeader title="Full Community View" subtitle="Complete community page with functional tabs showing posts, members, and about sections." />
          <div className="w-full max-w-4xl mx-auto bg-abyss-depths/30 rounded-3xl border-2 border-white/10 overflow-hidden">
            <CommunityFullView />
          </div>
        </div>
      );

    case 'community-cards':
      return (
        <div className="space-y-16">
          <SectionHeader title="Community Cards" subtitle="Browse and discover community cards with join actions." />
          <ComponentDemo title="Community Card - Public">
            <div className="w-full max-w-sm mx-auto">
              <CommunityCard
                community={{
                  id: '1',
                  name: 'Mindful Living',
                  description: 'A space for conscious living, meditation practices, and meaningful connections.',
                  memberCount: 1420,
                  accessType: 'public',
                  tags: ['Meditation', 'Wellness', 'Growth'],
                }}
                onClick={() => console.log('View community')}
                onJoin={() => console.log('Join')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Community Card - Private">
            <div className="w-full max-w-sm mx-auto">
              <CommunityCard
                community={{
                  id: '2',
                  name: 'Inner Circle',
                  description: 'Private community for advanced practitioners and deep conversations.',
                  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                  memberCount: 87,
                  accessType: 'private',
                  tags: ['Exclusive', 'Deep Work'],
                }}
                onClick={() => console.log('View community')}
                onJoin={() => console.log('Request to join')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Access Type Badges">
            <div className="flex flex-wrap gap-4">
              <AccessTypeBadge type="public" />
              <AccessTypeBadge type="semi_private" />
              <AccessTypeBadge type="private" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Create Community Button">
            <CreateCommunityButton onClick={() => console.log('Create community')} />
          </ComponentDemo>
        </div>
      );

    case 'community-header':
      return (
        <div className="space-y-16">
          <SectionHeader title="Community Header" subtitle="Full community profile header with cover, stats, and membership controls." />
          <ComponentDemo title="Community Header - Member View">
            <div className="w-full bg-abyss-depths/30 rounded-3xl border-2 border-white/10 overflow-hidden">
              <CommunityHeaderBanner
                community={{
                  name: 'Mindful Living',
                  description: 'A vibrant community dedicated to conscious living, meditation practices, and authentic human connection.',
                  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                  memberCount: 1420,
                  accessType: 'public',
                }}
                isMember={true}
                onShare={() => console.log('Share')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Community Stats Bar">
            <div className="w-full">
              <CommunityStatsBar members={1420} posts={3847} activeToday={124} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Membership Buttons">
            <div className="flex flex-wrap gap-4">
              <CommunityMembershipButton isMember={false} onJoin={() => console.log('Join')} />
              <CommunityMembershipButton isMember={true} onLeave={() => console.log('Leave')} />
              <CommunityMembershipButton isMember={false} isPending={true} />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'community-members':
      return (
        <div className="space-y-16">
          <SectionHeader title="Members & Roles" subtitle="Member cards, role badges, and member management." />
          <ComponentDemo title="Member Role Badges">
            <div className="flex flex-wrap gap-4">
              <MemberRoleBadge role="owner" />
              <MemberRoleBadge role="moderator" />
              <MemberRoleBadge role="member" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Community Member Cards">
            <div className="w-full space-y-3">
              <CommunityMemberCard
                member={{
                  name: 'Lena River',
                  avatar: 'https://i.pravatar.cc/150?u=lena',
                  role: 'owner',
                  joinedDate: '6 months ago',
                }}
                onViewProfile={() => console.log('View profile')}
                onMessage={() => console.log('Message')}
              />
              <CommunityMemberCard
                member={{
                  name: 'Alex Chen',
                  avatar: 'https://i.pravatar.cc/150?u=alex',
                  role: 'moderator',
                  joinedDate: '3 months ago',
                }}
                onViewProfile={() => console.log('View profile')}
                onMessage={() => console.log('Message')}
                onRemove={() => console.log('Remove')}
              />
              <CommunityMemberCard
                member={{
                  name: 'Maya Patel',
                  avatar: 'https://i.pravatar.cc/150?u=maya',
                  role: 'member',
                  joinedDate: '2 weeks ago',
                }}
                onViewProfile={() => console.log('View profile')}
                onMessage={() => console.log('Message')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'community-content':
      return (
        <div className="space-y-16">
          <SectionHeader title="Posts & Rules" subtitle="Community posts, interactions, and community guidelines." />
          <ComponentDemo title="Community Post Item">
            <div className="w-full">
              <CommunityPostItem
                post={{
                  id: '1',
                  author: {
                    name: 'Lena River',
                    avatar: 'https://i.pravatar.cc/150?u=lena',
                    role: 'moderator',
                  },
                  content: 'Just finished an amazing meditation session. The practice of daily mindfulness has completely transformed my perspective on life and relationships.',
                  timestamp: '2 hours ago',
                  likes: 24,
                  comments: 8,
                }}
                onLike={() => console.log('Like')}
                onComment={() => console.log('Comment')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Community Rules">
            <div className="w-full">
              <CommunityRulesCard
                rules={[
                  'Be respectful and kind to all community members',
                  'No spam, self-promotion, or commercial content',
                  'Keep discussions relevant to mindfulness and personal growth',
                  'Respect privacy - no sharing of personal information',
                  'Report inappropriate content to moderators',
                ]}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'business-full-view':
      return (
        <div className="space-y-16">
          <SectionHeader title="Full Business Profile" subtitle="Complete business page with functional tabs showing about, services, and reviews." />
          <div className="w-full max-w-4xl mx-auto bg-abyss-depths/30 rounded-3xl border-2 border-white/10 overflow-hidden">
            <BusinessFullView />
          </div>
        </div>
      );

    case 'business-cards':
      return (
        <div className="space-y-16">
          <SectionHeader title="Business Cards" subtitle="Business discovery and listing cards with verification badges." />
          <ComponentDemo title="Verified Business Card">
            <div className="w-full max-w-sm mx-auto">
              <BusinessCard
                business={{
                  id: '1',
                  name: 'Mindful Wellness Studio',
                  category: 'Health & Wellness',
                  description: 'Transform your life through meditation, yoga, and professional coaching.',
                  location: 'San Francisco, CA',
                  coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
                  rating: 4.8,
                  reviewCount: 127,
                  verified: true,
                }}
                onClick={() => console.log('View business')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Verified Badge Sizes">
            <div className="flex flex-wrap items-center gap-4">
              <VerifiedBadge size="sm" />
              <VerifiedBadge size="md" />
              <VerifiedBadge size="lg" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Category Badges">
            <div className="flex flex-wrap gap-3">
              <BusinessCategoryBadge category="Wellness" />
              <BusinessCategoryBadge category="Coaching" />
              <BusinessCategoryBadge category="Meditation" />
              <BusinessCategoryBadge category="Yoga" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'business-services':
      return (
        <div className="space-y-16">
          <SectionHeader title="Services & Listings" subtitle="Service offerings, pricing, and listing cards." />
          <ComponentDemo title="Service Listing Cards">
            <div className="w-full grid md:grid-cols-2 gap-6">
              <ServiceListingCard
                listing={{
                  id: '1',
                  title: 'Meditation Sessions',
                  price: '$45',
                  duration: '60 min',
                  category: 'Meditation',
                  description: 'Guided meditation sessions tailored to your experience level.',
                  image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
                }}
                onClick={() => console.log('View service')}
              />
              <ServiceListingCard
                listing={{
                  id: '2',
                  title: 'Personal Coaching',
                  price: '$120',
                  duration: '90 min',
                  category: 'Coaching',
                  description: 'One-on-one coaching for personal growth and transformation.',
                  image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400',
                }}
                onClick={() => console.log('View service')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Price Tags">
            <div className="flex flex-wrap items-center gap-8">
              <PriceTag price="$45" period="session" size="sm" />
              <PriceTag price="$120" period="hour" size="md" />
              <PriceTag price="$999" period="month" size="lg" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Business Stats">
            <div className="w-full">
              <BusinessStats rating={4.8} reviews={127} services={12} clients={450} />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'business-reviews':
      return (
        <div className="space-y-16">
          <SectionHeader title="Reviews & Ratings" subtitle="Customer reviews, testimonials, and rating displays." />
          <ComponentDemo title="Review Cards">
            <div className="w-full space-y-4">
              <ReviewCard
                review={{
                  id: '1',
                  author: 'Sarah Johnson',
                  avatar: 'https://i.pravatar.cc/150?u=sarah',
                  rating: 5,
                  comment: 'Life-changing experience. The meditation sessions have brought me so much peace and clarity.',
                  date: '2 weeks ago',
                }}
              />
              <ReviewCard
                review={{
                  id: '2',
                  author: 'Mike Chen',
                  avatar: 'https://i.pravatar.cc/150?u=mike',
                  rating: 5,
                  comment: 'Incredible coaching! Helped me find direction and purpose. Highly recommend to anyone on a growth journey.',
                  date: '1 month ago',
                }}
              />
              <ReviewCard
                review={{
                  id: '3',
                  author: 'Emma Davis',
                  rating: 4,
                  comment: 'Great yoga classes with experienced instructors. The studio has a wonderful calming atmosphere.',
                  date: '3 weeks ago',
                }}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Contact Information Card">
            <div className="w-full">
              <BusinessContactInfo
                contact={{
                  email: 'hello@mindfulwellness.com',
                  phone: '+1 (555) 123-4567',
                  website: 'mindfulwellness.com',
                  location: '123 Wellness Ave, San Francisco, CA 94102',
                }}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'notifications-items':
      return (
        <div className="space-y-16">
          <SectionHeader title="Notification Items" subtitle="Individual notification displays with read/unread states and actions." />
          <ComponentDemo title="Unread Connection Request">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '1',
                  type: 'connection',
                  title: 'New Connection Request',
                  message: 'Emma Wilson wants to connect with you',
                  timestamp: '5m ago',
                  read: false,
                  avatar: 'https://i.pravatar.cc/150?u=emma',
                  actionable: true,
                }}
                onAccept={() => console.log('Accept')}
                onDecline={() => console.log('Decline')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Unread Message Notification">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '2',
                  type: 'message',
                  title: 'New Message',
                  message: 'Alex Chen sent you a message: "Hey! Would you like to grab coffee?"',
                  timestamp: '1h ago',
                  read: false,
                  avatar: 'https://i.pravatar.cc/150?u=alex',
                }}
                onClick={() => console.log('Open message')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Read Notification">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '3',
                  type: 'like',
                  title: 'Someone liked your post',
                  message: 'Maya Patel and 5 others liked your recent post about mindfulness.',
                  timestamp: '3h ago',
                  read: true,
                  avatar: 'https://i.pravatar.cc/150?u=maya',
                }}
                onClick={() => console.log('View post')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'notifications-types':
      return (
        <div className="space-y-16">
          <SectionHeader title="Notification Types" subtitle="Different notification types with unique icons and colors." />
          <ComponentDemo title="Practice Reminder">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '4',
                  type: 'practice',
                  title: 'Practice Reminder',
                  message: 'Time for your morning meditation session',
                  timestamp: '2m ago',
                  read: false,
                }}
                onClick={() => console.log('Start practice')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Like Notification">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '5',
                  type: 'like',
                  title: 'New Like',
                  message: 'Jordan Lee liked your comment on "Daily Meditation Practices"',
                  timestamp: '4h ago',
                  read: false,
                  avatar: 'https://i.pravatar.cc/150?u=jordan',
                }}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="System Notification">
            <div className="w-full">
              <NotificationItem
                notification={{
                  id: '6',
                  type: 'system',
                  title: 'Welcome to VIBEUP!',
                  message: 'Complete your profile to unlock all features and start connecting.',
                  timestamp: '1d ago',
                  read: true,
                }}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'notifications-controls':
      return (
        <div className="space-y-16">
          <SectionHeader title="Controls & Filters" subtitle="Category filters, unread indicators, and notification controls." />
          <ComponentDemo title="Notification Category Tabs">
            <div className="w-full">
              <NotificationCategoryTabs
                categories={[
                  { id: 'all', label: 'All', count: 12 },
                  { id: 'connections', label: 'Connections', count: 3 },
                  { id: 'messages', label: 'Messages', count: 5 },
                  { id: 'activity', label: 'Activity', count: 4 },
                ]}
                activeCategory="all"
                onCategoryChange={(id) => console.log('Category:', id)}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Unread Indicator">
            <div className="flex flex-wrap gap-4">
              <UnreadIndicator count={1} />
              <UnreadIndicator count={5} />
              <UnreadIndicator count={12} />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Mark All Read Button">
            <MarkAllReadButton unreadCount={8} onClick={() => console.log('Mark all read')} />
          </ComponentDemo>
          <ComponentDemo title="Empty State - All Caught Up">
            <div className="w-full">
              <NotificationEmptyState type="all" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Empty State - Filtered">
            <div className="w-full">
              <NotificationEmptyState type="filtered" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'impact-dashboard':
      return (
        <div className="space-y-16">
          <SectionHeader title="Full Impact Dashboard" subtitle="Complete impact page with stats, tabs, and voting cards." />
          <div className="w-full max-w-4xl mx-auto bg-abyss-depths/30 rounded-3xl border-2 border-white/10 overflow-hidden">
            <ImpactDashboard />
          </div>
        </div>
      );

    case 'impact-stats':
      return (
        <div className="space-y-16">
          <SectionHeader title="Impact Statistics" subtitle="User impact metrics and contribution tracking." />
          <ComponentDemo title="Impact Stats Bar">
            <div className="w-full">
              <ImpactStatsBar
                votesCast={15}
                featuresInfluenced={3}
                initiativesInfluenced={5}
                impactScore={247}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Individual Stat Cards">
            <div className="grid md:grid-cols-2 gap-6">
              <ImpactStatCard label="Votes Cast" value={15} icon={<ImpactIcons.Vote />} onClick={() => console.log('View votes')} />
              <ImpactStatCard label="Impact Score" value={247} icon={<ImpactIcons.Sparkles />} color="#fbbf24" />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Status Badges">
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="active" />
              <StatusBadge status="planned" />
              <StatusBadge status="in_development" />
              <StatusBadge status="launched" />
            </div>
          </ComponentDemo>
        </div>
      );

    case 'impact-voting':
      return (
        <div className="space-y-16">
          <SectionHeader title="Voting Cards" subtitle="Feature requests and initiatives with voting functionality." />
          <ComponentDemo title="Feature Request - Voted">
            <div className="w-full max-w-md mx-auto">
              <VotingCard
                item={{
                  id: '1',
                  title: 'Dark Mode Support',
                  description: 'Add comprehensive dark mode theming across the entire platform for better nighttime usage and eye comfort.',
                  category: 'feature',
                  status: 'in_development',
                  voteCount: 247,
                  commentCount: 32,
                  viewCount: 1420,
                  userHasVoted: true,
                  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
                }}
                onVote={() => console.log('Toggle vote')}
                onClick={() => console.log('View details')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Feature Request - Not Voted">
            <div className="w-full max-w-md mx-auto">
              <VotingCard
                item={{
                  id: '2',
                  title: 'Voice Journaling',
                  description: 'Record voice notes for journal entries instead of typing, with automatic transcription.',
                  category: 'feature',
                  status: 'planned',
                  voteCount: 189,
                  commentCount: 18,
                  viewCount: 876,
                  userHasVoted: false,
                  image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
                }}
                onVote={() => console.log('Vote')}
                onClick={() => console.log('View details')}
              />
            </div>
          </ComponentDemo>
          <ComponentDemo title="Social Initiative">
            <div className="w-full max-w-md mx-auto">
              <VotingCard
                item={{
                  id: '3',
                  title: 'Mental Health Awareness',
                  description: 'Partner with mental health organizations to raise awareness and provide resources to our community.',
                  category: 'initiative',
                  status: 'active',
                  voteCount: 542,
                  commentCount: 67,
                  viewCount: 2341,
                  userHasVoted: true,
                  image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400',
                }}
                onVote={() => console.log('Toggle vote')}
                onClick={() => console.log('View details')}
              />
            </div>
          </ComponentDemo>
        </div>
      );

    // ═══════════════════════════════════════════════════════════════════════════
    // SPEC DOCUMENTATION SECTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    // Epics
    case 'spec-epic-00':
      return <SpecDocumentView title="Epic 00: Foundation" filePath="epics/epic-00-foundation.md" description="Infrastructure, database, testing, and observability setup" />;
    case 'spec-epic-01':
      return <SpecDocumentView title="Epic 01: Mira" filePath="epics/epic-01-mira.md" description="AI companion, onboarding, and account creation" />;
    case 'spec-epic-1a':
      return <SpecDocumentView title="Epic 1A: Crypto" filePath="epics/epic-1a-crypto.md" description="$VIBES token, wallets, rewards, and Web3 integration" />;
    case 'spec-epic-1b':
      return <SpecDocumentView title="Epic 1B: Karma" filePath="epics/epic-1b-karma.md" description="Karma points, spiritual currency, and reputation system" />;
    case 'spec-epic-02':
      return <SpecDocumentView title="Epic 02: Humans" filePath="epics/epic-02-humans.md" description="Human profiles, chemistry, and connections" />;
    case 'spec-epic-03':
      return <SpecDocumentView title="Epic 03: Practices" filePath="epics/epic-03-practices.md" description="Practice tracking, streaks, and accountability" />;
    case 'spec-epic-04':
      return <SpecDocumentView title="Epic 04: Discovery" filePath="epics/epic-04-discovery.md" description="Social discovery, search, and messaging" />;
    case 'spec-epic-05':
      return <SpecDocumentView title="Epic 05: Impact" filePath="epics/epic-05-impact.md" description="Voting, feedback, and co-creation" />;
    case 'spec-epic-06':
      return <SpecDocumentView title="Epic 06: Business" filePath="epics/epic-06-business.md" description="Business profiles, verification, and services" />;
    case 'spec-epic-07':
      return <SpecDocumentView title="Epic 07: Community" filePath="epics/epic-07-community.md" description="Community constellations and posts" />;
    case 'spec-epic-08':
      return <SpecDocumentView title="Epic 08: Monetization" filePath="epics/epic-08-monetization.md" description="Memberships, Stripe, and affiliates" />;

    // Architecture
    case 'spec-data-models':
      return <SpecDocumentView title="Data Models" filePath="architecture/data-models.md" description="Complete PostgreSQL schema with 43 tables and RLS policies" />;
    case 'spec-api-reference':
      return <SpecDocumentView title="API Reference" filePath="architecture/api-reference.md" description="Complete API endpoint catalog with 60+ endpoints" />;
    case 'spec-service-layer':
      return <SpecDocumentView title="Service Layer" filePath="architecture/service-layer.md" description="Business logic patterns and service classes" />;
    case 'spec-ai-model-router':
      return <SpecDocumentView title="AI Model Router" filePath="architecture/ai-model-router.md" description="Multi-provider AI system configuration" />;
    case 'spec-ai-coding-config':
      return <SpecDocumentView title="AI Coding Config Architecture" filePath="architecture/ai-coding-config-architecture.md" description="AI development infrastructure" />;
    case 'spec-deployment':
      return <SpecDocumentView title="Deployment Infrastructure" filePath="architecture/deployment-infrastructure.md" description="Vercel, Cloudflare, and Supabase configuration" />;
    case 'spec-vibe-tokenomics':
      return <SpecDocumentView title="$VIBES Tokenomics" filePath="architecture/vibe-tokenomics.md" description="Token economics, distribution, and utility design" />;
    case 'spec-crypto-router':
      return <SpecDocumentView title="Crypto Router" filePath="architecture/crypto-router.md" description="Multi-chain wallet and transaction routing" />;
    case 'spec-karma-layer':
      return <SpecDocumentView title="Karma Layer" filePath="architecture/karma-layer.md" description="Spiritual currency and reputation system" />;
    case 'spec-adr-crypto-safety':
      return <SpecDocumentView title="ADR: Mira Crypto Safety" filePath="architecture/adr-001-mira-crypto-safety.md" description="Architecture decision record for AI crypto safety" />;

    // Operations
    case 'spec-admin-panel':
      return <SpecDocumentView title="Admin Panel Spec" filePath="operations/admin-panel-spec.md" description="Full system control interface" />;
    case 'spec-feature-flags':
      return <SpecDocumentView title="Feature Flags" filePath="operations/feature-flags.md" description="Complete feature flag catalog with 60+ flags" />;
    case 'spec-observability':
      return <SpecDocumentView title="Observability Spec" filePath="operations/observability-spec.md" description="Sentry configuration and logging standards" />;
    case 'spec-testing':
      return <SpecDocumentView title="Testing Strategy" filePath="operations/testing-strategy.md" description="TDD workflow and test organization" />;
    case 'spec-env-vars':
      return <SpecDocumentView title="Environment Variables" filePath="operations/environment-variables-reference.md" description="All environment variables needed" />;

    // Brand
    case 'spec-visual-identity':
      return <SpecDocumentView title="Visual Identity" filePath="brand/01-visual-identity.md" description="Colors, typography, and spacing" />;
    case 'spec-brand-deck':
      return <SpecDocumentView title="Brand Deck" filePath="brand/02-brand-deck.md" description="Brand presentation and overview" />;
    case 'spec-voice-messaging':
      return <SpecDocumentView title="Voice & Messaging" filePath="brand/03-brand-voice-messaging.md" description="Tone, messaging, and copy guidelines" />;
    case 'spec-mira-personality':
      return <SpecDocumentView title="Mira Personality Guide" filePath="brand/04-mira-personality-guide.md" description="Complete Mira personality specification" />;
    case 'spec-product-vision':
      return <SpecDocumentView title="Product Vision" filePath="brand/05-product-vision.md" description="Product direction and goals" />;
    case 'spec-ux-wireframes':
      return <SpecDocumentView title="UX Wireframe Blueprint" filePath="brand/06-ux-wireframe-blueprint.md" description="Wireframe patterns and UX flows" />;
    case 'spec-brand-integration':
      return <SpecDocumentView title="Brand Integration" filePath="brand/brand-identity-integration.md" description="How brand informs all product development" />;
    case 'spec-conscious-dev':
      return <SpecDocumentView title="Conscious Development Manifesto" filePath="brand/conscious-development-manifesto.md" description="Development philosophy and practices" />;

    // Design Specs
    case 'spec-ui-components':
      return <SpecDocumentView title="UI Component Library" filePath="design/ui-component-library.md" description="Complete component catalog" />;
    case 'spec-user-journeys':
      return <SpecDocumentView title="User Journey Maps" filePath="design/user-journey-maps.md" description="Complete user flows with diagrams" />;
    case 'spec-guidelines':
      return <SpecDocumentView title="Design Guidelines" filePath="design/GUIDELINES.md" description="AI-optimized design patterns" />;
    case 'spec-codex':
      return <SpecDocumentView title="Codex Usage" filePath="design/CODEX_USAGE.md" description="How to use the design codex" />;
    case 'spec-templates':
      return <SpecDocumentView title="Design Templates" filePath="design/templates/README.md" description="Component and page templates" />;
    case 'spec-tools':
      return <SpecDocumentView title="Design Tools" filePath="design/tools/README.md" description="Design consistency tools" />;

    // Development
    case 'spec-rules':
      return <SpecDocumentView title="Coding Rules" filePath="development/rules/README.md" description="Coding standards and conventions" />;
    case 'spec-commands':
      return <SpecDocumentView title="Commands Reference" filePath="development/README.md" description="Workflow automation commands" />;
    case 'spec-agents':
      return <SpecDocumentView title="AI Agents" filePath="development/AGENTS.md" description="Specialized AI agent personas" />;
    case 'spec-plugins':
      return <SpecDocumentView title="Plugins Directory" filePath="development/plugins/README.md" description="Plugin bundles for different tools" />;
    case 'spec-skills':
      return <SpecDocumentView title="Skills Directory" filePath="development/skills/CLAUDE.md" description="Reusable AI skills" />;
    case 'spec-dev-templates':
      return <SpecDocumentView title="Development Templates" filePath="development/templates/README.md" description="Code and documentation templates" />;
    case 'spec-impl-plan':
      return <SpecDocumentView title="Implementation Plan" filePath="development/implementation-plan.md" description="Development roadmap and planning" />;

    default:
      return (
        <div className="py-48 text-center flex flex-col items-center">
          <SacredLoading />
        </div>
      );
  }
};
