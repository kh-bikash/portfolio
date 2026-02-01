"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, BookOpen, Award, Users } from "lucide-react"

import { Certifications } from "@/components/dom/Certifications"
import { useAudioSystem } from "@/hooks/useAudioSystem"


type Tab = 'ABOUT' | 'CERTS'

export function AboutSection() {
    const [tab, setTab] = useState<Tab>('ABOUT')
    const { playClick, playHover } = useAudioSystem()

    return (
        <section id="about" className="relative w-full min-h-screen flex flex-col pt-20 pb-10 z-10 pointer-events-auto bg-black/80 backdrop-blur-sm text-white">
            {/* NAVIGATION TABS */}
            <div className="flex justify-center gap-4 mb-4 z-50">
                {[
                    { id: 'ABOUT', icon: Users, label: 'ABOUT ME' },
                    { id: 'CERTS', icon: Award, label: 'CREDENTIALS' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => { playClick(); setTab(item.id as Tab) }}
                        onMouseEnter={playHover}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest transition-all ${tab === item.id
                            ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                            : "bg-white/5 border-transparent text-gray-500 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        <item.icon className="w-3 h-3" />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {tab === 'ABOUT' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto"
                        >
                            <h2 className="text-4xl font-bold mb-6 text-center tracking-tight">
                                <span className="text-cyan-400">Software Engineer</span> & <span className="text-purple-400">AI Specialist</span>
                            </h2>
                            <p className="text-lg text-zinc-300 leading-relaxed text-center mb-8">
                                I am a passionate developer specializing in <span className="text-white font-bold">Generative AI</span>, <span className="text-white font-bold">Cloud-Native Architectures</span>, and <span className="text-white font-bold">Full Stack Engineering</span>.
                                With a strong foundation in Python and Data Structures, I build intelligent systems that bridge the gap between complex algorithms and intuitive user experiences.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-1">AI & ML</h3>
                                    <p className="text-xs text-zinc-500">TensorFlow, PyTorch</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-1">Cloud</h3>
                                    <p className="text-xs text-zinc-500">AWS, Aviatrix</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-1">Backend</h3>
                                    <p className="text-xs text-zinc-500">Python, Node.js</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-1">Frontend</h3>
                                    <p className="text-xs text-zinc-500">React, TypeScript</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {tab === 'CERTS' && (
                        <motion.div
                            key="certs"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0"
                        >
                            <Certifications />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
