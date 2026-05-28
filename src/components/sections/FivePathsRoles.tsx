"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Layers, PenTool, Code, Server } from "lucide-react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"
import { useMotionValue, useTransform } from "framer-motion"

const ROLES = [
    {
        title: "AI Engineer",
        icon: Brain,
        description: "Building intelligent systems with LLMs, RAG pipelines, and semantic search.",
        skills: ["LLMs", "RAG", "NLP", "Semantic Search", "Transformers", "Embeddings"],
        accent: "var(--brush-warm)",
    },
    {
        title: "System Designer",
        icon: Layers,
        description: "Architecting scalable, distributed systems with reliability at scale.",
        skills: ["System Architecture", "Scalability", "Microservices", "Distributed Systems"],
        accent: "var(--brush-indigo)",
    },
    {
        title: "Software Designer",
        icon: PenTool,
        description: "Crafting intuitive interfaces and cohesive design systems.",
        skills: ["UI/UX", "Design Systems", "Frontend Engineering", "React", "TypeScript"],
        accent: "var(--brush-sage)",
    },
    {
        title: "Software Engineer",
        icon: Code,
        description: "Full-stack development with strong fundamentals across multiple languages.",
        skills: ["Python", "Java", "C++", "SQL", "JavaScript", "Full Stack"],
        accent: "var(--brush-warm)",
    },
    {
        title: "Backend Engineer",
        icon: Server,
        description: "Building robust APIs, data pipelines, and cloud infrastructure.",
        skills: ["FastAPI", "REST APIs", "PostgreSQL", "Docker", "CI/CD", "Linux"],
        accent: "var(--brush-indigo)",
    },
]

function Tsurikawa({ index }: { index: number }) {
    const dragX = useMotionValue(0)
    // Map drag translation directly to degrees of rotation around top pivot
    const rotate = useTransform(dragX, [-80, 80], [-25, 25])

    return (
        <div className="origin-top flex flex-col items-center select-none" style={{ height: "130px" }}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                style={{ x: dragX, rotate, originY: 0 }}
                animate={dragX.get() === 0 ? { rotate: [1.5, -1.5, 1.5] } : {}}
                transition={{
                    duration: 5 + (index % 3) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing z-20"
            >
                {/* Strap */}
                <div className="w-[3px] h-16 bg-[#8B8680] shadow-sm pointer-events-none" />
                {/* Triangular Ring */}
                <div className="w-10 h-10 border-[4px] border-[#DDD8CE] bg-white/5 rounded-full -mt-0.5 shadow-sm pointer-events-none" />
            </motion.div>
        </div>
    )
}

function RoleCard({ role, index }: { role: typeof ROLES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#FAF7F2] border-[3px] border-[#3A352F] rounded-xl p-8 shadow-paper hover:shadow-paper-hover transition-all duration-500 hover:-translate-y-1 cursor-default"
        >
            {/* Metal poster mounting clip at the top */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-10 h-[10px] bg-[#8B8680] border-2 border-[#3A352F] rounded-t-sm" />

            {/* Brush accent */}
            <div
                className="absolute top-0 left-6 w-12 h-[3px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: role.accent }}
            />

            {/* Icon */}
            <div className="mb-5 p-3 inline-flex rounded-xl bg-[var(--paper-warm)] border border-[var(--border)]">
                <role.icon className="w-5 h-5" style={{ color: role.accent }} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3 tracking-tight">
                {role.title}
            </h3>

            {/* Description */}
            <p className="text-base font-sans text-[var(--ink-faded)] leading-relaxed mb-6 font-medium">
                {role.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3.5 py-2 text-xs font-sans font-bold rounded-full bg-[var(--paper-warm)] text-[var(--ink-light)] border border-[var(--border)] transition-colors group-hover:border-[var(--ink-ghost)]"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

export function FivePathsRoles() {
    return (
        <section id="roles" className="relative w-full py-32 px-6 md:px-12 bg-[#F5F0E8] overflow-hidden">
            {/* Train Handrail Pipe */}
            <div className="absolute top-[80px] left-0 right-0 h-[8px] bg-gradient-to-b from-[#E8E0D4] to-[#BDB5A8] border-b border-[#8B8680] z-10 flex justify-around px-24 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Tsurikawa key={i} index={i} />
                ))}
            </div>

            <div className="max-w-6xl mx-auto mt-16 relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base font-sans font-bold tracking-[0.4em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        Five Paths
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        What I Do
                    </BrushReveal>
                </div>

                <InkDivider width={120} className="mb-16" />

                {/* Roles grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                    {ROLES.map((role, i) => (
                        <RoleCard key={role.title} role={role} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
