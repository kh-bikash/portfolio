"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"
import { fetchGithubProjects, type Project } from "@/lib/project-data"

const FEATURED_PROJECTS = [
    {
        title: "ReflexCube",
        subtitle: "AI Model Platform",
        tech: ["Python", "FastAPI", "PostgreSQL", "LangChain", "ChromaDB", "Docker"],
        metrics: ["10K+ datasets", "<200ms response", "40% retrieval boost"],
        github: "https://github.com/kh-bikash/Reflex-Cube",
    },
    {
        title: "CreditWise",
        subtitle: "Loan Prediction System",
        tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
        metrics: ["5K+ records", "26% accuracy improvement"],
        github: "https://github.com/kh-bikash/CreditWiseLoan",
    },
    {
        title: "Sign Language Detection",
        subtitle: "Real-time CNN System",
        tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
        metrics: ["94% accuracy", "Real-time inference"],
        github: "https://github.com/kh-bikash/sign_lang_detector",
    },
]

export function GalleryProjects() {
    const [githubProjects, setGithubProjects] = useState<Project[]>([])

    useEffect(() => {
        fetchGithubProjects("kh-bikash").then((projects) => {
            // Filter out featured projects to avoid duplication
            const featured = FEATURED_PROJECTS.map(p => p.title.toLowerCase().replace(/\s/g, ""))
            const filtered = projects.filter(p =>
                !featured.some(f => p.id.toLowerCase().replace(/-/g, "").includes(f))
            )
            setGithubProjects(filtered.slice(0, 4))
        })
    }, [])

    return (
        <section id="work" className="relative w-full py-32 px-6 md:px-12 bg-[var(--paper)]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base font-sans font-bold tracking-[0.4em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        Portfolio
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        Selected Works
                    </BrushReveal>
                </div>

                <InkDivider width={100} className="mb-16" />

                {/* Featured projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {FEATURED_PROJECTS.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                {/* GitHub projects (also showing) */}
                {githubProjects.length > 0 && (
                    <div>
                        <h3 className="text-lg font-sans font-bold tracking-[0.3em] uppercase text-[var(--ink-ghost)] mb-8 text-center">
                            Also on GitHub
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {githubProjects.map((project, i) => (
                                <GithubCard key={project.id} project={project} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

function ProjectCard({ project, index }: { project: typeof FEATURED_PROJECTS[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-[var(--paper-light)] border border-[var(--border)] rounded-2xl p-8 shadow-paper hover:shadow-paper-hover transition-all duration-500 hover:-translate-y-1 flex flex-col"
        >
            {/* Title */}
            <h3 className="text-3xl font-serif font-bold text-[var(--ink)] mb-2 tracking-tight group-hover:text-[var(--brush-warm)] transition-colors">
                {project.title}
            </h3>
            <p className="text-base font-sans font-bold text-[var(--ink-faded)] mb-6">{project.subtitle}</p>

            {/* Metrics */}
            <div className="space-y-2 mb-6 flex-grow">
                {project.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-base font-sans text-[var(--ink-light)] font-medium">
                        <span className="text-[var(--brush-warm)]">—</span>
                        {m}
                    </div>
                ))}
            </div>

            {/* Tech + Link */}
            <div className="pt-5 border-t border-[var(--border)]">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-3.5 py-2 text-xs font-sans font-bold rounded-full bg-[var(--paper-warm)] text-[var(--ink-faded)] border border-[var(--border)]"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-[var(--brush-warm)] hover:underline"
                >
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    )
}

function GithubCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLAnchorElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.a
            ref={ref}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-center justify-between p-5 bg-[var(--paper-warm)]/50 border border-[var(--border)] rounded-xl hover:border-[var(--brush-warm)]/30 transition-all"
        >
            <div>
                <h4 className="text-lg font-sans font-bold text-[var(--ink)] capitalize group-hover:text-[var(--brush-warm)] transition-colors">
                    {project.title}
                </h4>
                <p className="text-sm font-sans text-[var(--ink-faded)] mt-1 line-clamp-1 font-medium">{project.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                {project.language && (
                    <span className="text-xs font-mono font-bold text-[var(--ink-ghost)]">{project.language}</span>
                )}
                <ExternalLink className="w-3.5 h-3.5 text-[var(--ink-ghost)] group-hover:text-[var(--brush-warm)] transition-colors" />
            </div>
        </motion.a>
    )
}
