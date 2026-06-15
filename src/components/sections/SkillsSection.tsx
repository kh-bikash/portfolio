"use client"

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { Terminal, Server, BrainCircuit, Workflow, Layers } from 'lucide-react'

// Base URL for Devicon SVG logos
const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/"

const SKILL_CATEGORIES = [
    {
        title: "Programming Languages & Web",
        icon: Terminal,
        color: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-blue-500/50",
        skills: [
            { name: "Python", icon: "python/python-original.svg" },
            { name: "TypeScript", icon: "typescript/typescript-original.svg" },
            { name: "JavaScript", icon: "javascript/javascript-original.svg" },
            { name: "Java", icon: "java/java-original.svg" },
            { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
            { name: "SQL", icon: null },
            { name: "Rust", icon: "rust/rust-original.svg" },
            { name: "React.js", icon: "react/react-original.svg" },
            { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
            { name: "HTML5", icon: "html5/html5-original.svg" },
            { name: "CSS3", icon: "css3/css3-original.svg" }
        ]
    },
    {
        title: "AI / ML & LLM Engineering",
        icon: BrainCircuit,
        color: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50",
        skills: [
            { name: "Generative AI", icon: null },
            { name: "LLMs", icon: null },
            { name: "RAG", icon: null },
            { name: "Semantic Search", icon: null },
            { name: "Embeddings", icon: null },
            { name: "Transformers", icon: null },
            { name: "HuggingFace Pipelines", icon: null },
            { name: "Prompt Engineering", icon: null },
            { name: "NLP", icon: null },
            { name: "Fine-Tuning", icon: null },
            { name: "Reinforcement Learning", icon: null },
            { name: "ROUGE", icon: null },
            { name: "BERTScore", icon: null },
            { name: "MLflow", icon: null },
            { name: "MLOps", icon: null }
        ]
    },
    {
        title: "Agentic AI & Orchestration",
        icon: Workflow,
        color: "from-emerald-500/20 to-green-500/20",
        border: "group-hover:border-emerald-500/50",
        skills: [
            { name: "LangChain", icon: null },
            { name: "LlamaIndex", icon: null },
            { name: "Multi-Agent Systems", icon: null },
            { name: "AI Agents", icon: null },
            { name: "Function Calling", icon: null },
            { name: "Tool Calling", icon: null },
            { name: "Vector Databases", icon: null },
            { name: "SSE Streaming", icon: null },
            { name: "Workflow Orchestration", icon: null },
            { name: "Intelligent Automation", icon: null }
        ]
    },
    {
        title: "Data Science & Frameworks",
        icon: Layers,
        color: "from-pink-500/20 to-rose-500/20",
        border: "group-hover:border-pink-500/50",
        skills: [
            { name: "FastAPI", icon: "fastapi/fastapi-original.svg" },
            { name: "PyTorch", icon: "pytorch/pytorch-original.svg" },
            { name: "TensorFlow", icon: "tensorflow/tensorflow-original.svg" },
            { name: "Scikit-learn", icon: "scikitlearn/scikitlearn-original.svg" },
            { name: "Pandas", icon: "pandas/pandas-original.svg" },
            { name: "NumPy", icon: "numpy/numpy-original.svg" },
            { name: "Apache Spark", icon: "apachespark/apachespark-original.svg" },
            { name: "Hadoop", icon: "hadoop/hadoop-original.svg" },
            { name: "Three.js / R3F", icon: "threejs/threejs-original.svg" },
            { name: "Recharts", icon: null },
            { name: "Matplotlib", icon: "matplotlib/matplotlib-original.svg" },
            { name: "Tableau", icon: null },
            { name: "Pydantic", icon: null },
            { name: "Streamlit", icon: null }
        ]
    },
    {
        title: "Backend, Databases & DevOps",
        icon: Server,
        color: "from-orange-500/20 to-amber-500/20",
        border: "group-hover:border-orange-500/50",
        skills: [
            { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
            { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
            { name: "MySQL", icon: "mysql/mysql-original.svg" },
            { name: "SQLite", icon: "sqlite/sqlite-original.svg" },
            { name: "ChromaDB", icon: null },
            { name: "Pinecone", icon: null },
            { name: "Redis", icon: "redis/redis-original.svg" },
            { name: "Apache Kafka", icon: "apachekafka/apachekafka-original.svg" },
            { name: "Docker", icon: "docker/docker-original.svg" },
            { name: "GitHub Actions", icon: null },
            { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
            { name: "GCP", icon: "googlecloud/googlecloud-original.svg" },
            { name: "Azure", icon: "azure/azure-original.svg" },
            { name: "Git LFS", icon: "git/git-original.svg" },
            { name: "Linux", icon: "linux/linux-original.svg" },
            { name: "GraphQL", icon: "graphql/graphql-plain.svg" },
            { name: "REST APIs", icon: null },
            { name: "JWT Auth", icon: null },
            { name: "RBAC", icon: null }
        ]
    }
]

// Advanced Interactive Card with 3D Tilt and Spotlight Hover Effect
function SpotlightCard({ category, index }: { category: typeof SKILL_CATEGORIES[0], index: number }) {
    const boundingRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for 3D tilt
    const springConfig = { damping: 20, stiffness: 150 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    // Map mouse position to rotation degrees
    const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"])

    const [isHovered, setIsHovered] = useState(false)

    // Spotlight gradient mapped to raw mouse position for immediate feedback
    const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(255,255,255,0.08), transparent 80%)`

    function handleMouseMove(ev: React.MouseEvent<HTMLDivElement>) {
        if (!boundingRef.current) return
        const rect = boundingRef.current.getBoundingClientRect()
        const clientX = ev.clientX - rect.left
        const clientY = ev.clientY - rect.top
        
        // Normalize mouse coordinates (-0.5 to 0.5)
        const xPct = (clientX / rect.width) - 0.5
        const yPct = (clientY / rect.height) - 0.5
        
        mouseX.set(xPct)
        mouseY.set(yPct)
    }

    function handleMouseLeave() {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    const { ref, isInView } = useScrollReveal({ margin: '-50px' })
    const Icon = category.icon

    return (
        <motion.div
            ref={ref}
            initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{ perspective: 1000 }}
            className="w-full"
        >
            <motion.div
                ref={boundingRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={`relative h-full flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 group transition-colors duration-500 ${category.border}`}
            >
                {/* Dynamic Spotlight Layer */}
                <motion.div
                    className="absolute inset-0 z-0 rounded-[2rem] pointer-events-none transition-opacity duration-500"
                    style={{ background: isHovered ? spotlightBackground : undefined, opacity: isHovered ? 1 : 0 }}
                />

                {/* Ambient Category Gradient Layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10`} />

                {/* Content Layer */}
                <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-white mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                        {category.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill) => (
                            <div 
                                key={skill.name} 
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-white/70 text-sm font-medium group-hover:border-white/30 group-hover:text-white hover:!bg-white hover:!text-black transition-all duration-300 cursor-default shadow-sm"
                            >
                                {skill.icon ? (
                                    <img 
                                        src={`${ICON_BASE}${skill.icon}`} 
                                        alt={skill.name} 
                                        className="w-4 h-4 object-contain"
                                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                )}
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export function SkillsSection() {
    const { ref: headerRef, isInView: isHeaderInView } = useScrollReveal({ margin: '-80px' })

    return (
        <section id="skills" className="relative w-full py-32 md:py-48 bg-[var(--bg-primary)] overflow-hidden flex flex-col justify-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                
                {/* Header */}
                <div className="mb-20 md:mb-32 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        ref={headerRef}
                        initial="hidden" animate={isHeaderInView ? 'visible' : 'hidden'}
                        variants={revealVariants.fadeUp} transition={defaultTransition}
                    >
                        <span className="font-serif text-sm tracking-[0.5em] text-white/60 mb-4 block uppercase">
                            Technical Index
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white drop-shadow-2xl">
                            Core Arsenal.
                        </h2>
                    </motion.div>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-white/40 font-mono text-sm max-w-sm hidden md:block"
                    >
                        // Hover over the category modules to interact with the spotlight UI and reveal the underlying tech stack architectures.
                    </motion.p>
                </div>

                {/* Interactive Spotlight Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <div key={category.title} className={idx === 4 ? "md:col-span-2" : ""}>
                            <SpotlightCard category={category} index={idx} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
