import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'
import { rehypeRemoveMdExtension } from './rehype-remove-md-extension'
import { rehypeMermaid } from './rehype-mermaid'
import { rehypeUniqueHeadings } from './rehype-unique-headings'
import type { DocumentMetadata, Heading, Link, Diagram } from '@/types/document'

export interface ParsedMarkdown {
  metadata: DocumentMetadata
  content: string
  rawContent: string
  headings: Heading[]
  links: Link[]
  diagrams: Diagram[]
  wordCount: number
}

/**
 * Parse markdown file with frontmatter extraction
 */
export async function parseMarkdown(source: string): Promise<ParsedMarkdown> {
  // Extract frontmatter with error handling
  let data: Record<string, unknown> = {}
  let content = source
  
  try {
    const parsed = matter(source)
    data = parsed.data
    content = parsed.content
  } catch (_error) {
    // If frontmatter parsing fails, treat entire content as markdown
    // This handles files with invalid YAML or non-standard frontmatter
    content = source
  }
  
  // Parse metadata with safe defaults
  const validCategories = ['epic', 'architecture', 'brand', 'operations', 'design', 'development']
  const validStatuses = ['not-started', 'in-progress', 'completed', 'blocked']
  
  const metadata: DocumentMetadata = {
    title: typeof data.title === 'string' ? data.title : extractTitleFromContent(content) || 'Untitled',
    description: typeof data.description === 'string' ? data.description : undefined,
    epic: typeof data.epic === 'string' ? data.epic : undefined,
    category: typeof data.category === 'string' && validCategories.includes(data.category)
      ? data.category as 'epic' | 'architecture' | 'brand' | 'operations' | 'design' | 'development'
      : undefined,
    tags: Array.isArray(data.tags) ? data.tags as string[] : [],
    dependencies: Array.isArray(data.dependencies) ? data.dependencies as string[] : [],
    status: typeof data.status === 'string' && validStatuses.includes(data.status)
      ? data.status as 'not-started' | 'in-progress' | 'completed' | 'blocked'
      : undefined,
    lastUpdated: typeof data.lastUpdated === 'string' ? data.lastUpdated : undefined,
    author: typeof data.author === 'string' ? data.author : undefined,
  }

  // Extract structural elements from RAW content
  const headings = extractHeadings(content)
  const links = extractLinks(content)
  const diagrams = extractDiagrams(content)
  const wordCount = countWords(content)

  // Remove Mermaid blocks from content before processing to HTML
  // Replace with placeholders that we'll render separately
  const contentWithoutMermaid = content.replace(
    /```mermaid\n[\s\S]*?```/g,
    (match, offset) => `\n\n<!-- MERMAID_PLACEHOLDER_${diagrams.findIndex(d => match.includes(d.content))} -->\n\n`
  )

  // Process markdown to HTML (without Mermaid blocks)
  const htmlContent = await processMarkdown(contentWithoutMermaid)

  return {
    metadata,
    content: htmlContent,
    rawContent: content,
    headings,
    links,
    diagrams,
    wordCount,
  }
}

/**
 * Process markdown content to HTML with syntax highlighting and heading IDs
 */
async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug) // Automatically add IDs to headings
    .use(rehypeUniqueHeadings) // Ensure all heading IDs are unique
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' }) // Make headings linkable
    .use(rehypeRemoveMdExtension) // Remove .md extensions from internal links
    .use(rehypeMermaid) // Mark Mermaid blocks (BEFORE highlighting to prevent syntax highlighting)
    .use(rehypeHighlight) // Syntax highlight code (but not Mermaid)
    .use(rehypeStringify)
    .process(content)

  return String(result)
}

/**
 * Extract headings from markdown content
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  const usedIds = new Map<string, number>()
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    let slug = slugify(text)
    
    // Ensure unique IDs
    if (usedIds.has(slug)) {
      const count = usedIds.get(slug)! + 1
      usedIds.set(slug, count)
      slug = `${slug}-${count}`
    } else {
      usedIds.set(slug, 0)
    }
    
    headings.push({
      id: slug,
      text,
      level,
      slug,
    })
  }

  return headings
}

/**
 * Extract links from markdown content
 */
export function extractLinks(content: string): Link[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: Link[] = []
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1]
    const href = match[2]
    
    let type: 'internal' | 'external' | 'anchor'
    if (href.startsWith('#')) {
      type = 'anchor'
    } else if (href.startsWith('http://') || href.startsWith('https://')) {
      type = 'external'
    } else {
      type = 'internal'
    }

    links.push({ text, href, type })
  }

  return links
}

/**
 * Extract Mermaid diagrams from markdown content
 */
export function extractDiagrams(content: string): Diagram[] {
  const mermaidRegex = /```mermaid\n([\s\S]*?)```/g
  const diagrams: Diagram[] = []
  let match

  while ((match = mermaidRegex.exec(content)) !== null) {
    diagrams.push({
      type: 'mermaid',
      content: match[1].trim(),
    })
  }

  return diagrams
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  // Remove code blocks
  const withoutCode = text.replace(/```[\s\S]*?```/g, '')
  // Remove inline code
  const withoutInlineCode = withoutCode.replace(/`[^`]+`/g, '')
  // Count words
  const words = withoutInlineCode.trim().split(/\s+/)
  return words.filter(word => word.length > 0).length
}

/**
 * Create slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Extract title from markdown content (first H1 heading)
 */
function extractTitleFromContent(content: string): string | null {
  const h1Match = content.match(/^#\s+(.+)$/m)
  return h1Match ? h1Match[1].trim() : null
}

/**
 * Extract table of contents from headings
 */
export function generateTableOfContents(headings: Heading[]): Heading[] {
  // Filter out H1 (usually the title) and return H2-H4
  return headings.filter(h => h.level >= 2 && h.level <= 4)
}

