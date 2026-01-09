import fs from 'fs'
import path from 'path'
import type { Document } from '@/types/document'
import { processDocument } from '@/lib/markdown/processor'
import { isMarkdownFile } from '@/lib/utils'

const DESIGN_SPEC_PATH = path.join(process.cwd(), 'vibeup-design-spec')

/**
 * Get all markdown files recursively from a directory
 */
export function getAllMarkdownFiles(dir: string = DESIGN_SPEC_PATH): string[] {
  const files: string[] = []
  
  // Directories to exclude
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

  function traverse(currentPath: string) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true })

      for (const entry of entries) {
        // Skip excluded directories and hidden files
        if (entry.name.startsWith('.') || excludeDirs.has(entry.name)) {
          continue
        }

        const fullPath = path.join(currentPath, entry.name)

        if (entry.isDirectory()) {
          traverse(fullPath)
        } else if (entry.isFile() && isMarkdownFile(entry.name)) {
          files.push(fullPath)
        }
      }
    } catch (error) {
      console.warn(`Error reading directory ${currentPath}:`, error)
    }
  }

  traverse(dir)
  return files
}

/**
 * Read and process a single markdown file
 */
export async function readDocument(filePath: string): Promise<Document> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const relativePath = path.relative(DESIGN_SPEC_PATH, filePath)
  const slug = generateSlug(relativePath)

  return processDocument(slug, relativePath, content)
}

/**
 * Read and process all documents
 */
export async function readAllDocuments(): Promise<Document[]> {
  const files = getAllMarkdownFiles()
  const documents = await Promise.all(files.map(readDocument))
  return documents
}

/**
 * Read documents from a specific subdirectory
 */
export async function readDocumentsFromDir(subdir: string): Promise<Document[]> {
  const dirPath = path.join(DESIGN_SPEC_PATH, subdir)
  const files = getAllMarkdownFiles(dirPath)
  const documents = await Promise.all(files.map(readDocument))
  return documents
}

/**
 * Get document by slug (optimized - direct path construction)
 */
export async function getDocumentBySlug(slug: string): Promise<Document | null> {
  try {
    // Direct path construction - slug IS the relative path
    // Handle special cases for uppercase files
    let filePath: string
    
    if (slug === 'master-plan') {
      filePath = path.join(DESIGN_SPEC_PATH, 'MASTER-PLAN.md')
    } else if (slug.endsWith('/readme') || slug === 'readme') {
      // README files are uppercase - handle both cases for cross-platform compatibility
      const dir = slug === 'readme' ? '' : slug.substring(0, slug.lastIndexOf('/'))
      filePath = path.join(DESIGN_SPEC_PATH, dir, 'README.md')
    } else {
      // Standard files - just add .md extension
      filePath = path.join(DESIGN_SPEC_PATH, `${slug}.md`)
    }
    
    // Verify file exists before reading
    if (!fs.existsSync(filePath)) {
      console.warn(`Document not found: ${slug} -> ${filePath}`)
      return null
    }
    
    return await readDocument(filePath)
  } catch (error) {
    console.error(`Error reading document ${slug}:`, error)
    return null
  }
}

/**
 * Generate slug from file path
 */
function generateSlug(relativePath: string): string {
  return relativePath
    .replace(/\.mdx?$/i, '')
    .replace(/\\/g, '/')
    .toLowerCase()
}

/**
 * Get all epic documents
 */
export async function getEpicDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('epics')
}

/**
 * Get all architecture documents
 */
export async function getArchitectureDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('architecture')
}

/**
 * Get all brand documents
 */
export async function getBrandDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('brand')
}

/**
 * Get all operations documents
 */
export async function getOperationsDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('operations')
}

/**
 * Get all design documents
 */
export async function getDesignDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('design')
}

/**
 * Get all development documents
 */
export async function getDevelopmentDocuments(): Promise<Document[]> {
  return readDocumentsFromDir('development')
}

/**
 * Get master plan document
 */
export async function getMasterPlan(): Promise<Document> {
  const filePath = path.join(DESIGN_SPEC_PATH, 'MASTER-PLAN.md')
  return readDocument(filePath)
}

/**
 * Check if a file exists
 */
export function fileExists(relativePath: string): boolean {
  const fullPath = path.join(DESIGN_SPEC_PATH, relativePath)
  return fs.existsSync(fullPath)
}

/**
 * Get file stats
 */
export function getFileStats(relativePath: string) {
  const fullPath = path.join(DESIGN_SPEC_PATH, relativePath)
  return fs.statSync(fullPath)
}

