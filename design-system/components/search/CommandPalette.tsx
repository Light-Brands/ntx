'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = [
    { label: 'Search Documentation', action: () => router.push('/search'), icon: '🔍' },
    { label: 'View Dashboard', action: () => router.push('/'), icon: '📊' },
    { label: 'Document Graph', action: () => router.push('/graph'), icon: '🕸️' },
    { label: 'Progress Tracking', action: () => router.push('/progress'), icon: '📈' },
    { label: 'Business Metrics', action: () => router.push('/metrics'), icon: '📉' },
    { label: 'Epic 0: Foundation', action: () => router.push('/docs/epics/epic-00-foundation'), icon: '⚡' },
    { label: 'Epic 1: Mira', action: () => router.push('/docs/epics/epic-01-mira'), icon: '✨' },
    { label: 'Master Plan', action: () => router.push('/docs/master-plan'), icon: '🗺️' },
  ]

  const filteredCommands = query
    ? commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useKeyboardNav({
    onEscape: onClose,
    onEnter: () => {
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
        onClose()
      }
    },
    onArrowUp: () => setSelectedIndex(i => Math.max(0, i - 1)),
    onArrowDown: () => setSelectedIndex(i => Math.min(filteredCommands.length - 1, i + 1)),
    enabled: isOpen,
  })

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-vibe-graphite/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center pt-20 px-4">
        <div 
          className="w-full max-w-2xl bg-white rounded-lg shadow-lg border border-border"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-border">
            <Input
              type="search"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus:ring-0"
              autoFocus
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-foreground/60">
                No commands found
              </div>
            ) : (
              filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.label}
                  onClick={() => {
                    cmd.action()
                    onClose()
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-light-grey text-foreground'
                  }`}
                >
                  <span className="text-2xl">{cmd.icon}</span>
                  <span className="flex-1">{cmd.label}</span>
                  {index === selectedIndex && (
                    <Badge variant="neutral" className="text-xs">Enter</Badge>
                  )}
                </button>
              ))
            )}
          </div>
          
          <div className="p-3 border-t border-border bg-light-grey/30 flex items-center justify-between text-xs text-foreground/60">
            <div className="flex items-center gap-4">
              <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-border">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-border">Enter</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-border">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

