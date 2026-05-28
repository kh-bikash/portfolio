"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Copy, Check, Ticket } from "lucide-react"
import { BrushReveal } from "@/components/ui/BrushReveal"
import { InkDivider } from "@/components/ui/InkDivider"

const SOCIAL_LINKS = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/" },
    { label: "GitHub", url: "https://github.com/kh-bikash" },
    { label: "CodeChef", url: "https://www.codechef.com/users/kh_bikash22" },
]

export function DoorwayContact() {
    const [copied, setCopied] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const handleCopy = () => {
        navigator.clipboard.writeText("khbikash17@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Procedural ticket printing beep sound
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            
            osc.type = "sine"
            osc.frequency.setValueAtTime(1200, ctx.currentTime)
            osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1)
            
            gain.gain.setValueAtTime(0.05, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
            
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.3)
        } catch {}

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("message", message)
        formData.append("_subject", "New Fare Adjustment (Contact) message")
        formData.append("_captcha", "false")

        try {
            await fetch("https://formsubmit.co/ajax/khbikash17@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            setIsSubmitted(true)
        } catch (err) {
            // Fallback: display receipt state anyway so user experience is not broken
            setIsSubmitted(true)
        }
    }

    return (
        <section id="contact" className="relative w-full py-32 px-6 md:px-12 bg-[var(--paper)] overflow-hidden">
            {/* Warm lantern glow behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--lantern)]/5 blur-[100px] pointer-events-none" />

            <div ref={ref} className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-sm md:text-base font-sans font-bold tracking-[0.4em] uppercase text-[var(--ink-faded)] mb-4 block"
                    >
                        One Encounter
                    </motion.span>
                    <BrushReveal
                        as="h2"
                        className="text-4xl md:text-6xl font-serif font-light text-[var(--ink)] tracking-tight"
                        delay={0.2}
                    >
                        Fare Adjustment
                    </BrushReveal>
                </div>

                <InkDivider width={80} className="mb-12" />

                {/* Fare Adjustment Machine Frame (精算機) */}
                <div className="bg-[var(--paper-light)] border-[4px] border-[#3A352F] rounded-3xl p-8 md:p-10 shadow-paper relative overflow-hidden">
                    {/* Visual header panel for machine */}
                    <div className="w-full bg-[#3A352F] text-[var(--paper-light)] py-3 px-6 rounded-md mb-6 flex justify-between items-center font-mono text-sm font-bold">
                        <span className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-[var(--brush-warm)]" />
                            FARE ADJUSTMENT MACHINE
                        </span>
                        <span className="font-sans font-bold">STATION OFFICE</span>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-[var(--ink-faded)] pl-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full bg-[var(--paper-warm)] border-2 border-[#3A352F] rounded-xl px-4 py-3.5 text-base font-sans font-medium text-[var(--ink)] placeholder:text-[var(--ink-ghost)] focus:outline-none focus:border-[var(--brush-warm)] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-[var(--ink-faded)] pl-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-[var(--paper-warm)] border-2 border-[#3A352F] rounded-xl px-4 py-3.5 text-base font-sans font-medium text-[var(--ink)] placeholder:text-[var(--ink-ghost)] focus:outline-none focus:border-[var(--brush-warm)] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-[var(--ink-faded)] pl-1">
                                    Message Details
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="What's on your mind..."
                                    className="w-full bg-[var(--paper-warm)] border-2 border-[#3A352F] rounded-xl px-4 py-3.5 text-base font-sans font-medium text-[var(--ink)] placeholder:text-[var(--ink-ghost)] focus:outline-none focus:border-[var(--brush-warm)] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[var(--ink)] text-[var(--paper)] font-sans font-bold text-base py-4 rounded-xl hover:bg-[var(--ink-light)] active:scale-[0.98] border-2 border-[#3A352F] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                                >
                                    <span>Adjust Fare (Send)</span>
                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="px-6 py-4 bg-[var(--paper-warm)] border-2 border-[#3A352F] text-[var(--ink)] font-sans font-bold text-base rounded-xl hover:bg-[var(--paper)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {copied ? <Check className="w-4 h-4 text-[var(--brush-sage)]" /> : <Copy className="w-4 h-4" />}
                                    <span>{copied ? "Copied!" : "Copy Email"}</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* 🎫 THE PRINTED FARE ADJUSTMENT RECEIPT (精算書) */
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-[#E2D4C5] border-[3px] border-[#3A352F] rounded-lg p-6 shadow-paper font-mono text-[var(--ink)] relative"
                        >
                            {/* Paper punch hole marks at the bottom border */}
                            <div className="absolute bottom-[-6px] left-4 right-4 flex justify-between pointer-events-none">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="w-3 h-3 rounded-full bg-[var(--paper)] border-2 border-[#3A352F]" />
                                ))}
                            </div>

                            {/* Red Hanko stamp for adjustment approval */}
                            <div className="absolute right-8 top-10 w-16 h-16 rounded-full border-[3px] border-red-500/80 flex flex-col items-center justify-center text-[11px] text-red-500/80 font-bold uppercase rotate-12 pointer-events-none select-none">
                                <span>PAID</span>
                                <span className="text-[8px]">APPROVED</span>
                            </div>

                            <div className="text-center border-b border-[#3A352F]/30 pb-4 mb-6">
                                <h3 className="text-xl font-serif font-bold tracking-wider">BOARDING RECEIPT</h3>
                                <p className="text-[10px] text-[var(--ink-faded)] mt-1 font-bold">FARE ADJUSTMENT COMPLETE</p>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-[var(--ink-faded)]">PASSENGER:</span>
                                    <span className="font-bold">{name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--ink-faded)]">CONTACT ADDR:</span>
                                    <span>{email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--ink-faded)]">FARE STATUS:</span>
                                    <span className="text-[var(--brush-sage)] font-bold">ADJUSTED & PAID</span>
                                </div>
                                <div className="flex justify-between border-t border-[#3A352F]/10 pt-4">
                                    <span className="text-[var(--ink-faded)]">TIMESTAMP:</span>
                                    <span>{new Date().toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="text-center mt-8 border-t border-dashed border-[#3A352F]/30 pt-4 text-[9px] text-[var(--ink-faded)]">
                                Thank you for adjustments. We look forward to work with you!
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex justify-center gap-6 mt-12"
                >
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-serif font-bold text-[var(--ink-faded)] hover:text-[var(--brush-warm)] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
