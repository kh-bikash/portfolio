"use client"

interface NavigationProps {
  onContactClick: () => void
}

export function Navigation({ onContactClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
      <div />

      <div className="flex items-center gap-8">
        <a href="#work" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-none">
          Work
        </a>
        <button
          onClick={onContactClick}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-none"
        >
          Contact
        </button>
      </div>
    </nav>
  )
}
