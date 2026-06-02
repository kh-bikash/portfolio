"use client"

import { motion } from 'framer-motion'
import { useTextScramble } from '@/hooks/useTextScramble'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { ParticleBackground } from '@/components/effects/ParticleBackground'
import { MountainLandscape } from '@/components/effects/MountainLandscape'
import { CloudLayer } from '@/components/effects/CloudLayer'
import { ArrowDown, Github, Linkedin, FileDown, Mail } from 'lucide-react'
import { useUIStore } from '@/lib/ui-store'

const ROLES = [
  'AI Engineer',
  'Generative AI',
  'Agentic AI',
  'Machine Learning',
]

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  const { ref, x, y } = useMagneticButton(0.25)

  const Component = href ? 'a' : 'button'
  const linkProps = href
    ? {
        href,
        target: (href.startsWith('http') || href.endsWith('.pdf')) ? '_blank' : undefined,
        rel: 'noopener noreferrer',
        download: href.endsWith('.pdf') ? 'Khundrakpam_Bikash_Meitei_Resume.pdf' : undefined
      }
    : {}

  return (
    <motion.div
      ref={ref as any}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Component
        onClick={onClick}
        className={className}
        {...(linkProps as any)}
      >
        {children}
      </Component>
    </motion.div>
  )
}

export function HeroSection() {
  const roleText = useTextScramble(ROLES, 3000)
  const toggleRecruiterMode = useUIStore(state => state.toggleRecruiterMode)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background layers */}
      <ParticleBackground count={50} />
      <MountainLandscape />
      <CloudLayer />

      {/* Subtle radial glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-red)] opacity-[0.03] blur-[150px] pointer-events-none" />

      {/* Cherry blossom petals (sparse, elegant) */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          const left = 10 + Math.random() * 80
          const delay = Math.random() * 20
          const duration = 15 + Math.random() * 10
          const size = 4 + Math.random() * 4
          return (
            <div
              key={i}
              className="absolute rounded-tr-[50%] rounded-bl-[50%] opacity-[0.15]"
              style={{
                left: `${left}%`,
                top: '-3%',
                width: `${size}px`,
                height: `${size * 0.6}px`,
                background: 'linear-gradient(135deg, #B8923F, #D4A853)',
                animation: `sakura-fall ${duration}s ${delay}s linear infinite`,
              }}
            />
          )
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Japanese accent */}
        <motion.span
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="font-serif text-sm tracking-[0.5em] text-[var(--text-muted)] mb-6"
        >
          間 — The Space Between
        </motion.span>

        {/* Name */}
        <motion.h1
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-4 leading-[0.95]"
        >
          KHUNDRAKPAM
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] text-[var(--text-secondary)] mt-1">
            BIKASH MEITEI
          </span>
        </motion.h1>

        {/* Headline */}
        <motion.p
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="text-lg sm:text-xl md:text-2xl font-sans font-medium text-[var(--text-secondary)] max-w-2xl mb-4 leading-relaxed"
        >
          Building AI Systems That Turn
          <span className="text-gradient-red font-semibold"> Ideas Into Impact.</span>
        </motion.p>

        {/* Role scramble */}
        <motion.div
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-glow-pulse" />
          <span className="font-mono text-sm sm:text-base tracking-wider text-[var(--accent-gold)] min-w-[260px] text-left">
            {roleText}
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={1.0}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            View Projects
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            onClick={() => toggleRecruiterMode()}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <FileDown className="w-4 h-4" />
            View & Download Resume
          </MagneticButton>

          <MagneticButton
            onClick={scrollToContact}
            className="btn-ghost flex items-center gap-2 text-sm"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={1.2}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex items-center gap-4"
        >
          <a
            href="https://github.com/kh-bikash"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass glass-hover transition-all text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass glass-hover transition-all text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-sans font-medium tracking-[0.4em] uppercase text-[var(--text-muted)]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--text-muted)] to-transparent"
        />
      </motion.div>
    </section>
  )
}
