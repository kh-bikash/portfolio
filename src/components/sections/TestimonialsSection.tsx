"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "Bikash has an exceptional ability to understand complex AI problems and deliver practical, scalable solutions. His work on our LLM-based systems was outstanding.",
    name: "Team Lead",
    role: "AI/ML Division",
    company: "Bot Point",
  },
  {
    quote: "A highly motivated engineer with deep knowledge of machine learning and software engineering. His contributions to our data pipeline significantly improved our workflow.",
    name: "Supervisor",
    role: "Technical Consulting",
    company: "SAP Forage",
  },
  {
    quote: "Bikash combines strong technical skills with creative problem-solving. His portfolio projects demonstrate real-world impact and production-quality engineering.",
    name: "Professor",
    role: "Computer Science",
    company: "KL University",
  },
]

export function TestimonialsSection() {
  const { ref, isInView } = useScrollReveal()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (dir: 'prev' | 'next') => {
    setCurrentIndex((prev) =>
      dir === 'next' ? (prev + 1) % TESTIMONIALS.length : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    )
  }

  const testimonial = TESTIMONIALS[currentIndex]

  return (
    <section id="testimonials" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4 justify-center"
        >
          Testimonials
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          What people <span className="text-gradient-gold">say.</span>
        </motion.h2>

        {/* Testimonial card */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12 relative"
        >
          {/* Quote icon */}
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center mx-auto mb-6">
            <Quote className="w-5 h-5 text-[var(--accent-red)]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl font-sans text-[var(--text-secondary)] leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="text-base font-heading font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                <p className="text-sm font-sans text-[var(--text-muted)]">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goTo('prev')}
              className="p-2 rounded-full glass glass-hover transition-all text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[var(--accent-red)] w-6' : 'bg-[var(--glass-border)] hover:bg-[var(--text-muted)]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo('next')}
              className="p-2 rounded-full glass glass-hover transition-all text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
