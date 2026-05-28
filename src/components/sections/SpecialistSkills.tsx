"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const SPECIALTIES = [
    {
        id: "01",
        title: "AI Engineering",
        subtitle: "LLMs, Machine Learning, Data Pipeline",
        description: "Specialized in integrating advanced Language Models, designing predictive machine learning algorithms, and building scalable data processing pipelines. Bringing generative intelligence into production environments with robust prompt engineering and fine-tuning."
    },
    {
        id: "02",
        title: "System Design",
        subtitle: "Scalable Architecture, Microservices, Cloud",
        description: "Architecting resilient, highly-available backend systems. Deep expertise in distributed systems, API gateway design, and cloud-native deployments ensuring secure and seamless data flow across global enterprise networks."
    },
    {
        id: "03",
        title: "UI/UX & Frontend",
        subtitle: "React, Framer Motion, Design Systems",
        description: "Crafting pixel-perfect, highly cinematic user experiences. Merging deep technical frontend knowledge with a highly developed sense of aesthetics, typography, and motion design to create unforgettable digital journeys."
    }
]

export function SpecialistSkills() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-20%" })

    return (
        <section ref={ref} className="relative w-full min-h-screen bg-[#F5F0E8] text-[#1A1918] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto w-full"
            >
                {/* Minimalist Header */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8D5C4] pb-8">
                    <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight">
                        Specialized<br/>Expertise
                    </h2>
                    <p className="text-[#5D4037] font-sans text-sm md:text-base max-w-sm mt-6 md:mt-0 leading-relaxed">
                        A unique convergence of artificial intelligence, scalable systems engineering, and cinematic frontend design.
                    </p>
                </div>

                {/* Structured Typographic Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
                    {SPECIALTIES.map((skill, index) => (
                        <motion.div 
                            key={skill.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.15), ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col group"
                        >
                            <div className="text-[#81C784] font-mono text-sm mb-6 border-b border-[#81C784]/30 pb-4 inline-block w-full">
                                {skill.id} //
                            </div>
                            <h3 className="text-3xl font-serif mb-2 group-hover:text-[#4CA1AF] transition-colors duration-500">
                                {skill.title}
                            </h3>
                            <h4 className="text-sm font-sans font-medium text-[#5D4037] mb-6 tracking-wide uppercase">
                                {skill.subtitle}
                            </h4>
                            <p className="text-base font-sans text-[#1A1918]/70 leading-relaxed">
                                {skill.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </section>
    )
}
