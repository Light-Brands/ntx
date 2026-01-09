
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';

// ============================================================================
// ICONS - Inline SVG icons (exported for Showcase)
// ============================================================================

export const Icons = {
  MapPin: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
  Share: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  MoreVertical: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

// ============================================================================
// 1. PROFILE STATS - Display user statistics
// ============================================================================

interface ProfileStatsProps {
  connections: number;
  views: number;
  completion?: number;
  className?: string;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  connections,
  views,
  completion,
  className = ''
}) => (
  <div className={`flex items-center gap-6 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 ${className}`}>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-aqua-light/10 flex items-center justify-center text-aqua-light">
        <Icons.Users />
      </div>
      <div>
        <p className="text-lg font-black text-white">{connections.toLocaleString()}</p>
        <p className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Connections</p>
      </div>
    </div>
    <div className="h-12 w-px bg-white/10" />
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-teal-light/10 flex items-center justify-center text-teal-light">
        <Icons.Eye />
      </div>
      <div>
        <p className="text-lg font-black text-white">{views.toLocaleString()}</p>
        <p className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Views</p>
      </div>
    </div>
    {completion !== undefined && (
      <>
        <div className="h-12 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-accent/10 flex items-center justify-center">
            <span className="text-sm font-black text-gold-accent">{completion}%</span>
          </div>
          <div>
            <p className="text-lg font-black text-aqua-light">Profile</p>
            <p className="text-[10px] text-muted/60 uppercase tracking-wider font-bold">Complete</p>
          </div>
        </div>
      </>
    )}
  </div>
);

// ============================================================================
// 2. LOCATION BADGE - Display location with icon
// ============================================================================

interface LocationBadgeProps {
  location: string;
  className?: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({ location, className = '' }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 ${className}`}>
    <div className="text-teal-light">
      <Icons.MapPin />
    </div>
    <span className="text-sm font-medium text-pearl">{location}</span>
  </div>
);

// ============================================================================
// 3. ATTRIBUTE PILL - Tag for values, interests, skills
// ============================================================================

interface AttributePillProps {
  label: string;
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export const AttributePill: React.FC<AttributePillProps> = ({
  label,
  color = '#97D9C4',
  removable = false,
  onRemove,
  onClick,
  className = ''
}) => (
  <div
    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wide
               border-2 transition-all duration-300 shadow-sm
               ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''} ${className}`}
    style={{
      backgroundColor: `${color}20`,
      borderColor: color,
      color: color,
      boxShadow: `0 0 15px ${color}20`
    }}
    onClick={onClick}
  >
    <span>{label}</span>
    {removable && onRemove && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-1 hover:opacity-70 transition-opacity"
      >
        <Icons.X />
      </button>
    )}
  </div>
);

// ============================================================================
// 4. CONNECTION BUTTONS - Action buttons for profiles
// ============================================================================

interface ConnectionButtonsProps {
  status?: 'none' | 'pending' | 'connected' | 'mutual';
  isOwnProfile?: boolean;
  onConnect?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
  className?: string;
}

export const ConnectionButtons: React.FC<ConnectionButtonsProps> = ({
  status = 'none',
  isOwnProfile = false,
  onConnect,
  onMessage,
  onShare,
  className = ''
}) => {
  if (isOwnProfile) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Button variant="secondary" className="flex-1">
          Edit Profile
        </Button>
        <button
          onClick={onShare}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white
                   hover:bg-white/10 transition-all duration-300"
        >
          <Icons.Share />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {status === 'connected' || status === 'mutual' ? (
        <Button variant="ghost" className="flex-1 flex items-center gap-2" onClick={onConnect}>
          <Icons.Check />
          <span>Connected</span>
        </Button>
      ) : status === 'pending' ? (
        <Button variant="ghost" className="flex-1" disabled>
          Pending...
        </Button>
      ) : (
        <Button variant="primary" className="flex-1 flex items-center gap-2" onClick={onConnect}>
          <Icons.UserPlus />
          <span>Connect</span>
        </Button>
      )}
      <Button variant="secondary" className="flex items-center gap-2" onClick={onMessage}>
        <Icons.MessageCircle />
        <span>Message</span>
      </Button>
      <button
        onClick={onShare}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-teal-light
                 hover:bg-white/10 hover:text-aqua-light transition-all duration-300"
      >
        <Icons.Share />
      </button>
    </div>
  );
};

// ============================================================================
// 5. PROFILE TABS - Navigation tabs for profile sections
// ============================================================================

interface ProfileTabsProps {
  tabs: { id: string; label: string; badge?: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => (
  <div className={`bg-white/[0.02] border border-white/5 rounded-2xl p-2 ${className}`}>
    <div className="flex items-center gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest whitespace-nowrap
                     rounded-xl transition-all duration-300 relative
                     ${activeTab === tab.id
                       ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/20'
                       : 'text-muted hover:text-white hover:bg-white/5'
                     }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                activeTab === tab.id
                  ? 'bg-abyss-base/30 text-abyss-base'
                  : 'bg-gold-accent/20 text-gold-accent'
              }`}>
                {tab.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 6. BIO SECTION - Editable bio display
// ============================================================================

interface BioSectionProps {
  bio: string;
  editable?: boolean;
  onEdit?: (newBio: string) => void;
  className?: string;
}

export const BioSection: React.FC<BioSectionProps> = ({
  bio,
  editable = false,
  onEdit,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  const handleSave = () => {
    onEdit?.(editedBio);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`space-y-3 animate-in fade-in duration-300 ${className}`}>
        <textarea
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-aqua-light/30 text-white
                   focus:outline-none focus:border-aqua-light focus:bg-white/10 resize-none
                   placeholder-white/30 transition-all duration-300"
          rows={4}
          placeholder="Tell people about yourself..."
          autoFocus
        />
        <div className="flex items-center gap-2">
          <Button variant="primary" onClick={handleSave} className="flex items-center gap-2">
            <Icons.Check />
            <span>Save</span>
          </Button>
          <Button variant="ghost" onClick={() => {
            setEditedBio(bio);
            setIsEditing(false);
          }} className="flex items-center gap-2">
            <Icons.X />
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative p-4 rounded-xl bg-white/[0.02] border border-white/5
                    hover:border-white/10 transition-all duration-300 ${className}`}>
      <p className="text-base text-pearl/90 leading-relaxed">{bio || 'No bio yet.'}</p>
      {editable && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity
                   px-3 py-1.5 rounded-lg bg-aqua-light/10 border border-aqua-light/30
                   text-xs text-aqua-light font-bold uppercase tracking-wide
                   hover:bg-aqua-light/20"
        >
          Edit
        </button>
      )}
    </div>
  );
};

// ============================================================================
// 7. PROFILE COMPLETION BAR - Progress indicator
// ============================================================================

interface ProfileCompletionBarProps {
  percentage: number;
  showLabel?: boolean;
  className?: string;
}

export const ProfileCompletionBar: React.FC<ProfileCompletionBarProps> = ({
  percentage,
  showLabel = true,
  className = ''
}) => (
  <div className={`p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 ${className}`}>
    {showLabel && (
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-white uppercase tracking-widest">Profile Completion</span>
        <span className="text-lg font-black text-aqua-light">{percentage}%</span>
      </div>
    )}
    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div
        className="h-full bg-gradient-to-r from-aqua-light via-teal-light to-gold-accent
                   transition-all duration-700 shadow-[0_0_15px_rgba(151,217,196,0.3)]"
        style={{ width: `${percentage}%` }}
      />
    </div>
    {percentage < 100 && (
      <p className="text-xs text-muted/60">Complete your profile to unlock all features</p>
    )}
  </div>
);

// ============================================================================
// 8. PHOTO UPLOAD AREA - Avatar/cover photo upload
// ============================================================================

interface PhotoUploadAreaProps {
  type: 'avatar' | 'cover';
  currentPhoto?: string;
  onUpload?: (file: File) => void;
  className?: string;
}

export const PhotoUploadArea: React.FC<PhotoUploadAreaProps> = ({
  type,
  currentPhoto,
  onUpload,
  className = ''
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload?.(file);
  };

  if (type === 'avatar') {
    return (
      <div className={`relative group ${className}`}>
        <div className="relative">
          <Avatar size="xl" src={currentPhoto} />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-aqua-light
                       flex items-center justify-center border-4 border-abyss-base
                       shadow-lg shadow-aqua-light/20 cursor-pointer hover:scale-110 transition-transform"
               onClick={() => fileInputRef.current?.click()}>
            <Icons.Camera />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div
        className="h-56 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-teal-light/20 to-abyss-base
                   bg-cover bg-center overflow-hidden transition-all duration-300 group-hover:border-aqua-light/30 relative"
        style={currentPhoto ? { backgroundImage: `url(${currentPhoto})` } : {}}
      >
        {!currentPhoto && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted flex flex-col items-center justify-center">
              <Icons.Camera />
              <p className="text-xs font-medium mt-2 opacity-50">No cover photo</p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-abyss-base/90 backdrop-blur-sm
                 border border-aqua-light/30 text-aqua-light font-bold text-xs uppercase
                 opacity-0 group-hover:opacity-100 transition-all duration-300
                 hover:bg-aqua-light/10 flex items-center gap-2 shadow-lg"
      >
        <Icons.Camera />
        <span>Upload Cover</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

// ============================================================================
// 9. PROFILE GALLERY - Photo grid display
// ============================================================================

interface ProfileGalleryProps {
  photos: string[];
  onPhotoClick?: (index: number) => void;
  editable?: boolean;
  onAddPhoto?: () => void;
  className?: string;
}

export const ProfileGallery: React.FC<ProfileGalleryProps> = ({
  photos,
  onPhotoClick,
  editable = false,
  onAddPhoto,
  className = ''
}) => (
  <div className={`grid grid-cols-3 gap-3 ${className}`}>
    {photos.map((photo, index) => (
      <div
        key={index}
        onClick={() => onPhotoClick?.(index)}
        className="aspect-square rounded-2xl bg-cover bg-center cursor-pointer overflow-hidden
                 border-2 border-white/5 hover:border-aqua-light/50
                 hover:scale-105 transition-all duration-300 group relative
                 shadow-lg hover:shadow-2xl hover:shadow-aqua-light/10"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>
    ))}
    {editable && (
      <button
        onClick={onAddPhoto}
        className="aspect-square rounded-2xl bg-white/[0.02] border-2 border-dashed border-white/20
                 hover:border-aqua-light hover:bg-aqua-light/5 transition-all duration-300
                 flex flex-col items-center justify-center gap-3 group"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10
                     flex items-center justify-center text-muted group-hover:text-aqua-light
                     group-hover:bg-aqua-light/10 group-hover:border-aqua-light transition-all">
          <Icons.Camera />
        </div>
        <p className="text-[10px] font-bold uppercase text-muted group-hover:text-aqua-light tracking-wider">
          Add Photo
        </p>
      </button>
    )}
  </div>
);

// ============================================================================
// 10. PRIVACY CONTROL - Privacy setting toggle
// ============================================================================

interface PrivacyControlProps {
  value: 'public' | 'friends' | 'private';
  onChange: (value: 'public' | 'friends' | 'private') => void;
  label?: string;
  className?: string;
}

export const PrivacyControl: React.FC<PrivacyControlProps> = ({
  value,
  onChange,
  label = 'Who can see this?',
  className = ''
}) => (
  <div className={`p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-4 ${className}`}>
    <label className="text-xs font-black text-white uppercase tracking-widest">{label}</label>
    <div className="grid grid-cols-3 gap-3">
      {[
        { value: 'public' as const, label: 'Public', icon: <Icons.Globe />, desc: 'Everyone' },
        { value: 'friends' as const, label: 'Friends', icon: <Icons.Users />, desc: 'Connections' },
        { value: 'private' as const, label: 'Private', icon: <Icons.Lock />, desc: 'Only Me' },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-4 rounded-xl border-2 transition-all duration-300
                     flex flex-col items-center gap-2 hover:scale-105
                     ${value === option.value
                       ? 'bg-aqua-light/10 border-aqua-light text-aqua-light shadow-lg shadow-aqua-light/20'
                       : 'bg-white/5 border-white/10 text-muted hover:border-white/30 hover:bg-white/10'
                     }`}
        >
          <div className="text-current">{option.icon}</div>
          <div className="text-center">
            <span className="text-xs font-black uppercase block">{option.label}</span>
            <span className="text-[9px] opacity-60 block mt-0.5">{option.desc}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// 11. PROFILE CARD - Compact user preview card
// ============================================================================

interface ProfileCardProps {
  user: {
    name: string;
    avatar?: string;
    location?: string;
    bio?: string;
    mutual?: number;
  };
  onConnect?: () => void;
  onView?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onConnect,
  onView,
  className = ''
}) => (
  <Card className={`p-6 hover:border-aqua-light/30 hover:shadow-2xl hover:shadow-aqua-light/5
                   transition-all duration-300 group ${className}`}>
    <div className="flex items-start gap-5">
      <div className="relative">
        <Avatar size="lg" src={user.avatar} />
        {user.mutual && user.mutual > 0 && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-aqua-light
                       border-2 border-abyss-base flex items-center justify-center">
            <Icons.Check />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-black font-heading text-white truncate group-hover:text-aqua-light transition-colors">
          {user.name}
        </h3>
        {user.location && (
          <div className="flex items-center gap-1.5 text-muted text-xs mt-1.5">
            <Icons.MapPin />
            <span className="font-medium">{user.location}</span>
          </div>
        )}
        {user.bio && (
          <p className="text-sm text-pearl/80 mt-3 line-clamp-2 leading-relaxed">{user.bio}</p>
        )}
        {user.mutual && user.mutual > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-aqua-light/20 border-2 border-aqua-light" />
              <div className="w-6 h-6 rounded-full bg-teal-light/20 border-2 border-teal-light" />
            </div>
            <p className="text-xs text-aqua-light font-bold">{user.mutual} mutual</p>
          </div>
        )}
        <div className="flex items-center gap-2 mt-5">
          <Button variant="primary" className="flex-1" onClick={onConnect}>
            Connect
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onView}>
            View
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

// ============================================================================
// 12. CONNECTION STATUS BADGE - Show connection status
// ============================================================================

interface ConnectionStatusBadgeProps {
  status: 'mutual' | 'connected' | 'pending' | 'none';
  className?: string;
}

export const ConnectionStatusBadge: React.FC<ConnectionStatusBadgeProps> = ({
  status,
  className = ''
}) => {
  const configs = {
    mutual: { label: 'Mutual', color: '#97D9C4', bgColor: 'rgba(151, 217, 196, 0.15)', icon: <Icons.Check /> },
    connected: { label: 'Connected', color: '#0A4651', bgColor: 'rgba(10, 70, 81, 0.15)', icon: <Icons.Users /> },
    pending: { label: 'Pending', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.15)', icon: <Icons.Clock /> },
    none: { label: 'Not Connected', color: '#cbd5e1', bgColor: 'rgba(203, 213, 225, 0.1)', icon: null },
  };

  const config = configs[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2
                  transition-all duration-300 ${className}`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.color,
        color: config.color
      }}
    >
      {config.icon}
      <span className="text-xs font-black uppercase tracking-wide">
        {config.label}
      </span>
    </div>
  );
};

// Clock icon for pending status
Icons.Clock = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ============================================================================
// 13. PROFILE SECTION - Reusable section wrapper
// ============================================================================

interface ProfileSectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  subtitle,
  action,
  children,
  collapsible = false,
  defaultOpen = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight">{title}</h3>
            {collapsible && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                         text-muted hover:text-white hover:bg-white/10 transition-all"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>
          {subtitle && <p className="text-xs text-muted/70 mt-1.5 font-medium">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {isOpen && (
        <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 14. ATTRIBUTE CATEGORY - Group of attribute pills
// ============================================================================

interface AttributeCategoryProps {
  title: string;
  attributes: { id: string; label: string; color?: string }[];
  maxDisplay?: number;
  onAttributeClick?: (id: string) => void;
  className?: string;
}

export const AttributeCategory: React.FC<AttributeCategoryProps> = ({
  title,
  attributes,
  maxDisplay,
  onAttributeClick,
  className = ''
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayAttributes = showAll || !maxDisplay
    ? attributes
    : attributes.slice(0, maxDisplay);
  const hasMore = maxDisplay && attributes.length > maxDisplay;

  return (
    <div className={`p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-4 ${className}`}>
      <h4 className="text-xs font-black font-heading text-muted uppercase tracking-widest">{title}</h4>
      <div className="flex flex-wrap gap-2.5">
        {displayAttributes.map((attr) => (
          <AttributePill
            key={attr.id}
            label={attr.label}
            color={attr.color}
            onClick={onAttributeClick ? () => onAttributeClick(attr.id) : undefined}
          />
        ))}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wide
                     border-2 border-dashed border-aqua-light/30 text-aqua-light
                     hover:bg-aqua-light/10 hover:border-aqua-light transition-all duration-300"
          >
            +{attributes.length - maxDisplay} more
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 15. PROFILE ACTION MENU - More options dropdown
// ============================================================================

interface ProfileActionMenuProps {
  options: { id: string; label: string; icon?: React.ReactNode; danger?: boolean }[];
  onSelect: (id: string) => void;
  className?: string;
}

export const ProfileActionMenu: React.FC<ProfileActionMenuProps> = ({
  options,
  onSelect,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-muted
                 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
      >
        <Icons.MoreVertical />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-abyss-depths/95 backdrop-blur-xl
                       border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50
                       animate-in fade-in zoom-in-95 duration-200">
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-5 py-3.5 text-left text-sm font-bold flex items-center gap-3
                         transition-all duration-200
                         ${index > 0 ? 'border-t border-white/5' : ''}
                         ${option.danger
                           ? 'text-red-400 hover:bg-red-500/10'
                           : 'text-white hover:bg-white/5 hover:text-aqua-light'
                         }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

