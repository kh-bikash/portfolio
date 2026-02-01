"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const REVIEWS = [
    { name: "Sarah Connor", role: "CTO, Skynet", text: "The neural architecture he built is self-aware. Incredible work." },
    { name: "Deckard", role: "Blade Runner", text: "I've seen things you people wouldn't believe. This portfolio is one of them." },
    { name: "Neo", role: "The One", text: "He doesn't just write code; he constructs the Matrix." },
    { name: "K", role: "Officer, LAPD", text: "It feels real. The interactions are seamless." },
    { name: "Motoko", role: "Major, Section 9", text: "A ghost in the shell. High-level cybernetics integration." },
]

export function TestimonialsRing() {
    const [rotation, setRotation] = useState(0)

    const rotate = (dir: number) => {
        setRotation(prev => prev + dir * (360 / REVIEWS.length))
    }

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-[1000px]">
            {/* TITLES */}
            <div className="absolute top-10 left-0 w-full text-center z-20">
                <h2 className="text-primary tracking-[0.5em] text-xs font-bold uppercase mb-2">TESTIMONIALS</h2>
                <h1 className="text-4xl md:text-5xl font-black text-white/90">HUMAN FEEDBACK</h1>
            </div>

            {/* 3D CAROUSEL CONTAINER */}
            <div
                className="relative w-[300px] h-[200px] preserve-3d transition-transform duration-1000 ease-in-out"
                style={{ transform: `rotateY(${rotation}deg)` }}
            >
                {REVIEWS.map((review, i) => {
                    const angle = (360 / REVIEWS.length) * i
                    const translateZ = 400 // Radius

                    return (
                        <div
                            key={i}
                            className="absolute top-0 left-0 w-full h-full bg-black/40 border border-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between select-none"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`
                            }}
                        >
                            <p className="text-sm text-gray-300 font-mono italic">"{review.text}"</p>
                            <div className="mt-4 border-t border-white/10 pt-2">
                                <div className="text-primary font-bold text-xs uppercase">{review.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{review.role}</div>
                            </div>

                            {/* GLOW DECORATION */}
                            <div className="absolute -inset-px bg-primary/20 rounded-xl blur-md opacity-20 pointer-events-none" />
                        </div>
                    )
                })}
            </div>

            {/* CONTROLS */}
            <div className="absolute bottom-10 flex gap-8 z-20">
                <button
                    onClick={() => rotate(1)}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all font-mono"
                >
                    &lt;
                </button>
                <button
                    onClick={() => rotate(-1)}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all font-mono"
                >
                    &gt;
                </button>
            </div>

            {/* BASE GRADIENT */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    )
}
