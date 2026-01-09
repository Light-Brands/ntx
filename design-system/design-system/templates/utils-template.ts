/**
 * FEATURE UTILITIES
 * =================
 *
 * Utility functions for feature-specific operations.
 * Pure functions with no side effects.
 *
 * @see /design-system/GUIDELINES.md for utility patterns
 */

// External packages
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Internal utilities
import { logger } from "@/utils/unified-logger";

// Types
// TODO: Replace with your actual types from your feature's type file
// import type { DataType } from "@/types/feature";
type DataType = Record<string, unknown> & { name?: string; email?: string };

// ============================================================================
// TYPES
// ============================================================================

/**
 * Format options for display functions
 */
interface FormatOptions {
    /** Use short format */
    short?: boolean;
    /** Locale for formatting */
    locale?: string;
    /** Include time */
    includeTime?: boolean;
}

/**
 * Validation result
 */
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

/**
 * Merge Tailwind CSS classes with conflict resolution
 *
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @param inputs - Class names, arrays, or objects
 * @returns Merged class string
 *
 * @example
 * cn("px-2 py-1", { "bg-red-500": isError }, className)
 * // => "px-2 py-1 bg-red-500 custom-class"
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format a date for display
 *
 * @param date - Date to format (Date object or ISO string)
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date(), { short: true })
 * // => "Jan 15, 2024"
 *
 * formatDate("2024-01-15T10:30:00Z", { includeTime: true })
 * // => "January 15, 2024 at 10:30 AM"
 */
export function formatDate(date: Date | string, options: FormatOptions = {}): string {
    const { short = false, locale = "en-US", includeTime = false } = options;

    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;

        if (isNaN(dateObj.getTime())) {
            logger.general.warn("Invalid date provided to formatDate", { date });
            return "Invalid date";
        }

        const dateFormat: Intl.DateTimeFormatOptions = short
            ? { month: "short", day: "numeric", year: "numeric" }
            : { month: "long", day: "numeric", year: "numeric" };

        const timeFormat: Intl.DateTimeFormatOptions = includeTime
            ? { hour: "numeric", minute: "2-digit" }
            : {};

        const formatter = new Intl.DateTimeFormat(locale, {
            ...dateFormat,
            ...timeFormat,
        });

        return formatter.format(dateObj);
    } catch (error) {
        logger.general.error("Error formatting date", { error, date });
        return "Invalid date";
    }
}

/**
 * Format a number with thousands separators
 *
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567)
 * // => "1,234,567"
 *
 * formatNumber(1234.5678, 2)
 * // => "1,234.57"
 */
export function formatNumber(value: number, decimals: number = 0): string {
    try {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    } catch (error) {
        logger.general.error("Error formatting number", { error, value });
        return String(value);
    }
}

/**
 * Format currency value
 *
 * @param value - Amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56)
 * // => "$1,234.56"
 *
 * formatCurrency(1234.56, "EUR")
 * // => "€1,234.56"
 */
export function formatCurrency(value: number, currency: string = "USD"): string {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
        }).format(value);
    } catch (error) {
        logger.general.error("Error formatting currency", { error, value });
        return `$${value.toFixed(2)}`;
    }
}

/**
 * Format a relative time string (e.g., "2 hours ago")
 *
 * @param date - Date to format (Date object or ISO string)
 * @returns Relative time string
 *
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000))
 * // => "1 hour ago"
 */
export function formatRelativeTime(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const now = new Date();
        const diffMs = now.getTime() - dateObj.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

        return formatDate(dateObj, { short: true });
    } catch (error) {
        logger.general.error("Error formatting relative time", { error, date });
        return "Unknown time";
    }
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate an email address
 *
 * @param email - Email to validate
 * @returns True if valid
 *
 * @example
 * isValidEmail("user@example.com") // => true
 * isValidEmail("invalid") // => false
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate a URL
 *
 * @param url - URL to validate
 * @returns True if valid
 *
 * @example
 * isValidUrl("https://example.com") // => true
 * isValidUrl("invalid") // => false
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate data object
 *
 * @param data - Data to validate
 * @returns Validation result with errors
 *
 * @example
 * validateData({ name: "", email: "invalid" })
 * // => { isValid: false, errors: ["Name is required", "Invalid email"] }
 */
export function validateData(data: Partial<DataType>): ValidationResult {
    const errors: string[] = [];

    // Add validation rules here
    if (!data.name || data.name.trim().length === 0) {
        errors.push("Name is required");
    }

    if (data.email && !isValidEmail(data.email)) {
        errors.push("Invalid email address");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Truncate string to max length with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 100)
 * @returns Truncated string
 *
 * @example
 * truncate("This is a long text", 10)
 * // => "This is a..."
 */
export function truncate(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
}

/**
 * Convert string to slug (URL-friendly format)
 *
 * @param text - Text to slugify
 * @returns Slugified string
 *
 * @example
 * slugify("Hello World!")
 * // => "hello-world"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize first letter of each word
 *
 * @param text - Text to capitalize
 * @returns Capitalized string
 *
 * @example
 * capitalize("hello world")
 * // => "Hello World"
 */
export function capitalize(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Group array items by a key
 *
 * @param array - Array to group
 * @param keyFn - Function to extract grouping key
 * @returns Object with grouped items
 *
 * @example
 * groupBy(users, user => user.role)
 * // => { admin: [...], user: [...] }
 */
export function groupBy<T>(
    array: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return array.reduce(
        (groups, item) => {
            const key = keyFn(item);
            return {
                ...groups,
                [key]: [...(groups[key] || []), item],
            };
        },
        {} as Record<string, T[]>
    );
}

/**
 * Remove duplicates from array
 *
 * @param array - Array with potential duplicates
 * @param keyFn - Function to extract unique key (optional)
 * @returns Array with unique items
 *
 * @example
 * unique([1, 2, 2, 3])
 * // => [1, 2, 3]
 *
 * unique(users, user => user.id)
 */
export function unique<T>(array: T[], keyFn?: (item: T) => string | number): T[] {
    if (!keyFn) {
        return Array.from(new Set(array));
    }

    const seen = new Set<string | number>();
    return array.filter((item) => {
        const key = keyFn(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * Sort array by multiple keys
 *
 * @param array - Array to sort
 * @param sortKeys - Array of sort configurations
 * @returns Sorted array
 *
 * @example
 * sortBy(users, [
 *   { key: user => user.name, order: 'asc' },
 *   { key: user => user.age, order: 'desc' }
 * ])
 */
export function sortBy<T>(
    array: T[],
    sortKeys: {
        key: (item: T) => string | number;
        order?: "asc" | "desc";
    }[]
): T[] {
    return [...array].sort((a, b) => {
        for (const { key, order = "asc" } of sortKeys) {
            const aVal = key(a);
            const bVal = key(b);

            if (aVal < bVal) return order === "asc" ? -1 : 1;
            if (aVal > bVal) return order === "asc" ? 1 : -1;
        }
        return 0;
    });
}

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

/**
 * Deep clone an object
 *
 * @param obj - Object to clone
 * @returns Cloned object
 *
 * @example
 * const cloned = deepClone(original)
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 *
 * @param obj - Object to check
 * @returns True if empty
 *
 * @example
 * isEmpty({}) // => true
 * isEmpty({ a: 1 }) // => false
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0;
}

/**
 * Pick specific keys from object
 *
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only specified keys
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * // => { a: 1, c: 3 }
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Omit specific keys from object
 *
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without specified keys
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b'])
 * // => { a: 1, c: 3 }
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}

// ============================================================================
// ASYNC UTILITIES
// ============================================================================

/**
 * Delay execution for specified milliseconds
 *
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 *
 * @example
 * await delay(1000) // Wait 1 second
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async function with exponential backoff
 *
 * @param fn - Async function to retry
 * @param maxAttempts - Maximum retry attempts (default: 3)
 * @param delayMs - Initial delay in milliseconds (default: 1000)
 * @returns Result of function
 *
 * @example
 * const data = await retry(() => fetchData(), 3, 1000)
 */
export async function retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));

            if (attempt < maxAttempts) {
                logger.general.warn(`Retry attempt ${attempt} failed, retrying...`, {
                    error: lastError.message,
                });
                await delay(delayMs * Math.pow(2, attempt - 1));
            }
        }
    }

    throw lastError;
}

// ============================================================================
// NOTES & REFERENCES
// ============================================================================

/**
 * Implementation Notes:
 * - All functions are pure with no side effects
 * - Functions are properly typed with TypeScript
 * - Includes comprehensive JSDoc documentation
 * - Uses proper error handling
 * - Integrates with logging system
 *
 * Categories:
 * - Class Name Utilities: cn()
 * - Formatting: formatDate, formatNumber, formatCurrency, formatRelativeTime
 * - Validation: isValidEmail, isValidUrl, validateData
 * - String: truncate, slugify, capitalize
 * - Array: groupBy, unique, sortBy
 * - Object: deepClone, isEmpty, pick, omit
 * - Async: delay, retry
 *
 * @see /design-system/GUIDELINES.md - Utility patterns
 * @see /design-system/existing-patterns.json - Utility examples
 */
