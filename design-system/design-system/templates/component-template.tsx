"use client";

/**
 * COMPONENT NAME
 * ==============
 *
 * Brief description of what this component does.
 * Include use cases and key features.
 *
 * Usage:
 * ```tsx
 * <ComponentName
 *   title="Example"
 *   variant="primary"
 *   onClick={() => handleClick()}
 * />
 * ```
 *
 * @see /design-system/GUIDELINES.md for component patterns
 */

// External packages
import React from "react";
import { motion } from "framer-motion";
// TODO: Replace IconName with actual icon (e.g., Check, X, Heart)
// import { IconName } from "lucide-react";

// Internal utilities
import { cn } from "@/lib/utils";
import { logger } from "@/utils/unified-logger";

// Types
// TODO: Replace TypeName and feature with your actual types
// import type { TypeName } from "@/types/feature";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Props for ComponentName component
 *
 * @see /design-system/GUIDELINES.md - Props Interface Pattern
 */
interface ComponentNameProps {
    /** Required: Primary data for the component */
    // TODO: Replace TypeName with your actual type
    data: Record<string, unknown>;

    /** Required: Title text */
    title: string;

    /** Optional: Variant style */
    variant?: "default" | "primary" | "secondary";

    /** Optional: Size variant */
    size?: "sm" | "md" | "lg";

    /** Optional: Show loading state */
    isLoading?: boolean;

    /** Optional: Disable interactions */
    isDisabled?: boolean;

    /** Optional: Callback when component is clicked */
    onClick?: () => void;

    /** Optional: Callback when action is completed */
    onComplete?: (result: unknown) => void;

    /** Optional: Animation delay index (for staggered lists) */
    index?: number;

    /** Optional: Additional CSS classes */
    className?: string;

    /** Optional: Child components */
    children?: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ComponentName({
    data: _data,
    title,
    variant = "default",
    size = "md",
    isLoading = false,
    isDisabled = false,
    onClick,
    onComplete: _onComplete,
    index = 0,
    className,
    children,
}: ComponentNameProps) {
    // ============================================================================
    // STATE & HOOKS
    // ============================================================================

    // TODO: Add your state here
    // const [internalState, setInternalState] = React.useState<boolean>(false);

    // ============================================================================
    // EFFECTS
    // ============================================================================

    React.useEffect(() => {
        // Side effects go here
        logger.ui.info("Component mounted", { title, variant });

        return () => {
            // Cleanup
            logger.ui.info("Component unmounted", { title });
        };
    }, [title, variant]);

    // ============================================================================
    // HANDLERS
    // ============================================================================

    const handleClick = React.useCallback(() => {
        if (isDisabled || isLoading) return;

        logger.ui.info("Component clicked", { title });
        onClick?.();
    }, [isDisabled, isLoading, onClick, title]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        },
        [handleClick]
    );

    // ============================================================================
    // COMPUTED VALUES
    // ============================================================================

    const variantStyles = {
        default: "bg-white/5 text-white border-white/10",
        primary: "bg-[#97d8c4] text-[#04282F] border-[#97d8c4]",
        secondary: "bg-white/10 text-white border-white/20",
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg",
    };

    // ============================================================================
    // CONDITIONAL RENDERING
    // ============================================================================

    if (isLoading) {
        return (
            <div className={cn("flex items-center justify-center p-4", className)}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#97d8c4]" />
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    // ============================================================================
    // MAIN RENDER
    // ============================================================================

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={onClick ? "button" : undefined}
            tabIndex={onClick && !isDisabled ? 0 : undefined}
            aria-label={title}
            aria-disabled={isDisabled}
            className={cn(
                // Base styles
                "rounded-lg border transition-all duration-200",

                // Variant styles
                variantStyles[variant],

                // Size styles
                sizeStyles[size],

                // Interactive states
                onClick &&
                    !isDisabled && [
                        "cursor-pointer",
                        "hover:bg-white/10 hover:border-[#97d8c4]/30",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#97d8c4]",
                    ],

                // Disabled state
                isDisabled && "opacity-50 cursor-not-allowed",

                // Custom className
                className
            )}
        >
            {/* Component content */}
            <div className="flex items-center gap-3">
                {/* TODO: Add your icon here */}
                <h3 className="font-semibold">{title}</h3>
            </div>

            {children && <div className="mt-3">{children}</div>}
        </motion.div>
    );
}

// ============================================================================
// DISPLAY NAME (for debugging)
// ============================================================================

ComponentName.displayName = "ComponentName";

// ============================================================================
// NOTES & REFERENCES
// ============================================================================

/**
 * Implementation Notes:
 * - Uses framer-motion for animations
 * - Follows accessibility best practices (ARIA labels, keyboard navigation)
 * - Supports multiple variants and sizes via CVA pattern
 * - Logs interactions for observability
 * - Memoizes callbacks for performance
 *
 * Related Components:
 * - RelatedComponent1
 * - RelatedComponent2
 *
 * API Endpoints:
 * - GET /api/resource
 * - POST /api/resource
 *
 * @see /design-system/GUIDELINES.md - Component Design
 * @see /design-system/existing-patterns.json - Component patterns
 */
