import { notFound } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { TableOfContents } from '@/components/navigation/TableOfContents'
import { BackToTop } from '@/components/navigation/BackToTop'
import { DocumentViewer } from '@/components/document/DocumentViewer'
import { getDocumentBySlug } from '@/lib/fs/documents'
import { generateTableOfContents } from '@/lib/markdown/parser'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

// Generate static params for all documents at build time
export async function generateStaticParams() {
  const { readAllDocuments } = await import('@/lib/fs/documents')
  const documents = await readAllDocuments()
  
  return documents.map((doc) => ({
    slug: doc.slug.split('/'),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params.slug.join('/')
  const document = await getDocumentBySlug(slug)

  if (!document) {
    notFound()
  }

  const tocHeadings = generateTableOfContents(document.headings)
  
  const breadcrumbItems = params.slug.map((segment, index) => ({
    label: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    href: index < params.slug.length - 1 
      ? `/docs/${params.slug.slice(0, index + 1).join('/')}`
      : undefined,
  }))

  return (
    <AppShell>
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="min-w-0">
          <DocumentViewer document={document} />
        </div>
        
        {tocHeadings.length > 0 && (
          <aside className="hidden lg:block relative">
            <div className="sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
              <TableOfContents headings={tocHeadings} />
            </div>
          </aside>
        )}
      </div>
      
      <BackToTop />
    </AppShell>
  )
}

