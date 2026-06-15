"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { ArrowDown, Github, Linkedin, FileDown, Eye, Mail } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const ROLES = [
  'AI Engineer',
  'Generative AI',
  'Agentic AI',
  'Machine Learning',
]

// ── Starfield Canvas ──────────────────────────────────────────
function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.006 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    const embers = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      alpha: 0,
      speed: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.35,
      isGreen: Math.random() > 0.35,
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atmospheric radial glow
      const grad = ctx.createRadialGradient(
        canvas.width * 0.55, canvas.height * 0.38, 0,
        canvas.width * 0.55, canvas.height * 0.38, canvas.width * 0.55
      )
      grad.addColorStop(0, 'rgba(10, 30, 15, 0.35)')
      grad.addColorStop(0.6, 'rgba(6, 13, 6, 0.12)')
      grad.addColorStop(1, 'rgba(3, 6, 9, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Stars with twinkle
      stars.forEach(s => {
        const tw = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.35 + 0.65
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 240, 220, ${s.alpha * tw})`
        ctx.fill()
      })

        // Floating embers (now pure white/silver particles)
      embers.forEach(e => {
        e.y -= e.speed
        e.x += e.drift
        e.alpha = Math.min(0.5, e.alpha + 0.004)
        if (e.y < -15) {
          e.y = canvas.height + 20
          e.x = Math.random() * canvas.width
          e.alpha = 0
        }
        const color = `rgba(255, 255, 255, ${e.alpha})`
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        // Soft halo
        const halo = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5)
        halo.addColorStop(0, `rgba(255, 255, 255, ${e.alpha * 0.2})`)
        halo.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()
      })

      t++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

// ── Typewriter Role ──────────────────────────────────────────
function TypewriterRole() {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing')

  useEffect(() => {
    const role = ROLES[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 72)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1900)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 350)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42)
      } else {
        setRoleIdx((roleIdx + 1) % ROLES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, roleIdx])

  return (
    <span className="font-mono text-sm sm:text-base tracking-widest text-white min-w-[240px] text-left opacity-90">
      {displayed}
      <span className="animate-cursor-blink ml-px inline-block w-[2px] h-[1em] bg-white align-middle" />
    </span>
  )
}

// ── Magnetic Button ──────────────────────────────────────────
function MagneticButton({
  children, className, onClick, href,
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
      <Component onClick={onClick} className={className} {...(linkProps as any)}>
        {children}
      </Component>
    </motion.div>
  )
}

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function HeroSection() {

  const scrollToProjects = () => {
    // Handle hash-based routing: if on sub-page, navigate back to home then scroll
    if (window.location.hash && window.location.hash.startsWith('#/') && !window.location.hash.startsWith('#/#')) {
      window.location.hash = '#/'
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 400)
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const scrollToContact = () => {
    if (window.location.hash && window.location.hash.startsWith('#/') && !window.location.hash.startsWith('#/#')) {
      window.location.hash = '#/'
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 400)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openResume = () => {
    window.open('/Khundrakpam_Bikash_Meitei_Resume.pdf', '_blank')
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Animated Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(255, 255, 255, 0.15)"
      />

      {/* Interactive 3D Spline Scene */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'auto' }}>
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full opacity-80 mix-blend-screen"
        />
      </div>

      {/* Canvas starfield (2D embers on top of WebGL) */}
      <StarfieldCanvas />

      {/* Atmospheric glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 55% 40%, rgba(255,255,255,0.03) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)', zIndex: 2 }}
      />



      {/* Main content */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto" style={{ zIndex: 4 }}>

        {/* Label row */}
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="section-label mb-8 flex items-center justify-center gap-3 opacity-60"
        >
          <span className="w-8 h-px bg-white opacity-40" />
          AI Engineer · Agentic AI · Machine Learning
          <span className="w-8 h-px bg-white opacity-40" />
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={0.38}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="font-heading font-semibold text-white leading-none mb-3 tracking-tighter"
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 8rem)',
          }}
        >
          KHUNDRAKPAM
          <span
            className="block font-light text-[var(--text-secondary)] tracking-tight"
            style={{
              fontSize: 'clamp(1.4rem, 4.5vw, 4rem)',
              marginTop: '0.15em',
            }}
          >
            BIKASH MEITEI
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={0.52}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-5 leading-relaxed font-light"
        >
          Building AI Systems That Turn{' '}
          <span className="text-gradient-bio font-semibold">Ideas Into Impact.</span>
        </motion.p>

        {/* Typewriter role */}
        <motion.div
          custom={0.68}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          <TypewriterRole />
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={0.85}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <MagneticButton onClick={scrollToProjects} className="btn-primary flex items-center gap-2 text-sm">
            View Projects
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton onClick={() => window.location.hash = '#/resume'} className="btn-outline flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            Interactive Resume
          </MagneticButton>

          <MagneticButton onClick={openResume} className="btn-outline flex items-center gap-2 text-sm">
            <FileDown className="w-4 h-4" />
            Download PDF
          </MagneticButton>

          <MagneticButton onClick={scrollToContact} className="btn-ghost flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={1.0}
          initial="hidden"
          animate="visible"
          variants={HERO_VARIANTS}
          className="flex items-center gap-4 mt-4"
        >
          <a
            href="https://github.com/kh-bikash"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full apple-glass transition-all text-[var(--text-muted)] hover:text-white hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full apple-glass transition-all text-[var(--text-muted)] hover:text-white hover:scale-110"
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
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 4 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
