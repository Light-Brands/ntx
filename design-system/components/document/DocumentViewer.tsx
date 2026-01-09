'use client'

import { MermaidRenderer } from '@/components/diagrams/MermaidRenderer'
import type { Document } from '@/types/document'

interface DocumentViewerProps {
  document: Document
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  // Replace placeholder comments with Mermaid diagrams
  const renderContent = () => {
    if (document.diagrams.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: document.content }} />
    }

    // Split content by placeholder comments and inject diagrams
    const parts: React.ReactNode[] = []
    let remainingHtml = document.content
    
    document.diagrams.forEach((diagram, index) => {
      const placeholder = `<!-- MERMAID_PLACEHOLDER_${index} -->`
      const placeholderIndex = remainingHtml.indexOf(placeholder)
      
      if (placeholderIndex !== -1) {
        // Add content before placeholder
        const beforePlaceholder = remainingHtml.substring(0, placeholderIndex)
        if (beforePlaceholder.trim()) {
          parts.push(
            <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: beforePlaceholder }} />
          )
        }
        
        // Add the Mermaid diagram (using pristine source from RAW markdown)
        parts.push(
          <div key={`diagram-${index}`} className="my-8">
            <MermaidRenderer chart={diagram.content} />
          </div>
        )
        
        // Update remaining HTML
        remainingHtml = remainingHtml.substring(placeholderIndex + placeholder.length)
      }
    })
    
    // Add any remaining content after last diagram
    if (remainingHtml.trim()) {
      parts.push(
        <div key="content-final" dangerouslySetInnerHTML={{ __html: remainingHtml }} />
      )
    }
    
    return <>{parts}</>
  }

  return (
    <article className="mx-auto max-w-5xl">
      {/* Document content with enhanced prose styles */}
      <div 
        className="prose prose-lg prose-slate max-w-none
          prose-headings:scroll-mt-20
          prose-h1:text-5xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0 prose-h1:leading-tight
          prose-h2:text-4xl prose-h2:font-bold prose-h2:mb-5 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-border
          prose-h3:text-3xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
          prose-h4:text-2xl prose-h4:font-semibold prose-h4:mb-3 prose-h4:mt-6
          prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/90
          prose-a:text-accent prose-a:no-underline hover:prose-a:text-sky-blue hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:bg-light-grey prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-light-grey/50 prose-pre:text-foreground prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8 prose-pre:border prose-pre:border-border
          prose-ul:my-6 prose-ul:space-y-3
          prose-ol:my-6 prose-ol:space-y-3
          prose-li:leading-relaxed prose-li:text-lg
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:my-8 prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-lg prose-blockquote:italic
          prose-table:my-8
          prose-th:bg-primary prose-th:text-white prose-th:px-6 prose-th:py-4 prose-th:font-semibold
          prose-td:px-6 prose-td:py-4 prose-td:border prose-td:border-border
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
          prose-hr:my-12 prose-hr:border-border
        "
      >
        {renderContent()}
      </div>
    </article>
  )
}
