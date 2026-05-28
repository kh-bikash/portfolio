import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { useProjectStore } from "@/store/useProjectStore"
import { Github, Star, ExternalLink, CalendarDays, Code2, ChevronLeft } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// Deterministic aesthetic generator
const getProjectAesthetic = (title: string, category: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    const gradients = [
        "radial-gradient(circle at 50% 100%, rgba(135, 206, 235, 0.25) 0%, transparent 80%)", // Sky Blue
        "radial-gradient(circle at 50% 100%, rgba(125, 140, 110, 0.3) 0%, transparent 80%)",  // Sage Green
        "radial-gradient(circle at 50% 100%, rgba(196, 149, 106, 0.25) 0%, transparent 80%)", // Warm Sunset
        "radial-gradient(circle at 50% 100%, rgba(130, 82, 112, 0.2) 0%, transparent 80%)",  // Twilight Purple
        "radial-gradient(circle at 50% 100%, rgba(184, 197, 201, 0.3) 0%, transparent 80%)",  // Morning Mist
        "radial-gradient(circle at 50% 100%, rgba(232, 168, 124, 0.25) 0%, transparent 80%)", // Golden Amber
    ]

    const initialsMap = {
        "AI / ML": "AI",
        "Full Stack": "FS",
        "Backend & Systems": "SYS",
        "Bots & Automations": "BOT",
        "Other": "PRJ"
    }
    
    return {
        gradient: gradients[hash % gradients.length],
        initials: initialsMap[category as keyof typeof initialsMap] || "PRJ"
    }
}

const getProjectCategory = (project: any) => {
    const text = [project.title, project.description, ...(project.topics || [])].join(' ').toLowerCase();
    if (text.includes('ml') || text.includes('ai') || text.includes('llm') || text.includes('gpt') || text.includes('machine learning') || text.includes('artificial intelligence') || text.includes('reinforcement') || text.includes('neural')) {
        return "AI / ML";
    }
    if (text.includes('fullstack') || text.includes('full-stack') || text.includes('next.js') || text.includes('react') || text.includes('frontend') || text.includes('ui/') || text.includes('portfolio') || text.includes('dashboard') || text.includes('web')) {
        return "Full Stack";
    }
    if (text.includes('system') || text.includes('distributed') || text.includes('backend') || text.includes('api') || text.includes('microservice') || text.includes('engine') || text.includes('fastapi') || text.includes('architecture')) {
        return "Backend & Systems";
    }
    if (text.includes('bot') || text.includes('discord') || text.includes('slack')) {
        return "Bots & Automations";
    }
    if (project.language && project.language !== 'Unknown') {
        return project.language;
    }
    return "Other";
}

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()
    const { projects, isLoading, fetchProjects } = useProjectStore()
    const { scrollY } = useScroll()
    const yHero = useTransform(scrollY, [0, 1000], [0, 300])
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0])

    useEffect(() => {
        if (projects.length === 0) {
            fetchProjects()
        }
    }, [projects.length, fetchProjects])

    const project = projects.find(p => p.id === id)
    const currentIndex = projects.findIndex(p => p.id === id)
    const nextProject = currentIndex !== -1 && currentIndex < projects.length - 1 
        ? projects[currentIndex + 1] 
        : null
 
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center">
                <div className="w-6 h-6 border-[2px] border-[var(--ink)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
 
    if (!project && !isLoading) {
        return (
            <div className="min-h-screen bg-[var(--paper)] flex flex-col items-center justify-center text-[var(--ink)] font-sans px-6 text-center paper-texture">
                <h1 className="text-2xl font-serif font-light mb-8">Selected work not found in the project archive.</h1>
                <Link to="/work" className="px-8 py-4 bg-[var(--ink)] text-[var(--paper)] rounded-full font-serif text-base font-bold transition-transform hover:scale-105 shadow-paper">
                    Return to Project Archives
                </Link>
            </div>
        )
    }
 
    if (!project) return null
 
    const category = getProjectCategory(project)
    const { gradient, initials } = getProjectAesthetic(project.title, category)
 
    return (
        <main className="min-h-screen w-full bg-[var(--paper)] text-[var(--ink)] font-sans leading-relaxed pb-24 paper-texture">
            
            {/* Minimalist Floating Nav */}
            <nav className="fixed top-6 left-6 md:left-12 z-50 flex justify-between items-center w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
                <Link to="/work">
                    <button className="flex items-center justify-center px-5 py-3 bg-[var(--paper-light)]/90 backdrop-blur-md border border-[var(--border)] rounded-full text-[var(--ink)] text-sm font-serif font-bold hover:opacity-75 transition-all shadow-paper cursor-pointer">
                        <ChevronLeft className="w-4 h-4 mr-1.5" />
                        <span>Back to Works</span>
                    </button>
                </Link>
            </nav>

            {/* Watercolor Hero Block */}
            <div className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-[var(--paper-warm)]/30 border-b border-[var(--border)]">
                <div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: gradient }}
                />
                
                {/* Slow floating Category Initials backdrop watermark */}
                <motion.div 
                    className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none text-[35vw] font-sans font-black text-[var(--ink)]"
                    style={{ y: yHero, opacity: opacityHero }}
                >
                    {initials}
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ y: yHero, opacity: opacityHero }}
                    className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pt-20"
                >
                    {project.language !== 'Unknown' && (
                        <span className="mb-6 px-5 py-2 rounded-full bg-[var(--paper-light)]/90 border border-[var(--border)] text-xs font-mono font-bold tracking-[0.25em] uppercase text-[var(--ink-light)] shadow-sm">
                            {project.language}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[1.2] text-[var(--ink)]">
                        {project.title}
                    </h1>
                </motion.div>

                {/* Bottom Fade out */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--paper)] to-transparent pointer-events-none z-10" />
            </div>

            {/* Content Architecture */}
            <article className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-20">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-4xl text-[var(--ink-light)] font-sans font-bold leading-relaxed mb-16 text-center"
                >
                    {project.description}
                </motion.p>
 
                {/* Metadata Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-y border-[var(--border)] mb-16"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--ink-faded)] flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5"/> Primary Language</span>
                        <span className="text-xl font-serif font-bold text-[var(--ink)]">{project.language}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--ink-faded)] flex items-center gap-1.5"><Star className="w-3.5 h-3.5"/> GitHub Impact</span>
                        <span className="text-xl font-serif font-bold text-[var(--brush-warm)]">{project.stars} Stars</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--ink-faded)] flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5"/> Last Updated</span>
                        <span className="text-xl font-serif font-bold text-[var(--ink)]">
                            {new Date(project.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--ink-faded)] flex items-center gap-1.5"><Github className="w-3.5 h-3.5"/> Access Point</span>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xl font-serif font-bold text-[var(--brush-warm)] hover:underline flex items-center gap-1.5">
                            Source Code <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </motion.div>

                {/* README Markdown */}
                {project.readme && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="prose prose-stone dark:prose-invert prose-base md:prose-lg max-w-none mb-20 prose-headings:font-serif prose-headings:font-light prose-a:text-[var(--brush-warm)] prose-img:rounded-xl prose-pre:bg-[var(--paper-warm)]/40 prose-pre:border prose-pre:border-[var(--border)] prose-pre:text-[var(--ink)]"
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {project.readme}
                        </ReactMarkdown>
                    </motion.div>
                )}

                {/* Topics / Tech Stack Matrix */}
                {project.topics && project.topics.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-24 flex flex-col items-center"
                    >
                        <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--ink-faded)] mb-6 text-center">Technology Stack</h3>
                        <div className="flex flex-wrap justify-center gap-2.5">
                            {project.topics.map(topic => (
                                <span 
                                    key={topic} 
                                    className="px-5 py-2.5 bg-[var(--paper-warm)]/60 border border-[var(--border)] text-sm font-sans font-bold text-[var(--ink-light)] rounded-full shadow-sm hover:translate-y-[-1px] transition-transform duration-300"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Launch Sequence (Call to Action) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                >
                    <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[var(--ink)] text-[var(--paper)] rounded-full font-serif font-medium text-base shadow-paper hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                        <span>View on GitHub</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </motion.div>
            </article>

            {/* Next Project Footer */}
            {nextProject && (
                <Link to={`/work/${nextProject.id}`}>
                    <div className="w-full py-28 border-t border-[var(--border)] relative group bg-[var(--paper-warm)]/20 hover:bg-[var(--paper-warm)]/40 transition-colors cursor-pointer text-center overflow-hidden">
                        <p className="text-xs font-mono font-bold text-[var(--ink-faded)] mb-4 uppercase tracking-[0.25em]">Load Next Record</p>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-[var(--ink)] tracking-tight group-hover:scale-[1.01] transition-transform duration-500 ease-out">
                            {nextProject.title}
                        </h2>
                    </div>
                </Link>
            )}
        </main>
    )
}
