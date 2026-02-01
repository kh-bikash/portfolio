"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MenuItem {
    label: string
    type: "link" | "action" | "skill"
    href?: string
    action?: () => void
    highlight?: boolean
}

interface CylinderMenuProps {
    onWorkClick: () => void
}

export function CylinderMenu({ onWorkClick }: CylinderMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [rotation, setRotation] = useState(0)

    // Customization for "Khundrakpam Bikash Meitei" - AI Engineer
    // Total 20 Items
    const items: MenuItem[] = [
        { label: "WORKS", type: "action", action: onWorkClick, highlight: true }, // 0
        { label: "LINKEDIN", type: "link", href: "https://www.linkedin.com/in/bikash-kh-5544ba298/", highlight: true },
        { label: "LEETCODE", type: "link", href: "https://leetcode.com/u/bikashkh/" },
        { label: "CODECHEF", type: "link", href: "https://www.codechef.com/users/khbikash" },
        { label: "GITHUB", type: "link", href: "https://github.com" }, // Placeholder
        { label: "RESUME", type: "link", href: "/resume.pdf", highlight: true }, // Placeholder

        { label: "ARTIFICIAL INTELLIGENCE", type: "skill" }, // 6
        { label: "MACHINE LEARNING", type: "skill" },
        { label: "DEEP LEARNING", type: "skill" },
        { label: "GENERATIVE AI", type: "skill" },
        { label: "COMPUTER VISION", type: "skill" },

        { label: "NLP & LLMs", type: "skill" }, // 11
        { label: "RAG SYSTEMS", type: "skill" },
        { label: "PYTHON & PYTORCH", type: "skill" },
        { label: "TENSORFLOW", type: "skill" },
        { label: "DATA SCIENCE", type: "skill" },

        { label: "NEXT.JS & REACT", type: "skill" }, // 16
        { label: "TYPESCRIPT", type: "skill" },
        { label: "FULL STACK", type: "skill" },
        { label: "CONTACT ME", type: "link", href: "mailto:contact@example.com" }
    ]

    // Configuration
    const ITEM_HEIGHT = 80 // Height of each card
    const RADIUS = 800 // Radius of the cylinder
    const ANGLE_STEP = 360 / items.length

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Scroll drives rotation
            setRotation(prev => prev - e.deltaY * 0.05)
        }

        // Auto-rotation (optional, slow drift)
        let animationFrame: number
        const animate = () => {
            // setRotation(prev => prev + 0.02)
            animationFrame = requestAnimationFrame(animate)
        }
        // animate()

        window.addEventListener("wheel", handleWheel)
        return () => {
            window.removeEventListener("wheel", handleWheel)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[2000px] overflow-hidden">
            <div
                ref={containerRef}
                className="relative transform-style-3d transition-transform duration-700 ease-out"
                style={{
                    transform: `rotateX(-10deg) rotateY(${rotation}deg)` // Slight tilt X for better view
                }}
            >
                {items.map((item, index) => {
                    const angle = index * ANGLE_STEP
                    return (
                        <div
                            key={index}
                            className={cn(
                                "absolute bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-white/5 transition-all group",
                                "w-[500px] h-[80px]",
                                item.highlight ? "border-primary/50" : ""
                            )}
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                                backfaceVisibility: "visible" // Ensure we see them from behind if needed, or 'hidden'
                            }}
                            onClick={() => {
                                if (item.action) item.action()
                                if (item.href) window.open(item.href, "_blank")
                            }}
                        >
                            <h2 className={cn(
                                "text-2xl font-bold tracking-[0.2em] group-hover:text-primary transition-colors",
                                item.highlight ? "text-white" : "text-neutral-400"
                            )}>
                                {item.label}
                            </h2>

                            {/* Decorative side lines */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                        </div>
                    )
                })}
            </div>

            {/* Overlay instruction */}
            <div className="absolute bottom-32 text-center pointer-events-none mix-blend-difference opacity-50">
                <p className="text-[10px] tracking-[0.5em] uppercase">SCROLL TO EXPLORE</p>
            </div>
        </div>
    )
}
