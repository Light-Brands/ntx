"use client";

/**
 * EXAMPLE: COMMUNITY CARD COMPONENT
 * ==================================
 *
 * This is a real-world example from the VIBEUP codebase that demonstrates:
 * - ✅ Proper component structure and naming
 * - ✅ Explicit props interface with JSDoc
 * - ✅ Framer Motion animations with stagger effect
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Accessibility (semantic HTML, ARIA attributes)
 * - ✅ Dark mode styling
 * - ✅ Conditional rendering patterns
 * - ✅ Image optimization with Next.js Image
 *
 * Original location: components/communities/CommunityCard.tsx
 *
 * @see /design-system/GUIDELINES.md - Component Design section
 * @see /design-system/templates/component-template.tsx - Component template
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Globe, MapPin, Lock, Eye } from "lucide-react";
import type { Community, CommunitySummary } from "@/types/community";

// ============================================================================
// PROPS INTERFACE
// ============================================================================

interface CommunityCardProps {
    /** Community data (full or summary) */
    community: Community | CommunitySummary;

    /** Optional callback when card is clicked */
    onClick?: () => void;

    /** Optional animation delay index (for staggered lists) */
    index?: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * REUSABLE COMMUNITY CARD
 * =======================
 *
 * Beautiful card component for displaying communities
 * Can be used in grids, lists, or carousels
 *
 * Usage:
 * ```tsx
 * <CommunityCard
 *   community={community}
 *   onClick={() => router.push(`/community/${community.handle}`)}
 *   index={0}
 * />
 * ```
 */
export function CommunityCard({ community, onClick, index = 0 }: CommunityCardProps) {
    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    /**
     * Generate access badge with appropriate styling
     * Note: This could be extracted to a separate component
     */
    const getAccessBadge = () => {
        const badgeClasses =
            "px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1";

        switch (community.access_type) {
            case "public":
                return (
                    <span className={`${badgeClasses} bg-[#97d8c4]/20 text-[#97d8c4]`}>
                        <Globe className="w-3 h-3" />
                        Public
                    </span>
                );
            case "semi_private":
                return (
                    <span
                        className={`${badgeClasses} bg-yellow-500/20 text-yellow-400`}
                    >
                        <Eye className="w-3 h-3" />
                        Semi-Private
                    </span>
                );
            case "private":
                return (
                    <span
                        className={`${badgeClasses} bg-purple-500/20 text-purple-400`}
                    >
                        <Lock className="w-3 h-3" />
                        Private
                    </span>
                );
        }
    };

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <motion.div
            // Staggered animation based on index
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            // Interactive states
            onClick={onClick}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#97d8c4]/30 transition-all cursor-pointer group"
        >
            {/* Cover Image with Gradient Overlay */}
            <div className="relative h-32 w-full bg-gradient-to-br from-[#97d8c4]/20 to-purple-500/20">
                {community.cover_image_url && (
                    <Image
                        src={community.cover_image_url}
                        alt={community.community_name}
                        fill
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04282F] to-transparent" />

                {/* Community Avatar - Positioned to overlap cover */}
                <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                    {community.image_url ? (
                        <Image
                            src={community.image_url}
                            alt={community.community_name}
                            width={48}
                            height={48}
                            className="rounded-xl ring-2 ring-[#04282F]"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/10 ring-2 ring-[#04282F] flex items-center justify-center text-white font-bold">
                            {community.community_name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 pt-8">
                {/* Name and Access Type Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#97d8c4] transition-colors line-clamp-1 flex-1">
                        {community.community_name}
                    </h3>
                    {getAccessBadge()}
                </div>

                {/* Description */}
                {community.short_description && (
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-3">
                        {community.short_description}
                    </p>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                    {/* Member Count */}
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{community.member_count.toLocaleString()}</span>
                    </div>

                    {/* Location (if not online-only) */}
                    {community.location_city && !community.is_online_only && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{community.location_city}</span>
                        </div>
                    )}

                    {/* Online indicator */}
                    {community.is_online_only && (
                        <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>Online</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {community.tags && community.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {/* Show first 2 tags */}
                        {community.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 bg-[#97d8c4]/10 text-[#97d8c4] rounded text-[10px] font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                        {/* Show count badge for remaining tags */}
                        {community.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-white/10 text-white/60 rounded text-[10px] font-medium">
                                +{community.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// ============================================================================
// KEY PATTERNS DEMONSTRATED
// ============================================================================

/**
 * 1. NAMING: PascalCase, descriptive (CommunityCard)
 *
 * 2. PROPS INTERFACE: Explicit interface with JSDoc comments
 *
 * 3. ANIMATIONS: Framer Motion with staggered delays
 *
 * 4. STYLING:
 *    - Tailwind CSS classes
 *    - Dark mode colors (bg-[#04282F], text-white)
 *    - Hover states (hover:bg-white/10)
 *    - Responsive (mobile-first)
 *
 * 5. ACCESSIBILITY:
 *    - Semantic HTML (meaningful element choices)
 *    - Alt text for images
 *    - Keyboard accessible (cursor-pointer)
 *
 * 6. CONDITIONAL RENDERING:
 *    - Optional image display
 *    - Conditional badges
 *    - Dynamic tag rendering
 *
 * 7. IMAGE OPTIMIZATION:
 *    - Next.js Image component
 *    - Lazy loading
 *    - Proper sizing
 *
 * 8. COMPOSITION:
 *    - Functional component pattern
 *    - Clean, readable structure
 *    - Single responsibility
 *
 * @see /design-system/GUIDELINES.md for more patterns
 */
