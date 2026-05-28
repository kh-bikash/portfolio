import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useProjectStore } from "@/store/useProjectStore"
import { Github, Star, ChevronLeft, ChevronRight } from "lucide-react"

// Deterministic aesthetic generator based on project title
const getProjectAesthetic = (title: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    // Soft watercolor sky and nature gradients
    const gradients = [
        "radial-gradient(circle at 100% 100%, rgba(135, 206, 235, 0.2) 0%, transparent 60%)", // Sky Blue
        "radial-gradient(circle at 100% 100%, rgba(125, 140, 110, 0.25) 0%, transparent 60%)", // Sage Green
        "radial-gradient(circle at 100% 100%, rgba(196, 149, 106, 0.2) 0%, transparent 60%)", // Warm Sunset
        "radial-gradient(circle at 100% 100%, rgba(130, 82, 112, 0.15) 0%, transparent 60%)", // Twilight Purple
        "radial-gradient(circle at 100% 100%, rgba(184, 197, 201, 0.25) 0%, transparent 60%)", // Morning Mist
        "radial-gradient(circle at 100% 100%, rgba(232, 168, 124, 0.2) 0%, transparent 60%)", // Golden Amber
    ]
    
    return {
        gradient: gradients[hash % gradients.length],
    }
}

// Simple heuristic categorization
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

const getInitialsForCategory = (category: string) => {
    switch (category) {
        case "AI / ML": return "AI"
        case "Full Stack": return "FS"
        case "Backend & Systems": return "SYS"
        case "Bots & Automations": return "BOT"
        default: return "PRJ"
    }
}

export default function Work() {
    const navigate = useNavigate()
    const { projects, isLoading, error, fetchProjects } = useProjectStore()
    const carouselRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [activeFilter, setActiveFilter] = useState("All")

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const categorizedProjects = projects.map(p => ({ ...p, category: getProjectCategory(p) }))

    const uniqueCategories = Array.from(new Set(categorizedProjects.map(p => p.category)))
    const sortedCategories = uniqueCategories.sort((a, b) => {
        if (a.includes('AI') || a.includes('ML')) return -1;
        if (b.includes('AI') || b.includes('ML')) return 1;
        if (a.includes('Full')) return -1;
        if (b.includes('Full')) return 1;
        return a.localeCompare(b);
    })
    const categories = ["All", ...sortedCategories]

    const filteredProjects = categorizedProjects.filter(p => activeFilter === "All" || p.category === activeFilter)
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
        <main className="relative w-full min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans overflow-x-hidden flex flex-col pb-32 paper-texture">
            
            {/* Header */}
            <nav className="fixed top-6 left-6 md:left-12 z-50 flex items-center justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
                <Link to="/">
                    <button className="text-sm font-serif font-bold tracking-wide text-[var(--ink)] hover:opacity-60 transition-opacity flex items-center gap-2 px-5 py-3 bg-[var(--paper-light)]/90 backdrop-blur-md border border-[var(--border)] rounded-full shadow-paper cursor-pointer">
                        ← <span>Home</span>
                    </button>
                </Link>
                <div className="text-sm font-serif font-bold tracking-widest uppercase text-[var(--ink-faded)] px-5 py-3 bg-[var(--paper-light)]/90 backdrop-blur-md border border-[var(--border)] rounded-full shadow-paper">
                    Project Archives
                </div>
            </nav>

            <div className="relative z-10 flex-shrink-0 pt-32 px-8 md:px-16 w-full flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.1]">
                        Selected <br className="hidden md:block" />
                        <span className="text-[var(--brush-warm)]">Works.</span>
                    </h1>
                </motion.div>

                {/* Slideshow Controls */}
                <div className="hidden md:flex items-center gap-4 pb-2">
                    <button 
                        onClick={() => scrollBy('left')}
                        disabled={!canScrollLeft}
                        className="p-4 rounded-full bg-[var(--paper-light)]/60 backdrop-blur-md border border-[var(--border)] disabled:opacity-30 transition-all hover:bg-[var(--paper-warm)] shadow-paper"
                    >
                        <ChevronLeft className="w-5 h-5 text-[var(--ink)]" />
                    </button>
                    <button 
                        onClick={() => scrollBy('right')}
                        disabled={!canScrollRight}
                        className="p-4 rounded-full bg-[var(--paper-light)]/60 backdrop-blur-md border border-[var(--border)] disabled:opacity-30 transition-all hover:bg-[var(--paper-warm)] shadow-paper"
                    >
                        <ChevronRight className="w-5 h-5 text-[var(--ink)]" />
                    </button>
                </div>
            </div>

            {/* Segmented Filter Control */}
            {!isLoading && !error && categories.length > 2 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 px-8 md:px-16 mt-12 flex"
                >
                    <div className="flex items-center gap-2 p-1.5 bg-[var(--paper-warm)]/80 border border-[var(--border)] rounded-full overflow-x-auto hide-scrollbar max-w-full shadow-paper">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-sans font-bold transition-colors flex-shrink-0 cursor-pointer ${activeFilter === cat ? 'text-[var(--ink)]' : 'text-[var(--ink-faded)] hover:text-[var(--ink)]'}`}
                            >
                                {activeFilter === cat && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-[var(--paper-light)] border border-[var(--border)] rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Status Indicators */}
            {isLoading && (
                <div className="flex-grow flex justify-center items-center">
                    <div className="w-6 h-6 border-[2px] border-[var(--ink)] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <div className="flex-grow flex justify-center items-center text-[var(--brush-warm)] font-medium">
                    Failed to synchronize project archive: {error}
                </div>
            )}

            {/* Horizontal Slideshow Carousel */}
            {!isLoading && !error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 w-full mt-10 mb-16 overflow-hidden h-[60vh] min-h-[480px] 2xl:min-h-[600px]"
                >
                    <div 
                        ref={carouselRef}
                        onScroll={handleScroll}
                        className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar px-8 md:px-16 gap-6 md:gap-10 pb-8 items-stretch"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {sortedProjects.map((project, i) => {
                            const { gradient } = getProjectAesthetic(project.title)
                            const initials = getInitialsForCategory(project.category)

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: 80, scale: 0.97 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => navigate(`/work/${project.id}`)}
                                    className="snap-center flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[42vw] h-full rounded-3xl bg-[var(--paper-light)] border border-[var(--border)] shadow-paper overflow-hidden relative cursor-pointer group transition-all duration-500 hover:-translate-y-1 hover:shadow-paper-hover"
                                >
                                    {/* Watercolor Gradient Overlay */}
                                    <div 
                                        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
                                        style={{ background: gradient }}
                                    />
                                    
                                    {/* Massive Background Category Initials Watermark */}
                                    <div 
                                        className="absolute right-4 bottom-4 z-0 opacity-[0.04] select-none pointer-events-none text-[16rem] font-sans leading-none font-black text-[var(--ink)]"
                                    >
                                        {initials}
                                    </div>
 
                                    {/* Content Container */}
                                    <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                                        
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2 bg-[var(--paper-warm)]/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[var(--border)] shadow-sm">
                                                <Star className="w-3.5 h-3.5 text-[var(--brush-warm)]" />
                                                <span className="text-xs font-mono font-medium text-[var(--ink)]">{project.stars}</span>
                                            </div>
                                            
                                            <a 
                                                href={project.githubUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-3.5 rounded-full bg-[var(--paper-warm)]/50 hover:bg-[var(--paper-warm)] border border-[var(--border)] transition-colors shadow-sm text-[var(--ink)]"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        </div>
 
                                        <div className="mt-auto">
                                            {project.category && (
                                                <span className="text-xs md:text-sm font-mono tracking-[0.25em] font-bold uppercase text-[var(--ink-faded)] mb-3 block">
                                                    {project.category} · {project.language}
                                                </span>
                                            )}
                                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink)] mb-4 leading-tight group-hover:text-[var(--brush-warm)] transition-colors duration-300">
                                                {project.title}
                                            </h2>
                                            <p className="text-base md:text-lg text-[var(--ink-light)] font-sans font-bold leading-relaxed max-w-xl line-clamp-3 md:line-clamp-4">
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
