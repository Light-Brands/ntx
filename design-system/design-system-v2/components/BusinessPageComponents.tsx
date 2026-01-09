
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Avatar } from './Avatar';

// ============================================================================
// ICONS
// ============================================================================

export const BusinessIcons = {
  Briefcase: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2-2v16" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
  Tag: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
};

// ============================================================================
// 1. VERIFIED BADGE - Business verification indicator
// ============================================================================

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'px-2 py-1 text-[9px]',
    md: 'px-3 py-1.5 text-[10px]',
    lg: 'px-4 py-2 text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 bg-gold-accent/15 text-gold-accent
                    rounded-full border-2 border-gold-accent/40 shadow-sm
                    ${sizes[size]} ${className}`}>
      <BusinessIcons.Check />
      <span className="font-black uppercase tracking-wider">Verified</span>
    </div>
  );
};

// ============================================================================
// 2. BUSINESS CARD - Discovery/listing card
// ============================================================================

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    description?: string;
    category?: string;
    location?: string;
    coverImage?: string;
    rating?: number;
    reviewCount?: number;
    verified?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onClick,
  className = ''
}) => (
  <Card
    className={`overflow-hidden hover:border-aqua-light/40 hover:scale-[1.02] hover:shadow-2xl
               hover:shadow-aqua-light/10 transition-all duration-500 cursor-pointer group ${className}`}
    onClick={onClick}
  >
    {/* Cover Image */}
    <div
      className="h-44 bg-gradient-to-br from-teal-light/20 to-abyss-base bg-cover bg-center relative"
      style={business.coverImage ? { backgroundImage: `url(${business.coverImage})` } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-abyss-base/50 to-transparent" />
      {business.verified && (
        <div className="absolute top-4 right-4">
          <VerifiedBadge />
        </div>
      )}
      {business.category && (
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1.5 rounded-full bg-abyss-base/90 backdrop-blur-sm border border-aqua-light/30
                       text-aqua-light text-xs font-bold uppercase tracking-wide">
            {business.category}
          </div>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-xl font-black font-heading text-white uppercase tracking-tight group-hover:text-aqua-light transition-colors mb-2">
          {business.name}
        </h3>
        {business.description && (
          <p className="text-sm text-pearl/75 line-clamp-2 leading-relaxed">
            {business.description}
          </p>
        )}
      </div>

      {/* Location & Rating */}
      <div className="flex items-center justify-between">
        {business.location && (
          <div className="flex items-center gap-2 text-muted text-xs">
            <BusinessIcons.MapPin />
            <span className="font-medium">{business.location}</span>
          </div>
        )}
        {business.rating && (
          <div className="flex items-center gap-1.5">
            <div className="text-gold-accent">
              <BusinessIcons.Star />
            </div>
            <span className="text-sm font-black font-heading text-white">{business.rating.toFixed(1)}</span>
            {business.reviewCount && (
              <span className="text-xs text-muted">({business.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {/* View Button */}
      <Button variant="primary" className="w-full py-3">
        View Business
      </Button>
    </div>
  </Card>
);

// ============================================================================
// 3. SERVICE LISTING CARD - Individual service/product
// ============================================================================

interface ServiceListingCardProps {
  listing: {
    id: string;
    title: string;
    price: string;
    duration?: string;
    description?: string;
    image?: string;
    category?: string;
  };
  onClick?: () => void;
  className?: string;
}

export const ServiceListingCard: React.FC<ServiceListingCardProps> = ({
  listing,
  onClick,
  className = ''
}) => (
  <Card
    className={`overflow-hidden hover:border-aqua-light/30 hover:shadow-lg transition-all duration-300
               cursor-pointer group ${className}`}
    onClick={onClick}
  >
    {listing.image && (
      <div
        className="h-36 bg-gradient-to-br from-teal-light/20 to-abyss-base bg-cover bg-center relative"
        style={{ backgroundImage: `url(${listing.image})` }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
      </div>
    )}

    <div className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-black font-heading text-white uppercase tracking-tight group-hover:text-aqua-light transition-colors flex-1">
          {listing.title}
        </h4>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-black text-aqua-light">{listing.price}</p>
          {listing.duration && (
            <p className="text-[10px] text-muted uppercase tracking-wide">{listing.duration}</p>
          )}
        </div>
      </div>

      {listing.description && (
        <p className="text-sm text-pearl/75 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>
      )}

      {listing.category && (
        <div className="pt-2">
          <span className="px-3 py-1 rounded-full bg-aqua-light/10 border border-aqua-light/20
                       text-aqua-light text-xs font-bold uppercase tracking-wide">
            {listing.category}
          </span>
        </div>
      )}
    </div>
  </Card>
);

// ============================================================================
// 4. BUSINESS CONTACT INFO - Contact details display
// ============================================================================

interface BusinessContactInfoProps {
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    location?: string;
  };
  className?: string;
}

export const BusinessContactInfo: React.FC<BusinessContactInfoProps> = ({
  contact,
  className = ''
}) => (
  <Card className={`p-5 ${className}`}>
    <h3 className="text-sm font-black font-heading text-white uppercase tracking-widest mb-4">
      Contact Information
    </h3>
    <div className="space-y-3">
      {contact.email && (
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10
                   hover:bg-white/5 hover:border-aqua-light/30 transition-all duration-300 group"
        >
          <div className="text-muted group-hover:text-aqua-light transition-colors">
            <BusinessIcons.Mail />
          </div>
          <span className="text-sm text-white font-medium">{contact.email}</span>
        </a>
      )}
      {contact.phone && (
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10
                   hover:bg-white/5 hover:border-aqua-light/30 transition-all duration-300 group"
        >
          <div className="text-muted group-hover:text-aqua-light transition-colors">
            <BusinessIcons.Phone />
          </div>
          <span className="text-sm text-white font-medium">{contact.phone}</span>
        </a>
      )}
      {contact.website && (
        <a
          href={contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10
                   hover:bg-white/5 hover:border-aqua-light/30 transition-all duration-300 group"
        >
          <div className="text-muted group-hover:text-aqua-light transition-colors">
            <BusinessIcons.Globe />
          </div>
          <span className="text-sm text-white font-medium truncate">{contact.website}</span>
          <BusinessIcons.ExternalLink />
        </a>
      )}
      {contact.location && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10">
          <div className="text-muted">
            <BusinessIcons.MapPin />
          </div>
          <span className="text-sm text-white font-medium">{contact.location}</span>
        </div>
      )}
    </div>
  </Card>
);

// ============================================================================
// 5. BUSINESS STATS - Display business statistics
// ============================================================================

interface BusinessStatsProps {
  rating?: number;
  reviews?: number;
  services?: number;
  clients?: number;
  className?: string;
}

export const BusinessStats: React.FC<BusinessStatsProps> = ({
  rating,
  reviews,
  services,
  clients,
  className = ''
}) => (
  <div className={`p-4 rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
    <div className="grid grid-cols-4 gap-4">
      {rating && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="text-gold-accent">
              <BusinessIcons.Star />
            </div>
            <p className="text-xl font-black text-gold-accent">{rating.toFixed(1)}</p>
          </div>
          <p className="text-[9px] text-muted uppercase tracking-wider">Rating</p>
        </div>
      )}
      {reviews !== undefined && (
        <div className="text-center">
          <p className="text-xl font-black font-heading text-white">{reviews}</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Reviews</p>
        </div>
      )}
      {services !== undefined && (
        <div className="text-center">
          <p className="text-xl font-black text-aqua-light">{services}</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Services</p>
        </div>
      )}
      {clients !== undefined && (
        <div className="text-center">
          <p className="text-xl font-black font-heading text-white">{clients}</p>
          <p className="text-[9px] text-muted uppercase tracking-wider">Clients</p>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// 6. REVIEW CARD - Customer review/testimonial
// ============================================================================

interface ReviewCardProps {
  review: {
    id: string;
    author: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
  };
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => (
  <Card className={`p-5 ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Avatar size="sm" src={review.avatar} />
        <div>
          <p className="text-sm font-bold text-white">{review.author}</p>
          <p className="text-xs text-muted/60">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={i < review.rating ? 'text-gold-accent' : 'text-white/20'}
          >
            <BusinessIcons.Star />
          </div>
        ))}
      </div>
    </div>
    <p className="text-sm text-pearl/80 leading-relaxed italic">
      "{review.comment}"
    </p>
  </Card>
);

// ============================================================================
// 7. BUSINESS HEADER BANNER - Full business profile header
// ============================================================================

interface BusinessHeaderBannerProps {
  business: {
    name: string;
    category?: string;
    description?: string;
    coverImage?: string;
    logo?: string;
    verified?: boolean;
    rating?: number;
    reviewCount?: number;
  };
  isOwner?: boolean;
  onEdit?: () => void;
  onContact?: () => void;
  className?: string;
}

export const BusinessHeaderBanner: React.FC<BusinessHeaderBannerProps> = ({
  business,
  isOwner = false,
  onEdit,
  onContact,
  className = ''
}) => (
  <div className={`space-y-4 ${className}`}>
    {/* Cover */}
    <div
      className="h-40 rounded-t-3xl bg-gradient-to-br from-aqua-light/15 to-abyss-base bg-cover bg-center relative"
      style={business.coverImage ? { backgroundImage: `url(${business.coverImage})` } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-abyss-base/60 to-transparent rounded-t-3xl" />
      {business.verified && (
        <div className="absolute top-4 right-4">
          <VerifiedBadge />
        </div>
      )}
    </div>

    {/* Info */}
    <div className="px-5 -mt-16 relative z-10">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl bg-abyss-depths border-4 border-abyss-base
                       shadow-2xl flex items-center justify-center overflow-hidden">
            {business.logo ? (
              <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl text-aqua-light">
                <BusinessIcons.Briefcase />
              </div>
            )}
          </div>

          {/* Name & Category */}
          <div className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black font-heading text-white uppercase tracking-tight">
                {business.name}
              </h2>
            </div>
            {business.category && (
              <p className="text-xs text-muted uppercase tracking-wide font-bold">{business.category}</p>
            )}
            {business.rating && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`text-xs ${i < Math.floor(business.rating!) ? 'text-gold-accent' : 'text-white/20'}`}
                    >
                      <BusinessIcons.Star />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted">({business.reviewCount || 0})</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pb-2">
          {isOwner ? (
            <Button variant="secondary" size="sm" onClick={onEdit} className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit</span>
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onContact} className="flex items-center gap-2">
              <BusinessIcons.Mail />
              <span>Contact</span>
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <p className="text-sm text-pearl/80 leading-relaxed mt-4">
          {business.description}
        </p>
      )}
    </div>
  </div>
);

// ============================================================================
// 8. BUSINESS CATEGORY BADGE - Service category tag
// ============================================================================

interface BusinessCategoryBadgeProps {
  category: string;
  className?: string;
}

export const BusinessCategoryBadge: React.FC<BusinessCategoryBadgeProps> = ({
  category,
  className = ''
}) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-aqua-light/10 border border-aqua-light/30 text-aqua-light ${className}`}>
    <BusinessIcons.Tag />
    <span className="text-xs font-bold uppercase tracking-wide">{category}</span>
  </div>
);

// ============================================================================
// 9. PRICE TAG - Display pricing
// ============================================================================

interface PriceTagProps {
  price: string;
  period?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, period, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={className}>
      <span className={`${sizes[size]} font-black text-aqua-light`}>{price}</span>
      {period && (
        <span className="text-xs text-muted ml-1">/{period}</span>
      )}
    </div>
  );
};

// ============================================================================
// 10. BUSINESS FULL VIEW - Complete business profile with tabs
// ============================================================================

interface BusinessFullViewProps {
  className?: string;
}

export const BusinessFullView: React.FC<BusinessFullViewProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');

  return (
    <div className={`space-y-5 pb-6 ${className}`}>
      {/* Header */}
      <BusinessHeaderBanner
        business={{
          name: 'Mindful Wellness Studio',
          category: 'Health & Wellness',
          description: 'Transform your life through mindful practices and professional guidance.',
          coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
          verified: true,
          rating: 4.8,
          reviewCount: 127,
        }}
        isOwner={false}
        onContact={() => console.log('Contact')}
      />

      {/* Stats */}
      <div className="px-5">
        <BusinessStats rating={4.8} reviews={127} services={12} clients={450} />
      </div>

      {/* Tabs */}
      <div className="px-5">
        <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex gap-2">
            {[
              { id: 'about' as const, label: 'About' },
              { id: 'services' as const, label: 'Services' },
              { id: 'reviews' as const, label: 'Reviews' },
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

      {/* Content */}
      <div className="px-5">
        {activeTab === 'about' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="p-5">
              <h3 className="text-sm font-black font-heading text-white uppercase tracking-widest mb-3">About Us</h3>
              <p className="text-sm text-pearl/80 leading-relaxed mb-4">
                We provide holistic wellness services including meditation classes, yoga sessions,
                and personalized coaching to help you achieve balance and inner peace.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Meditation', 'Yoga', 'Coaching', 'Wellness'].map((tag, i) => (
                  <BusinessCategoryBadge key={i} category={tag} />
                ))}
              </div>
            </Card>
            <BusinessContactInfo
              contact={{
                email: 'hello@mindfulwellness.com',
                phone: '+1 (555) 123-4567',
                website: 'mindfulwellness.com',
                location: 'San Francisco, CA',
              }}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
            {[
              { id: '1', title: 'Meditation Sessions', price: '$45', duration: '60 min', category: 'Meditation' },
              { id: '2', title: 'Personal Coaching', price: '$120', duration: '90 min', category: 'Coaching' },
              { id: '3', title: 'Yoga Classes', price: '$30', duration: '75 min', category: 'Yoga' },
            ].map((service) => (
              <ServiceListingCard
                key={service.id}
                listing={{
                  ...service,
                  description: 'Professional guidance tailored to your unique journey.',
                  image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
                }}
                onClick={() => console.log('View', service.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { id: '1', author: 'Sarah Johnson', rating: 5, comment: 'Life-changing experience. The meditation sessions have brought me so much peace.', date: '2 weeks ago' },
              { id: '2', author: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?u=mike', rating: 5, comment: 'Incredible coaching! Helped me find clarity and direction in my life.', date: '1 month ago' },
            ].map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

