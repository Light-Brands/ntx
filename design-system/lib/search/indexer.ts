import FlexSearch from 'flexsearch'
import type { Document } from '@/types/document'
import type { SearchIndex } from '@/types/search'

/**
 * Build search index from documents
 */
export function buildSearchIndex(documents: Document[]) {
  const index = new FlexSearch.Document({
    tokenize: 'forward',
    cache: true,
    document: {
      id: 'id',
      index: ['title', 'content', 'headings'],
      store: ['title', 'path', 'category', 'epic', 'tags', 'status'],
    },
  })

  const searchData: SearchIndex[] = documents.map((doc) => ({
    id: doc.slug,
    title: doc.metadata.title,
    content: doc.rawContent,
    headings: doc.headings.map(h => h.text).join(' '),
    path: doc.path,
    category: doc.metadata.category || '',
    epic: doc.metadata.epic || '',
    tags: doc.metadata.tags || [],
    status: doc.metadata.status,
  }))

  searchData.forEach((data) => {
    index.add(data)
  })

  return { index, data: searchData }
}

/**
 * Serialize search index for client-side use
 */
export function serializeSearchIndex(documents: Document[]): string {
  const searchData: SearchIndex[] = documents.map((doc) => ({
    id: doc.slug,
    title: doc.metadata.title,
    content: doc.rawContent.substring(0, 500), // Truncate for size
    headings: doc.headings.map(h => h.text).join(' '),
    path: doc.path,
    category: doc.metadata.category || '',
    epic: doc.metadata.epic || '',
    tags: doc.metadata.tags || [],
    status: doc.metadata.status,
  }))

  return JSON.stringify(searchData)
}

/**
 * Extract keywords from document for indexing
 */
export function extractKeywords(document: Document): string[] {
  const keywords = new Set<string>()
  
  // Add title words
  document.metadata.title.split(/\s+/).forEach(word => {
    if (word.length > 3) {
      keywords.add(word.toLowerCase())
    }
  })
  
  // Add heading words
  document.headings.forEach(heading => {
    heading.text.split(/\s+/).forEach(word => {
      if (word.length > 3) {
        keywords.add(word.toLowerCase())
      }
    })
  })
  
  // Add tags
  document.metadata.tags?.forEach(tag => {
    keywords.add(tag.toLowerCase())
  })
  
  return Array.from(keywords)
}

/**
 * Calculate search weight for a document
 */
export function calculateSearchWeight(document: Document): number {
  let weight = 1.0
  
  // Boost by priority
  if (document.metadata.epic?.includes('00')) weight *= 1.5 // Foundation
  if (document.metadata.epic?.includes('01')) weight *= 1.4 // Mira
  
  // Boost by category
  if (document.metadata.category === 'epic') weight *= 1.3
  if (document.metadata.category === 'architecture') weight *= 1.2
  
  // Boost by recency
  if (document.metadata.lastUpdated) {
    const daysOld = (Date.now() - new Date(document.metadata.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
    if (daysOld < 30) weight *= 1.2
    else if (daysOld < 90) weight *= 1.1
  }
  
  return weight
}

