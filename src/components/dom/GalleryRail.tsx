"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const PROJECTS = [
    {
        id: 1,
        title: "Neural Interface",
        category: "AI / Design",
        image: "/project1.png",
        video: "/videos/neural-loop.mp4",
        color: "#f3f4f6"
    },
    {
        id: 2,
        title: "Quantum Dashboard",
        category: "Data Vis",
        image: "/project2.png",
        video: "/videos/dashboard-loop.mp4",
        color: "#e5e7eb"
    },
    {
        id: 3,
        title: "Ethereal Commerce",
        category: "Web3",
        image: "/project3.png",
        video: "/videos/commerce-loop.mp4",
        color: "#d1d5db"
    },
    {
        id: 4,
        title: "Sonic Brand",
        category: "Audio",
        image: "/project4.png",
        video: "/videos/audio-loop.mp4",
        color: "#9ca3af"
    },
]

export function GalleryRail() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: targetRef })

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">

                    {/* Intro Text */}
                    <div className="flex flex-col justify-center min-w-[300px]">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4"
                        >
                            Selected Work
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-light text-foreground/80"
                        >
                            A curation of <br />
                            <span className="italic font-serif">digital artifacts</span>.
                        </motion.p>
                    </div>

                    {/* Cards */}
                    {PROJECTS.map((project, i) => (
                        <Card key={project.id} project={project} index={i} />
                    ))}

                </motion.div>
            </div>
        </section>
    )
}

function Card({ project, index }: { project: any, index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="relative group w-[600px] h-[400px] bg-secondary overflow-hidden shrink-0 cursor-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* IMAGE LAYER (Parallax Effect Mockup via scale/position could go here) */}
            <div className="absolute inset-0 bg-zinc-200" />

            <motion.div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${project.image})` }}
                animate={{ scale: hovered ? 1.1 : 1 }}
            />

            {/* VIDEO REVEAL LAYER */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-black"
                    >
                        {/* Placeholder for video - in production this would be a <video> tag */}
                        <div className="w-full h-full opacity-50 bg-gradient-to-tr from-primary/20 to-purple-500/20" />
                        <p className="absolute inset-0 flex items-center justify-center text-white/50 text-xs tracking-widest uppercase">
                            Video Preview
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                <h3 className="text-3xl font-bold text-transparent text-stroke-white group-hover:text-stroke-primary group-hover:text-primary transition-colors duration-300 translate-y-full group-hover:translate-y-0 transform transition-transform duration-500">
                    {project.title}
                </h3>
                <p className="text-white/60 uppercase text-xs tracking-widest mt-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {project.category}
                </p>
            </div>

            {/* CUSTOM CURSOR LABEL */}
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-8 right-8 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-30"
                >
                    View Case
                </motion.div>
            )}
        </div>
    )
}
