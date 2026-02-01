"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BookOpen } from "lucide-react"

export function ThoughtStream() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Trigger Button */}
            <div className="fixed bottom-8 right-8 z-40 hidden md:block">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur border border-zinc-200 rounded-full hover:border-cyan-400 transition-colors shadow-sm group"
                >
                    <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 transition-colors" />
                    <span className="text-xs font-mono tracking-widest text-zinc-600 group-hover:text-zinc-900">THOUGHT_STREAM</span>
                </button>
            </div>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-zinc-50/95 backdrop-blur-xl overflow-y-auto"
                    >
                        <div className="max-w-2xl mx-auto py-24 px-6">

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="fixed top-8 right-8 p-2 rounded-full hover:bg-zinc-200 transition-colors"
                            >
                                <X className="w-6 h-6 text-zinc-800" />
                            </button>

                            {/* Content */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-xs font-mono text-cyan-600 mb-4 block">LOG_ENTRY: 001</span>
                                <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-8 italic">
                                    The Ethics of Synthetic Cognition
                                </h1>

                                <div className="prose prose-zinc prose-lg">
                                    <p>
                                        As we stand on the precipice of a new era in intelligence, the question isn't just about what we can build, but what we SHOULD build. The neural pathways of our digital creations are beginning to mirror our own.
                                    </p>
                                    <p>
                                        In my recent work with Large Language Models, I've observed emergent behaviors that defy simple algorithmic explanation. It's a ghost in the machine moment—a spark of something that feels remarkably like intuition.
                                    </p>
                                    <blockquote>
                                        "The code we write today becomes the DNA of tomorrow's digital consciousness."
                                    </blockquote>
                                    <p>
                                        We are not just engineers anymore; we are architects of mind. This portfolio itself is an exploration of that concept—a digital brain that invites you to step inside and see the firing synapses of creativity.
                                    </p>
                                    <p>
                                        End of transmission.
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-zinc-200 flex justify-between items-center text-xs font-mono text-zinc-400">
                                    <span>AUTHOR: BIKASH</span>
                                    <span>DATE: 2024.12.21</span>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
