import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200)
}

/**
 * Slugify a string for use in URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Truncate text to a specific length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Get epic number from epic ID (e.g., 'epic-01' -> 1)
 */
export function getEpicNumber(epicId: string): number {
  const match = epicId.match(/epic-(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/**
 * Get category color for UI elements
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    epic: 'text-primary bg-primary/10',
    architecture: 'text-sky-blue bg-sky-blue/10',
    brand: 'text-soft-aqua bg-soft-aqua/10',
    operations: 'text-midnight-blue bg-midnight-blue/10',
    design: 'text-accent bg-accent/10',
    development: 'text-vibe-graphite bg-vibe-graphite/10',
  }
  return colors[category] || 'text-cool-grey bg-cool-grey/10'
}

/**
 * Get status color for UI elements
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'not-started': 'text-cool-grey bg-cool-grey/10',
    'in-progress': 'text-sky-blue bg-sky-blue/10',
    completed: 'text-green-600 bg-green-100',
    blocked: 'text-red-600 bg-red-100',
  }
  return colors[status] || 'text-cool-grey bg-cool-grey/10'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Get file extension from path
 */
export function getFileExtension(path: string): string {
  const parts = path.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

/**
 * Check if a path is a markdown file
 */
export function isMarkdownFile(path: string): boolean {
  const ext = getFileExtension(path).toLowerCase()
  return ext === 'md' || ext === 'mdx' || ext === 'mdc'
}

