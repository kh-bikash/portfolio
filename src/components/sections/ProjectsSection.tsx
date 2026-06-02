"use client"

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'
import { ReflexCubeDetail } from '@/components/sections/ReflexCubeDetail'

const FEATURED_PROJECTS = [
  {
    title: 'ReflexCube',
    subtitle: 'No-Code AI Platform',
    problem: 'Organizations struggle to build, scale, and integrate custom AI agents and RAG pipelines without deep coding knowledge.',
    solution: 'A visual AI development platform combining agent builders, dynamic workflow builders, semantic search, dataset management, and scaling systems.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'ChromaDB', 'Docker'],
    metrics: ['10K+ datasets processed', '<200ms response time', '40% retrieval accuracy boost'],
    github: 'https://github.com/kh-bikash/Reflex-Cube',
    image: '/projects/reflexcube_dashboard.png',
  },
  {
    title: 'CreditWise',
    subtitle: 'Loan Prediction System',
    problem: 'Financial institutions need accurate, real-time analytics to forecast loan default risks and manage portfolios.',
    solution: 'An automated machine learning pipeline featuring feature engineering and ensemble models to predict creditworthiness.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    metrics: ['5K+ records analyzed', '26% accuracy improvement', 'Automated ML pipeline'],
    github: 'https://github.com/kh-bikash/CreditWiseLoan',
    image: '/projects/creditwise_analytics.png',
  },
  {
    title: 'Sign Language Detection',
    subtitle: 'Real-time CNN System',
    problem: 'Hearing-impaired users require fast, accessible, real-time gesture translation interfaces for daily communication.',
    solution: 'A computer vision pipeline using Convolutional Neural Networks (CNNs) for real-time sign language detection.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'CNN'],
    metrics: ['94% detection accuracy', 'Real-time inference', '30+ gesture classes'],
    github: 'https://github.com/kh-bikash/sign_lang_detector',
    image: '/projects/signlang_cv.png',
  },
]

function ProjectCard({
  project,
  index,
  onOpenDetail,
}: {
  project: typeof FEATURED_PROJECTS[0]
  index: number
  onOpenDetail?: () => void
}) {
  const { ref, isInView } = useScrollReveal({ margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={revealVariants.fadeUp}
      transition={{ ...defaultTransition, delay: 0.1 + index * 0.12 }}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Project image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />

          {/* Project number overlay */}
          <div className="absolute top-4 left-4 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-primary)]/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            0{index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 pb-4">
          <span className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-[var(--accent-gold)] mb-2 block">
            {project.subtitle}
          </span>
          <h3 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-red)] transition-colors">
            {project.title}
          </h3>

          {/* Problem / Solution */}
          <div className="space-y-2 mb-5">
            <p className="text-sm font-sans text-[var(--text-muted)]">
              <span className="text-[var(--accent-red)] font-medium">Problem:</span> {project.problem}
            </p>
            <p className="text-sm font-sans text-[var(--text-secondary)]">
              <span className="text-[var(--accent-gold)] font-medium">Solution:</span> {project.solution}
            </p>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
            {project.metrics.map((m) => (
              <span key={m} className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech + Links */}
      <div className="p-6 md:p-8 pt-0">
        <div className="pt-4 border-t border-[var(--glass-border)]">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-sans font-medium rounded-full bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors group/link"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>

            {project.title === 'ReflexCube' && (
              <button
                onClick={onOpenDetail}
                className="px-3.5 py-1.5 text-xs font-sans font-semibold rounded-full bg-[var(--accent-red)]/10 hover:bg-[var(--accent-red)]/20 text-[var(--accent-red)] hover:text-[var(--text-primary)] transition-all border border-[var(--accent-red)]/20 cursor-pointer"
              >
                View Deep Dive
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function GithubRepoCard({ project, index }: { project: any; index: number }) {
  const { ref, isInView } = useScrollReveal({ margin: '-40px' })

  return (
    <motion.a
      ref={ref}
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={revealVariants.fadeUp}
      transition={{ ...defaultTransition, delay: index * 0.08 }}
      className="group glass-card rounded-xl p-5 flex items-center justify-between hover:border-[var(--accent-red)]/20"
    >
      <div className="min-w-0">
        <h4 className="text-base font-sans font-medium text-[var(--text-primary)] capitalize group-hover:text-[var(--accent-red)] transition-colors truncate">
          {project.title}
        </h4>
        <p className="text-sm font-sans text-[var(--text-muted)] mt-1 line-clamp-1">{project.description}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        {project.language && project.language !== 'Unknown' && (
          <span className="text-xs font-mono text-[var(--text-muted)]">{project.language}</span>
        )}
        <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-red)] transition-colors" />
      </div>
    </motion.a>
  )
}

export function ProjectsSection() {
  const { ref, isInView } = useScrollReveal()
  const { projects, isLoading, fetchProjects } = useProjectStore()
  const [isReflexCubeOpen, setIsReflexCubeOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Filter out featured projects from GitHub list
  const featuredTitles = FEATURED_PROJECTS.map((p) => p.title.toLowerCase().replace(/\s/g, ''))
  const otherProjects = projects
    .filter((p) => !featuredTitles.some((f) => p.id.toLowerCase().replace(/-/g, '').includes(f)))
    .slice(0, 4)

  return (
    <section id="projects" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Featured Projects
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Building systems with <span className="text-gradient-red">real impact.</span>
        </motion.h2>

        {/* Featured project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenDetail={project.title === 'ReflexCube' ? () => setIsReflexCubeOpen(true) : undefined}
            />
          ))}
        </div>

        {/* Other GitHub projects */}
        {!isLoading && otherProjects.length > 0 && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={revealVariants.fadeUp}
            transition={{ ...defaultTransition, delay: 0.5 }}
          >
            <h3 className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6 text-center">
              Also on GitHub
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {otherProjects.map((project, i) => (
                <GithubRepoCard key={project.id} project={project} index={i} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.hash = '#/projects'}
                className="btn-outline py-2 px-6 text-xs flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <span>View Full Projects Directory →</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ReflexCube detailed page modal overlay */}
      <ReflexCubeDetail isOpen={isReflexCubeOpen} onClose={() => setIsReflexCubeOpen(false)} />
    </section>
  )
}
