
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Avatar } from './Avatar';
import { PhotoUploadArea, AttributeCategory, ProfileCompletionBar } from './ProfilePageComponents';

// ============================================================================
// ICONS
// ============================================================================

export const MyProfileIcons = {
  Edit: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
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
  Sparkles: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
};

// ============================================================================
// 1. EDIT MODE TOGGLE - Switch between view and edit modes
// ============================================================================

interface EditModeToggleProps {
  isEditing: boolean;
  onToggle: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  hasChanges?: boolean;
  className?: string;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditing,
  onToggle,
  onSave,
  onCancel,
  hasChanges = false,
  className = ''
}) => {
  if (isEditing) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <MyProfileIcons.X />
          <span>Cancel</span>
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={!hasChanges}
          className="flex items-center gap-2"
        >
          <MyProfileIcons.Save />
          <span>Save Changes</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={onToggle}
      className={`flex items-center gap-2 ${className}`}
    >
      <MyProfileIcons.Edit />
      <span>Edit Profile</span>
    </Button>
  );
};

// ============================================================================
// 2. PROFILE COMPLETION PROMPT - Encourage profile completion
// ============================================================================

interface ProfileCompletionPromptProps {
  percentage: number;
  missingItems?: string[];
  onComplete?: () => void;
  className?: string;
}

export const ProfileCompletionPrompt: React.FC<ProfileCompletionPromptProps> = ({
  percentage,
  missingItems = [],
  onComplete,
  className = ''
}) => {
  if (percentage >= 100) return null;

  return (
    <Card className={`p-6 border-2 border-gold-accent/30 bg-gradient-to-br from-gold-accent/10 to-gold-accent/5 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold-accent/20 flex items-center justify-center text-gold-accent flex-shrink-0">
          <MyProfileIcons.Sparkles />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight mb-2">
            Complete Your Profile
          </h3>
          <p className="text-sm text-muted/80 mb-4 leading-relaxed">
            You're {percentage}% there! Add a few more details to unlock all features.
          </p>

          <ProfileCompletionBar percentage={percentage} showLabel={false} className="mb-4" />

          {missingItems.length > 0 && (
            <div className="space-y-2 mb-4">
              {missingItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-accent/50" />
                  <span>Add {item}</span>
                </div>
              ))}
            </div>
          )}

          <Button variant="secondary" onClick={onComplete} className="w-full">
            Complete Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ============================================================================
// 3. QUICK EDIT SECTION - Inline editing section
// ============================================================================

interface QuickEditSectionProps {
  title: string;
  icon?: React.ReactNode;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const QuickEditSection: React.FC<QuickEditSectionProps> = ({
  title,
  icon,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
  children,
  className = ''
}) => (
  <Card className={`p-6 ${isEditing ? 'border-aqua-light/40 bg-aqua-light/5' : ''}
                   transition-all duration-300 ${className}`}>
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-aqua-light/10 flex items-center justify-center text-aqua-light">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight">{title}</h3>
      </div>

      {!isEditing ? (
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-aqua-light
                   hover:bg-aqua-light/10 hover:border-aqua-light/30 transition-all duration-300
                   flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
        >
          <MyProfileIcons.Edit />
          <span>Edit</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 rounded-lg text-muted hover:text-white hover:bg-white/5
                     transition-all duration-300"
          >
            <MyProfileIcons.X />
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-aqua-light text-abyss-base
                     hover:bg-aqua-light/90 transition-all duration-300
                     flex items-center gap-2 text-xs font-bold uppercase"
          >
            <MyProfileIcons.Check />
            <span>Save</span>
          </button>
        </div>
      )}
    </div>

    <div className={isEditing ? 'animate-in fade-in duration-300' : ''}>
      {children}
    </div>
  </Card>
);

// ============================================================================
// 4. BASIC INFO EDITOR - Edit name, bio, location
// ============================================================================

interface BasicInfoEditorProps {
  initialData?: {
    name?: string;
    bio?: string;
    location?: string;
  };
  onSave?: (data: { name: string; bio: string; location: string }) => void;
  className?: string;
}

export const BasicInfoEditor: React.FC<BasicInfoEditorProps> = ({
  initialData = {},
  onSave,
  className = ''
}) => {
  const [name, setName] = useState(initialData.name || '');
  const [bio, setBio] = useState(initialData.bio || '');
  const [location, setLocation] = useState(initialData.location || '');

  return (
    <div className={`space-y-5 ${className}`}>
      <Input
        label="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <div>
        <label className="text-xs font-bold text-white uppercase tracking-widest mb-2 block">
          Bio
        </label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell people about yourself..."
          className="min-h-[100px]"
        />
      </div>
      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="City, State"
      />
    </div>
  );
};

// ============================================================================
// 5. PROFILE PREVIEW CARD - Preview how your profile looks to others
// ============================================================================

interface ProfilePreviewCardProps {
  user: {
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    stats?: {
      connections: number;
      views: number;
    };
  };
  className?: string;
}

export const ProfilePreviewCard: React.FC<ProfilePreviewCardProps> = ({
  user,
  className = ''
}) => (
  <Card className={`overflow-hidden ${className}`}>
    {/* Cover Photo Area */}
    <div className="h-32 bg-gradient-to-br from-teal-light/20 to-abyss-base" />

    {/* Profile Content */}
    <div className="p-6 -mt-12">
      <div className="flex items-end gap-4 mb-4">
        <div className="relative">
          <Avatar size="xl" src={user.avatar} />
          <div className="absolute inset-0 rounded-full ring-4 ring-abyss-base" />
        </div>
        <div className="flex-1 pt-8">
          <h3 className="text-xl font-black font-heading text-white">{user.name}</h3>
          {user.location && (
            <p className="text-sm text-muted/70 mt-1">{user.location}</p>
          )}
        </div>
      </div>

      {user.bio && (
        <p className="text-sm text-pearl/80 leading-relaxed mb-4">{user.bio}</p>
      )}

      {user.stats && (
        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
          <div>
            <p className="text-lg font-black text-white">{user.stats.connections}</p>
            <p className="text-[10px] text-muted uppercase tracking-wider">Connections</p>
          </div>
          <div>
            <p className="text-lg font-black text-white">{user.stats.views}</p>
            <p className="text-[10px] text-muted uppercase tracking-wider">Views</p>
          </div>
        </div>
      )}
    </div>
  </Card>
);

// ============================================================================
// 6. SETTING ITEM - Individual setting row
// ============================================================================

interface SettingItemProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
  onClick?: () => void;
  showChevron?: boolean;
  className?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  value,
  description,
  onClick,
  showChevron = true,
  className = ''
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-xl border border-white/10 bg-white/[0.02]
               hover:bg-white/5 hover:border-aqua-light/30 transition-all duration-300
               flex items-center gap-4 text-left group ${className}`}
  >
    {icon && (
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted
                   group-hover:bg-aqua-light/10 group-hover:text-aqua-light transition-all">
        {icon}
      </div>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-bold text-white group-hover:text-aqua-light transition-colors">
          {label}
        </p>
        {value && (
          <span className="text-xs text-muted font-medium">{value}</span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted/70">{description}</p>
      )}
    </div>
    {showChevron && (
      <div className="text-muted group-hover:text-aqua-light transition-colors">
        <MyProfileIcons.ChevronRight />
      </div>
    )}
  </button>
);

// ============================================================================
// 7. PROFILE VISIBILITY TOGGLE - Public/Private profile toggle
// ============================================================================

interface ProfileVisibilityToggleProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
  className?: string;
}

export const ProfileVisibilityToggle: React.FC<ProfileVisibilityToggleProps> = ({
  isPublic,
  onChange,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${isPublic ? 'bg-aqua-light/10 text-aqua-light' : 'bg-white/5 text-muted'}`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-black font-heading text-white uppercase tracking-wide">
            {isPublic ? 'Public Profile' : 'Private Profile'}
          </p>
          <p className="text-xs text-muted/70 mt-0.5">
            {isPublic ? 'Visible to everyone' : 'Only visible to connections'}
          </p>
        </div>
      </div>

      <button
        onClick={() => onChange(!isPublic)}
        className={`relative w-14 h-8 rounded-full transition-all duration-300
                  ${isPublic ? 'bg-aqua-light' : 'bg-white/20'}`}
      >
        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg
                      transition-all duration-300 ${isPublic ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  </Card>
);

// ============================================================================
// 8. PHOTO UPLOAD SECTION - Manage avatar and cover photos
// ============================================================================

interface PhotoUploadSectionProps {
  avatarUrl?: string;
  coverUrl?: string;
  onAvatarUpload?: (file: File) => void;
  onCoverUpload?: (file: File) => void;
  className?: string;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  avatarUrl,
  coverUrl,
  onAvatarUpload,
  onCoverUpload,
  className = ''
}) => (
  <div className={`space-y-6 ${className}`}>
    <div>
      <h4 className="text-xs font-black font-heading text-white uppercase tracking-widest mb-4">
        Profile Photo
      </h4>
      <div className="flex items-center gap-6">
        <PhotoUploadArea
          type="avatar"
          currentPhoto={avatarUrl}
          onUpload={onAvatarUpload}
        />
        <div className="flex-1">
          <p className="text-sm text-muted/70 mb-3">
            Choose a photo that represents you. Square images work best.
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Upload Photo</Button>
            <Button variant="ghost" size="sm">Remove</Button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h4 className="text-xs font-black font-heading text-white uppercase tracking-widest mb-4">
        Cover Photo
      </h4>
      <PhotoUploadArea
        type="cover"
        currentPhoto={coverUrl}
        onUpload={onCoverUpload}
      />
    </div>
  </div>
);

// ============================================================================
// 9. ATTRIBUTE EDITOR - Edit values, interests, skills
// ============================================================================

interface AttributeEditorProps {
  title: string;
  attributes: { id: string; label: string; color?: string }[];
  availableAttributes?: { id: string; label: string; color?: string }[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  maxSelection?: number;
  className?: string;
}

export const AttributeEditor: React.FC<AttributeEditorProps> = ({
  title,
  attributes,
  availableAttributes = [],
  onAdd,
  onRemove,
  maxSelection,
  className = ''
}) => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black font-heading text-white uppercase tracking-widest">{title}</h4>
        {maxSelection && (
          <span className="text-xs text-muted/60">
            {attributes.length}/{maxSelection} selected
          </span>
        )}
      </div>

      {/* Current Attributes */}
      <div className="flex flex-wrap gap-2">
        {attributes.map((attr) => (
          <div
            key={attr.id}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
            style={{
              backgroundColor: `${attr.color || '#97D9C4'}15`,
              borderColor: `${attr.color || '#97D9C4'}40`,
              color: attr.color || '#97D9C4'
            }}
          >
            <span className="text-xs font-black uppercase tracking-wide">{attr.label}</span>
            <button
              onClick={() => onRemove?.(attr.id)}
              className="hover:opacity-70 transition-opacity"
            >
              <MyProfileIcons.X />
            </button>
          </div>
        ))}

        <button
          onClick={() => setShowSelector(!showSelector)}
          className="px-4 py-2 rounded-full border-2 border-dashed border-aqua-light/30
                   text-aqua-light hover:bg-aqua-light/10 transition-all duration-300
                   text-xs font-bold uppercase tracking-wide"
        >
          + Add
        </button>
      </div>

      {/* Attribute Selector */}
      {showSelector && availableAttributes.length > 0 && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-wrap gap-2">
            {availableAttributes
              .filter(avail => !attributes.find(attr => attr.id === avail.id))
              .map((attr) => (
                <button
                  key={attr.id}
                  onClick={() => {
                    onAdd?.(attr.id);
                    setShowSelector(false);
                  }}
                  className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5
                           hover:bg-aqua-light/10 hover:border-aqua-light/30 transition-all duration-300
                           text-xs font-medium text-white"
                >
                  {attr.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 10. MY PROFILE VIEW - Full profile as seen by owner
// ============================================================================

interface MyProfileViewProps {
  className?: string;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Cover + Avatar Section */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-teal-light/30 to-abyss-base rounded-t-3xl relative group">
          <button className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-abyss-base/80 backdrop-blur-sm
                           border border-white/20 text-xs text-white font-bold uppercase tracking-wide
                           opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
            <MyProfileIcons.Camera />
            <span>Edit Cover</span>
          </button>
        </div>
        <div className="px-5 -mt-12 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-3">
              <div className="relative">
                <Avatar size="lg" src="https://i.pravatar.cc/150?u=me" />
                <div className="absolute inset-0 rounded-full ring-4 ring-abyss-base" />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-aqua-light
                               border-3 border-abyss-base flex items-center justify-center text-abyss-base
                               hover:scale-110 transition-transform shadow-lg">
                  <MyProfileIcons.Camera />
                </button>
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-black font-heading text-white">Your Name</h2>
                <p className="text-xs text-muted">San Francisco, CA</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <MyProfileIcons.Edit />
              <span>Edit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Vibe Score + Completion */}
      <div className="mx-5 flex items-center gap-3">
        {/* Vibe Score - Subtle */}
        <div className="flex-1 p-3 rounded-xl bg-gradient-to-br from-aqua-light/10 to-teal-light/10 border border-aqua-light/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-aqua-light/20 flex items-center justify-center">
            <span className="text-base font-black text-aqua-light">8.7</span>
          </div>
          <div>
            <p className="text-sm font-bold text-aqua-light">Vibe Score</p>
            <p className="text-[10px] text-muted/70 uppercase tracking-wide">High Resonance</p>
          </div>
        </div>

        {/* Completion */}
        <div className="flex-1 p-3 rounded-xl bg-gradient-to-r from-gold-accent/10 to-gold-accent/5 border border-gold-accent/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-accent/20 flex items-center justify-center">
            <span className="text-base font-black text-gold-accent">75%</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Complete</p>
            <p className="text-[10px] text-muted/70 uppercase tracking-wide">3 more items</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <p className="text-xl font-black text-aqua-light">142</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Connections</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <p className="text-xl font-black font-heading text-white">894</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Views</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <p className="text-xl font-black text-gold-accent">75%</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Complete</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">About</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline">Edit</button>
        </div>
        <p className="text-sm text-pearl/80 leading-relaxed">
          Exploring consciousness through technology and human connection. Passionate about mindful living and authentic conversations.
        </p>
      </div>

      {/* Values */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Core Values</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Mindfulness', color: '#97D9C4' },
            { label: 'Growth', color: '#6BC7A8' },
            { label: 'Authenticity', color: '#97D9C4' },
            { label: 'Connection', color: '#fbbf24' },
          ].map((attr, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-wide"
              style={{
                backgroundColor: `${attr.color}15`,
                borderColor: `${attr.color}40`,
                color: attr.color
              }}
            >
              {attr.label}
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Interests</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Meditation', 'Technology', 'Art', 'Wellness', 'Philosophy'].map((interest, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-aqua-light/15 border border-aqua-light/30
                       text-aqua-light text-xs font-bold"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Skills</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Coaching', color: '#6BC7A8' },
            { label: 'Writing', color: '#fbbf24' },
            { label: 'Design', color: '#8b5cf6' },
          ].map((skill, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-wide"
              style={{
                backgroundColor: `${skill.color}15`,
                borderColor: `${skill.color}40`,
                color: skill.color
              }}
            >
              {skill.label}
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Photos</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline flex items-center gap-1">
            <MyProfileIcons.Camera />
            <span>Add</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1508673010502-1c34c68f8e7c?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
          ].map((url, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-cover bg-center border-2 border-white/10
                       hover:border-aqua-light/30 hover:scale-105 transition-all duration-300 cursor-pointer
                       group relative overflow-hidden"
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Chemistry & Assessments */}
      <div className="mx-5 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <MyProfileIcons.Sparkles />
            </div>
            <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Chemistry</h3>
          </div>
          <button className="text-xs text-purple-400 font-bold uppercase tracking-wide hover:underline">
            Take Assessment
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <span className="text-xs text-muted/80">Enneagram</span>
            <span className="text-xs font-bold text-purple-400">Type 4 - The Individualist</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <span className="text-xs text-muted/80">Myers-Briggs</span>
            <span className="text-xs font-bold text-purple-400">INFP</span>
          </div>
        </div>
      </div>

      {/* Lifestyle Preferences */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Lifestyle</h3>
          <button className="text-xs text-aqua-light font-bold uppercase tracking-wide hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Activity</p>
            <p className="text-white font-bold">Moderately Active</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Diet</p>
            <p className="text-white font-bold">Plant-Based</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Meditation</p>
            <p className="text-white font-bold">Daily Practice</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Sleep</p>
            <p className="text-white font-bold">7-8 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 11. PUBLIC PROFILE VIEW - Full profile as seen by others
// ============================================================================

interface PublicProfileViewProps {
  className?: string;
}

export const PublicProfileView: React.FC<PublicProfileViewProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-4 pb-6 ${className}`}>
      {/* Cover + Avatar Section */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-aqua-light/20 to-abyss-base rounded-t-3xl" />
        <div className="px-5 -mt-10">
          <div className="flex items-end gap-3">
            <div className="relative">
              <Avatar size="lg" src="https://i.pravatar.cc/150?u=other" />
              <div className="absolute inset-0 rounded-full ring-4 ring-abyss-base" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full
                           border-3 border-abyss-base shadow-lg shadow-green-500/50 animate-pulse" />
            </div>
            <div className="pb-1">
              <h2 className="text-lg font-black text-white">Lena River</h2>
              <p className="text-xs text-muted mt-0.5">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vibe Score + Match */}
      <div className="mx-5 flex items-center gap-3">
        {/* Vibe Score */}
        <div className="flex-1 p-3 rounded-xl bg-gradient-to-br from-aqua-light/10 to-teal-light/10 border border-aqua-light/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-aqua-light/20 flex items-center justify-center">
              <span className="text-sm font-black text-aqua-light">9.2</span>
            </div>
            <span className="text-xs font-bold text-aqua-light uppercase tracking-wide">Vibe</span>
          </div>
          <div className="text-aqua-light/40 animate-pulse"><MyProfileIcons.Sparkles /></div>
        </div>

        {/* Match Score */}
        <div className="flex-1 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-aqua-light/10 border border-green-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-green-400">92%</span>
            <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Match</span>
          </div>
          <p className="text-[10px] text-muted/70">12 mutual</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/10">
          <p className="text-lg font-black text-aqua-light">1,420</p>
          <p className="text-[9px] text-muted/60 uppercase tracking-wider">Connections</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/10">
          <p className="text-lg font-black text-white">8,943</p>
          <p className="text-[9px] text-muted/60 uppercase tracking-wider">Views</p>
        </div>
      </div>

      {/* Connection Buttons */}
      <div className="mx-5 flex items-center gap-3">
        <Button variant="primary" className="flex-1 flex items-center justify-center gap-2 py-3">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <span>Connect</span>
        </Button>
        <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 py-3">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Message</span>
        </Button>
      </div>

      {/* About */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">About</h3>
        <p className="text-sm text-pearl/80 leading-relaxed">
          Exploring consciousness through technology and human connection. Passionate about mindful living and authentic conversations.
        </p>
      </div>

      {/* Values */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">Core Values</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Mindfulness', color: '#97D9C4' },
            { label: 'Growth', color: '#6BC7A8' },
            { label: 'Authenticity', color: '#97D9C4' },
            { label: 'Connection', color: '#fbbf24' },
          ].map((attr, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-wide"
              style={{
                backgroundColor: `${attr.color}15`,
                borderColor: `${attr.color}40`,
                color: attr.color
              }}
            >
              {attr.label}
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {['Meditation', 'Technology', 'Art', 'Wellness', 'Philosophy'].map((interest, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-aqua-light/15 border border-aqua-light/30
                       text-aqua-light text-xs font-bold"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Coaching', color: '#6BC7A8' },
            { label: 'Writing', color: '#fbbf24' },
            { label: 'Design', color: '#8b5cf6' },
          ].map((skill, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-wide"
              style={{
                backgroundColor: `${skill.color}15`,
                borderColor: `${skill.color}40`,
                color: skill.color
              }}
            >
              {skill.label}
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">Photos</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1508673010502-1c34c68f8e7c?w=300&h=300&fit=crop',
          ].map((url, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-cover bg-center border-2 border-white/10
                       hover:border-aqua-light/30 hover:scale-105 transition-all duration-300 cursor-pointer
                       group relative overflow-hidden"
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Chemistry & Assessments */}
      <div className="mx-5 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
            <MyProfileIcons.Sparkles />
          </div>
          <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide">Chemistry</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <span className="text-xs text-muted/80">Enneagram</span>
            <span className="text-xs font-bold text-purple-400">Type 4</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <span className="text-xs text-muted/80">Myers-Briggs</span>
            <span className="text-xs font-bold text-purple-400">INFP</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <span className="text-xs text-muted/80">Zodiac</span>
            <span className="text-xs font-bold text-purple-400">Pisces</span>
          </div>
        </div>
      </div>

      {/* Lifestyle Preferences */}
      <div className="mx-5 p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <h3 className="text-sm font-black font-heading text-white uppercase tracking-wide mb-3">Lifestyle</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Activity</p>
            <p className="text-white font-bold">Moderate</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Diet</p>
            <p className="text-white font-bold">Plant-Based</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Meditation</p>
            <p className="text-white font-bold">Daily</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-muted/60 uppercase tracking-wide mb-1 text-[10px]">Sleep</p>
            <p className="text-white font-bold">7-8 hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 12. ACCOUNT SETTING CARD - Account management options
// ============================================================================

interface AccountSettingCardProps {
  title: string;
  description: string;
  action: string;
  variant?: 'default' | 'danger';
  onClick?: () => void;
  className?: string;
}

export const AccountSettingCard: React.FC<AccountSettingCardProps> = ({
  title,
  description,
  action,
  variant = 'default',
  onClick,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">
          {title}
        </h4>
        <p className="text-sm text-muted/70 leading-relaxed mb-4">
          {description}
        </p>
        <Button
          variant={variant === 'danger' ? 'danger' : 'ghost'}
          size="sm"
          onClick={onClick}
        >
          {action}
        </Button>
      </div>
    </div>
  </Card>
);

