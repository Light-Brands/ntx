/**
 * Server-side utilities for diagram rendering
 */

import type { Diagram } from '@/types/document'

/**
 * Prepare diagram for rendering (sanitize and validate)
 */
export function prepareDiagramForRendering(diagram: Diagram): {
  content: string
  safe: boolean
  warnings: string[]
} {
  const warnings: string[] = []
  let content = diagram.content
  let safe = true

  // Check for potentially unsafe content
  if (content.includes('javascript:')) {
    warnings.push('Contains javascript: protocol')
    content = content.replace(/javascript:/gi, '')
    safe = false
  }

  // Check for data URIs
  if (content.includes('data:')) {
    warnings.push('Contains data URI')
    safe = false
  }

  // Validate basic structure
  const lines = content.split('\n')
  if (lines.length === 0) {
    warnings.push('Empty diagram')
    safe = false
  }

  return {
    content,
    safe,
    warnings,
  }
}

/**
 * Generate SVG export configuration
 */
export function getSvgExportConfig() {
  return {
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    useMaxWidth: true,
  }
}

/**
 * Generate PNG export configuration
 */
export function getPngExportConfig() {
  return {
    ...getSvgExportConfig(),
    width: 1920,
    height: 1080,
    scale: 2, // For high-DPI displays
  }
}

/**
 * Extract all unique diagram types from a collection
 */
export function getUniqueDiagramTypes(diagrams: Diagram[]): string[] {
  const types = new Set<string>()
  
  diagrams.forEach(diagram => {
    const firstLine = diagram.content.split('\n')[0].trim()
    const typeMatch = firstLine.match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|journey)/)
    
    if (typeMatch) {
      types.add(typeMatch[1])
    }
  })
  
  return Array.from(types).sort()
}

