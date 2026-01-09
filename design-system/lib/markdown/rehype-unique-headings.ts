import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

/**
 * Rehype plugin to ensure all heading IDs are unique
 */
export function rehypeUniqueHeadings() {
  return (tree: Root) => {
    const usedIds = new Map<string, number>()

    visit(tree, 'element', (node: Element) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        if (node.properties && node.properties.id) {
          const baseId = String(node.properties.id)
          
          // Check if this ID has been used before
          if (usedIds.has(baseId)) {
            const count = usedIds.get(baseId)! + 1
            usedIds.set(baseId, count)
            // Append number to make it unique
            node.properties.id = `${baseId}-${count}`
          } else {
            // First occurrence of this ID
            usedIds.set(baseId, 0)
          }
        }
      }
    })
  }
}

