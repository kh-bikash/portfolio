"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Using the same projects but we will style them vertically
const PROJECTS = [
    {
        id: 1,
        title: "Neural Interface",
        category: "AI / Design",
        image: "/project1.png",
        description: "A brain-computer interface visualization.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        id: 2,
        title: "Quantum Dashboard",
        category: "Data Vis",
        image: "/project2.png",
        description: "Real-time financial analytics visualized.",
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: 3,
        title: "Ethereal Commerce",
        category: "Web3",
        image: "/project3.png",
        description: "The future of digital shopping.",
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: 4,
        title: "Sonic Brand",
        category: "Audio",
        image: "/project4.png",
        description: "Visualizing sound waves.",
        color: "from-orange-500 to-red-500"
    },
]

export function CrystalGallery() {
    return (
        <section className="relative w-full py-32 bg-transparent z-10">
            <div className="container mx-auto px-6">

                <div className="mb-32 pl-4 md:pl-0 border-l-2 border-cyan-500/30">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase mb-4">Selected Work</h2>
                    <p className="text-5xl md:text-7xl font-light text-zinc-800 tracking-tight">
                        Digital <span className="font-serif italic text-zinc-400">Prisms</span>
                    </p>
                </div>

                <div className="flex flex-col gap-40">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

            </div>
        </section>
    )
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [150, -150])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

    const isRight = index % 2 !== 0

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`flex flex-col md:flex-row gap-12 items-center ${isRight ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Card Container */}
            <div className="w-full md:w-3/5 h-[65vh] relative group perspective-1000">

                {/* Glass Overlay/Border */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-white/80 to-white/20 rounded-xl border border-white/50 shadow-2xl backdrop-blur-sm z-0 transform transition-transform duration-700 group-hover:scale-[1.02]" />

                {/* Image Window */}
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-200 z-10">
                    <motion.div
                        style={{ y }}
                        className="absolute inset-[-20%] bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0"
                        initial={{ backgroundImage: `url(${project.image})` }}
                        animate={{ backgroundImage: `url(${project.image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500`} />

                    {/* Tech Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-black/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">{project.category}</span>
                    </div>
                </div>

            </div>

            {/* Text Side */}
            <div className="w-full md:w-2/5 relative z-20">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold tracking-widest text-cyan-600">0{index + 1}</span>
                    <div className="h-px w-20 bg-linear-to-r from-cyan-500/50 to-transparent" />
                </div>

                <h3 className="text-5xl md:text-6xl font-bold mb-6 text-zinc-900 leading-none tracking-tight group-hover:text-cyan-900 transition-colors">
                    {project.title}
                </h3>

                <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-md">
                    {project.description}
                </p>

                <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 font-bold text-sm tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-lg hover:shadow-xl">
                    VIEW CASE STUDY
                </button>
            </div>

        </motion.div>
    )
}
