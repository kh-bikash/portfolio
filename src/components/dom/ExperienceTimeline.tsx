"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const EXPERIENCE = [
    {
        id: 1,
        year: "2025",
        role: "Software Engineering Intern",
        company: "Amazon Web Services (AWS)",
        description: "Developed backend services handling 100K+ API requests/day, improving system reliability. Built automated data validation pipelines for analytics and ML preprocessing workflows.",
        tech: ["AWS", "Python", "SQL", "Big Data"]
    },
    {
        id: 2,
        year: "2025",
        role: "Technical Consulting Intern",
        company: "SAP",
        description: "Processed enterprise datasets with 50K+ records for analytics pipelines. Improved dataset consistency and accuracy by 30% enabling reliable downstream experimentation.",
        tech: ["Data Analytics", "SAP", "Python", "Preprocessing"]
    }
]

export function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section id="experience" ref={containerRef} className="relative w-full py-20 md:py-32 px-4 md:px-12 bg-zinc-50 overflow-hidden">

            <div className="max-w-4xl mx-auto relative">

                {/* Header */}
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-cyan-600 uppercase mb-4">Training Data</h2>
                    <p className="text-3xl md:text-5xl font-light text-zinc-800 tracking-tight">Experience <span className="font-serif italic text-zinc-400">Log</span></p>
                </div>

                {/* Central Timeline Line */}
                <div className="absolute left-[18px] md:left-1/2 top-32 bottom-0 w-px bg-zinc-200 transform md:-translate-x-1/2">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-gradient-to-b from-cyan-400 via-cyan-600 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                </div>

                {/* Nodes */}
                <div className="space-y-24 relative z-10">
                    {EXPERIENCE.map((exp, i) => (
                        <TimelineNode key={exp.id} data={exp} index={i} />
                    ))}
                </div>

            </div>

        </section>
    )
}

function TimelineNode({ data, index }: { data: any, index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0 relative`}
        >
            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                <span className="text-sm font-bold text-cyan-600 tracking-wider mb-2 block">{data.year}</span>
                <h3 className="text-2xl font-bold text-zinc-900 mb-1">{data.role}</h3>
                <h4 className="text-base font-mono text-zinc-500 mb-4">{data.company}</h4>
                <p className="text-zinc-600 leading-relaxed mb-4 text-sm">
                    {data.description}
                </p>
                <div className={`flex flex-wrap gap-2 ${isEven ? '' : 'md:justify-end'}`}>
                    {data.tech.map((t: string) => (
                        <span key={t} className="px-2 py-1 bg-zinc-100 border border-zinc-200 rounded text-[10px] uppercase tracking-wide text-zinc-500">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Center Node Marker */}
            <div className="absolute left-0 md:left-1/2 transform translate-y-1 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-zinc-50 border-2 border-cyan-500 z-10 shadow-[0_0_0_4px_rgba(255,255,255,1)] relative group">
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 group-hover:animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-cyan-500 scale-0 group-hover:scale-150 transition-transform duration-300 opacity-20" />
                </div>
            </div>

            {/* Empty Side for Layout Balance */}
            <div className="w-full md:w-1/2 hidden md:block" />

        </motion.div>
    )
}
