"use client"

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { Award, Code2, Trophy, Cpu, BookOpen, GraduationCap } from 'lucide-react'

const ACHIEVEMENTS = [
  {
    icon: Code2,
    title: 'DSA Problems',
    value: '700+',
    label: 'Problems Solved',
    description: 'Solved over 700 data structures and algorithms problems across competitive platforms.',
    color: 'var(--accent-red)',
  },
  {
    icon: Trophy,
    title: 'CodeChef Rating',
    value: '4★',
    label: 'Star Rating',
    description: 'CodeChef 4-star rating demonstrating strong algorithmic problem-solving abilities.',
    color: 'var(--accent-gold)',
  },
  {
    icon: BookOpen,
    title: 'ReflexCube Research',
    value: '1',
    label: 'Architecture Paper',
    description: 'Detailed research work and engineering design on ReflexCube multi-agent visual compiler.',
    color: '#6E8C7D',
  },
  {
    icon: Cpu,
    title: 'AI Systems Deployed',
    value: '5+',
    label: 'Built & Deployed',
    description: 'Designed and deployed 5+ end-to-end AI applications, agent systems, and pipelines.',
    color: '#8C7080',
  },
  {
    icon: GraduationCap,
    title: 'Academic Performance',
    value: '9.32',
    label: 'Cumulative CGPA',
    description: 'Undergraduate study in Software Engineering with consistent top-tier results.',
    color: '#5A6E8C',
  },
]

const CERTIFICATIONS = [
  { name: 'SAP Generative AI Developer', org: 'SAP', year: '2025' },
  { name: 'OCI Architect Associate', org: 'Oracle', year: '2025' },
  { name: 'Salesforce AI Associate', org: 'Salesforce', year: '2025' },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const displayRef = useRef<HTMLSpanElement>(null)
  const { ref, isInView } = useScrollReveal({ margin: '-40px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      })
      return controls.stop
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toString() + suffix
      }
    })
    return unsubscribe
  }, [rounded, suffix])

  return (
    <div ref={ref}>
      <span ref={displayRef} className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)]">
        0{suffix}
      </span>
    </div>
  )
}

export function AchievementsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="achievements" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Achievements & Certifications
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Proven <span className="text-gradient-gold">track record.</span>
        </motion.h2>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {ACHIEVEMENTS.map((achievement, i) => {
            const Icon = achievement.icon
            const numericValue = parseFloat(achievement.value.replace(/[^0-9.]/g, ''))
            const suffix = achievement.value.replace(/[0-9.]/g, '')

            return (
              <motion.div
                key={achievement.title}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={revealVariants.fadeUp}
                transition={{ ...defaultTransition, delay: 0.2 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${achievement.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: achievement.color }} />
                </div>

                <AnimatedCounter value={numericValue} suffix={suffix} />

                <div className="text-xs font-sans font-medium tracking-[0.15em] uppercase mt-1 mb-3" style={{ color: achievement.color }}>
                  {achievement.label}
                </div>

                <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.6 }}
        >
          <h3 className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6 flex items-center gap-2">
            <Award className="w-4 h-4 text-[var(--accent-gold)]" />
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={revealVariants.fadeUp}
                transition={{ ...defaultTransition, delay: 0.7 + i * 0.1 }}
                className="glass-card rounded-xl p-5 group"
              >
                <p className="text-sm font-sans font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-gold)] transition-colors">
                  {cert.name}
                </p>
                <div className="flex items-center gap-2 text-xs font-sans text-[var(--text-muted)]">
                  <span>{cert.org}</span>
                  <span>·</span>
                  <span>{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
