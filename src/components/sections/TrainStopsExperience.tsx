"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"

const EXPERIENCES = [
    {
        id: "sap",
        code: "BM-01",
        role: "Technical Consulting",
        company: "SAP Forage",
        period: "Jun – Jul 2025",
        status: "passed",
        achievements: [
            "Processed and analyzed 20K+ records using scalable preprocessing pipelines.",
            "Automated workflows improving pipeline consistency and reporting efficiency.",
        ],
        tech: ["Data Analytics", "Python", "Data Preprocessing"],
    },
    {
        id: "botpoint",
        code: "BM-02",
        role: "AI/ML Intern",
        company: "Bot Point",
        period: "Present",
        status: "active",
        achievements: [
            "Built and deployed AI agents using Python, NLP, and LLM-based systems handling 1K+ user queries/day, improving response accuracy by 30%.",
            "Developed API-driven AI workflows with prompt engineering and evaluation pipelines, reducing manual intervention by 40%.",
        ],
        tech: ["Python", "NLP", "LLMs", "AI Agents", "Prompt Engineering"],
    },
]

export function TrainStopsExperience() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const trackWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"])

    return (
        <section id="experience" ref={sectionRef} className="relative w-full py-32 px-6 md:px-12 bg-[var(--paper)]">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base font-sans font-bold tracking-[0.4em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        Route Map
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        The Journey
                    </BrushReveal>
                </div>

                <InkDivider width={100} className="mb-16" />

                {/* 📺 SUBWAY OVERHEAD LCD ANNOUNCEMENT BOARD (車内ディスプレイ) */}
                <div className="w-full max-w-[650px] bg-[#1F1F1F] border-[3px] border-[#3A352F] rounded-xl p-5 mb-16 mx-auto flex flex-col font-mono text-white shadow-paper relative overflow-hidden">
                    {/* Screen Glass Reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                    {/* Top status bar */}
                    <div className="flex justify-between items-center text-[10px] border-b border-zinc-800 pb-2.5 mb-3 text-zinc-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            Bikash Loop Line
                        </span>
                        <span className="bg-emerald-900/30 text-emerald-400 px-3.5 py-1 text-xs rounded-sm border border-emerald-500/20 font-sans font-bold">
                            LOCAL TRAIN
                        </span>
                    </div>

                    {/* Main LCD stop announcement */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Next Stop</span>
                            <span className="text-3xl font-serif text-[#FAF7F2] font-bold mt-1.5">BOT POINT</span>
                            <span className="text-base text-zinc-300 font-sans tracking-wide mt-1">Bot Point (BM-02)</span>
                        </div>
                        
                        {/* Door Indicator side map */}
                        <div className="flex flex-col items-start md:items-end text-left md:text-right border-t border-zinc-800 pt-3 md:pt-0 md:border-t-0 md:border-l md:border-zinc-800 md:pl-6 w-full md:w-auto">
                            <span className="text-xs text-zinc-400 font-bold">Exit Side</span>
                            <span className="text-base text-emerald-400 font-bold mt-1.5">Right Side Doors Open</span>
                            <span className="text-[10px] text-zinc-500 font-sans mt-1">Mind the gap on platform</span>
                        </div>
                    </div>

                    {/* Bottom scrolling transfers banner */}
                    <div className="bg-[#121212] border border-zinc-800 rounded p-2.5 mt-4 overflow-hidden whitespace-nowrap text-[11px] text-zinc-400 relative">
                        <motion.div
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="inline-block font-bold tracking-wider text-xs"
                        >
                            Transfers ➔ AI Agents, NLP, LLM Systems (FastAPI & LangChain) ... Next Stop: BOT POINT ... Transfers ➔ Data Analytics, Python pipelines (SAP Consulting) ...
                        </motion.div>
                    </div>
                </div>

                {/* Rosenzu (路線図) Horizontal Train Route Timeline */}
                <div className="hidden md:block relative h-[8px] bg-[var(--paper-warm)] border border-[var(--border)] rounded-full mb-28 mx-12">
                    {/* Active Track Progress */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-[#7D8C6E] rounded-full"
                        style={{ width: trackWidth }}
                    />
                    
                    {/* Station Stops */}
                    {EXPERIENCES.map((exp, i) => (
                        <div
                            key={exp.id}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${(i / EXPERIENCES.length) * 45 + 20}%` }}
                        >
                            <StationStopMarker exp={exp} index={i} />
                        </div>
                    ))}

                    {/* Next stop (Future Chapter) */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: "80%" }}
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Inactive station dot */}
                            <div className="w-6 h-6 rounded-full bg-[var(--paper-light)] border-[3px] border-dashed border-[var(--ink-ghost)] flex items-center justify-center text-[9px] font-mono text-[var(--ink-ghost)]">
                                BM-03
                            </div>
                            {/* Station Label */}
                            <div className="absolute top-8 flex flex-col items-center w-32 text-center">
                                <span className="text-[11px] font-serif font-bold text-[var(--ink-ghost)]">Next Chapter</span>
                                <span className="text-[9px] font-mono text-[var(--ink-ghost)] uppercase mt-0.5">Destination</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience cards */}
                <div className="flex flex-col md:flex-row gap-8 mt-12">
                    {EXPERIENCES.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}

                    {/* Future Destination Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 p-8 bg-[var(--paper-warm)]/30 border-2 border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center text-center min-h-[220px]"
                    >
                        <span className="text-3xl font-serif text-[var(--ink-ghost)] mb-3">?</span>
                        <span className="text-sm font-serif font-medium text-[var(--ink-ghost)]">Next Stop</span>
                        <p className="text-xs font-sans text-[var(--ink-ghost)] mt-2 max-w-[200px]">
                            Collaborating with forward-thinking engineering teams to scale AI architectures.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function StationStopMarker({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "backOut" }}
            className="relative flex flex-col items-center"
        >
            {/* Station code badge circle */}
            <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono font-bold border-[3px] shadow-sm z-10 transition-colors duration-500 ${
                    exp.status === "active" 
                        ? "bg-[#7D8C6E] text-[var(--paper-light)] border-[#3A352F]" 
                        : "bg-[var(--paper-light)] text-[var(--ink-light)] border-[#3A352F]"
                }`}
            >
                {exp.code}
            </div>

            {/* Pulsing signal lamp for the active station stop */}
            {exp.status === "active" && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-20">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7D8C6E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#7D8C6E]"></span>
                </span>
            )}

            {/* Station labels */}
            <div className="absolute top-9 flex flex-col items-center w-32 text-center">
                <span className="text-[11px] font-serif font-medium text-[var(--ink)]">
                    {exp.company}
                </span>
                <span className="text-[8px] font-mono tracking-wider text-[var(--ink-faded)] uppercase mt-0.5">
                    {exp.period}
                </span>
            </div>
        </motion.div>
    )
}

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 bg-[#FAF7F2] border-[3px] border-[#3A352F] rounded-2xl p-8 shadow-paper hover:shadow-paper-hover transition-all duration-500"
        >
            {/* Station indicator tag */}
            <div className="flex items-center gap-2 mb-5">
                <span className="px-2.5 py-1 text-[9px] font-mono font-bold bg-[#3A352F] text-[var(--paper-light)] rounded-sm">
                    {exp.code}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--ink-faded)]">
                    {exp.period}
                </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[var(--ink)] mb-1 tracking-tight">
                {exp.role}
            </h3>
            <p className="text-base font-sans font-bold text-[var(--brush-warm)] mb-6">
                {exp.company}
            </p>

            {/* Achievements */}
            <ul className="space-y-3 mb-6">
                {exp.achievements.map((a, i) => (
                    <li key={i} className="text-base font-sans text-[var(--ink-light)] leading-relaxed flex gap-2 font-medium">
                        <span className="text-[var(--brush-warm)] mt-1.5 flex-shrink-0">—</span>
                        {a}
                    </li>
                ))}
            </ul>

            {/* Tech */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                {exp.tech.map((t) => (
                    <span
                        key={t}
                        className="px-3.5 py-2 text-xs font-sans font-bold rounded-full bg-[var(--paper-warm)] text-[var(--ink-faded)] border border-[var(--border)]"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}
