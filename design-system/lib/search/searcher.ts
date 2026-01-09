import type { SearchIndex, SearchResult, SearchFilters, SearchHighlight } from '@/types/search'

/**
 * Perform client-side search
 */
export function search(
  query: string,
  searchData: SearchIndex[],
  filters?: SearchFilters
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0)
  
  // Score each document
  const scored = searchData.map(item => {
    let score = 0
    const highlights: SearchHighlight[] = []
    
    // Title matching (highest weight)
    const titleLower = item.title.toLowerCase()
    if (titleLower.includes(queryLower)) {
      score += 100
      highlights.push({
        field: 'title',
        text: item.title,
        matches: findMatches(item.title, queryLower),
      })
    } else {
      // Partial word matches in title
      queryWords.forEach(word => {
        if (titleLower.includes(word)) {
          score += 50
        }
      })
    }
    
    // Content matching
    const contentLower = item.content.toLowerCase()
    const contentMatches = countOccurrences(contentLower, queryLower)
    score += contentMatches * 10
    
    if (contentMatches > 0) {
      highlights.push({
        field: 'content',
        text: extractSnippet(item.content, queryLower),
        matches: [],
      })
    }
    
    // Heading matching
    const headingsLower = item.headings.toLowerCase()
    if (headingsLower.includes(queryLower)) {
      score += 75
      highlights.push({
        field: 'heading',
        text: item.headings,
        matches: [],
      })
    }
    
    // Tag matching
    const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(queryLower))
    if (tagMatch) {
      score += 60
    }
    
    // Apply filters
    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(item.category)) {
          return null
        }
      }
      
      if (filters.epics && filters.epics.length > 0) {
        if (!filters.epics.includes(item.epic)) {
          return null
        }
      }
      
      if (filters.statuses && filters.statuses.length > 0) {
        if (!item.status || !filters.statuses.includes(item.status)) {
          return null
        }
      }
      
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => item.tags.includes(tag))
        if (!hasTag) {
          return null
        }
      }
    }
    
    if (score === 0) {
      return null
    }
    
    const result: SearchResult = {
      id: item.id,
      title: item.title,
      description: extractSnippet(item.content, queryLower, 150),
      path: item.path,
      slug: item.id,
      category: item.category,
      epic: item.epic,
      score,
      highlights,
      metadata: {
        tags: item.tags,
        status: item.status,
      },
    }
    
    return result
  }).filter((item): item is SearchResult => item !== null)
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)
  
  return scored
}

/**
 * Find match positions in text
 */
function findMatches(text: string, query: string): Array<{ start: number; end: number; text: string }> {
  const matches: Array<{ start: number; end: number; text: string }> = []
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()
  
  let index = 0
  while ((index = textLower.indexOf(queryLower, index)) !== -1) {
    matches.push({
      start: index,
      end: index + query.length,
      text: text.substring(index, index + query.length),
    })
    index += query.length
  }
  
  return matches
}

/**
 * Count occurrences of query in text
 */
function countOccurrences(text: string, query: string): number {
  const regex = new RegExp(query, 'gi')
  const matches = text.match(regex)
  return matches ? matches.length : 0
}

/**
 * Extract snippet around the match
 */
function extractSnippet(text: string, query: string, maxLength: number = 200): string {
  const queryLower = query.toLowerCase()
  const textLower = text.toLowerCase()
  const index = textLower.indexOf(queryLower)
  
  if (index === -1) {
    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '')
  }
  
  const start = Math.max(0, index - Math.floor(maxLength / 2))
  const end = Math.min(text.length, start + maxLength)
  
  let snippet = text.substring(start, end)
  
  if (start > 0) {
    snippet = '...' + snippet
  }
  if (end < text.length) {
    snippet = snippet + '...'
  }
  
  return snippet
}

/**
 * Get suggested searches based on common queries
 */
export function getSuggestedSearches(): string[] {
  return [
    'API endpoints',
    'database schema',
    'Mira personality',
    'brand colors',
    'testing strategy',
    'feature flags',
    'authentication',
    'user profiles',
    'practice tracking',
  ]
}

/**
 * Get popular tags
 */
export function getPopularTags(searchData: SearchIndex[]): string[] {
  const tagCounts = new Map<string, number>()
  
  searchData.forEach(item => {
    item.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([tag]) => tag)
}

