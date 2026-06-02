"use client"

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 200], [0, 1])

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScrollY && current > 400)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const isProjectsPage = window.location.hash.startsWith('#/projects')
    if (isProjectsPage) {
      setActiveSection('projects')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [window.location.hash])

  const scrollTo = (id: string) => {
    const isProjectsPage = window.location.hash.startsWith('#/projects')
    if (isProjectsPage) {
      window.location.hash = `#/${id}`
      setMobileOpen(false)
      return
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 w-full flex justify-center z-50 px-4 pointer-events-none"
      >
        <motion.div
          style={{ opacity: navBg }}
          className="pointer-events-auto"
        >
          <div className="flex items-center p-1.5 glass rounded-full shadow-premium">
            {/* Logo */}
            <div className="flex items-center gap-2 px-4 border-r border-[var(--glass-border)] mr-1">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
              <span className="font-heading text-sm text-[var(--text-primary)] font-semibold tracking-wide">
                BM
              </span>
            </div>

            {/* Nav items — desktop */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer"
                >
                  {(hovered === item.id || activeSection === item.id) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          activeSection === item.id
                            ? 'var(--accent-red-glow)'
                            : 'var(--glass-bg-hover)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeSection === item.id
                        ? 'text-[var(--accent-red)]'
                        : hovered === item.id
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className={`text-2xl font-heading font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-[var(--accent-red)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
