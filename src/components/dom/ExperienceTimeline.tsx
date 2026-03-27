"use client"

import { motion } from "framer-motion"
import { Server, Database } from "lucide-react"

const EXPERIENCE = [
    {
        id: "aws",
        year: "2025",
        role: "Software Engineering Intern",
        company: "Amazon Web Services (AWS)",
        description: "Engineered scalable backend services capable of handling massive API request volume (100K+/day) with perfect reliability. Architected automated data validation pipelines to streamline mission-critical ML preprocessing workflows.",
        tech: ["AWS", "Python", "SQL", "Big Data", "System Architecture"],
        span: "col-span-1 md:col-span-2",
        icon: Server
    },
    {
        id: "sap",
        year: "2025",
        role: "Technical Consulting Intern",
        company: "SAP",
        description: "Optimized enterprise datasets containing over 50,000 records for complex analytics pipelines. Significantly improved dataset consistency and accuracy by 30%, enabling highly reliable downstream experimentation.",
        tech: ["Data Analytics", "SAP", "Python", "Data Preprocessing"],
        span: "col-span-1 md:col-span-1",
        icon: Database
    },
    {
        id: "future",
        year: "Active",
        role: "AI Systems Engineering",
        company: "Independent Research",
        description: "Continuously training the neural core. Exploring frontiers in Generative AI, cloud compute, and highly performant fullstack software engineering.",
        tech: ["LLMs", "Generative AI", "React", "Next.js"],
        span: "col-span-1 md:col-span-1",
        icon: null
    }
]

export function ExperienceTimeline() {
    return (
        <section id="experience" className="relative w-full py-32 px-6 md:px-12 bg-[#fafafa] dark:bg-black font-sans">
            
            <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 md:mb-24 w-full text-left"
                >
                    <h2 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4">
                        Professional Log
                    </h2>
                    <p className="text-5xl md:text-7xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Experience <br className="hidden md:block" />
                        <span className="text-zinc-400 dark:text-zinc-600 font-light italic text-4xl md:text-6xl">Features.</span>
                    </p>
                </motion.div>

                {/* Asymmetrical Feature Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EXPERIENCE.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative overflow-hidden bg-zinc-100/50 dark:bg-white/5 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-none transition-shadow flex flex-col justify-between ${exp.span}`}
                        >
                            {/* Neural Pathway Hover Top Line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 group-hover:w-full transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100" />
                            <div className="absolute bottom-0 right-0 w-0 h-1 bg-gradient-to-l from-cyan-400 via-blue-500 to-purple-600 group-hover:w-full transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100" />

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex flex-col">
                                        <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-2">{exp.role}</h3>
                                        <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">{exp.company}</span>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <span className="inline-block px-4 py-1.5 bg-white/60 dark:bg-white/10 border border-zinc-200 dark:border-white/5 rounded-full text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">{exp.year}</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mb-10 max-w-3xl">
                                        {exp.description}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-white/10 pt-6 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((t) => (
                                            <span 
                                                key={t} 
                                                className="px-3 md:px-4 py-1.5 rounded-full bg-white/80 dark:bg-black/40 border border-zinc-200/80 dark:border-white/5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 shadow-sm"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    {exp.icon && <exp.icon className="w-6 h-6 text-zinc-300 dark:text-zinc-600 ml-4 flex-shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
