import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

/**
 * Rehype plugin to remove .md and .mdx extensions from internal links
 */
export function rehypeRemoveMdExtension() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        const href = String(node.properties.href)
        
        // Only process internal links (not external URLs)
        if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('#')) {
          // Remove .md and .mdx extensions
          node.properties.href = href.replace(/\.mdx?$/i, '')
        }
      }
    })
  }
}

