import type { Document } from '@/types/document'
import { parseMarkdown } from './parser'
import { calculateReadingTime } from '@/lib/utils'

/**
 * Process a markdown file into a complete Document object
 */
export async function processDocument(
  slug: string,
  path: string,
  source: string
): Promise<Document> {
  const parsed = await parseMarkdown(source)
  
  return {
    slug,
    path,
    metadata: parsed.metadata,
    content: parsed.content,
    rawContent: parsed.rawContent,
    headings: parsed.headings,
    links: parsed.links,
    diagrams: parsed.diagrams,
    wordCount: parsed.wordCount,
    readingTime: calculateReadingTime(parsed.wordCount),
  }
}

/**
 * Extract cross-references from document links
 */
export function extractCrossReferences(document: Document): string[] {
  return document.links
    .filter(link => link.type === 'internal')
    .map(link => link.href)
    .filter((href, index, self) => self.indexOf(href) === index) // unique
}

/**
 * Check if document has specific tag
 */
export function hasTag(document: Document, tag: string): boolean {
  return document.metadata.tags?.includes(tag) ?? false
}

/**
 * Check if document is in specific category
 */
export function isInCategory(document: Document, category: string): boolean {
  return document.metadata.category === category
}

/**
 * Check if document belongs to specific epic
 */
export function belongsToEpic(document: Document, epic: string): boolean {
  return document.metadata.epic === epic
}

/**
 * Get document excerpt for previews
 */
export function getExcerpt(document: Document, maxLength: number = 200): string {
  // Remove HTML tags and get plain text
  const plainText = document.rawContent
    .replace(/^#{1,6}\s+.+$/gm, '') // Remove headings
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .trim()
  
  // Find first paragraph
  const firstParagraph = plainText.split('\n\n')[0]
  
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }
  
  return firstParagraph.slice(0, maxLength).trim() + '...'
}

/**
 * Get all unique tags from multiple documents
 */
export function getAllTags(documents: Document[]): string[] {
  const tags = new Set<string>()
  
  documents.forEach(doc => {
    doc.metadata.tags?.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

/**
 * Group documents by category
 */
export function groupByCategory(documents: Document[]): Record<string, Document[]> {
  const grouped: Record<string, Document[]> = {}
  
  documents.forEach(doc => {
    const category = doc.metadata.category || 'uncategorized'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(doc)
  })
  
  return grouped
}

/**
 * Group documents by epic
 */
export function groupByEpic(documents: Document[]): Record<string, Document[]> {
  const grouped: Record<string, Document[]> = {}
  
  documents.forEach(doc => {
    const epic = doc.metadata.epic || 'no-epic'
    if (!grouped[epic]) {
      grouped[epic] = []
    }
    grouped[epic].push(doc)
  })
  
  return grouped
}

/**
 * Sort documents by various criteria
 */
export function sortDocuments(
  documents: Document[],
  sortBy: 'title' | 'date' | 'wordCount' = 'title'
): Document[] {
  return [...documents].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.metadata.title.localeCompare(b.metadata.title)
      case 'date':
        const dateA = a.metadata.lastUpdated ? new Date(a.metadata.lastUpdated).getTime() : 0
        const dateB = b.metadata.lastUpdated ? new Date(b.metadata.lastUpdated).getTime() : 0
        return dateB - dateA // Most recent first
      case 'wordCount':
        return b.wordCount - a.wordCount // Longest first
      default:
        return 0
    }
  })
}

