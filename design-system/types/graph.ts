export interface GraphNode {
  id: string
  label: string
  type: 'epic' | 'document' | 'category'
  category?: string
  epic?: string
  status?: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  path: string
  metadata?: {
    description?: string
    tags?: string[]
    wordCount?: number
  }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  type: 'reference' | 'dependency' | 'parent-child'
  label?: string
  bidirectional?: boolean
}

export interface DocumentGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface CrossReference {
  documentId: string
  documentTitle: string
  documentPath: string
  type: 'references' | 'referenced-by'
  context?: string
}

