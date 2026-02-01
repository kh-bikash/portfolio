"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { PROJECTS as ALL_PROJECTS } from "@/lib/project-data"

const PROJECTS = [
    { ...ALL_PROJECTS[0], span: "md:col-span-2 md:row-span-2" },
    { ...ALL_PROJECTS[1], span: "md:col-span-1 md:row-span-1" },
    { ...ALL_PROJECTS[2], span: "md:col-span-1 md:row-span-1" },
    { ...ALL_PROJECTS[3], span: "md:col-span-2 md:row-span-1" },
]

export function NeuralGrid() {
    return (
        <section className="relative w-full py-32 px-4 md:px-12 bg-zinc-50 z-10">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 border-b border-border pb-8">
                    <div>
                        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-primary uppercase mb-2">System Modules</h2>
                        <p className="text-3xl md:text-5xl font-light text-foreground tracking-tight">Active <span className="font-serif italic text-muted-foreground">Deployments</span></p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-mono text-muted-foreground">RUNTIME: V.2.0.4</p>
                        <p className="text-xs font-mono text-muted-foreground">NODES: {PROJECTS.length} ACTIVE</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 h-auto">
                    {PROJECTS.map((project, i) => (
                        <ProjectCell key={project.id} project={project} index={i} />
                    ))}
                </div>

            </div>
        </section>
    )
}

function ProjectCell({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false)

    const navigate = useNavigate()

    // "Wormhole" entry simulation
    const handleEnterProject = () => {
        console.log(`[WORMHOLE] Initiating sequence for project: ${project.title}`)
        navigate(`/work/${project.id}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleEnterProject}
            className={`relative group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-cyan-400 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/20 ${project.span} min-h-[350px] md:min-h-[auto] flex flex-col cursor-pointer`}
        >
            {/* Image Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-widest bg-white/10 backdrop-blur-md rounded-full border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-colors">
                        {project.type}
                    </span>
                    <motion.div
                        animate={{ rotate: isHovered ? 45 : 0 }}
                        className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0"
                    >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                </div>

                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                    <p className="text-zinc-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 mb-4">
                        {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.tech.map((t: string) => (
                            <span key={t} className="text-[10px] uppercase tracking-wider font-mono text-cyan-200 bg-cyan-900/30 px-2 py-1 rounded">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
