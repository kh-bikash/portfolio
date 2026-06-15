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
    <section id="about" className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.1 }}
          className="mb-16 md:mb-24"
        >
          <span className="font-serif text-sm tracking-[0.5em] text-white/60 mb-4 block uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-6">
            Engineer with a passion<br />for intelligent systems.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl font-light">
            Crafting exceptional AI solutions, robust backends, and beautiful digital experiences.
          </p>
        </motion.div>

        <div ref={ref} className="w-full">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 mb-20">
            {/* Photo */}
            <motion.div
              initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.2 }}
            >
              <div className="relative group">
                <div
                  className="w-full aspect-square rounded-3xl overflow-hidden apple-glass p-2"
                >
                  <img
                    src="/profile.jpg"
                    alt="Bikash Meitei"
                    className="w-full h-full rounded-2xl object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 font-light tracking-tight">
                AI Engineer and Software Engineering undergraduate (CGPA: 9.32) specializing in{' '}
                <span className="text-white font-medium">Generative AI</span>,{' '}
                <span className="text-white font-medium">Agentic AI</span>,{' '}
                Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Semantic Search, NLP, and Intelligent Automation Systems.
              </p>
              <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6 font-light tracking-tight">
                Experienced in building scalable AI applications, AI agents, vector retrieval systems,
                low-latency APIs, and production-grade backend services using Python, FastAPI, LangChain,
                TensorFlow, PyTorch, PostgreSQL, Docker, ChromaDB, Pandas, and NumPy.
              </p>
              <p className="text-base text-[var(--text-muted)] leading-relaxed font-light tracking-tight">
                Creator of{' '}
                <span className="text-white font-medium">ReflexCube</span>, a no-code AI platform enabling users to build, deploy, and manage AI and LLM-powered applications through guided workflows.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-3 gap-4 md:gap-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={revealVariants.fadeUp}
                transition={{ ...defaultTransition, delay: 0.4 + i * 0.1 }}
                className="glass-card p-6 md:p-8 text-center flex flex-col justify-center items-center"
              >
                <div
                  className="text-3xl md:text-4xl font-heading font-semibold mb-2 text-white"
                >
                  {stat.value}
                </div>
                <div className="text-xs font-sans font-medium tracking-widest uppercase text-white/50 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
