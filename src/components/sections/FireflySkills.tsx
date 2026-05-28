"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"

const SKILL_CATEGORIES = [
    {
        title: "Programming Languages",
        skills: ["Python", "Java", "C++", "SQL", "JavaScript"],
        color: "var(--brush-warm)",
    },
    {
        title: "AI / Machine Learning",
        skills: ["Machine Learning", "Deep Learning", "Generative AI", "LLMs", "NLP", "Transformers", "CNNs", "Computer Vision", "Embeddings"],
        color: "var(--brush-sage)",
    },
    {
        title: "LLM Engineering & AI Systems",
        skills: ["RAG", "Prompt Engineering", "LangChain", "LlamaIndex", "AI Agents", "Vector Databases", "Intelligent Automation"],
        color: "var(--brush-indigo)",
    },
    {
        title: "Frameworks & Libraries",
        skills: ["FastAPI", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy"],
        color: "var(--brush-warm)",
    },
    {
        title: "Backend & Infrastructure",
        skills: ["REST APIs", "Microservices", "PostgreSQL", "ChromaDB", "Pinecone", "Docker", "Git", "Linux", "CI/CD"],
        color: "var(--brush-sage)",
    },
]

export function FireflySkills() {
    return (
        <section id="skills" className="relative w-full py-32 px-6 md:px-12 bg-[var(--paper)] overflow-hidden">
            {/* Subtle garden silhouette at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none opacity-[0.04]">
                <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
                    <path fill="var(--ink)" d="M0,160L60,144C120,128,240,96,360,106.7C480,117,600,171,720,176C840,181,960,139,1080,117.3C1200,96,1320,96,1380,96L1440,96L1440,200L0,200Z" />
                </svg>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        円相 — Ensō
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        The Craft
                    </BrushReveal>
                </div>

                <InkDivider width={100} className="mb-16" />

                {/* Skill categories */}
                <div className="space-y-12">
                    {SKILL_CATEGORIES.map((category, catIndex) => (
                        <SkillRow key={category.title} category={category} index={catIndex} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function SkillRow({ category, index }: { category: typeof SKILL_CATEGORIES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <h3 className="text-base font-serif font-medium text-[var(--ink)] mb-4 flex items-center gap-3">
                <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                />
                {category.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, i) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1 + i * 0.04,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="px-4 py-2 text-sm font-sans bg-[var(--paper-warm)] text-[var(--ink-light)] rounded-full border border-[var(--border)] hover:border-[var(--ink-ghost)] transition-all cursor-default"
                        style={{
                            animationDelay: `${i * 0.5 + index * 2}s`,
                        }}
                    >
                        <span className="relative">
                            {skill}
                            {/* Subtle firefly glow on hover */}
                            <span
                                className="absolute -inset-1 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-md"
                                style={{ backgroundColor: category.color + "20" }}
                            />
                        </span>
                    </motion.span>
                ))}
            </div>
        </motion.div>
    )
}
