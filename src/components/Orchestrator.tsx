"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PortalLanding } from "@/components/PortalLanding"
import { NexusEntry } from "@/components/NexusEntry"
import { audioManager } from "@/lib/audio-manager"

// Interstellar-style Organ Swell (Hans Zimmer approximation)
const playEnterSequence = () => {
    // Initialize Manager
    audioManager.init()
    if (!audioManager.ctx) return

    const ctx = audioManager.ctx
    audioManager.resume()

    const now = ctx.currentTime
    const duration = 2.5

    // Master Gain for volume control
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, now)
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.5) // Fade in
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration) // Fade out

    // Connect to device AND analyzer
    masterGain.connect(ctx.destination)
    audioManager.connectSource(masterGain)

    // Organ Drone Chord (C Minor / Space Vibe: C2, G2, C3, Eb3, G3)
    const freqs = [65.41, 98.00, 130.81, 155.56, 196.00, 261.63]

    freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()

        // Classic Organ: Mix of Sawtooth (bite) and Sine (depth)
        osc.type = i % 2 === 0 ? "sawtooth" : "sine"

        // Detune slightly for "massive" feel
        const detune = (Math.random() - 0.5) * 10
        osc.frequency.setValueAtTime(f, now)
        osc.detune.setValueAtTime(detune, now)

        // Pitch drift (Hans Zimmer tension)
        osc.frequency.linearRampToValueAtTime(f * 1.02, now + duration)

        // Gain layering
        oscGain.gain.setValueAtTime(0, now)
        oscGain.gain.linearRampToValueAtTime(0.15 / (i + 1), now + 0.2) // Lower notes louder
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

        osc.connect(oscGain)
        oscGain.connect(masterGain)
        osc.start(now)
        osc.stop(now + duration)
    })

    // Deep Sub Bass (The "Rumble")
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()
    subOsc.type = "square" // More grit
    subOsc.frequency.setValueAtTime(32.70, now) // C1

    // Low pass filter to make it just rumble
    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(80, now)

    subGain.gain.setValueAtTime(0, now)
    subGain.gain.linearRampToValueAtTime(0.4, now + 1.0) // Slow rise
    subGain.gain.linearRampToValueAtTime(0, now + duration)

    subOsc.connect(filter)
    filter.connect(subGain)
    subGain.connect(ctx.destination)

    subOsc.start(now)
    subOsc.stop(now + duration)
}

export function Orchestrator({ initialMode = "portal" }: { initialMode?: "portal" | "transition" | "brain" }) {
    const [mode, setMode] = useState<"portal" | "transition" | "brain">(initialMode)

    const handleEnter = () => {
        playEnterSequence()
        setMode("transition")

        // Task 16: Route Handling
        window.history.pushState({}, "", "/brain")

        // Wait for the visual zoom to finish before mounting Brain
        setTimeout(() => {
            setMode("brain")
        }, 800)
    }

    return (
        // When in 'brain' mode, we remove constraints so the document can grow and Lenis can scroll the window.
        // We only lock overflow in 'portal' mode.
        <div className={`relative w-full ${mode === "portal" ? "h-screen overflow-hidden" : "min-h-screen"}`}>

            {/* Task 12: White-out Flash Overlay */}
            <AnimatePresence>
                {mode === "transition" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
                        className="fixed inset-0 z-[100] bg-white pointer-events-none mix-blend-screen"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">

                {(mode === "portal" || mode === "transition") && (
                    <motion.div
                        key="portal"
                        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        animate={
                            mode === "transition"
                                ? { opacity: 0, scale: 4, filter: "blur(20px)" }
                                : { opacity: 1, scale: 1, filter: "blur(0px)" }
                        }
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 z-20 origin-center"
                    >
                        <PortalLanding onEnter={handleEnter} />
                    </motion.div>
                )}

                {mode === "brain" && (
                    <motion.div
                        key="brain"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative z-10 w-full min-h-screen"
                    >
                        <NexusEntry />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
