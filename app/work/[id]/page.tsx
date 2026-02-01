"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { getProject, getNextProject, Project } from "@/lib/project-data"
import { TechVisualizer } from "@/components/dom/TechVisualizer"

// Small wrapper to pass state to Canvas content
const TechVisualizerWrapper = ({ activeState }: { activeState: "chaos" | "grid" | "network" | "code" }) => {
    return <TechVisualizer state={activeState} />
}

export default function ProjectDetails() {
    const params = useParams()
    const id = params.id as string
    const [project, setProject] = useState<Project | null>(null)
    const [nextProject, setNextProject] = useState<Project | null>(null)
    const [visualState, setVisualState] = useState<"chaos" | "grid" | "network" | "code">("chaos")

    useEffect(() => {
        if (id) {
            const p = getProject(id)
            const next = getNextProject(id)
            if (p) setProject(p)
            if (next) setNextProject(next)
        }
    }, [id])

    if (!project) return <div className="min-h-screen bg-black text-cyan-500 font-mono text-xs flex items-center justify-center tracking-widest">INITIALIZING_DATA_STREAM...</div>

    return (
        <main className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-8 mix-blend-difference">
                <Link href="/work">
                    <button className="text-sm font-bold tracking-[0.2em] hover:text-cyan-400 transition-colors uppercase">
                        ← Return to Sector
                    </button>
                </Link>
                <div className="hidden md:block text-xs font-mono text-white/50 tracking-widest">
                    ID: {project.id.toUpperCase()} // REV.01
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Hero Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-cyan-500 font-mono text-sm tracking-widest">0.{Math.floor(Math.random() * 99)}</span>
                        <span className="text-white/40 font-mono text-sm tracking-widest uppercase">{project.type}</span>
                    </div>
                    <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white mix-blend-overlay opacity-90">
                        {project.title}
                    </h1>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    {/* Left Column: Specs */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-4 space-y-12"
                    >
                        {/* Year / Role */}
                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
                            <div>
                                <h3 className="text-xs font-mono text-white/40 mb-2 tracking-widest">YEAR</h3>
                                <p className="text-lg font-bold">{project.year}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-mono text-white/40 mb-2 tracking-widest">ROLE</h3>
                                <p className="text-lg font-bold">Lead Engineer</p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xs font-mono text-white/40 mb-4 tracking-widest">TECHNOLOGY</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono rounded-sm text-cyan-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xs font-mono text-white/40 mb-4 tracking-widest">METRICS</h3>
                            <div className="space-y-4">
                                {Object.entries(project.stats).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center text-sm">
                                        <span className="text-white/60 uppercase">{k}</span>
                                        <span className="font-mono text-cyan-400">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Scrollytelling Section */}
                    <div className="md:col-span-8 relative">
                        {project.story ? (
                            // Scrollytelling Mode
                            <div className="relative">
                                {/* Sticky Visuals */}
                                <div className="sticky top-20 h-[50vh] w-full mb-10 overflow-hidden rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-cyan-500/10 mix-blend-screen pointer-events-none z-10" />
                                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} intensity={1} />
                                        {/* Using the visual state from our generic container state in parent? 
                                            We need to lift state up.
                                        */}
                                        <TechVisualizerWrapper activeState={visualState} />
                                    </Canvas>
                                    <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-500 tracking-widest z-20">
                                        SYSTEM_STATE: {visualState.toUpperCase()}
                                    </div>
                                </div>

                                {/* Scrolling Text Chapters */}
                                <div className="space-y-[40vh] pb-[20vh]">
                                    {project.story.map((chapter, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ amount: 0.5, margin: "-100px" }}
                                            onViewportEnter={() => setVisualState(chapter.visualState as any)}
                                            className="p-8 border-l-2 border-cyan-500/30 bg-black/80 backdrop-blur-md max-w-lg ml-auto"
                                        >
                                            <h3 className="text-cyan-400 font-mono text-sm tracking-widest mb-3">
                                                0{index + 1} // {chapter.title}
                                            </h3>
                                            <p className="text-lg leading-relaxed text-zinc-300">
                                                {chapter.text}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Fallback for projects without stories
                            <div className="space-y-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
                                        {project.description}
                                    </h3>
                                </motion.div>
                                <div className="w-full aspect-video bg-zinc-900 border border-white/10 rounded-sm relative overflow-hidden flex items-center justify-center">
                                    <span className="text-white/20 font-mono">[NO_DATA_STREAM]</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Navigation */}
            {nextProject && (
                <Link href={`/work/${nextProject.id}`}>
                    <div className="w-full h-[30vh] border-t border-white/10 relative group bg-zinc-950 hover:bg-zinc-900 transition-colors cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="text-center">
                                <p className="text-xs font-mono text-white/40 tracking-widest mb-4">NEXT PROJECT</p>
                                <h2 className="text-6xl md:text-8xl font-black text-white group-hover:text-cyan-400 transition-colors">
                                    {nextProject.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </main>
    )
}
