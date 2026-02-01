"use client"

import { useUIStore } from "@/store/useUIStore"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { HolographicProjector } from "@/components/dom/HolographicProjector"

// DATA DICTIONARY
const PROJECT_CONTENT: Record<string, any> = {
    "NEURAL NETWORK": {
        description: "Input vector received. Analyzing project parameters. Objective: Deliver high-performance neural architecture.",
        tech: ["Python", "PyTorch", "TensorFlow", "CUDA"],
        process: "Training cycles optimized via gradient descent. Loss functions minimized for high-accuracy predictions.",
        link: "https://github.com/active-theory/neural-sim"
    },
    "COMPUTER VISION": {
        description: "Visual data stream acquired. Processing pixel arrays for object classification and feature extraction.",
        tech: ["OpenCV", "YOLOv8", "React", "WebGL"],
        process: "Real-time edge detection and bounding box regression running on client-side GPU shaders.",
        link: "https://github.com/active-theory/vision-hud"
    },
    "GENERATIVE AI": {
        description: "Large Language Model initialized. Transforming latent text embeddings into creative visual outputs.",
        tech: ["Transformers", "Stable Diffusion", "LangChain", "Next.js"],
        process: "Attention mechanisms leveraged to generate context-aware artifacts from user prompts.",
        link: "https://github.com/active-theory/gen-ai"
    },
    "ROBOTICS": {
        description: "Hardware abstraction layer active. Integrating sensor fusion algorithms for autonomous navigation.",
        tech: ["ROS 2", "C++", "Gazebo", "Raspberry Pi"],
        process: "Path planning algorithms (A*) executing real-time obstacle avoidance cycles.",
        link: "https://github.com/active-theory/robot-control"
    },
    "DATA SCIENCE": {
        description: "Big Data pipeline connected. Aggregating structured datasets for predictive modulation.",
        tech: ["Pandas", "Scikit-Learn", "Jupyter", "D3.js"],
        process: "Statistical regression models applied to visualize trends and outlier anomalies.",
        link: "https://github.com/active-theory/data-viz"
    },
    "BEST WORKS": {
        description: "Portfolio archive accessed. Retrieving top-rated case studies with maximum impact factor.",
        tech: ["React", "Next.js", "Three.js", "Tailwind"],
        process: "Curated selection of high-fidelity web experiences demonstrating technical mastery.",
        link: "https://activetheory.net"
    },
    "CONTACT ME": {
        description: "Communication protocols engaged. Established secure channel for professional collaboration.",
        tech: ["Email", "LinkedIn", "Twitter", "GitHub"],
        process: "Awaiting incoming transmission. Response latency: < 24 hours.",
        link: "mailto:bikash@example.com"
    }
}

export function ProjectDetail() {
    const { activeProject, setActiveProject } = useUIStore()

    if (!activeProject) return null

    // Fallback if key not found
    const content = PROJECT_CONTENT[activeProject.title] || {
        description: "Input vector received. Analyzing project parameters and initial constraints. Objective: Deliver high-performance solution.",
        tech: ["React", "Three.js", "TypeScript", "Node.js"],
        process: "Processing logic involves state management via Zustand and 3D rendering optimization using R3F hooks.",
        link: "#"
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* BACKDROP */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveProject(null)} />

                {/* HOLOGRAPHIC CARD */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-black/50 border border-primary/30 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.1)] backdrop-blur-2xl p-8 md:p-12"
                >
                    {/* HOLOGRAPHIC SCANLINES */}
                    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0" style={{ backgroundSize: "100% 2px, 3px 100%" }} />


                    {/* Close Button */}
                    <button
                        onClick={() => setActiveProject(null)}
                        className="absolute top-6 right-6 text-primary/50 hover:text-white transition-colors z-20 group"
                    >
                        <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                            <X className="w-4 h-4" />
                        </div>
                    </button>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* SVG CONNECTOR LINES (Background) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block">
                            {/* Line from Input (0) to Hidden (1) */}
                            <path d="M 250 150 C 350 150, 400 300, 500 300" stroke="#00E5FF" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                            {/* Line from Hidden (1) to Output (2) */}
                            <path d="M 600 350 C 700 350, 750 500, 850 500" stroke="#00E5FF" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                        </svg>

                        {/* LAYER 0: INPUT (Context) */}
                        <div className="space-y-6">
                            <div className="border-l-2 border-primary pl-4">
                                <h2 className="text-[10px] text-primary/70 tracking-[0.2em] mb-2 font-mono">LAYER_0 [INPUT]</h2>
                                <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter shadow-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">{activeProject.title}</h1>
                                <p className="text-lg text-primary font-light">{activeProject.subtitle}</p>
                            </div>
                            <div className="relative group overflow-hidden rounded-lg border border-white/10">
                                {activeProject.type === 'mobile' ? (
                                    <HolographicProjector image={activeProject.src || "/assets/images/placeholder.jpg"} title={activeProject.title} />
                                ) : (
                                    <>
                                        {activeProject.image && <img
                                            src={activeProject.image || activeProject.src}
                                            alt="Project"
                                            className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105"
                                        />}
                                    </>
                                )}
                                <div className="p-4 bg-white/5 backdrop-blur-md">
                                    <p className="text-xs text-gray-300 leading-relaxed font-mono">
                                        <span className="text-primary mr-2">&gt;</span>
                                        "{content.description}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* LAYER 1: HIDDEN (Processing/Tech) */}
                        <div className="space-y-6 md:mt-24">
                            <div className="border-l-2 border-purple-500 pl-4">
                                <h2 className="text-[10px] text-purple-400 tracking-[0.2em] mb-2 font-mono">LAYER_1 [HIDDEN]</h2>
                                <h3 className="text-xl font-bold text-white mb-4">ARCHITECTURE</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {content.tech.map((tech: string) => (
                                    <div key={tech} className="bg-purple-900/10 border border-purple-500/30 p-3 text-center text-[10px] text-purple-300 font-mono uppercase hover:bg-purple-900/30 transition-colors cursor-crosshair">
                                        {tech}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 font-mono border-t border-white/5 pt-4">
                                <span className="text-purple-400 mr-2">root@system:~$</span>
                                {content.process}
                            </p>
                        </div>

                        {/* LAYER 2: OUTPUT (Results) */}
                        <div className="space-y-6 md:mt-48">
                            <div className="border-l-2 border-green-500 pl-4">
                                <h2 className="text-[10px] text-green-400 tracking-[0.2em] mb-2 font-mono">LAYER_2 [OUTPUT]</h2>
                                <h3 className="text-xl font-bold text-white mb-4">DEPLOYMENT</h3>
                            </div>

                            <div className="flex flex-col gap-3">
                                <a href={content.link} target="_blank" className="group relative bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 p-4 text-center uppercase tracking-widest transition-all font-bold overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        View Live System
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    </span>
                                    <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                </a>
                                <a href={content.link} target="_blank" className="bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 p-4 text-center uppercase tracking-widest transition-colors text-[10px]">
                                    &lt;/&gt; View Source Code
                                </a>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
