"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { fetchGithubProjects, Project } from "@/lib/project-data"

export function GitHubProjects() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProjects = async () => {
            try {
                // Fetch top 4 most recently updated projects
                const data = await fetchGithubProjects('kh-bikash')
                setProjects(data.slice(0, 4))
            } catch (error) {
                console.error("Failed to fetch projects:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [])

    return (
        <section ref={ref} className="relative w-full min-h-screen bg-white text-[#1A1918] py-32 px-6 md:px-12 lg:px-24">
            
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20"
                >
                    <p className="font-mono text-[#81C784] text-sm uppercase tracking-widest mb-4">
                        // Open Source & Repositories
                    </p>
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-[#1A1918] tracking-tight">
                        Engineered from the<br />ground up.
                    </h2>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 min-h-[400px]">
                    {loading ? (
                        <div className="col-span-full flex items-center justify-center font-mono text-[#5D4037] animate-pulse">
                            Loading repositories...
                        </div>
                    ) : (
                        projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                                className="group flex flex-col border-t border-[#E8D5C4] pt-8"
                            >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-2xl font-sans font-semibold text-[#1A1918] group-hover:text-[#4CA1AF] transition-colors duration-300">
                                        {project.title}
                                    </a>
                                    <div className="flex gap-4 font-mono text-xs text-[#5D4037] pt-1">
                                        <span className="flex items-center gap-1">★ {project.stars}</span>
                                    </div>
                                </div>
                                
                                <p className="text-base font-sans text-[#1A1918]/70 leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.language !== 'Unknown' && (
                                        <span className="px-3 py-1 bg-[#4CA1AF]/10 text-[#4CA1AF] text-xs font-mono rounded-sm border border-[#4CA1AF]/20">
                                            {project.language}
                                        </span>
                                    )}
                                    {project.topics.slice(0, 3).map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-[#F5F0E8] text-[#5D4037] text-xs font-mono rounded-sm border border-[#E8D5C4]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* View All Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-24 flex justify-center"
                >
                    <a href="https://github.com/kh-bikash" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1918] text-white rounded-full font-sans text-sm tracking-wide hover:bg-[#4CA1AF] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        Explore Full GitHub Profile 
                        <span className="text-lg">→</span>
                    </a>
                </motion.div>
            </div>
            
        </section>
    )
}
