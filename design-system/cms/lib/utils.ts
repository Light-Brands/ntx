import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (date: Date | string | null | undefined) => {
  // Handle null/undefined
  if (!date) {
    return 'N/A';
  }
  
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if valid date
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObj);
};

/**
 * Strip HTML tags from a string
 */
export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/gi, ' ').trim();
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: string | Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) > 1 ? 's' : ''} ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) > 1 ? 's' : ''} ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) > 1 ? 's' : ''} ago`;
  return formatDate(new Date(date));
}

/**
 * Estimate read time from content
 */
export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = stripHtmlTags(content);
  const wordCount = text.split(/\s+/).filter(w => w).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min${minutes > 1 ? 's' : ''} read`;
}