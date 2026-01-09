import type { Document } from '@/types/document'
import type { CrossReference } from '@/types/graph'

/**
 * Extract cross-references from all documents
 */
export function extractCrossReferences(documents: Document[]): Map<string, CrossReference[]> {
  const references = new Map<string, CrossReference[]>()

  documents.forEach(doc => {
    const docRefs: CrossReference[] = []

    doc.links.forEach(link => {
      if (link.type === 'internal') {
        // Find the referenced document
        const referencedDoc = findDocumentByPath(documents, link.href)
        
        if (referencedDoc) {
          docRefs.push({
            documentId: referencedDoc.slug,
            documentTitle: referencedDoc.metadata.title,
            documentPath: referencedDoc.path,
            type: 'references',
            context: link.text,
          })
        }
      }
    })

    references.set(doc.slug, docRefs)
  })

  return references
}

/**
 * Build bidirectional references (both "references" and "referenced-by")
 */
export function buildBidirectionalReferences(documents: Document[]): Map<string, {
  references: CrossReference[]
  referencedBy: CrossReference[]
}> {
  const allRefs = new Map<string, {
    references: CrossReference[]
    referencedBy: CrossReference[]
  }>()

  // Initialize all documents
  documents.forEach(doc => {
    allRefs.set(doc.slug, { references: [], referencedBy: [] })
  })

  // Extract forward references
  documents.forEach(doc => {
    doc.links.forEach(link => {
      if (link.type === 'internal') {
        const referencedDoc = findDocumentByPath(documents, link.href)
        
        if (referencedDoc) {
          const docRefs = allRefs.get(doc.slug)!
          const referencedRefs = allRefs.get(referencedDoc.slug)!

          // Add to references list
          docRefs.references.push({
            documentId: referencedDoc.slug,
            documentTitle: referencedDoc.metadata.title,
            documentPath: referencedDoc.path,
            type: 'references',
            context: link.text,
          })

          // Add to referenced-by list
          referencedRefs.referencedBy.push({
            documentId: doc.slug,
            documentTitle: doc.metadata.title,
            documentPath: doc.path,
            type: 'referenced-by',
            context: link.text,
          })
        }
      }
    })
  })

  return allRefs
}

/**
 * Find most connected documents
 */
export function findMostConnectedDocuments(documents: Document[], limit: number = 10): Array<{
  document: Document
  connectionCount: number
}> {
  const bidirectionalRefs = buildBidirectionalReferences(documents)
  
  const connections = documents.map(doc => {
    const refs = bidirectionalRefs.get(doc.slug)!
    return {
      document: doc,
      connectionCount: refs.references.length + refs.referencedBy.length,
    }
  })

  return connections
    .sort((a, b) => b.connectionCount - a.connectionCount)
    .slice(0, limit)
}

/**
 * Find orphaned documents (no references in or out)
 */
export function findOrphanedDocuments(documents: Document[]): Document[] {
  const bidirectionalRefs = buildBidirectionalReferences(documents)
  
  return documents.filter(doc => {
    const refs = bidirectionalRefs.get(doc.slug)!
    return refs.references.length === 0 && refs.referencedBy.length === 0
  })
}

/**
 * Find document by path (handles various path formats)
 */
function findDocumentByPath(documents: Document[], path: string): Document | undefined {
  // Normalize path
  const normalizedPath = path
    .replace(/^\/docs\//, '')
    .replace(/^\.\//, '')
    .replace(/^..\//, '')
    .replace(/\.md$/, '')
    .replace(/\.mdx$/, '')

  return documents.find(doc => {
    const docPath = doc.slug.toLowerCase()
    const searchPath = normalizedPath.toLowerCase()
    
    return docPath === searchPath || 
           docPath.endsWith(searchPath) ||
           docPath.includes(searchPath)
  })
}

/**
 * Calculate reference density (average references per document)
 */
export function calculateReferenceDensity(documents: Document[]): number {
  const bidirectionalRefs = buildBidirectionalReferences(documents)
  
  let totalRefs = 0
  bidirectionalRefs.forEach(refs => {
    totalRefs += refs.references.length
  })
  
  return documents.length > 0 ? totalRefs / documents.length : 0
}

