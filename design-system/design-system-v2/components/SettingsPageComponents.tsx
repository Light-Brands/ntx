
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Toggle } from './Toggle';

// ============================================================================
// ICONS
// ============================================================================

export const SettingsIcons = {
  Bell: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ============================================================================
// 1. SETTINGS SECTION - Grouped settings section
// ============================================================================

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
  className = ''
}) => (
  <div className={`space-y-4 ${className}`}>
    <div className="px-2">
      <h3 className="text-sm font-black font-heading text-white uppercase tracking-widest">{title}</h3>
      {description && (
        <p className="text-xs font-body text-muted/70 mt-1">{description}</p>
      )}
    </div>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

// ============================================================================
// 2. SETTING ROW - Individual setting with toggle/action
// ============================================================================

interface SettingRowProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  value?: string;
  type?: 'toggle' | 'button' | 'select';
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  onClick?: () => void;
  className?: string;
}

export const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  description,
  value,
  type = 'button',
  enabled = false,
  onToggle,
  onClick,
  className = ''
}) => (
  <div
    className={`p-4 rounded-xl border border-white/10 bg-white/[0.02]
               hover:bg-white/5 hover:border-aqua-light/20 transition-all duration-300
               ${type === 'button' ? 'cursor-pointer' : ''} ${className}`}
    onClick={type === 'button' ? onClick : undefined}
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">{label}</p>
          {description && (
            <p className="text-xs text-muted/70 mt-0.5">{description}</p>
          )}
        </div>
      </div>

      {type === 'toggle' && (
        <Toggle enabled={enabled} onChange={onToggle} />
      )}
      {type === 'button' && value && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-medium">{value}</span>
          <SettingsIcons.ChevronRight />
        </div>
      )}
      {type === 'button' && !value && (
        <SettingsIcons.ChevronRight />
      )}
    </div>
  </div>
);

// ============================================================================
// 3. NOTIFICATION PREFERENCE - Notification setting item
// ============================================================================

interface NotificationPreferenceProps {
  title: string;
  description: string;
  email?: boolean;
  push?: boolean;
  onEmailToggle?: (enabled: boolean) => void;
  onPushToggle?: (enabled: boolean) => void;
  className?: string;
}

export const NotificationPreference: React.FC<NotificationPreferenceProps> = ({
  title,
  description,
  email = false,
  push = false,
  onEmailToggle,
  onPushToggle,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <div className="mb-4">
      <h4 className="text-base font-black text-white uppercase tracking-tight mb-1">{title}</h4>
      <p className="text-xs text-muted/70">{description}</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted text-xs">
          <SettingsIcons.Mail />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-white">Email</p>
        </div>
        <Toggle enabled={email} onChange={onEmailToggle} />
      </div>
      <div className="w-px h-10 bg-white/10" />
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted text-xs">
          <SettingsIcons.Bell />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-white">Push</p>
        </div>
        <Toggle enabled={push} onChange={onPushToggle} />
      </div>
    </div>
  </Card>
);

// ============================================================================
// 4. ACCOUNT INFO CARD - Display account information
// ============================================================================

interface AccountInfoCardProps {
  label: string;
  value: string;
  verified?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
  label,
  value,
  verified = false,
  onEdit,
  className = ''
}) => (
  <div className={`p-4 rounded-xl border border-white/10 bg-white/[0.02] ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-xs text-muted/60 uppercase tracking-wide mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-white">{value}</p>
          {verified && (
            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40
                         flex items-center justify-center text-green-400">
              <SettingsIcons.Check />
            </div>
          )}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  </div>
);

// ============================================================================
// 5. DANGER ZONE CARD - Destructive actions
// ============================================================================

interface DangerZoneCardProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  className?: string;
}

export const DangerZoneCard: React.FC<DangerZoneCardProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => (
  <Card className={`p-6 border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 ${className}`}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
        <SettingsIcons.Trash />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">
          {title}
        </h4>
        <p className="text-sm text-muted/80 leading-relaxed mb-5">
          {description}
        </p>
        <Button variant="danger" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  </Card>
);

// ============================================================================
// 6. SETTINGS TABS - Tab navigation for settings categories
// ============================================================================

interface SettingsTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => (
  <div className={`p-2 rounded-2xl bg-white/[0.02] border border-white/10 ${className}`}>
    <div className="grid grid-cols-5 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest
                     transition-all duration-300 flex flex-col items-center gap-2
                     ${activeTab === tab.id
                       ? 'bg-aqua-light text-abyss-base shadow-lg'
                       : 'text-muted hover:bg-white/5 hover:text-white'
                     }`}
        >
          {tab.icon}
          <span className="text-[10px]">{tab.label}</span>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 7. BLOCKED USER ITEM - Individual blocked user
// ============================================================================

interface BlockedUserItemProps {
  user: {
    name: string;
    avatar?: string;
    blockedDate?: string;
  };
  onUnblock?: () => void;
  className?: string;
}

export const BlockedUserItem: React.FC<BlockedUserItemProps> = ({
  user,
  onUnblock,
  className = ''
}) => (
  <div className={`p-4 rounded-xl border border-white/10 bg-white/[0.02]
                  flex items-center justify-between ${className}`}>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-white/5 border-2 border-white/10 overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <SettingsIcons.User />
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{user.name}</p>
        {user.blockedDate && (
          <p className="text-xs text-muted/60">Blocked {user.blockedDate}</p>
        )}
      </div>
    </div>
    <Button variant="ghost" size="sm" onClick={onUnblock}>
      Unblock
    </Button>
  </div>
);

// ============================================================================
// 8. DATA PRIVACY CARD - Data management options
// ============================================================================

interface DataPrivacyCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel: string;
  onAction?: () => void;
  processing?: boolean;
  className?: string;
}

export const DataPrivacyCard: React.FC<DataPrivacyCardProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  processing = false,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <div className="flex items-start gap-4">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-aqua-light/10 flex items-center justify-center text-aqua-light flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">
          {title}
        </h4>
        <p className="text-sm text-muted/70 leading-relaxed mb-4">
          {description}
        </p>
        <Button variant="secondary" size="sm" onClick={onAction} disabled={processing}>
          {processing ? 'Processing...' : actionLabel}
        </Button>
      </div>
    </div>
  </Card>
);

// ============================================================================
// 9. PREFERENCE SELECTOR - Select from options
// ============================================================================

interface PreferenceSelectorProps {
  label: string;
  options: { id: string; label: string; description?: string }[];
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  label,
  options,
  selected,
  onSelect,
  className = ''
}) => (
  <div className={`space-y-3 ${className}`}>
    <label className="text-xs font-black text-white uppercase tracking-widest">{label}</label>
    <div className="grid gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
                     ${selected === option.id
                       ? 'bg-aqua-light/10 border-aqua-light text-aqua-light shadow-lg'
                       : 'bg-white/[0.02] border-white/10 text-white hover:border-white/30 hover:bg-white/5'
                     }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase">{option.label}</p>
              {option.description && (
                <p className="text-xs text-muted/70 mt-0.5">{option.description}</p>
              )}
            </div>
            {selected === option.id && (
              <div className="w-6 h-6 rounded-full bg-aqua-light flex items-center justify-center text-abyss-base">
                <SettingsIcons.Check />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 10. LOGOUT BUTTON - Sign out action
// ============================================================================

interface LogoutButtonProps {
  onLogout?: () => void;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout,
  className = ''
}) => (
  <button
    onClick={onLogout}
    className={`w-full p-5 rounded-2xl border-2 border-white/10 bg-white/[0.02]
               hover:bg-white/5 hover:border-red-500/30 transition-all duration-300
               flex items-center justify-center gap-3 group ${className}`}
  >
    <div className="text-muted group-hover:text-red-400 transition-colors">
      <SettingsIcons.LogOut />
    </div>
    <span className="text-base font-black text-white group-hover:text-red-400 uppercase tracking-tight transition-colors">
      Sign Out
    </span>
  </button>
);

