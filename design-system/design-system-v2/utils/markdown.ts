/**
 * Markdown utilities for design-system-v2
 * Extracts headings and generates table of contents data
 */

export interface Heading {
  id: string;
  text: string;
  level: number;
  slug: string;
}

/**
 * Create a URL-safe slug from text
 * Matches the slugification used by rehype-slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Extract headings from markdown content
 * Returns an array of Heading objects with unique IDs
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const usedIds = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let slug = slugify(text);

    // Ensure unique IDs (same logic as rehype-slug)
    if (usedIds.has(slug)) {
      const count = usedIds.get(slug)! + 1;
      usedIds.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      usedIds.set(slug, 0);
    }

    headings.push({
      id: slug,
      text,
      level,
      slug,
    });
  }

  return headings;
}

/**
 * Filter headings to create a table of contents
 * Excludes H1 (usually the title) and returns H2-H4
 */
export function generateTableOfContents(headings: Heading[]): Heading[] {
  return headings.filter(h => h.level >= 2 && h.level <= 4);
}

