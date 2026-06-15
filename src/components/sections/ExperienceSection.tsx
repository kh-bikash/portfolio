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
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Experience
        </motion.div>

        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-20"
        >
          Professional <span className="text-gradient-bio">journey.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px]"
            style={{ background: 'rgba(74,222,128,0.08)' }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #4ade80, #f59e0b)',
                boxShadow: '0 0 8px rgba(74,222,128,0.4)',
              }}
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
            <div
              className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center ml-0 md:ml-0"
              style={{
                border: '2px dashed rgba(74,222,128,0.3)',
                background: 'var(--bg-primary)',
              }}
            >
              <span className="text-xs font-mono text-[var(--text-muted)]">?</span>
            </div>
            <span className="ml-4 md:ml-6 text-sm text-[var(--text-muted)] font-mono">
              Your company could be next
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  exp, index, side,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
  side: 'left' | 'right'
}) {
  const { ref, isInView } = useScrollReveal({ margin: '-60px' })

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 mb-16 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-[15px] h-[15px] rounded-full"
          style={{
            background: exp.status === 'active' ? '#4ade80' : 'var(--bg-elevated)',
            border: `3px solid ${exp.status === 'active' ? 'var(--bg-primary)' : 'rgba(74,222,128,0.2)'}`,
            boxShadow: exp.status === 'active' ? '0 0 12px rgba(74,222,128,0.6), 0 0 30px rgba(74,222,128,0.2)' : 'none',
          }}
        />
        {exp.status === 'active' && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(74,222,128,0.3)' }}
          />
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
            <span
              className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-full"
              style={{
                background: 'rgba(74,222,128,0.1)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.25)',
              }}
            >
              ACTIVE
            </span>
          )}
          <span className="text-xs font-mono tracking-wider text-[var(--text-muted)]">{exp.period}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--text-primary)] mb-1">
          {exp.role}
        </h3>
        <p className="text-base font-medium text-[var(--accent-gold)] mb-5">{exp.company}</p>

        {/* Achievements */}
        <ul className="space-y-3 mb-6">
          {exp.achievements.map((a, i) => (
            <li key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-2.5">
              <span style={{ color: '#4ade80' }} className="mt-1 flex-shrink-0">—</span>
              {a}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div
          className="flex flex-wrap gap-2 pt-4"
          style={{ borderTop: '1px solid rgba(74,222,128,0.08)' }}
        >
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-xs font-mono rounded-full"
              style={{
                background: 'rgba(74,222,128,0.06)',
                color: 'var(--text-muted)',
                border: '1px solid rgba(74,222,128,0.1)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
