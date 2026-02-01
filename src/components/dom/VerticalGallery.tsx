"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const PROJECTS = [
    {
        id: 1,
        title: "Neural Interface",
        category: "AI / Design",
        image: "/project1.png",
        description: "A brain-computer interface visualization for the next era of humanity.",
        year: "2024"
    },
    {
        id: 2,
        title: "Quantum Dashboard",
        category: "Data Vis",
        image: "/project2.png",
        description: "Real-time financial analytics visualized through quantum particles.",
        year: "2023"
    },
    {
        id: 3,
        title: "Ethereal Commerce",
        category: "Web3",
        image: "/project3.png",
        description: "The future of digital shopping. Glass, light, and air.",
        year: "2023"
    },
    {
        id: 4,
        title: "Sonic Brand",
        category: "Audio",
        image: "/project4.png",
        description: "Visualizing sound waves for a global audio branding agency.",
        year: "2022"
    },
]

export function VerticalGallery() {
    return (
        <section className="relative w-full py-32 bg-background">
            <div className="container mx-auto px-6 md:px-12">

                <div className="mb-24">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Selected Work</h2>
                    <p className="text-5xl md:text-7xl font-light text-foreground tracking-tight">
                        Digital <span className="font-serif italic text-zinc-400">Artifacts</span>
                    </p>
                </div>

                <div className="flex flex-col gap-32">
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
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={`flex flex-col md:flex-row gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Image Side */}
            <div className="w-full md:w-3/5 h-[60vh] relative overflow-hidden rounded-sm group">
                <motion.div
                    style={{ y }}
                    className="absolute inset-[-20%] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    initial={{ backgroundImage: `url(${project.image})` }}
                    animate={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-2/5 md:py-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold tracking-widest text-primary">0{index + 1}</span>
                    <div className="h-px w-12 bg-zinc-300" />
                    <span className="text-xs font-mono text-zinc-400">{project.year}</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h3>
                <p className="text-lg text-zinc-500 leading-relaxed mb-8">{project.description}</p>

                <ul className="flex flex-wrap gap-2">
                    {project.category.split(' / ').map((tag: string) => (
                        <li key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] uppercase tracking-widest rounded-full">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>

        </motion.div>
    )
}
