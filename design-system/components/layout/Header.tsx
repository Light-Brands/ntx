import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">VIBEUP</span>
            <span className="text-xs text-foreground/60">Design Spec Dashboard</span>
          </div>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6">
            <Link href="/docs" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/graph" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Graph View
            </Link>
            <Link href="/metrics" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Metrics
            </Link>
          </nav>
          
          <Button variant="accent" size="sm">
            Search
            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-xs font-medium text-white">
              ⌘K
            </kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}

