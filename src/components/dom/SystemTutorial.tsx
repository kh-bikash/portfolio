"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, X } from "lucide-react"
import { useUIStore } from "@/store/useUIStore"

const TUTORIAL_STEPS = [
    {
        title: "NEURAL INTERFACE CONNECTED",
        description: "Welcome to the Singularity. I am BIKASH AI.",
        position: "center"
    },
    {
        title: "NAVIGATION",
        description: "Scroll to traverse the 3D Tunnel, or use the DOCK below to jump between modules.",
        position: "bottom"
    },
    {
        title: "VOICE CONTROL",
        description: "Tap the Microphone icon or say 'Computer' to issue voice commands.",
        position: "bottom-left"
    },
    {
        title: "DEVELOPER CONSOLE",
        description: "Press '~' (Tilde) for Terminal. Press 'Cmd+K' for Global Search.",
        position: "bottom-left"
    }
]

export function SystemTutorial() {
    const { view } = useUIStore()
    const [step, setStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    // Start tutorial only when entering HOME view
    useEffect(() => {
        if (view === 'HOME') {
            const hasSeen = localStorage.getItem('tutorial_seen')
            if (!hasSeen) {
                // Delay slightly to let the warp finish
                setTimeout(() => setIsVisible(true), 2000)
            }
        }
    }, [view])

    const nextStep = () => {
        if (step < TUTORIAL_STEPS.length - 1) {
            setStep(step + 1)
        } else {
            finishTutorial()
        }
    }

    const finishTutorial = () => {
        setIsVisible(false)
        localStorage.setItem('tutorial_seen', 'true')
    }

    if (!isVisible) return null

    const currentStep = TUTORIAL_STEPS[step]

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed z-[100] max-w-sm p-6 bg-black/80 border border-primary/50 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.2)]
                    ${currentStep.position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                    ${currentStep.position === 'bottom' ? 'bottom-32 left-1/2 -translate-x-1/2' : ''}
                    ${currentStep.position === 'bottom-left' ? 'bottom-32 left-10 md:left-32' : ''}
                `}
            >
                {/* DECORATIVE CORNERS */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                            SYSTEM_GUIDE // {step + 1}/{TUTORIAL_STEPS.length}
                        </h3>
                        <button onClick={finishTutorial} className="text-white/50 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="py-2">
                        <h2 className="text-xl font-bold text-white mb-2">{currentStep.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {currentStep.description}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/40 text-primary border border-primary rounded text-xs uppercase tracking-widest transition-colors"
                        >
                            {step === TUTORIAL_STEPS.length - 1 ? "INITIALIZE" : "NEXT"}
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
