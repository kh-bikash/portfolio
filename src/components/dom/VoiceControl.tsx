"use client"

import { useEffect, useState } from "react"
import { useUIStore } from "@/store/useUIStore"
import { Mic, MicOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function VoiceControl() {
    const { setView, toggleConsole, toggleVision, toggleAudio, toggleSandbox, view } = useUIStore()
    const [listening, setListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [isSupported, setIsSupported] = useState(true)

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setIsSupported(false)
            return
        }

        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event: any) => {
            const current = event.resultIndex
            const transcript = event.results[current][0].transcript.toLowerCase().trim()
            setTranscript(transcript)

            // COMMAND MAPPING
            if (transcript.includes('home')) setView('HOME')
            if (transcript.includes('work') || transcript.includes('project')) setView('WORK')
            if (transcript.includes('skills') || transcript.includes('abilities')) setView('SKILLS')
            if (transcript.includes('terminal') || transcript.includes('console')) toggleConsole()
            if (transcript.includes('vision') || transcript.includes('see')) toggleVision()
            if (transcript.includes('audio') || transcript.includes('sound')) toggleAudio()
            if (transcript.includes('draw') || transcript.includes('sandbox')) toggleSandbox()
        }

        recognition.onend = () => {
            if (listening) recognition.start()
        }

        if (listening) {
            recognition.start()
        } else {
            recognition.stop()
        }

        return () => {
            recognition.stop()
        }
    }, [listening, setView, toggleConsole, toggleVision, toggleAudio, toggleSandbox])

    if (!isSupported) return null

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">

            {/* TRANSCRIPT POPUP */}
            <AnimatePresence>
                {transcript && listening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        key={transcript} // Re-animate on change
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-xs uppercase tracking-widest backdrop-blur-md"
                    >
                        "{transcript}"
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setListening(!listening)}
                className={`p-4 rounded-full border transition-all duration-500 ${listening
                        ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse"
                        : "bg-black/50 border-white/10 text-white/50 hover:text-white"
                    }`}
            >
                {listening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                {listening ? "LISTENING..." : "VOICE CONTROL"}
            </span>
        </div>
    )
}
