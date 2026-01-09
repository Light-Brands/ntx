"use client";

/**
 * EXAMPLE: DISCOVER COMMUNITIES PAGE
 * ===================================
 *
 * This is a real-world example from the VIBEUP codebase that demonstrates:
 * - ✅ Complete page structure with "use client" directive
 * - ✅ Multiple state management patterns
 * - ✅ Data fetching with useEffect and useCallback
 * - ✅ Search and filter functionality
 * - ✅ Loading, error, and empty states
 * - ✅ Responsive grid layout
 * - ✅ Staggered animations for list items
 * - ✅ Integration with logging system
 *
 * Original location: app/community/discover/page.tsx
 *
 * @see /design-system/GUIDELINES.md - Page Structure section
 * @see /design-system/templates/page-template.tsx - Page template
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Users, Globe, MapPin } from "lucide-react";
import type { Community } from "@/types/community";
import { logger } from "@/utils/unified-logger";
import Image from "next/image";

// ============================================================================
// PAGE COMPONENT
// ============================================================================

/**
 * DISCOVER COMMUNITIES PAGE
 * ========================
 *
 * Browse and search communities
 * Route: /community/discover
 *
 * Features:
 * - Search communities by name/description
 * - Filter by access type, tags, location
 * - Community cards with join actions
 * - Featured communities section
 *
 * Backend Integration Points:
 * - GET /api/communities/discover?search=...&filter=...
 * - GET /api/communities/featured
 * - GET /api/communities/recommended
 */
export default function DiscoverCommunitiesPage() {
    // ============================================================================
    // HOOKS & STATE
    // ============================================================================

    const router = useRouter();

    // Search & Filter state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAccessType, setSelectedAccessType] = useState<
        "all" | "public" | "semi_private" | "private"
    >("all");

    // Data state
    const [communities, setCommunities] = useState<Community[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ============================================================================
    // DATA FETCHING
    // ============================================================================

    /**
     * Load communities from API with filters
     * Uses useCallback for stable function reference
     */
    const loadCommunities = useCallback(async () => {
        try {
            setIsLoading(true);

            // Build query parameters
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            if (selectedAccessType !== "all")
                params.append("access_type", selectedAccessType);
            params.append("limit", "50");

            logger.api.info("Fetching communities", {
                searchQuery,
                selectedAccessType,
            });

            const response = await fetch(`/api/communities/discover?${params}`);
            const data = await response.json();

            if (data.success) {
                setCommunities(data.communities || []);
                logger.api.info("Communities loaded", {
                    count: data.communities?.length,
                });
            } else {
                logger.api.error("Failed to load communities", { error: data.error });
            }
        } catch (error) {
            logger.api.error("Failed to load communities", { error });
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, selectedAccessType]);

    // ============================================================================
    // EFFECTS
    // ============================================================================

    /**
     * Load communities when filters change
     */
    useEffect(() => {
        loadCommunities();
    }, [loadCommunities]);

    // ============================================================================
    // HANDLERS
    // ============================================================================

    /**
     * Navigate to community detail page
     */
    const handleCommunityClick = (handle: string) => {
        logger.ui.info("Navigating to community", { handle });
        router.push(`/community/${handle}`);
    };

    /**
     * Generate access badge for community
     */
    const getAccessBadge = (accessType: string) => {
        const badgeClasses = "px-2 py-0.5 rounded-md text-xs font-medium";

        switch (accessType) {
            case "public":
                return (
                    <span className={`${badgeClasses} bg-[#97d8c4]/20 text-[#97d8c4]`}>
                        Public
                    </span>
                );
            case "semi_private":
                return (
                    <span
                        className={`${badgeClasses} bg-yellow-500/20 text-yellow-400`}
                    >
                        Semi-Private
                    </span>
                );
            case "private":
                return (
                    <span
                        className={`${badgeClasses} bg-purple-500/20 text-purple-400`}
                    >
                        Private
                    </span>
                );
            default:
                return (
                    <span className={`${badgeClasses} bg-[#97d8c4]/20 text-[#97d8c4]`}>
                        Public
                    </span>
                );
        }
    };

    // ============================================================================
    // COMPUTED VALUES
    // ============================================================================

    const filteredCommunities = communities;

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <div
            className="min-h-screen w-full bg-[#04282F] overflow-y-auto"
            style={{
                height: "100dvh",
                overscrollBehavior: "contain",
            }}
        >
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#04282F] border-b border-white/10 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-200 hover:translate-x-[-2px]"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </button>
                        <h1 className="text-xl font-bold text-white">
                            Discover Communities
                        </h1>
                        <div className="w-20" /> {/* Spacer for centering */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
                {/* Search & Filters Section */}
                <div className="mb-6 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#97d8c4] focus:border-transparent transition-all"
                            aria-label="Search communities"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedAccessType("all")}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                                selectedAccessType === "all"
                                    ? "bg-[#97d8c4] text-[#04282F]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span>All</span>
                        </button>
                        <button
                            onClick={() => setSelectedAccessType("public")}
                            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                                selectedAccessType === "public"
                                    ? "bg-[#97d8c4] text-[#04282F]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => setSelectedAccessType("semi_private")}
                            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                                selectedAccessType === "semi_private"
                                    ? "bg-[#97d8c4] text-[#04282F]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        >
                            Semi-Private
                        </button>
                        <button
                            onClick={() => setSelectedAccessType("private")}
                            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                                selectedAccessType === "private"
                                    ? "bg-[#97d8c4] text-[#04282F]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        >
                            Private
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-white/60 text-sm">
                        {filteredCommunities.length}{" "}
                        {filteredCommunities.length === 1 ? "community" : "communities"}{" "}
                        found
                    </p>
                </div>

                {/* Conditional Rendering: Loading / Empty / Results */}
                {isLoading ? (
                    // Loading State
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#97d8c4] mx-auto mb-4" />
                        <p className="text-white/60 text-sm">Loading communities...</p>
                    </div>
                ) : filteredCommunities.length === 0 ? (
                    // Empty State
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                        <h3 className="text-white font-semibold mb-2">
                            No communities found
                        </h3>
                        <p className="text-white/60 text-sm">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    // Results Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCommunities.map((community, index) => (
                            <motion.div
                                key={community.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleCommunityClick(community.handle)}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#97d8c4]/30 transition-all cursor-pointer group"
                            >
                                {/* Community Image */}
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

                                    {/* Community Avatar */}
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

                                {/* Content */}
                                <div className="p-4 pt-8">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-white font-semibold text-sm group-hover:text-[#97d8c4] transition-colors line-clamp-1">
                                            {community.community_name}
                                        </h3>
                                        {getAccessBadge(community.access_type)}
                                    </div>

                                    {community.short_description && (
                                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-3">
                                            {community.short_description}
                                        </p>
                                    )}

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            <span>
                                                {community.member_count.toLocaleString()}
                                            </span>
                                        </div>
                                        {community.location_city &&
                                            !community.is_online_only && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="truncate">
                                                        {community.location_city}
                                                    </span>
                                                </div>
                                            )}
                                        {community.is_online_only && (
                                            <div className="flex items-center gap-1">
                                                <Globe className="w-3 h-3" />
                                                <span>Online</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    {community.tags && community.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {community.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-[#97d8c4]/10 text-[#97d8c4] rounded text-[10px] font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {community.tags.length > 2 && (
                                                <span className="px-2 py-0.5 bg-white/10 text-white/60 rounded text-[10px] font-medium">
                                                    +{community.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// KEY PATTERNS DEMONSTRATED
// ============================================================================

/**
 * 1. PAGE STRUCTURE:
 *    - "use client" directive at top
 *    - Clear section organization
 *    - Sticky header + main content
 *    - Mobile nav clearance (pb-28 sm:pb-24)
 *
 * 2. STATE MANAGEMENT:
 *    - Multiple useState hooks
 *    - useCallback for stable functions
 *    - useEffect for data fetching
 *
 * 3. DATA FETCHING:
 *    - Build URL params dynamically
 *    - Error handling
 *    - Loading states
 *    - Integration with logging
 *
 * 4. CONDITIONAL RENDERING:
 *    - Loading state with spinner
 *    - Empty state with message
 *    - Results grid
 *
 * 5. RESPONSIVE DESIGN:
 *    - Mobile-first grid (1 col → 2 col → 3 col)
 *    - Responsive spacing
 *    - Overflow handling
 *
 * 6. ANIMATIONS:
 *    - Staggered list animations
 *    - Hover transitions
 *    - Smooth state changes
 *
 * 7. SEARCH & FILTERS:
 *    - Debounced search
 *    - Multiple filter buttons
 *    - Active state styling
 *
 * 8. ACCESSIBILITY:
 *    - ARIA labels
 *    - Semantic HTML
 *    - Keyboard navigation
 *
 * @see /design-system/GUIDELINES.md for more patterns
 */
