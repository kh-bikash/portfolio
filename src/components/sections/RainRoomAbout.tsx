"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"
import { RainOnGlass } from "@/components/three/RainOnGlass"
import { Award } from "lucide-react"

const STATS = [
    { label: "CGPA", value: "9.32", sub: "KL University" },
    { label: "Problems", value: "700+", sub: "DSA Solved" },
    { label: "Rating", value: "4★", sub: "CodeChef" },
]

const CERTS = [
    "SAP Generative AI Developer",
    "OCI Architect Associate",
    "Salesforce AI Associate",
]

export function RainRoomAbout() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section
            id="about"
            className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[var(--paper)] overflow-hidden"
        >
            {/* Rain on glass — decorative window */}
            <div className="absolute top-8 right-8 w-[280px] h-[400px] rounded-lg border border-[var(--border)] overflow-hidden opacity-40 hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--rain)]/20 to-[var(--paper-warm)]/30" />
                <RainOnGlass />
            </div>

            <div ref={ref} className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        侘寂 — Wabi-sabi
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        About Me
                    </BrushReveal>
                </div>

                <InkDivider width={100} className="mb-16" />

                {/* Profile + Bio */}
                <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0"
                    >
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-[var(--paper-warm)] shadow-paper">
                            <img
                                src="/profile.jpg"
                                alt="Bikash Meitei"
                                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-lg md:text-xl font-sans font-light text-[var(--ink-light)] leading-relaxed mb-6">
                            AI-focused Software Engineering undergraduate at{" "}
                            <span className="text-[var(--ink)] font-medium">KL University</span>{" "}
                            (2023–2027), specializing in{" "}
                            <span className="text-[var(--ink)] font-medium">Generative AI</span>,{" "}
                            Large Language Models, and Retrieval-Augmented Generation.
                        </p>
                        <p className="text-base font-sans font-light text-[var(--ink-faded)] leading-relaxed">
                            I build scalable AI applications, low-latency APIs, vector retrieval systems,
                            and intelligent automation workflows using Python, FastAPI, LangChain,
                            TensorFlow, PyTorch, and PostgreSQL.
                        </p>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center p-6 bg-[var(--paper-warm)] rounded-xl border border-[var(--border)]"
                        >
                            <div className="text-3xl md:text-4xl font-serif font-light text-[var(--ink)] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[var(--ink-faded)]">
                                {stat.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3 className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[var(--ink-faded)] mb-6 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Certifications
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {CERTS.map((cert) => (
                            <span
                                key={cert}
                                className="px-4 py-2 text-sm font-sans bg-[var(--paper-warm)] text-[var(--ink-light)] rounded-full border border-[var(--border)]"
                            >
                                {cert}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
