"use client"

import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg-primary)] border-t border-[var(--glass-border)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-sm font-sans text-[var(--text-muted)]">
              © {new Date().getFullYear()} Bikash Meitei
            </span>
            <span className="hidden sm:inline text-[var(--text-muted)]">·</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              React · TypeScript · Framer Motion
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            {[
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/' },
              { label: 'GitHub', url: 'https://github.com/kh-bikash' },
              { label: 'CodeChef', url: 'https://www.codechef.com/users/kh_bikash22' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
