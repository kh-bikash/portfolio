import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useProjectStore } from "@/store/useProjectStore"
import { Github, Star, ChevronLeft, ChevronRight, Cpu, Server, Shield, BrainCircuit, Database, Cloud, Zap, Layers, Code, Box } from "lucide-react"

// Deterministic aesthetic generator based on project title
const getProjectAesthetic = (title: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    const gradients = [
        "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)", // Purple
        "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",   // Cyan
        "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",  // Emerald
        "radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)",  // Orange
        "radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)",  // Indigo
        "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",  // Pink
    ]

    const icons = [Cpu, Server, Shield, BrainCircuit, Database, Cloud, Zap, Layers, Code, Box]
    
    return {
        gradient: gradients[hash % gradients.length],
        Icon: icons[hash % icons.length]
    }
}

export default function Work() {
    const navigate = useNavigate()
    const { projects, isLoading, error, fetchProjects } = useProjectStore()
    const carouselRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [activeFilter, setActiveFilter] = useState("All")

    // ALWAYS fetches live GitHub data on mount
    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    // Extract unique languages
    const languages = ["All", ...Array.from(new Set(projects.map(p => p.language).filter(l => l && l !== 'Unknown')))]

    // Sort by stars descending and filter by language
    const filteredProjects = projects.filter(p => activeFilter === "All" || p.language === activeFilter)
    const sortedProjects = [...filteredProjects].sort((a, b) => b.stars - a.stars)

    const handleScroll = () => {
        if (!carouselRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }

    const scrollBy = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return
        const { clientWidth } = carouselRef.current
        const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    return (
        <main className="relative w-full min-h-screen bg-[#fafafa] dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans overflow-x-hidden flex flex-col pb-32">
            
            {/* Soft Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-30">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-zinc-200 dark:bg-white/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-300 dark:bg-white/5 rounded-full blur-[120px]" />
            </div>

            {/* Premium Header */}
            <nav className="fixed top-8 left-8 md:left-12 z-50 flex items-center justify-between w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mix-blend-difference">
                <Link to="/?mode=brain">
                    <button className="text-sm font-semibold tracking-wide text-white hover:opacity-50 transition-opacity flex items-center gap-2">
                        ← <span>Home</span>
                    </button>
                </Link>
                <div className="text-sm font-semibold tracking-widest uppercase text-white opacity-50">
                    Live Repositories
                </div>
            </nav>

            <div className="relative z-10 flex-shrink-0 pt-32 px-8 md:px-16 w-full flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[0.9]">
                        Project <br className="hidden md:block" />
                        <span className="text-zinc-400 dark:text-zinc-600 font-light italic">Showcase.</span>
                    </h1>
                </motion.div>

                {/* Slideshow Controls */}
                <div className="hidden md:flex items-center gap-4 pb-2">
                    <button 
                        onClick={() => scrollBy('left')}
                        disabled={!canScrollLeft}
                        className="p-4 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 disabled:opacity-30 transition-all hover:bg-white/80 dark:hover:bg-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => scrollBy('right')}
                        disabled={!canScrollRight}
                        className="p-4 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 disabled:opacity-30 transition-all hover:bg-white/80 dark:hover:bg-white/20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Apple Segmented Control Filter */}
            {!isLoading && !error && languages.length > 2 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 px-8 md:px-16 mt-8 flex"
                >
                    <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-x-auto hide-scrollbar max-w-full">
                        {languages.map((lang, index) => (
                            <button
                                key={lang}
                                onClick={() => setActiveFilter(lang as string)}
                                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === lang ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                            >
                                {activeFilter === lang && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{lang}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Status Indicators */}
            {isLoading && (
                <div className="flex-grow flex justify-center items-center">
                    <div className="w-8 h-8 border-[3px] border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <div className="flex-grow flex justify-center items-center text-red-500 font-medium">
                    Failed to synchronize GitHub Live Data: {error}
                </div>
            )}

            {/* Horizontal Slideshow Carousel */}
            {!isLoading && !error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 w-full mt-8 mb-16 overflow-hidden h-[65vh] min-h-[500px] 2xl:min-h-[700px]"
                >
                    <div 
                        ref={carouselRef}
                        onScroll={handleScroll}
                        className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar px-8 md:px-16 gap-6 md:gap-12 pb-8 items-stretch"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {sortedProjects.map((project, i) => {
                            const { gradient, Icon } = getProjectAesthetic(project.title)

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => navigate(`/work/${project.id}`)}
                                    className="snap-center flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-full rounded-[2.5rem] md:rounded-[3rem] bg-white/60 dark:bg-white/5 backdrop-blur-3xl border border-white/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden relative cursor-pointer group transition-transform hover:scale-[1.02]"
                                >
                                    {/* Apple Style Inner Graphic Generator */}
                                    <div 
                                        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: gradient }}
                                    />
                                    
                                    {/* Massive Background Icon Graphic */}
                                    <motion.div 
                                        className="absolute -right-10 -bottom-10 z-0 opacity-10 dark:opacity-20 pointer-events-none text-zinc-900 dark:text-white"
                                        animate={{ rotate: [-5, 5, -5] }}
                                        transition={{ duration: 10 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Icon className="w-64 h-64 md:w-96 md:h-96" />
                                    </motion.div>

                                    {/* Content Container */}
                                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
                                        
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white dark:border-white/5 shadow-sm">
                                                <Star className="w-4 h-4 text-amber-500" />
                                                <span className="text-xs font-bold text-zinc-900 dark:text-white">{project.stars}</span>
                                            </div>
                                            
                                            <a 
                                                href={project.githubUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-4 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md transition-colors shadow-sm"
                                            >
                                                <Github className="w-5 h-5 text-zinc-900 dark:text-white" />
                                            </a>
                                        </div>

                                        <div className="mt-auto">
                                            {project.language !== 'Unknown' && (
                                                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-4 block">
                                                    {project.language}
                                                </span>
                                            )}
                                            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
                                                {project.title}
                                            </h2>
                                            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 font-light max-w-xl line-clamp-3 md:line-clamp-4">
                                                {project.description}
                                            </p>
                                        </div>
                                        
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>
            )}

            {/* Required CSS to hide scrollbar but keep functionality */}
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </main>
    )
}
