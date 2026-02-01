"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, Scan, CheckCircle, AlertCircle } from "lucide-react"
import { useAudioSystem } from "@/hooks/useAudioSystem"

export function ResumeAnalyzer() {
    // Neural Scan Interface
    const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'COMPLETE'>('IDLE')
    const [result, setResult] = useState<any>(null)
    const { playClick, playHover } = useAudioSystem()

    const handleMockScan = () => {
        playClick()
        setStatus('SCANNING')

        // Simulate Analysis
        setTimeout(() => {
            setStatus('COMPLETE')
            setResult({
                score: 96,
                keywords: ["React", "TypeScript", "Three.js", "Node.js", "Next.js"],
                missing: ["Rust", "Kubernetes"],
                summary: "High match probability. Candidate profile aligns with Senior Frontend Architecture role."
            })
        }, 3000)
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/80 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md p-8 relative">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <Scan className="w-5 h-5 text-primary" />
                        Resume Neural Scan
                    </h2>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">UPLOAD JD TO MATCH AGAINST SKILLS DATABASE</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-2 border-dashed border-white/20 rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group"
                        onClick={handleMockScan}
                        onMouseEnter={playHover}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-gray-300 font-bold uppercase tracking-widest">Drop Job Description Here</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-2 text-center max-w-xs">
                            SUPPORTED FORMATS: PDF, TXT, DOCX<br />
                            (CLICK TO SIMULATE SCAN)
                        </p>
                    </motion.div>
                )}

                {status === 'SCANNING' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative h-64 border border-white/10 rounded-lg overflow-hidden bg-black flex flex-col items-center justify-center"
                    >
                        {/* SCAN LINE */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(0,255,255,0.8)] z-10"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* GRID BACKGROUND */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <FileText className="w-16 h-16 text-primary/20 mb-4 animate-pulse" />
                        <div className="font-mono text-primary text-xs uppercase tracking-widest">
                            Analyzing Keywords...
                        </div>
                        <div className="font-mono text-gray-500 text-[10px] mt-2">
                            PARSING_TOKEN_STREAM_V4
                        </div>
                    </motion.div>
                )}

                {status === 'COMPLETE' && result && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* SCORE CARD */}
                        <div className="flex items-center gap-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                                <span className="text-2xl font-black text-primary">{result.score}%</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="36" cy="36" r="32" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-primary" strokeDasharray={`${result.score * 2}, 200`} />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Match Confirmed</h3>
                                <p className="text-xs text-gray-400 font-mono mt-1">{result.summary}</p>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Detected Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.keywords.map((k: string) => (
                                        <span key={k} className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-bold rounded">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-3 h-3 text-yellow-500" /> Missing / Gap
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.missing.map((k: string) => (
                                        <span key={k} className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold rounded">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStatus('IDLE')}
                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Reset Scanner
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
