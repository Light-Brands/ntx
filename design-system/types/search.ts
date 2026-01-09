export interface SearchResult {
  id: string
  title: string
  description: string
  path: string
  slug: string
  category: string
  epic?: string
  score: number
  highlights: SearchHighlight[]
  metadata: {
    tags?: string[]
    status?: string
    lastUpdated?: string
  }
}

export interface SearchHighlight {
  field: 'title' | 'content' | 'heading'
  text: string
  matches: HighlightMatch[]
}

export interface HighlightMatch {
  start: number
  end: number
  text: string
}

export interface SearchFilters {
  categories?: string[]
  epics?: string[]
  statuses?: string[]
  tags?: string[]
}

export interface SearchQuery {
  query: string
  filters?: SearchFilters
  limit?: number
  offset?: number
}

export interface SearchIndex {
  id: string
  title: string
  content: string
  headings: string
  path: string
  category: string
  epic: string
  tags: string[]
  status?: string
}

