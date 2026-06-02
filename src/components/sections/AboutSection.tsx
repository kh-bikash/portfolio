"use client"

import { motion } from 'framer-motion'
import { useScrollReveal, revealVariants, defaultTransition, staggerContainer } from '@/hooks/useScrollReveal'

const STATS = [
  { value: '9.32', label: 'CGPA', sub: 'KL University' },
  { value: '700+', label: 'Problems', sub: 'DSA Solved' },
  { value: '4★', label: 'Rating', sub: 'CodeChef' },
]

export function AboutSection() {
  const { ref, isInView } = useScrollReveal({ margin: '-80px' })

  return (
    <section id="about" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          About Me
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Engineer with a passion for
          <span className="text-gradient-red"> intelligent systems.</span>
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 mb-20">
          {/* Photo */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={revealVariants.fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="w-full aspect-square rounded-2xl overflow-hidden glass-card">
                <img
                  src="/profile.jpg"
                  alt="Bikash Meitei"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl border border-[var(--accent-red)]/20 -z-10" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={revealVariants.fadeUp}
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <p className="text-lg md:text-xl font-sans text-[var(--text-secondary)] leading-relaxed mb-6">
              AI Engineer and Software Engineering undergraduate (CGPA: 9.32) specializing in{' '}
              <span className="text-[var(--text-primary)] font-medium">Generative AI</span>,{' '}
              <span className="text-[var(--text-primary)] font-medium">Agentic AI</span>,{' '}
              Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Semantic Search, NLP, and Intelligent Automation Systems.
            </p>
            <p className="text-base font-sans text-[var(--text-muted)] leading-relaxed mb-6">
              Experienced in building scalable AI applications, AI agents, vector retrieval systems,
              low-latency APIs, and production-grade backend services using Python, FastAPI, LangChain,
              TensorFlow, PyTorch, PostgreSQL, Docker, ChromaDB, Pandas, and NumPy.
            </p>
            <p className="text-base font-sans text-[var(--text-muted)] leading-relaxed">
              Creator of{' '}
              <span className="text-[var(--accent-gold)] font-medium">ReflexCube</span>, a no-code AI platform enabling users to build, deploy, and manage AI and LLM-powered applications through guided workflows.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-3 gap-4 md:gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={revealVariants.fadeUp}
              transition={{ ...defaultTransition, delay: 0.4 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[var(--accent-gold)] mb-1">
                {stat.label}
              </div>
              <div className="text-xs font-sans text-[var(--text-muted)]">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
