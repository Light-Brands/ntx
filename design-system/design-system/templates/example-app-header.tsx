"use client";

/**
 * EXAMPLE: APP HEADER COMPONENT
 * ==============================
 *
 * This is a real-world example from the VIBEUP codebase that demonstrates:
 * - ✅ Complex component with many optional props
 * - ✅ Comprehensive JSDoc documentation
 * - ✅ State management with useState
 * - ✅ AnimatePresence for smooth transitions
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Accessibility (ARIA labels, semantic HTML)
 * - ✅ Conditional rendering of sub-components
 * - ✅ Sticky positioning for navigation
 *
 * Original location: components/core/app-header.tsx
 *
 * @see /design-system/GUIDELINES.md - Component Design section
 * @see /design-system/templates/component-template.tsx - Component template
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MessageCircle, Bell, SlidersHorizontal, Compass } from "lucide-react";
import { HeaderSearchBar } from "@/components/core/header-search-bar";
import { SearchOverlay } from "@/components/core/search-overlay";

// ============================================================================
// PROPS INTERFACE
// ============================================================================

/**
 * Props for AppHeader component
 *
 * Note: Extensive props interface with clear documentation
 * Shows pattern for complex components with many options
 */
interface AppHeaderProps {
    /** Page title */
    title: string;

    /** Subtitle/description */
    subtitle?: string;

    /** Show search bar */
    showSearch?: boolean;

    /** Show filter button when search is expanded */
    showFilters?: boolean;

    /** Show map button when search is expanded */
    showMap?: boolean;

    /** Show messages button */
    showMessages?: boolean;

    /** Show notifications button */
    showNotifications?: boolean;

    /** Show unread message indicator */
    hasUnreadMessages?: boolean;

    /** Show unread notification indicator */
    hasUnreadNotifications?: boolean;

    /** Callback when hamburger menu is clicked */
    onMenuClick?: () => void;

    /** Callback when messages is clicked */
    onMessagesClick?: () => void;

    /** Callback when notifications is clicked */
    onNotificationsClick?: () => void;

    /** Callback when filter button is clicked */
    onFilterClick?: () => void;

    /** Callback when map button is clicked */
    onMapClick?: () => void;

    /** Filter count badge */
    filterCount?: number;

    /** Search placeholder text */
    searchPlaceholder?: string;

    /** Show back button */
    showBack?: boolean;

    /** Callback when back button is clicked */
    onBackClick?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * APP HEADER
 * ==========
 *
 * Reusable header component used across all main app pages.
 * Features responsive layout with search, navigation, and action buttons.
 *
 * Usage:
 * ```tsx
 * const [showSidebar, setShowSidebar] = useState(false)
 * const [showNotifications, setShowNotifications] = useState(false)
 * const [showFilterModal, setShowFilterModal] = useState(false)
 * const [showMapModal, setShowMapModal] = useState(false)
 * const [filters, setFilters] = useState({})
 *
 * <AppHeader
 *   title="Discovery"
 *   subtitle="Discover what aligns with your current energy."
 *   showSearch={true}
 *   showFilters={true}
 *   showMap={true}
 *   showMessages={true}
 *   showNotifications={true}
 *   hasUnreadMessages={true}
 *   hasUnreadNotifications={true}
 *   onMenuClick={() => setShowSidebar(true)}
 *   onMessagesClick={() => router.push('/messages')}
 *   onNotificationsClick={() => setShowNotifications(true)}
 *   onFilterClick={() => setShowFilterModal(true)}
 *   onMapClick={() => setShowMapModal(true)}
 *   filterCount={Object.keys(filters).length}
 * />
 * ```
 */
export function AppHeader({
    title,
    subtitle,
    showSearch = true,
    showFilters = true,
    showMap = true,
    showMessages = true,
    showNotifications = true,
    hasUnreadMessages = false,
    hasUnreadNotifications = false,
    onMenuClick,
    onMessagesClick,
    onNotificationsClick,
    onFilterClick,
    onMapClick,
    filterCount = 0,
    searchPlaceholder = "Search VIBEUP",
}: AppHeaderProps) {
    // ============================================================================
    // HOOKS & STATE
    // ============================================================================

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchExpanded, setSearchExpanded] = useState(false);

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <>
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#04282F] border-b border-white/10">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className="flex items-center justify-between gap-2 relative">
                        {/* Left Section: Hamburger Menu + Title/Search */}
                        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
                            {/* Hamburger Menu Button */}
                            <button
                                onClick={onMenuClick}
                                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                                aria-label="Open menu"
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>

                            {/* Title - Smoothly hide when search expands */}
                            <AnimatePresence mode="wait">
                                {!searchExpanded && (
                                    <motion.div
                                        className="flex flex-col min-w-0"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <h1 className="text-base sm:text-lg font-semibold text-white truncate">
                                            {title}
                                        </h1>
                                        {subtitle && (
                                            <p className="text-[10px] sm:text-xs text-[#97d8c4]/70 font-light truncate">
                                                {subtitle}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Section: Search | Filters | Map | Messages | Notifications */}
                        <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
                            {/* Search Bar - Expands left when active */}
                            {showSearch && (
                                <div
                                    className={
                                        searchExpanded
                                            ? "absolute left-[44px] right-[184px] sm:right-[204px] z-10 flex"
                                            : "contents"
                                    }
                                >
                                    <HeaderSearchBar
                                        showFilters={false}
                                        showMap={false}
                                        fullWidth={true}
                                        onFilterClick={onFilterClick}
                                        onMapClick={onMapClick}
                                        filterCount={filterCount}
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        onExpandChange={setSearchExpanded}
                                        placeholder={searchPlaceholder}
                                    />
                                </div>
                            )}

                            {/* Filter Button - Appears when search is expanded */}
                            {showFilters && searchExpanded && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={onFilterClick}
                                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-white/10 text-white transition-all duration-200 relative flex-shrink-0 z-20"
                                    aria-label="Open filters"
                                >
                                    <SlidersHorizontal className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" />
                                    {filterCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#97d8c4] rounded-full flex items-center justify-center">
                                            <span className="text-[9px] text-[#04282F] font-bold">
                                                {filterCount}
                                            </span>
                                        </div>
                                    )}
                                </motion.button>
                            )}

                            {/* Map Button - Appears when search is expanded */}
                            {showMap && searchExpanded && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={onMapClick}
                                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-white/10 text-white transition-all duration-200 flex-shrink-0 z-20"
                                    aria-label="Open map view"
                                >
                                    <Compass className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" />
                                </motion.button>
                            )}

                            {/* Messages Button - Always visible */}
                            {showMessages && (
                                <button
                                    onClick={
                                        onMessagesClick ||
                                        (() => router.push("/messages"))
                                    }
                                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-white/10 text-white transition-all duration-200 relative flex-shrink-0"
                                    aria-label="Messages"
                                >
                                    <MessageCircle className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" />
                                    {hasUnreadMessages && (
                                        <div
                                            className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#97d8c4] rounded-full"
                                            aria-label="Unread messages"
                                        />
                                    )}
                                </button>
                            )}

                            {/* Notifications Button - Always visible */}
                            {showNotifications && (
                                <button
                                    onClick={onNotificationsClick}
                                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-white/10 text-white transition-all duration-200 relative flex-shrink-0"
                                    aria-label="Notifications"
                                >
                                    <Bell className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" />
                                    {hasUnreadNotifications && (
                                        <div
                                            className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"
                                            aria-label="Unread notifications"
                                        />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Results Overlay */}
            {showSearch && searchExpanded && (
                <div className="sticky top-[49px] z-40">
                    <SearchOverlay
                        isOpen={searchExpanded}
                        onClose={() => setSearchExpanded(false)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
            )}
        </>
    );
}

// ============================================================================
// KEY PATTERNS DEMONSTRATED
// ============================================================================

/**
 * 1. COMPLEX PROPS: Extensive props interface with clear organization
 *
 * 2. STATE MANAGEMENT: Local state for search functionality
 *
 * 3. ANIMATIONS:
 *    - AnimatePresence for smooth enter/exit
 *    - motion.div for title transitions
 *    - motion.button for button appearance
 *
 * 4. RESPONSIVE DESIGN:
 *    - sm: breakpoint for larger screens
 *    - Mobile-first approach
 *    - Flexible spacing (space-x, gap)
 *
 * 5. ACCESSIBILITY:
 *    - ARIA labels on all buttons
 *    - Semantic HTML (button, header)
 *    - Keyboard accessible
 *    - Screen reader friendly
 *
 * 6. CONDITIONAL RENDERING:
 *    - Show/hide buttons based on props
 *    - Notification badges
 *    - Expanded search state
 *
 * 7. LAYOUT:
 *    - Sticky positioning
 *    - Flexbox for alignment
 *    - Z-index management
 *
 * 8. USER FEEDBACK:
 *    - Hover states
 *    - Active states
 *    - Visual indicators (badges, dots)
 *
 * 9. COMPOSITION:
 *    - Uses sub-components (HeaderSearchBar, SearchOverlay)
 *    - Clean separation of concerns
 *
 * @see /design-system/GUIDELINES.md for more patterns
 */
