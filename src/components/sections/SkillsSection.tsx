"use client"

import { motion } from 'framer-motion'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    color: '#6E8C7D',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'SQL', level: 90 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    title: 'AI / Machine Learning',
    color: 'var(--accent-red)',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 88 },
      { name: 'Generative AI', level: 92 },
      { name: 'LLMs', level: 90 },
      { name: 'NLP', level: 88 },
      { name: 'RAG', level: 92 },
      { name: 'Semantic Search', level: 90 },
      { name: 'Embeddings', level: 88 },
      { name: 'Transformers', level: 85 },
      { name: 'CNNs', level: 86 },
      { name: 'Computer Vision', level: 84 },
    ],
  },
  {
    title: 'Agentic AI & LLM Engineering',
    color: 'var(--accent-gold)',
    skills: [
      { name: 'LangChain', level: 92 },
      { name: 'LlamaIndex', level: 88 },
      { name: 'AI Agents', level: 92 },
      { name: 'Multi-Agent Systems', level: 90 },
      { name: 'Prompt Engineering', level: 95 },
      { name: 'Function Calling', level: 92 },
      { name: 'Tool Calling', level: 90 },
      { name: 'Vector Databases', level: 88 },
      { name: 'Intelligent Automation', level: 90 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    color: '#5A6E8C',
    skills: [
      { name: 'FastAPI', level: 92 },
      { name: 'TensorFlow', level: 85 },
      { name: 'PyTorch', level: 86 },
      { name: 'Scikit-learn', level: 88 },
      { name: 'OpenCV', level: 84 },
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 88 },
    ],
  },
  {
    title: 'Backend, Databases & Infrastructure',
    color: '#8C7080',
    skills: [
      { name: 'REST APIs', level: 92 },
      { name: 'Backend Development', level: 90 },
      { name: 'Microservices', level: 88 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'ChromaDB', level: 90 },
      { name: 'Pinecone', level: 85 },
      { name: 'Docker', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 88 },
      { name: 'CI/CD', level: 82 },
    ],
  },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const { ref, isInView } = useScrollReveal({ margin: '-40px' })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-sans font-medium text-[var(--text-secondary)]">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="text-xs font-mono text-[var(--text-muted)]"
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-full h-1.5 bg-[var(--glass-bg)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="skills" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Skills & Expertise
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Technical <span className="text-gradient-gold">proficiency.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={revealVariants.fadeUp}
              transition={{ ...defaultTransition, delay: 0.2 + catIndex * 0.1 }}
            >
              <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                {category.title}
              </h3>
              {category.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={0.3 + catIndex * 0.1 + i * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
