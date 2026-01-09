import React, { useEffect, useState, useRef } from 'react';
import type { Heading } from '../utils/markdown';

interface DocumentTOCProps {
  headings: Heading[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Slide-out table of contents panel for spec documents
 * Features:
 * - IntersectionObserver to track active section
 * - Smooth scroll to section on click
 * - Auto-scroll TOC to keep active item visible
 */
export const DocumentTOC: React.FC<DocumentTOCProps> = ({ headings, isOpen, onClose }) => {
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Filter to only show H2-H4 headings
  const tocHeadings = headings.filter(h => h.level >= 2 && h.level <= 4);

  // Auto-scroll TOC to keep active item visible
  useEffect(() => {
    if (!activeId || !navRef.current) return;

    const activeLink = navRef.current.querySelector(`a[href="#${activeId}"]`);
    const container = navRef.current.parentElement;

    if (activeLink && container) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const isAboveView = linkRect.top < containerRect.top + 100;
      const isBelowView = linkRect.bottom > containerRect.bottom - 100;

      if (isAboveView || isBelowView) {
        activeLink.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeId]);

  // IntersectionObserver to track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Get the topmost visible entry
          const topEntry = visibleEntries.reduce((top, entry) =>
            entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      tocHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [tocHeadings]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Delay to prevent immediate close from the trigger click
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (tocHeadings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Backdrop - only covers main content area, not sidebar */}
      <div
        className={`
          fixed inset-y-0 right-0 left-72 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          lg:left-72
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel - z-index below sidebar (z-50) */}
      <div
        ref={panelRef}
        data-feedback-ui
        className={`
          fixed inset-y-0 left-72 z-40 w-80
          bg-abyss-mystic/95 backdrop-blur-xl border-r border-white/10
          shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col h-full overflow-hidden
          lg:left-72
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-abyss-base/50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-aqua-light animate-pulse" />
            <p className="text-sm font-black text-moonlight uppercase tracking-widest">
              On this page
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-moonlight/60 hover:text-moonlight hover:bg-white/10 transition-all"
            aria-label="Close table of contents"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <nav ref={navRef} className="space-y-1">
            <ul className="space-y-1">
              {tocHeadings.map((heading, index) => {
                const isActive = activeId === heading.id;
                const indent = (heading.level - 2) * 12;

                return (
                  <li
                    key={`${heading.id}-${index}`}
                    style={{ paddingLeft: `${indent}px` }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className={`
                        text-sm transition-all duration-200 block py-2 px-3 rounded-xl
                        ${isActive
                          ? 'text-aqua-light font-bold bg-aqua-light/10 border-l-2 border-aqua-light -ml-0.5 pl-2.5'
                          : 'text-moonlight/60 hover:text-moonlight hover:bg-white/5'
                        }
                      `}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                          // Close panel after navigation on mobile
                          if (window.innerWidth < 1024) {
                            setTimeout(() => onClose(), 300);
                          }
                        }
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-abyss-base/30">
          <p className="text-[10px] font-bold text-moonlight/30 uppercase tracking-widest text-center">
            {tocHeadings.length} sections
          </p>
        </div>
      </div>
    </>
  );
};

/**
 * Floating trigger button for opening the TOC
 */
interface TOCTriggerButtonProps {
  onClick: () => void;
  headingCount: number;
}

export const TOCTriggerButton: React.FC<TOCTriggerButtonProps> = ({ onClick, headingCount }) => {
  if (headingCount === 0) return null;

  return (
    <button
      onClick={onClick}
      data-feedback-ui
      className="
        fixed bottom-6 left-80 z-40
        w-14 h-14 rounded-2xl
        bg-abyss-mystic/90 backdrop-blur-xl border border-white/10
        shadow-2xl shadow-black/50
        flex items-center justify-center
        text-moonlight hover:text-aqua-light
        hover:border-aqua-light/30 hover:shadow-aqua-light/10
        transition-all duration-300
        group
        lg:left-80
      "
      aria-label="Open table of contents"
    >
      {/* List icon */}
      <svg 
        className="w-6 h-6 transition-transform group-hover:scale-110" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      
      {/* Badge */}
      <span className="
        absolute -top-1 -right-1
        w-5 h-5 rounded-full
        bg-aqua-light text-abyss-base
        text-[10px] font-black
        flex items-center justify-center
        shadow-lg
      ">
        {headingCount > 99 ? '99+' : headingCount}
      </span>
    </button>
  );
};

export default DocumentTOC;

