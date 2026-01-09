import fs from 'fs'
import path from 'path'
import type { DocumentTree } from '@/types/document'
import { isMarkdownFile } from '@/lib/utils'
import matter from 'gray-matter'

const DESIGN_SPEC_PATH = path.join(process.cwd(), 'vibeup-design-spec')

/**
 * Build a complete document tree from the design spec directory
 */
export function buildDocumentTree(rootPath: string = DESIGN_SPEC_PATH): DocumentTree {
  const stat = fs.statSync(rootPath)
  const name = path.basename(rootPath)

  if (stat.isFile()) {
    const metadata = isMarkdownFile(name) ? extractMetadata(rootPath) : undefined
    
    return {
      name,
      path: path.relative(DESIGN_SPEC_PATH, rootPath),
      type: 'file',
      metadata,
    }
  }

  // Directory - exclude non-design-spec directories
  const excludeDirs = new Set([
    'node_modules',
    '.next',
    '.git',
    '.claude',
    '.cursor',
    'ai-coding-config',
    'brand-identity',
    'design-system',
    'specs',
    'development', // Contains ai-coding-config with incompatible frontmatter
    'rules',
    'commands',
    'agents',
    'plugins',
    'scripts',
    'skills',
    'templates',
  ])
  
  const children: DocumentTree[] = []
  const entries = fs.readdirSync(rootPath, { withFileTypes: true })

  for (const entry of entries) {
    // Skip hidden files, node_modules, and excluded directories
    if (entry.name.startsWith('.') || excludeDirs.has(entry.name)) {
      continue
    }

    const fullPath = path.join(rootPath, entry.name)
    
    const child = buildDocumentTree(fullPath)
    children.push(child)
  }

  // Sort children: directories first, then files alphabetically
  children.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1
    }
    return a.name.localeCompare(b.name)
  })

  return {
    name,
    path: path.relative(DESIGN_SPEC_PATH, rootPath),
    type: 'directory',
    children,
  }
}

/**
 * Extract metadata from markdown file
 */
function extractMetadata(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Try to parse frontmatter, but handle errors gracefully
    let data: Record<string, unknown> = {}
    try {
      const parsed = matter(content)
      data = parsed.data
    } catch (_yamlError) {
      // If YAML parsing fails, just use filename as title
      console.warn(`YAML parsing failed for ${filePath}, using defaults`)
    }
    
    const validCategories = ['epic', 'architecture', 'brand', 'operations', 'design', 'development']
    const validStatuses = ['not-started', 'in-progress', 'completed', 'blocked']
    
    return {
      title: typeof data.title === 'string' ? data.title : path.basename(filePath, path.extname(filePath)),
      description: typeof data.description === 'string' ? data.description : undefined,
      epic: typeof data.epic === 'string' ? data.epic : undefined,
      category: typeof data.category === 'string' && validCategories.includes(data.category) 
        ? data.category as 'epic' | 'architecture' | 'brand' | 'operations' | 'design' | 'development'
        : undefined,
      tags: Array.isArray(data.tags) ? data.tags as string[] : undefined,
      dependencies: Array.isArray(data.dependencies) ? data.dependencies as string[] : undefined,
      status: typeof data.status === 'string' && validStatuses.includes(data.status)
        ? data.status as 'not-started' | 'in-progress' | 'completed' | 'blocked'
        : undefined,
      lastUpdated: typeof data.lastUpdated === 'string' ? data.lastUpdated : undefined,
      author: typeof data.author === 'string' ? data.author : undefined,
    }
  } catch (error) {
    return {
      title: path.basename(filePath, path.extname(filePath)),
    }
  }
}

/**
 * Get all files from tree (flatten)
 */
export function flattenTree(tree: DocumentTree): DocumentTree[] {
  const files: DocumentTree[] = []

  function traverse(node: DocumentTree) {
    if (node.type === 'file') {
      files.push(node)
    } else if (node.children) {
      node.children.forEach(traverse)
    }
  }

  traverse(tree)
  return files
}

/**
 * Get all directories from tree
 */
export function getDirectories(tree: DocumentTree): DocumentTree[] {
  const directories: DocumentTree[] = []

  function traverse(node: DocumentTree) {
    if (node.type === 'directory') {
      directories.push(node)
      node.children?.forEach(traverse)
    }
  }

  traverse(tree)
  return directories
}

/**
 * Find node in tree by path
 */
export function findNodeByPath(tree: DocumentTree, targetPath: string): DocumentTree | null {
  if (tree.path === targetPath) {
    return tree
  }

  if (tree.children) {
    for (const child of tree.children) {
      const found = findNodeByPath(child, targetPath)
      if (found) return found
    }
  }

  return null
}

/**
 * Get breadcrumb trail for a path
 */
export function getBreadcrumbs(tree: DocumentTree, targetPath: string): DocumentTree[] {
  const breadcrumbs: DocumentTree[] = []

  function findPath(node: DocumentTree, path: string): boolean {
    breadcrumbs.push(node)

    if (node.path === path) {
      return true
    }

    if (node.children) {
      for (const child of node.children) {
        if (findPath(child, path)) {
          return true
        }
      }
    }

    breadcrumbs.pop()
    return false
  }

  findPath(tree, targetPath)
  return breadcrumbs
}

/**
 * Get tree statistics
 */
export function getTreeStats(tree: DocumentTree): {
  totalFiles: number
  totalDirectories: number
  markdownFiles: number
  maxDepth: number
} {
  let totalFiles = 0
  let totalDirectories = 0
  let markdownFiles = 0
  let maxDepth = 0

  function traverse(node: DocumentTree, depth: number = 0) {
    maxDepth = Math.max(maxDepth, depth)

    if (node.type === 'file') {
      totalFiles++
      if (isMarkdownFile(node.name)) {
        markdownFiles++
      }
    } else {
      totalDirectories++
      node.children?.forEach(child => traverse(child, depth + 1))
    }
  }

  traverse(tree)

  return {
    totalFiles,
    totalDirectories,
    markdownFiles,
    maxDepth,
  }
}

/**
 * Build navigation tree (only directories and markdown files)
 */
export function buildNavigationTree(rootPath: string = DESIGN_SPEC_PATH): DocumentTree {
  const tree = buildDocumentTree(rootPath)
  
  function filterTree(node: DocumentTree): DocumentTree | null {
    if (node.type === 'file') {
      return isMarkdownFile(node.name) ? node : null
    }

    const filteredChildren = node.children
      ?.map(filterTree)
      .filter((child): child is DocumentTree => child !== null) || []

    if (filteredChildren.length === 0) {
      return null
    }

    return {
      ...node,
      children: filteredChildren,
    }
  }

  const filtered = filterTree(tree)
  return filtered || tree
}

