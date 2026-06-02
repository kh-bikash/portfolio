import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'
import { ProjectsPage } from '@/pages/ProjectsPage'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/')

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Store in global window for access
    ;(window as any).lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  // Listen to hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Scroll to section when returning from projects page
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#/') && !hash.startsWith('#/projects')) {
      const sectionId = hash.replace('#/', '')
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [currentPath])

  const isProjectsPage = currentPath.startsWith('#/projects')

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] noise-overlay">
      <Navigation />

      <main>
        {isProjectsPage ? (
          <ProjectsPage />
        ) : (
          <>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementsSection />
            <GitHubSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
