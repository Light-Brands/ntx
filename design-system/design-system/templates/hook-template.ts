/**
 * USE FEATURE STATE HOOK
 * ======================
 *
 * Custom hook for managing feature-specific state and logic.
 * Encapsulates data fetching, state management, and business logic.
 *
 * Usage:
 * ```tsx
 * const {
 *   data,
 *   isLoading,
 *   error,
 *   refresh,
 *   updateItem,
 *   deleteItem
 * } = useFeatureState(featureId);
 * ```
 *
 * @see /design-system/GUIDELINES.md for hook patterns
 */

// External packages
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Sentry from "@sentry/nextjs";

// Internal utilities
import { logger } from "@/utils/unified-logger";

// Types
// TODO: Replace with your actual types
// import type { DataType, UpdateDataInput, CreateDataInput } from "@/types/feature";
type DataType = Record<string, unknown> & { id: string };
type UpdateDataInput = Partial<DataType>;
type CreateDataInput = Omit<DataType, "id">;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Hook return type
 */
interface UseFeatureStateReturn {
    // Data
    data: DataType[];
    currentItem: DataType | null;

    // Loading states
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;

    // Error states
    error: string | null;

    // Actions
    refresh: () => Promise<void>;
    loadItem: (id: string) => Promise<void>;
    createItem: (input: CreateDataInput) => Promise<DataType | null>;
    updateItem: (id: string, input: UpdateDataInput) => Promise<boolean>;
    deleteItem: (id: string) => Promise<boolean>;
    clearError: () => void;

    // Computed values
    hasData: boolean;
    itemCount: number;
}

/**
 * Hook options
 */
interface UseFeatureStateOptions {
    /** Auto-fetch data on mount */
    autoFetch?: boolean;

    /** Fetch interval in milliseconds (0 = disabled) */
    refetchInterval?: number;

    /** Filter options */
    filters?: Record<string, unknown>;

    /** Callback when data changes */
    onDataChange?: (data: DataType[]) => void;

    /** Callback on errors */
    onError?: (error: string) => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for feature state management
 *
 * @param featureId - Optional ID to load specific feature data
 * @param options - Configuration options
 * @returns Object containing state, data, and action functions
 */
export function useFeatureState(
    featureId?: string,
    options: UseFeatureStateOptions = {}
): UseFeatureStateReturn {
    const {
        autoFetch = true,
        refetchInterval = 0,
        filters = {},
        onDataChange,
        onError,
    } = options;

    // ============================================================================
    // STATE
    // ============================================================================

    // Data state
    const [data, setData] = useState<DataType[]>([]);
    const [currentItem, setCurrentItem] = useState<DataType | null>(null);

    // Loading states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Error state
    const [error, setError] = useState<string | null>(null);

    // ============================================================================
    // COMPUTED VALUES
    // ============================================================================

    const hasData = useMemo(() => data.length > 0, [data]);
    const itemCount = useMemo(() => data.length, [data]);

    // ============================================================================
    // DATA FETCHING
    // ============================================================================

    /**
     * Fetch all data with optional filters
     */
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Build query parameters
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            });

            logger.api.info("Fetching feature data", { featureId, filters });

            const url = featureId
                ? `/api/feature/${featureId}?${params}`
                : `/api/feature?${params}`;

            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to fetch data");
            }

            if (result.success) {
                const fetchedData = result.data || [];
                setData(fetchedData);
                onDataChange?.(fetchedData);

                logger.api.info("Data fetched successfully", {
                    count: fetchedData.length,
                });
            } else {
                throw new Error(result.error || "Unknown error");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch data";

            logger.api.error("Failed to fetch data", { error: err });

            Sentry.captureException(err, {
                tags: { hook: "useFeatureState", action: "fetch" },
                extra: { featureId, filters },
            });

            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [featureId, filters, onDataChange, onError]);

    /**
     * Load a specific item by ID
     */
    const loadItem = useCallback(
        async (id: string) => {
            try {
                setIsLoading(true);
                setError(null);

                logger.api.info("Loading item", { id });

                const response = await fetch(`/api/feature/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to load item");
                }

                if (result.success) {
                    setCurrentItem(result.data);
                    logger.api.info("Item loaded successfully", { id });
                } else {
                    throw new Error(result.error || "Unknown error");
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to load item";

                logger.api.error("Failed to load item", { error: err, id });

                Sentry.captureException(err, {
                    tags: { hook: "useFeatureState", action: "loadItem" },
                    extra: { id },
                });

                setError(errorMessage);
                onError?.(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        [onError]
    );

    // ============================================================================
    // CRUD OPERATIONS
    // ============================================================================

    /**
     * Create a new item
     */
    const createItem = useCallback(
        async (input: CreateDataInput): Promise<DataType | null> => {
            try {
                setIsCreating(true);
                setError(null);

                logger.api.info("Creating item", { input });

                const response = await fetch("/api/feature", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(input),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to create item");
                }

                if (result.success && result.data) {
                    // Add to local state
                    setData((prev) => [result.data, ...prev]);

                    logger.api.info("Item created successfully", {
                        id: result.data.id,
                    });

                    return result.data;
                } else {
                    throw new Error(result.error || "Unknown error");
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to create item";

                logger.api.error("Failed to create item", { error: err });

                Sentry.captureException(err, {
                    tags: { hook: "useFeatureState", action: "create" },
                    extra: { input },
                });

                setError(errorMessage);
                onError?.(errorMessage);

                return null;
            } finally {
                setIsCreating(false);
            }
        },
        [onError]
    );

    /**
     * Update an existing item
     */
    const updateItem = useCallback(
        async (id: string, input: UpdateDataInput): Promise<boolean> => {
            try {
                setIsUpdating(true);
                setError(null);

                logger.api.info("Updating item", { id, input });

                const response = await fetch(`/api/feature/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(input),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to update item");
                }

                if (result.success) {
                    // Update local state
                    setData((prev: DataType[]) =>
                        prev.map((item: DataType) =>
                            item.id === id ? { ...item, ...result.data } : item
                        )
                    );

                    if (currentItem?.id === id) {
                        setCurrentItem((prev) =>
                            prev ? { ...prev, ...result.data } : null
                        );
                    }

                    logger.api.info("Item updated successfully", { id });

                    return true;
                } else {
                    throw new Error(result.error || "Unknown error");
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to update item";

                logger.api.error("Failed to update item", { error: err, id });

                Sentry.captureException(err, {
                    tags: { hook: "useFeatureState", action: "update" },
                    extra: { id, input },
                });

                setError(errorMessage);
                onError?.(errorMessage);

                return false;
            } finally {
                setIsUpdating(false);
            }
        },
        [currentItem, onError]
    );

    /**
     * Delete an item
     */
    const deleteItem = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                setIsDeleting(true);
                setError(null);

                logger.api.info("Deleting item", { id });

                const response = await fetch(`/api/feature/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to delete item");
                }

                if (result.success) {
                    // Remove from local state
                    setData((prev) => prev.filter((item) => item.id !== id));

                    if (currentItem?.id === id) {
                        setCurrentItem(null);
                    }

                    logger.api.info("Item deleted successfully", { id });

                    return true;
                } else {
                    throw new Error(result.error || "Unknown error");
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to delete item";

                logger.api.error("Failed to delete item", { error: err, id });

                Sentry.captureException(err, {
                    tags: { hook: "useFeatureState", action: "delete" },
                    extra: { id },
                });

                setError(errorMessage);
                onError?.(errorMessage);

                return false;
            } finally {
                setIsDeleting(false);
            }
        },
        [currentItem, onError]
    );

    /**
     * Refresh data (alias for fetchData)
     */
    const refresh = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // ============================================================================
    // EFFECTS
    // ============================================================================

    // Auto-fetch on mount
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);

    // Polling interval
    useEffect(() => {
        if (refetchInterval > 0) {
            const interval = setInterval(() => {
                fetchData();
            }, refetchInterval);

            return () => clearInterval(interval);
        }
        return undefined;
    }, [refetchInterval, fetchData]);

    // ============================================================================
    // RETURN
    // ============================================================================

    return {
        // Data
        data,
        currentItem,

        // Loading states
        isLoading,
        isCreating,
        isUpdating,
        isDeleting,

        // Error state
        error,

        // Actions
        refresh,
        loadItem,
        createItem,
        updateItem,
        deleteItem,
        clearError,

        // Computed values
        hasData,
        itemCount,
    };
}

// ============================================================================
// NOTES & REFERENCES
// ============================================================================

/**
 * Implementation Notes:
 * - Encapsulates all feature-specific state logic
 * - Provides comprehensive CRUD operations
 * - Includes loading and error states for each operation
 * - Supports auto-fetching and polling
 * - Integrates with logging and error tracking
 * - Uses proper TypeScript typing
 * - Memoizes computed values for performance
 *
 * Usage Patterns:
 * - Basic: const { data, isLoading } = useFeatureState();
 * - With filters: useFeatureState(undefined, { filters: { status: 'active' } });
 * - With callbacks: useFeatureState(undefined, { onDataChange: handleChange });
 *
 * Related Hooks:
 * - useAuth
 * - useConversationState
 *
 * @see /design-system/GUIDELINES.md - Hook patterns
 * @see /design-system/existing-patterns.json - Hook examples
 */
