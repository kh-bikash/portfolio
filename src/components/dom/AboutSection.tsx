"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, BookOpen, Award, Users } from "lucide-react"

import { TestimonialsRing } from "@/components/dom/TestimonialsRing"
import { ReadingList } from "@/components/dom/ReadingList"
import { Certifications } from "@/components/dom/Certifications"
import { useAudioSystem } from "@/hooks/useAudioSystem"

type Tab = 'REVIEWS' | 'LIBRARY' | 'CERTS'

export function AboutSection() {
    const [tab, setTab] = useState<Tab>('REVIEWS')
    const { playClick, playHover } = useAudioSystem()

    return (
        <section id="about" className="relative w-full min-h-screen flex flex-col pt-20 pb-10 z-10 pointer-events-auto bg-black/80 backdrop-blur-sm text-white">
            {/* NAVIGATION TABS */}
            <div className="flex justify-center gap-4 mb-4 z-50">
                {[
                    { id: 'REVIEWS', icon: Users, label: 'FEEDBACK' },
                    { id: 'LIBRARY', icon: BookOpen, label: 'LIBRARY' },
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
                    {tab === 'REVIEWS' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0"
                        >
                            <TestimonialsRing />
                        </motion.div>
                    )}

                    {tab === 'LIBRARY' && (
                        <motion.div
                            key="library"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0"
                        >
                            <ReadingList />
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
