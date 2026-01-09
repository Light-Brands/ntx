import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Custom markdown components for rendering
 */
export const MarkdownComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold tracking-tight text-foreground mb-4 mt-8',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight text-foreground mb-3 mt-6 border-b border-border pb-2',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mb-2 mt-4',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-medium tracking-tight text-foreground mb-2 mt-3',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 mb-4 text-foreground/90', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'text-accent hover:text-sky-blue underline underline-offset-2 font-medium transition-colors',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('my-4 ml-6 list-disc space-y-2', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('my-4 ml-6 list-decimal space-y-2', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn('leading-7 text-foreground/90', className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-light-grey px-1.5 py-0.5 font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'mb-4 mt-2 overflow-x-auto rounded-lg bg-vibe-graphite p-4 text-vibe-white',
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-4 border-l-4 border-accent pl-4 italic text-foreground/80',
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 w-full overflow-auto">
      <table
        className={cn('w-full border-collapse', className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border border-border bg-light-grey px-4 py-2 text-left font-semibold text-foreground',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border border-border px-4 py-2 text-foreground/90',
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn('my-8 border-border', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn('rounded-lg my-4 max-w-full h-auto', className)}
      alt={alt || ''}
      {...props}
    />
  ),
}

/**
 * Wrapper for markdown content
 */
export function MarkdownContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      {children}
    </div>
  )
}

