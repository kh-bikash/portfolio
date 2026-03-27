"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Users, Cpu } from "lucide-react"

import { Certifications } from "@/components/dom/Certifications"
import { useAudioSystem } from "@/hooks/useAudioSystem"

type Tab = 'ABOUT' | 'CERTS'

export function AboutSection() {
    const [tab, setTab] = useState<Tab>('ABOUT')
    const { playClick } = useAudioSystem()

    return (
        <section id="about" className="relative w-full min-h-screen flex flex-col pt-32 pb-24 z-10 bg-[#fafafa] dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden">
            
            {/* Ambient Artificial Intelligence Background */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-300/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                        x: [-50, 50, -50],
                        y: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-[10%] w-[40vw] h-[40vw] bg-cyan-300/40 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col items-center relative z-10">
                
                {/* Minimalist Navigation Tabs */}
                <div className="flex justify-center mb-16 p-1.5 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
                    {[
                        { id: 'ABOUT', icon: Cpu, label: 'Intelligence Profile' },
                        { id: 'CERTS', icon: Award, label: 'Credentials' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { playClick(); setTab(item.id as Tab) }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                tab === item.id
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="w-full relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {tab === 'ABOUT' && (
                            <motion.div
                                key="about"
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full flex flex-col items-center"
                            >
                                {/* Minimalist Apple Profile Picture */}
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="mb-8 p-1.5 bg-white/40 dark:bg-white/10 backdrop-blur-3xl rounded-full shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.03)] border border-white/60 dark:border-white/10"
                                >
                                    <img 
                                        src="/profile.jpg" 
                                        alt="Bikash Profile" 
                                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full grayscale-[50%] hover:grayscale-0 transition-all duration-700 ease-out cursor-default"
                                    />
                                </motion.div>

                                <h2 className="text-5xl md:text-7xl font-semibold mb-8 text-center tracking-tight leading-[1.1]">
                                    AI Engineer <br className="hidden md:block"/>
                                    <span className="text-zinc-400 dark:text-zinc-500">& Software Architect.</span>
                               </h2>
                                
                                <p className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed text-center mb-20 max-w-3xl font-light">
                                    I am an <span className="text-zinc-900 dark:text-white font-medium">AI Engineer</span> forging the intelligence engines of tomorrow. With deep expertise in <span className="text-zinc-900 dark:text-white font-medium">Generative AI</span>, Large Language Models, and scalable backends, I architect systems where bleeding-edge algorithms meet Apple-style, human-centric design.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">
                                    {[
                                        { title: "Machine Intelligence", desc: "TensorFlow, PyTorch, LLMs" },
                                        { title: "Cloud Native", desc: "AWS, Aviatrix, Serverless" },
                                        { title: "Core Backend", desc: "Python, Node.js, NextJS" },
                                        { title: "Frontend Client", desc: "React, TypeScript, Framer" }
                                    ].map((skill) => (
                                        <div 
                                            key={skill.title} 
                                            className="p-8 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] transition-all cursor-default"
                                        >
                                            <h3 className="text-zinc-900 dark:text-white font-semibold mb-2 text-lg tracking-tight">{skill.title}</h3>
                                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500 leading-relaxed">{skill.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {tab === 'CERTS' && (
                            <motion.div
                                key="certs"
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full"
                            >
                                <Certifications />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
