"use client"

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { ExternalLink, Star, GitFork, FolderGit, Github } from 'lucide-react'
import { useProjectStore } from '@/store/useProjectStore'

export function GitHubSection() {
  const { ref, isInView } = useScrollReveal()
  const { projects, isLoading, fetchProjects } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Hide the featured projects as they are already displayed in the main ProjectsSection
  const featuredIds = ['Reflex-Cube', 'CreditWiseLoan', 'sign_lang_detector']
  
  // Get other projects, prioritize those with stars, then by update date
  const otherProjects = projects
    .filter(p => !featuredIds.includes(p.id))
    .sort((a, b) => b.stars - a.stars || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6) // Show top 6 to keep layout neat and balanced

  const cleanDescription = (desc: string, title: string) => {
    if (!desc || desc === 'No description provided.') {
      return `Open source implementation and repository for ${title.replace(/-/g, ' ')}.`
    }
    // Clean basic markdown that might have been extracted from README
    return desc.replace(/#+\s*/g, '').replace(/\*\*/g, '').trim()
  }

  return (
    <section id="github" className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[var(--bg-secondary)]">
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Open Source Archive
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Other <span className="text-gradient-red">Noteworthy Projects.</span>
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--accent-red)] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((repo, index) => {
              // Combine language and topics for tech stack
              const techStack = Array.from(new Set([repo.language, ...repo.topics]))
                .filter(Boolean)
                .slice(0, 4) // max 4 tags to keep it clean

              return (
                <motion.a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={repo.id}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={revealVariants.fadeUp}
                  transition={{ ...defaultTransition, delay: 0.2 + (index * 0.1) }}
                  className="glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full group border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg)] transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--glass-bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--glass-border)] text-[var(--accent-gold)] group-hover:text-[var(--accent-red)] transition-colors shadow-sm">
                      <FolderGit className="w-6 h-6" />
                    </div>
                    <div className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-gold)] transition-colors relative z-10">
                    {repo.title}
                  </h3>

                  <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow relative z-10 line-clamp-3">
                    {cleanDescription(repo.description, repo.title)}
                  </p>

                  <div className="mt-auto relative z-10">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {techStack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 bg-white border border-gray-200 text-[10px] uppercase tracking-wider font-mono text-gray-700 font-semibold rounded shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-600 font-medium pt-5 border-t border-[var(--glass-border)]">
                      <span className="flex items-center gap-1.5 group-hover:text-[var(--text-primary)] transition-colors" title="Stars">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1.5 group-hover:text-[var(--text-primary)] transition-colors" title="Forks">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forksCount}
                      </span>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        )}

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/kh-bikash"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline py-3 px-8 text-sm font-sans font-semibold flex items-center gap-2 shadow-premium"
          >
            <Github className="w-4 h-4" />
            <span>View Full Archive on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
