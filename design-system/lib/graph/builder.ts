import type { Document } from '@/types/document'
import type { DocumentGraph, GraphNode, GraphEdge } from '@/types/graph'
import { buildBidirectionalReferences } from './extractor'

/**
 * Build document graph from all documents
 */
export function buildDocumentGraph(documents: Document[]): DocumentGraph {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const bidirectionalRefs = buildBidirectionalReferences(documents)

  // Create nodes
  documents.forEach(doc => {
    nodes.push({
      id: doc.slug,
      label: doc.metadata.title,
      type: doc.metadata.category === 'epic' ? 'epic' : 'document',
      category: doc.metadata.category,
      epic: doc.metadata.epic,
      status: doc.metadata.status,
      path: doc.path,
      metadata: {
        description: doc.metadata.description,
        tags: doc.metadata.tags,
        wordCount: doc.wordCount,
      },
    })
  })

  // Create edges
  const edgeSet = new Set<string>() // To avoid duplicates

  documents.forEach(doc => {
    const refs = bidirectionalRefs.get(doc.slug)

    if (refs) {
      refs.references.forEach(ref => {
        const edgeId = `${doc.slug}->${ref.documentId}`
        if (!edgeSet.has(edgeId)) {
          edges.push({
            id: edgeId,
            source: doc.slug,
            target: ref.documentId,
            type: 'reference',
            label: ref.context,
            bidirectional: false,
          })
          edgeSet.add(edgeId)
        }
      })
    }
  })

  return { nodes, edges }
}

/**
 * Build epic dependency graph
 */
export function buildEpicDependencyGraph(documents: Document[]): DocumentGraph {
  const epicDocs = documents.filter(doc => doc.metadata.category === 'epic')
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Create nodes
  epicDocs.forEach(doc => {
    nodes.push({
      id: doc.slug,
      label: doc.metadata.title,
      type: 'epic',
      category: 'epic',
      epic: doc.metadata.epic,
      status: doc.metadata.status,
      path: doc.path,
      metadata: {
        description: doc.metadata.description,
        tags: doc.metadata.tags,
      },
    })
  })

  // Create edges based on dependencies
  epicDocs.forEach(doc => {
    if (doc.metadata.dependencies) {
      doc.metadata.dependencies.forEach(dep => {
        const targetDoc = epicDocs.find(d => 
          d.metadata.epic?.includes(dep) || 
          d.metadata.title.includes(dep)
        )

        if (targetDoc) {
          edges.push({
            id: `${doc.slug}->${targetDoc.slug}`,
            source: doc.slug,
            target: targetDoc.slug,
            type: 'dependency',
            label: 'depends on',
            bidirectional: false,
          })
        }
      })
    }
  })

  return { nodes, edges }
}

/**
 * Build category-based graph
 */
export function buildCategoryGraph(documents: Document[]): DocumentGraph {
  const categories = ['epic', 'architecture', 'brand', 'operations', 'design', 'development']
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Create category nodes
  categories.forEach(category => {
    const categoryDocs = documents.filter(doc => doc.metadata.category === category)
    
    if (categoryDocs.length > 0) {
      nodes.push({
        id: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        type: 'category',
        category,
        path: '',
        metadata: {
          description: `${categoryDocs.length} documents`,
        },
      })
    }
  })

  // Create document nodes (limit to most connected)
  const mostConnected = documents
    .slice(0, 30) // Limit for visualization
    .filter(doc => doc.metadata.category)

  mostConnected.forEach(doc => {
    nodes.push({
      id: doc.slug,
      label: doc.metadata.title,
      type: 'document',
      category: doc.metadata.category,
      epic: doc.metadata.epic,
      status: doc.metadata.status,
      path: doc.path,
    })

    // Edge from document to category
    if (doc.metadata.category) {
      edges.push({
        id: `${doc.slug}->${doc.metadata.category}`,
        source: doc.slug,
        target: doc.metadata.category,
        type: 'parent-child',
        label: 'belongs to',
        bidirectional: false,
      })
    }
  })

  return { nodes, edges }
}

/**
 * Filter graph by category
 */
export function filterGraphByCategory(graph: DocumentGraph, category: string): DocumentGraph {
  const filteredNodes = graph.nodes.filter(node => node.category === category)
  const nodeIds = new Set(filteredNodes.map(n => n.id))
  
  const filteredEdges = graph.edges.filter(edge => 
    nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  }
}

/**
 * Filter graph by epic
 */
export function filterGraphByEpic(graph: DocumentGraph, epic: string): DocumentGraph {
  const filteredNodes = graph.nodes.filter(node => node.epic === epic)
  const nodeIds = new Set(filteredNodes.map(n => n.id))
  
  const filteredEdges = graph.edges.filter(edge => 
    nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  }
}

