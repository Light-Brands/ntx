export interface DocumentMetadata {
  title: string
  description?: string
  epic?: string
  category?: 'epic' | 'architecture' | 'brand' | 'operations' | 'design' | 'development'
  tags?: string[]
  dependencies?: string[]
  status?: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  lastUpdated?: string
  author?: string
}

export interface Document {
  slug: string
  path: string
  metadata: DocumentMetadata
  content: string
  rawContent: string
  headings: Heading[]
  links: Link[]
  diagrams: Diagram[]
  wordCount: number
  readingTime: number
}

export interface Heading {
  id: string
  text: string
  level: number
  slug: string
}

export interface Link {
  text: string
  href: string
  type: 'internal' | 'external' | 'anchor'
}

export interface Diagram {
  type: 'mermaid'
  content: string
  caption?: string
}

export interface DocumentTree {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: DocumentTree[]
  metadata?: DocumentMetadata
}

export interface EpicInfo {
  id: string
  number: number
  name: string
  title: string
  timeline: string
  dependencies: string[]
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  priority: 'P0' | 'P1' | 'P2'
  description: string
  path: string
}

