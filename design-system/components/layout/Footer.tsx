export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">VIBEUP Design Specification</p>
            <p className="text-xs text-foreground/60">Your Energy Is Your Edge</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <p className="text-xs text-foreground/60">
            Version 1.0.0 • Last Updated: December 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

