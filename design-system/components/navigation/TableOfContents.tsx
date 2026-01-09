'use client'

import { useEffect, useState, useRef } from 'react'
import type { Heading } from '@/types/document'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const navRef = useRef<HTMLElement>(null)

  // Auto-scroll TOC only if active item is out of view
  useEffect(() => {
    if (!activeId || !navRef.current) return

    const activeLink = navRef.current.querySelector(`a[href="#${activeId}"]`)
    const container = navRef.current.parentElement
    
    if (activeLink && container) {
      const linkRect = activeLink.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      // Only scroll if the active item is out of view
      const isAboveView = linkRect.top < containerRect.top + 100
      const isBelowView = linkRect.bottom > containerRect.bottom - 100
      
      if (isAboveView || isBelowView) {
        activeLink.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [activeId])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        
        if (visibleEntries.length > 0) {
          // Get the topmost visible entry
          const topEntry = visibleEntries.reduce((top, entry) => 
            entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top
          )
          setActiveId(topEntry.target.id)
        }
      },
      { 
        rootMargin: '-100px 0px -66% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.observe(element)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav ref={navRef} className={cn('space-y-1 pr-4', className)}>
      <p className="font-semibold text-sm text-foreground mb-4 pb-2 border-b border-border sticky top-0 bg-background z-10">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id
          return (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  'text-sm transition-all duration-200 block py-1.5 px-2 rounded-md',
                  'hover:bg-accent/10 hover:text-accent',
                  isActive
                    ? 'text-accent font-semibold bg-accent/10 border-l-2 border-accent -ml-2 pl-[6px]'
                    : 'text-foreground/60 hover:text-foreground'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    // Simple smooth scroll with proper offset
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                    
                    // Let the IntersectionObserver handle the active state
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

