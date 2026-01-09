import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

/**
 * Rehype plugin to mark Mermaid code blocks for client-side rendering
 */
export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'code' &&
        node.properties &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('language-mermaid')
      ) {
        // Change the parent pre element to have a special class
        node.properties.className = ['language-mermaid', 'mermaid-code']
        node.properties['data-mermaid'] = 'true'
      }
    })
  }
}

