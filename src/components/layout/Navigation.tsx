"use client"

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const { scrollY } = useScroll()
  const navBg = useTransform(
    scrollY,
    [0, 300],
    ['rgba(16, 9, 4, 0)', 'rgba(16, 9, 4, 0.72)']
  )

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScrollY && current > 600)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const isProjectsPage = window.location.hash.startsWith('#/projects')
    if (isProjectsPage) { setActiveSection('projects'); return }

    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [window.location.hash])

  const scrollTo = (id: string) => {
    if (window.location.hash.startsWith('#/projects')) {
      window.location.hash = `#/${id}`
      setMobileOpen(false)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation — ORYZO fixed transparent bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={hidden ? { y: -100 } : { y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
        style={{ background: navBg, backdropFilter: 'blur(20px)' }}
      >
        <div
          className="w-full px-6 md:px-10 h-16 flex items-center justify-between pointer-events-auto"
          style={{ borderBottom: '1px solid var(--color-cork-border)' }}
        >
          {/* Logo wordmark — left aligned, pure typographic identity */}
          <button
            onClick={() => scrollTo('hero')}
            className="oryzo-wordmark text-sm tracking-wide transition-opacity hover:opacity-70"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            BIKASH
            <span className="text-[var(--color-ember-accent)]">.</span>
          </button>

          {/* Desktop nav items — uppercase micro-type, right aligned */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative text-[12px] font-medium uppercase tracking-normal transition-opacity cursor-pointer"
                style={{
                  color:
                    activeSection === item.id
                      ? 'var(--color-warm-cream)'
                      : hovered === item.id
                      ? 'var(--color-warm-cream)'
                      : 'var(--text-muted)',
                  opacity: activeSection === item.id ? 1 : 0.65,
                }}
              >
                {item.label}
                {/* Dashed hairline underline indicator for active item */}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-1.5 left-0 right-0"
                    style={{ borderTop: `1px dashed var(--color-cork-border)` }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[var(--color-warm-cream)] transition-opacity hover:opacity-70"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay — ORYZO void mode */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: 'var(--color-walnut-shadow)', backdropFilter: 'blur(40px)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,237,215,0.04) 0%, transparent 70%)',
              }}
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--color-warm-cream)] transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col items-center gap-6 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-2xl font-medium uppercase transition-opacity"
                  style={{
                    color:
                      activeSection === item.id
                        ? 'var(--color-warm-cream)'
                        : 'var(--text-secondary)',
                    letterSpacing: 'normal',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="absolute bottom-8 oryzo-legal opacity-60">
              BIKASH · 1-MODEL · NAVIGATION ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
