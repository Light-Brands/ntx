import type { Document } from '@/types/document'
import { findOrphanedDocuments, calculateReferenceDensity } from '@/lib/graph/extractor'

export interface SpecHealthMetrics {
  totalDocuments: number
  totalPages: number
  totalWords: number
  averageDocumentLength: number
  orphanedDocuments: number
  brokenLinks: number
  documentationCoverage: Record<string, number>
  lastUpdatedDays: number
}

export interface ContentQualityMetrics {
  codeExamples: number
  diagramCount: number
  crossReferenceDensity: number
  documentationDepth: Record<number, number>
  tagCoverage: number
  descriptionCoverage: number
}

export interface ImplementationMetrics {
  overallCompletion: number
  epicCompletionBreakdown: Record<string, number>
  blockedItems: number
  daysSinceLastUpdate: number
  estimatedDaysToCompletion: number
}

/**
 * Calculate specification health metrics
 */
export function calculateSpecHealthMetrics(documents: Document[]): SpecHealthMetrics {
  const totalDocuments = documents.length
  const totalWords = documents.reduce((sum, doc) => sum + doc.wordCount, 0)
  const totalPages = Math.ceil(totalWords / 500) // Rough estimate: 500 words per page
  
  const averageDocumentLength = totalDocuments > 0 ? Math.round(totalWords / totalDocuments) : 0
  
  const orphaned = findOrphanedDocuments(documents)
  const orphanedDocuments = orphaned.length
  
  const brokenLinks = countBrokenLinks(documents)
  
  const documentationCoverage = calculateDocumentationCoverage(documents)
  
  const lastUpdatedDays = calculateDaysSinceLastUpdate(documents)

  return {
    totalDocuments,
    totalPages,
    totalWords,
    averageDocumentLength,
    orphanedDocuments,
    brokenLinks,
    documentationCoverage,
    lastUpdatedDays,
  }
}

/**
 * Calculate content quality metrics
 */
export function calculateContentQualityMetrics(documents: Document[]): ContentQualityMetrics {
  const codeExamples = countCodeExamples(documents)
  const diagramCount = documents.reduce((sum, doc) => sum + doc.diagrams.length, 0)
  const crossReferenceDensity = calculateReferenceDensity(documents)
  const documentationDepth = calculateDocumentationDepth(documents)
  
  const docsWithTags = documents.filter(doc => doc.metadata.tags && doc.metadata.tags.length > 0).length
  const tagCoverage = documents.length > 0 ? Math.round((docsWithTags / documents.length) * 100) : 0
  
  const docsWithDescription = documents.filter(doc => doc.metadata.description).length
  const descriptionCoverage = documents.length > 0 ? Math.round((docsWithDescription / documents.length) * 100) : 0

  return {
    codeExamples,
    diagramCount,
    crossReferenceDensity: Math.round(crossReferenceDensity * 10) / 10,
    documentationDepth,
    tagCoverage,
    descriptionCoverage,
  }
}

/**
 * Count broken links in documents
 */
function countBrokenLinks(documents: Document[]): number {
  const allPaths = new Set(documents.map(doc => doc.slug))
  let brokenCount = 0

  documents.forEach(doc => {
    doc.links.forEach(link => {
      if (link.type === 'internal') {
        const normalizedPath = link.href
          .replace(/^\/docs\//, '')
          .replace(/\.md$/, '')
          .replace(/\.mdx$/, '')
        
        if (!allPaths.has(normalizedPath)) {
          brokenCount++
        }
      }
    })
  })

  return brokenCount
}

/**
 * Calculate documentation coverage by category
 */
function calculateDocumentationCoverage(documents: Document[]): Record<string, number> {
  const coverage: Record<string, number> = {}
  
  documents.forEach(doc => {
    const category = doc.metadata.category || 'uncategorized'
    coverage[category] = (coverage[category] || 0) + 1
  })

  return coverage
}

/**
 * Calculate days since last update
 */
function calculateDaysSinceLastUpdate(documents: Document[]): number {
  const dates = documents
    .map(doc => doc.metadata.lastUpdated)
    .filter((date): date is string => !!date)
    .map(date => new Date(date).getTime())
  
  if (dates.length === 0) return 0
  
  const mostRecent = Math.max(...dates)
  const daysSince = Math.floor((Date.now() - mostRecent) / (1000 * 60 * 60 * 24))
  
  return daysSince
}

/**
 * Count code examples in documents
 */
function countCodeExamples(documents: Document[]): number {
  let count = 0
  
  documents.forEach(doc => {
    const codeBlocks = doc.rawContent.match(/```[\s\S]*?```/g)
    count += codeBlocks ? codeBlocks.length : 0
  })
  
  return count
}

/**
 * Calculate documentation depth (heading level distribution)
 */
function calculateDocumentationDepth(documents: Document[]): Record<number, number> {
  const depth: Record<number, number> = {}
  
  documents.forEach(doc => {
    doc.headings.forEach(heading => {
      depth[heading.level] = (depth[heading.level] || 0) + 1
    })
  })
  
  return depth
}

