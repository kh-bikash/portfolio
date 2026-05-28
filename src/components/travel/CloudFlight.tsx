"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function CloudFlight() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Removed setCloudScroll logic since we are using ReactPlayer

    // Cinematic parallax properties for the transition container
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <motion.section ref={ref} className="relative w-full h-[150vh] overflow-hidden" style={{ opacity }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F0E8]">
                
                {/* ─── CINEMATIC CLOUD FLIGHT (DAYTIME PARALLAX) ─── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-gradient-to-b from-[#4CA1AF] via-[#87CEEB] to-[#C4E0E5] flex flex-col justify-end">
                    
                    {/* Distant Clouds */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[60%] flex w-[300%]"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                <path fill="#FFFFFF" opacity="0.6" d="M0,200 L0,150 Q50,130 100,160 T250,120 T400,150 T550,110 T700,160 T850,130 T1000,150 L1000,200 Z" />
                                <path fill="#F0F8FF" opacity="0.4" d="M0,200 L0,180 Q80,160 150,190 T350,150 T500,180 T650,140 T800,180 T1000,160 L1000,200 Z" />
                            </svg>
                        ))}
                    </motion.div>

                    {/* Midground Clouds (Faster) */}
                    <motion.div
                        className="absolute bottom-[-10%] left-0 h-[50%] flex w-[300%]"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                <path fill="#FFFFFF" opacity="0.9" d="M0,200 L0,130 Q100,80 200,140 T450,100 T650,150 T850,90 T1000,130 L1000,200 Z" />
                            </svg>
                        ))}
                    </motion.div>

                    {/* Foreground Sunlight/Clouds (Passing Camera) */}
                    <motion.div
                        className="absolute inset-0 flex w-[300%]"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-full w-full flex-shrink-0 relative">
                                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vh] bg-white rounded-full mix-blend-overlay opacity-60 blur-[80px]" />
                                <div className="absolute top-[40%] left-[50%] w-[50vw] h-[50vh] bg-white rounded-full mix-blend-overlay opacity-70 blur-[100px]" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Light cinematic color grade / overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8D5C4]/10 to-[#F5F0E8] pointer-events-none mix-blend-overlay" />

                {/* Transition gradient blending into the next section */}
                <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#F5F0E8] to-transparent pointer-events-none" />
            </div>
        </motion.section>
    )
}
