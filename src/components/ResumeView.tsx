"use client"

import { PROJECTS } from "@/lib/project-data"
import { useUIStore } from "@/lib/ui-store"
import { motion } from "framer-motion"

export function ResumeView() {
    const toggle = useUIStore(state => state.toggleRecruiterMode)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            data-lenis-prevent // Prevent Lenis from hijacking scroll here
            className="fixed inset-0 z-[9999] bg-white text-black overflow-y-auto font-sans selection:bg-black selection:text-white"
        >
            <div className="max-w-[210mm] mx-auto p-[10mm] md:p-[20mm] bg-white min-h-screen">
                {/* Header */}
                <header className="flex justify-between items-baseline border-b-2 border-black pb-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter mb-2">BIKASH KUMAR</h1>
                        <p className="text-sm font-mono text-gray-600">CREATIVE TECHNOLOGIST // FULL STACK ENGINEER</p>
                    </div>
                    <div className="text-right text-sm leading-relaxed">
                        <p>bitcrusher@example.com</p>
                        <p>+1 (555) 010-9988</p>
                        <p>github.com/bikash</p>
                    </div>
                </header>

                {/* Return Button (Hidden in Print) */}
                <button
                    onClick={toggle}
                    className="fixed top-8 right-8 bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors print:hidden shadow-xl"
                >
                    EXIT RECRUITER MODE
                </button>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Left: Experience / Skills */}
                    <div className="md:col-span-4 space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-4 pb-2">Technical Skills</h3>
                            <ul className="text-sm space-y-2 font-medium">
                                <li>React / Next.js / TypeScript</li>
                                <li>Three.js / WebGL / R3F</li>
                                <li>Node.js / PostgreSQL / Redis</li>
                                <li>Python / PyTorch / AI Agents</li>
                                <li>AWS / Docker / CI/CD</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-4 pb-2">Education</h3>
                            <div className="mb-4">
                                <h4 className="font-bold text-sm">Computer Science, BS</h4>
                                <p className="text-xs text-gray-600">University of Technology</p>
                                <p className="text-xs text-gray-400">2018 - 2022</p>
                            </div>
                        </section>
                    </div>

                    {/* Right: Projects */}
                    <div className="md:col-span-8 space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-6 pb-2">Selected Works</h3>

                            <div className="space-y-10">
                                {PROJECTS.map(project => (
                                    <article key={project.id} className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-xl font-bold">{project.title}</h4>
                                            <span className="text-xs font-mono text-gray-500">{project.year}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2 py-0.5 bg-gray-100 text-[10px] uppercase font-bold tracking-wider rounded-sm text-gray-600">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm leading-relaxed text-gray-700 max-w-2xl">
                                            {project.description}
                                        </p>
                                        <div className="mt-2 flex gap-4 text-xs font-mono text-gray-400">
                                            {Object.entries(project.stats).map(([k, v]) => (
                                                <span key={k}>{k.toUpperCase()}: <span className="text-black">{v}</span></span>
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="print:hidden p-8 bg-gray-50 border border-gray-200 mt-12 rounded-lg text-center">
                            <p className="text-sm text-gray-500 mb-4">
                                This view is optimized for printing. Press Ctrl/Cmd + P to generate a PDF.
                            </p>
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-2 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                            >
                                Print Resume
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
