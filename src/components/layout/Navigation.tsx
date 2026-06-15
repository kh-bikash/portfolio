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
  const navOpacity = useTransform(scrollY, [0, 200], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScrollY && current > 400)
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
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 w-full flex justify-center z-50 px-4 pointer-events-none"
      >
        <motion.div style={{ opacity: navOpacity }} className="pointer-events-auto">
          <div className="flex items-center p-1.5 rounded-full apple-glass">
            {/* Logo mark */}
            <div className="flex items-center gap-2 px-4 border-r border-white/10 mr-1">
              <div className="w-2 h-2 rounded-full bg-white opacity-90" />
              <span className="font-sans text-xs text-[var(--text-primary)] font-semibold tracking-widest opacity-90">BM</span>
            </div>

            {/* Desktop nav items */}
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
                        background: activeSection === item.id
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.03)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-white font-semibold'
                      : hovered === item.id
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full text-[var(--text-muted)] hover:text-white transition-colors ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(40px)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--text-muted)] hover:text-white transition-colors"
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
                  className={`text-3xl font-sans font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="absolute bottom-8 hud-text opacity-40">sys: navigation · active</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
