import type { Document } from '@/types/document'

/**
 * Simple in-memory cache for documents
 * In production, this could be Redis or similar
 */
class DocumentCache {
  private cache: Map<string, { data: Document; timestamp: number }>
  private ttl: number // Time to live in milliseconds

  constructor(ttlMinutes: number = 60) {
    this.cache = new Map()
    this.ttl = ttlMinutes * 60 * 1000
  }

  /**
   * Get document from cache
   */
  get(key: string): Document | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    // Check if expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  /**
   * Set document in cache
   */
  set(key: string, document: Document): void {
    this.cache.set(key, {
      data: document,
      timestamp: Date.now(),
    })
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Delete document from cache
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): void {
    const now = Date.now()
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Export singleton instance
export const documentCache = new DocumentCache(60) // 60 minutes TTL

// Cleanup expired entries every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    documentCache.cleanup()
  }, 10 * 60 * 1000)
}

/**
 * Cache key generators
 */
export function getCacheKey(type: 'document' | 'list' | 'tree', identifier: string): string {
  return `${type}:${identifier}`
}

/**
 * Cache wrapper for document operations
 */
export async function cachedOperation<T>(
  key: string,
  operation: () => Promise<T>,
  cache: boolean = true
): Promise<T> {
  if (!cache) {
    return operation()
  }

  const cached = documentCache.get(key) as T | null
  if (cached) {
    return cached
  }

  const result = await operation()
  documentCache.set(key, result as Document)
  return result
}

