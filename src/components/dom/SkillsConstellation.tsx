"use client"

import { motion } from "framer-motion"
import { Shield, BrainCircuit, Lightbulb, Database, Server, Smartphone, Cloud, PenTool } from "lucide-react"

const BENTO_CATEGORIES = [
    {
        title: "Machine Intelligence",
        icon: BrainCircuit,
        skills: ["TensorFlow", "PyTorch", "OpenAI APIs", "HuggingFace", "Scikit-Learn"],
        color: "from-cyan-400/20 to-transparent dark:from-cyan-400/10",
        span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
    },
    {
        title: "Frontend Engineering",
        icon: Smartphone,
        skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
        color: "from-purple-400/20 to-transparent dark:from-purple-400/10",
        span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1"
    },
    {
        title: "Cloud Native",
        icon: Cloud,
        skills: ["AWS", "Aviatrix", "Docker", "CI/CD"],
        color: "from-blue-400/20 to-transparent dark:from-blue-400/10",
        span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1"
    },
    {
        title: "Core Backend",
        icon: Server,
        skills: ["Python", "Node.js", "REST APIs", "FastAPI"],
        color: "from-orange-400/20 to-transparent dark:from-orange-400/10",
        span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1"
    },
    {
        title: "Data Architecture",
        icon: Database,
        skills: ["PostgreSQL", "SQL", "Big Data", "Data Lakes"],
        color: "from-emerald-400/20 to-transparent dark:from-emerald-400/10",
        span: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
    }
]

export function SkillsConstellation() {
    return (
        <section id="skills" className="relative w-full py-32 px-6 md:px-12 bg-[#fafafa] dark:bg-black font-sans">
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4">
                        The Substrate
                    </h2>
                    <p className="text-5xl md:text-7xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Knowledge <br className="hidden md:block" />
                        <span className="text-zinc-400 dark:text-zinc-600 font-light italic text-4xl md:text-6xl">Bento Grid.</span>
                    </p>
                </div>

                {/* Apple Widget / Bento Box Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-none lg:grid-rows-3 gap-6 auto-rows-fr">
                    {BENTO_CATEGORIES.map((category, i) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-none transition-shadow ${category.span} flex flex-col`}
                        >
                            {/* Inner Radiant Glow */}
                            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br transition-opacity duration-700 opacity-50 group-hover:opacity-100 ${category.color} z-0 pointer-events-none`} />

                            {/* Apple-Style Ambient Graphic */}
                            <motion.div 
                                className="absolute -bottom-10 -right-10 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none text-zinc-900 dark:text-white"
                                animate={{ y: [0, -10, 0], rotate: [ -5, 0, -5 ] }}
                                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <category.icon className="w-64 h-64 md:w-80 md:h-80" />
                            </motion.div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white/80 dark:bg-white/10 border border-white dark:border-white/5 rounded-2xl shadow-sm">
                                        <category.icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-zinc-200/50 dark:border-white/10">
                                    {category.skills.map((skill) => (
                                        <span 
                                            key={skill} 
                                            className="px-4 py-2 bg-white/80 dark:bg-zinc-900/50 border border-white/80 dark:border-white/5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-transform hover:-translate-y-0.5"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
            
        </section>
    )
}
