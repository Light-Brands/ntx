import type { Diagram } from '@/types/document'

/**
 * Extract all Mermaid diagrams from markdown content
 */
export function extractMermaidDiagrams(content: string): Diagram[] {
  const mermaidRegex = /```mermaid\n([\s\S]*?)```/g
  const diagrams: Diagram[] = []
  let match

  while ((match = mermaidRegex.exec(content)) !== null) {
    const diagramContent = match[1].trim()
    
    diagrams.push({
      type: 'mermaid',
      content: diagramContent,
      caption: extractDiagramCaption(content, match.index),
    })
  }

  return diagrams
}

/**
 * Extract caption for a diagram (usually text right after the code block)
 */
function extractDiagramCaption(content: string, diagramIndex: number): string | undefined {
  const afterDiagram = content.slice(diagramIndex)
  const codeBlockEnd = afterDiagram.indexOf('```') + 3
  const nextLine = afterDiagram.slice(codeBlockEnd).split('\n')[1]
  
  // Check if next line looks like a caption (starts with italic or bold)
  if (nextLine && (nextLine.startsWith('*') || nextLine.startsWith('_'))) {
    return nextLine.replace(/^[*_]+|[*_]+$/g, '').trim()
  }
  
  return undefined
}

/**
 * Replace Mermaid diagrams in content with placeholders for rendering
 */
export function replaceMermaidWithPlaceholders(content: string): string {
  let index = 0
  return content.replace(/```mermaid\n([\s\S]*?)```/g, () => {
    const placeholder = `<div data-mermaid-diagram="${index}"></div>`
    index++
    return placeholder
  })
}

/**
 * Get diagram type from Mermaid content
 */
export function getDiagramType(content: string): string {
  const firstLine = content.split('\n')[0].trim()
  const typeMatch = firstLine.match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|journey)/)
  
  if (typeMatch) {
    return typeMatch[1]
  }
  
  return 'unknown'
}

/**
 * Validate Mermaid syntax (basic check)
 */
export function validateMermaidSyntax(content: string): { valid: boolean; error?: string } {
  const lines = content.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) {
    return { valid: false, error: 'Empty diagram' }
  }
  
  const firstLine = lines[0].trim()
  const validTypes = [
    'graph',
    'flowchart',
    'sequenceDiagram',
    'classDiagram',
    'stateDiagram',
    'erDiagram',
    'gantt',
    'pie',
    'journey',
  ]
  
  const hasValidType = validTypes.some(type => firstLine.startsWith(type))
  
  if (!hasValidType) {
    return { valid: false, error: 'Invalid diagram type' }
  }
  
  return { valid: true }
}

/**
 * Count diagrams by type in a document
 */
export function countDiagramsByType(diagrams: Diagram[]): Record<string, number> {
  const counts: Record<string, number> = {}
  
  diagrams.forEach(diagram => {
    const type = getDiagramType(diagram.content)
    counts[type] = (counts[type] || 0) + 1
  })
  
  return counts
}

