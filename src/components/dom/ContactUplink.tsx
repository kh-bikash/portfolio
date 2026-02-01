"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Satellite, Wifi, CheckCircle, Loader2 } from "lucide-react"
import { useAudioSystem } from "@/hooks/useAudioSystem"

export function ContactUplink({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE')
    const { playClick, playHover } = useAudioSystem()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        playClick()
        setStatus('SENDING')

        // Simulate Uplink Delay
        setTimeout(() => {
            setStatus('SENT')
            setTimeout(() => {
                onClose()
            }, 2000)
        }, 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <div className="absolute inset-0" onClick={onClose} />

            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="relative w-full max-w-md bg-black/90 border border-primary/30 rounded-2xl p-8 overflow-hidden"
            >
                {/* DECORATIVE LINES */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary to-transparent" />

                <AnimatePresence mode="wait">
                    {status === 'IDLE' && (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                                    <Satellite className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Uplink Secure</h2>
                                <p className="text-xs text-primary/60 font-mono">ESTABLISHING ENCRYPTED CHANNEL...</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="ENTER DESIGNATION (NAME)"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono"
                                        onFocus={playHover}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Coordinates</label>
                                    <input
                                        type="email"
                                        placeholder="RETURN FREQUENCY (EMAIL)"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono"
                                        onFocus={playHover}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Payload</label>
                                    <textarea
                                        placeholder="TRANSMISSION CONTENT..."
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono resize-none"
                                        onFocus={playHover}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full group relative flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary py-4 rounded-lg font-bold tracking-widest uppercase transition-all overflow-hidden"
                                onMouseEnter={playHover}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Initiate Uplink <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </motion.form>
                    )}

                    {status === 'SENDING' && (
                        <motion.div
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-12 space-y-6"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                                <Wifi className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-primary font-bold tracking-widest animate-pulse">TRANSMITTING...</h3>
                                <div className="font-mono text-xs text-gray-500 mt-2">
                                    PACKET 1/482 UPLOADING
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === 'SENT' && (
                        <motion.div
                            key="sent"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-12 space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-green-500 font-bold tracking-widest text-xl">TRANSMISSION CONFIRMED</h3>
                                <p className="font-mono text-xs text-gray-500 mt-2">RESPONSE EXPECTED: T-MINUS 24 HOURS</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
