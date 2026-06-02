"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'

const EXPERIENCES = [
  {
    id: 'botpoint',
    role: 'AI/ML Intern',
    company: 'Bot Point',
    period: 'Present',
    status: 'active' as const,
    achievements: [
      'Built and deployed AI agents using Python, NLP, and LLM-based systems to handle 1K+ user queries/day, improving response accuracy by 30%.',
      'Developed and integrated API-driven AI workflows with prompt engineering and evaluation pipelines, reducing manual intervention by 40% and improving system reliability.',
    ],
    tech: ['Python', 'FastAPI', 'LangChain', 'NLP', 'LLMs', 'AI Agents', 'Prompt Engineering'],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, isInView } = useScrollReveal()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-12"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Experience
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-20"
        >
          Professional <span className="text-gradient-red">journey.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-[var(--glass-border)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent-red)] to-[var(--accent-gold)]"
              style={{ height: lineHeight }}
            />
          </div>

          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} side={index % 2 === 0 ? 'left' : 'right'} />
          ))}

          {/* Future marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative flex items-center justify-center md:justify-center py-8"
          >
            <div className="relative z-10 w-10 h-10 rounded-full border-2 border-dashed border-[var(--text-muted)] bg-[var(--bg-primary)] flex items-center justify-center ml-0 md:ml-0">
              <span className="text-xs font-mono text-[var(--text-muted)]">?</span>
            </div>
            <span className="ml-4 md:ml-6 text-sm font-sans text-[var(--text-muted)]">Your company could be next</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  exp,
  index,
  side,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
  side: 'left' | 'right'
}) {
  const { ref, isInView } = useScrollReveal({ margin: '-60px' })

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 mb-16 ${
        side === 'right' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-[15px] h-[15px] rounded-full border-[3px] ${
            exp.status === 'active'
              ? 'bg-[var(--accent-red)] border-[var(--bg-primary)] shadow-glow-red'
              : 'bg-[var(--bg-elevated)] border-[var(--glass-border)]'
          }`}
        />
        {exp.status === 'active' && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[var(--accent-red)] opacity-30" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={side === 'left' ? revealVariants.fadeRight : revealVariants.fadeLeft}
        transition={{ ...defaultTransition, delay: 0.1 + index * 0.15 }}
        className={`ml-12 md:ml-0 md:w-[45%] ${side === 'left' ? 'md:pr-12' : 'md:pl-12'} glass-card rounded-2xl p-6 md:p-8`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {exp.status === 'active' && (
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded-full border border-[var(--accent-red)]/20">
              ACTIVE
            </span>
          )}
          <span className="text-xs font-mono tracking-wider text-[var(--text-muted)]">
            {exp.period}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--text-primary)] mb-1">
          {exp.role}
        </h3>
        <p className="text-base font-sans font-medium text-[var(--accent-gold)] mb-5">
          {exp.company}
        </p>

        {/* Achievements */}
        <ul className="space-y-3 mb-6">
          {exp.achievements.map((a, i) => (
            <li key={i} className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed flex gap-2.5">
              <span className="text-[var(--accent-red)] mt-1 flex-shrink-0">—</span>
              {a}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--glass-border)]">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-xs font-sans font-medium rounded-full bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
