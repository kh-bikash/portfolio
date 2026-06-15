"use client"

import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} Bikash Meitei
            </span>
            <span className="hidden sm:inline text-[var(--text-muted)] opacity-30">·</span>
            <span className="text-xs font-mono text-[var(--text-muted)] opacity-60">
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
                className="text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-muted)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* HUD bottom bar */}
        <div className="mt-8 pt-6 flex justify-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-xs font-mono opacity-30 text-white">
            sys: portfolio · v2.0
          </div>
        </div>
      </div>
    </footer>
  )
}
