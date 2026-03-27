import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { useProjectStore } from "@/store/useProjectStore"
import { Github, Star, ExternalLink, CalendarDays, Code2, Cpu, Server, Shield, BrainCircuit, Database, Cloud, Zap, Layers, Code, Box, ChevronLeft } from "lucide-react"

// Deterministic aesthetic generator
const getProjectAesthetic = (title: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    // Solid background colors for Hero
    const bgColors = [
        "bg-purple-900/20 dark:bg-purple-900/40",
        "bg-cyan-900/20 dark:bg-cyan-900/40",
        "bg-emerald-900/20 dark:bg-emerald-900/40",
        "bg-orange-900/20 dark:bg-orange-900/40",
        "bg-indigo-900/20 dark:bg-indigo-900/40",
        "bg-pink-900/20 dark:bg-pink-900/40",
    ]
    
    const gradients = [
        "radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
        "radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
        "radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
        "radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
        "radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
        "radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
    ]

    const icons = [Cpu, Server, Shield, BrainCircuit, Database, Cloud, Zap, Layers, Code, Box]
    
    return {
        bgColor: bgColors[hash % bgColors.length],
        gradient: gradients[hash % gradients.length],
        Icon: icons[hash % icons.length]
    }
}

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()
    const { projects, isLoading, fetchProjects } = useProjectStore()
    const { scrollY } = useScroll()
    const yHero = useTransform(scrollY, [0, 1000], [0, 400])
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
            <div className="min-h-screen bg-[#fafafa] dark:bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-[3px] border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!project && !isLoading) {
        return (
            <div className="min-h-screen bg-[#fafafa] dark:bg-black flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-100 font-sans">
                <h1 className="text-3xl font-medium mb-8">System Error: Repository not found in the neural network.</h1>
                <Link to="/work" className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium transition-transform hover:scale-105">
                    Return to Neural Records
                </Link>
            </div>
        )
    }

    if (!project) return null

    const { bgColor, gradient, Icon } = getProjectAesthetic(project.title)

    return (
        <main className="min-h-screen w-full bg-[#fafafa] dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans leading-relaxed">
            
            {/* Minimalist Floating Nav */}
            <nav className="fixed top-8 left-8 md:left-12 z-50 flex justify-between items-center w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mix-blend-difference">
                <Link to="/work">
                    <button className="flex items-center justify-center p-3 sm:px-5 sm:py-2.5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full text-white text-sm font-semibold tracking-wide hover:bg-white/20 transition-all shadow-lg">
                        <ChevronLeft className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline-block">Back to Projects</span>
                    </button>
                </Link>
            </nav>

            {/* Massive Apple Developer Style Graphic Hero */}
            <div className={`relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden ${bgColor}`}>
                <div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: gradient }}
                />
                <motion.div 
                    className="absolute inset-0 z-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none text-black dark:text-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    style={{ y: yHero, opacity: opacityHero }}
                >
                    <Icon className="w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw]" />
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ y: yHero, opacity: opacityHero }}
                    className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pt-20"
                >
                    {project.language !== 'Unknown' && (
                        <span className="mb-6 px-4 py-1.5 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-xs font-bold tracking-widest uppercase text-black dark:text-white shadow-sm">
                            {project.language}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-semibold tracking-tighter leading-[0.9] text-black dark:text-white">
                        {project.title}
                    </h1>
                </motion.div>

                {/* Bottom Fade out into background */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fafafa] dark:from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* Content Architecture */}
            <article className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-20">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-4xl text-zinc-600 dark:text-zinc-300 font-light leading-snug mb-20 text-center"
                >
                    {project.description}
                </motion.p>

                {/* Metadata Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-y border-zinc-200 dark:border-white/10 mb-20"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-2"><Code2 className="w-4 h-4"/> Primary Logic</span>
                        <span className="text-xl font-medium tracking-tight">{project.language}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-2"><Star className="w-4 h-4"/> Impact Metric</span>
                        <span className="text-xl font-medium tracking-tight text-amber-500">{project.stars} Stars</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-2"><CalendarDays className="w-4 h-4"/> Version Date</span>
                        <span className="text-xl font-medium tracking-tight">
                            {new Date(project.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-2"><Github className="w-4 h-4"/> Access Node</span>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xl font-medium tracking-tight hover:text-cyan-500 transition-colors flex items-center gap-2">
                            Source Code <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                {/* Topics / Tech Stack Matrix */}
                {project.topics && project.topics.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-32 flex flex-col items-center"
                    >
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-8 text-center">Software Substrate / Technology Matrix</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {project.topics.map(topic => (
                                <span 
                                    key={topic} 
                                    className="px-5 py-2.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm font-semibold rounded-full shadow-sm hover:scale-105 transition-transform"
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
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold text-lg overflow-hidden shadow-2xl transition-transform hover:scale-105 active:scale-95"
                    >
                        <span>Initialize Repository</span>
                        <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </motion.div>
            </article>

            {/* Next Project Footer */}
            {nextProject && (
                <Link to={`/work/${nextProject.id}`}>
                    <div className="w-full py-40 border-t border-zinc-200 dark:border-white/10 relative group bg-zinc-50 dark:bg-white/[0.01] hover:bg-zinc-100 dark:hover:bg-white/[0.03] transition-colors cursor-pointer text-center overflow-hidden">
                        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 mb-6 uppercase tracking-[0.3em]">Load Next Neural Record</p>
                        <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            {nextProject.title}
                        </h2>
                    </div>
                </Link>
            )}
        </main>
    )
}
