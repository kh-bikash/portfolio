"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface CardItem {
    id: number
    title: string
    subtitle: string
    image: string
    link?: string
    action?: () => void
}

interface CardCarouselProps {
    onWorkClick: () => void
}

export function CardCarousel({ onWorkClick }: CardCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [rotation, setRotation] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)

    // Physics state
    const velocity = useRef(0)
    const lastX = useRef(0)
    const animationFrame = useRef<number>(0)
    const isMouseDown = useRef(false)

    // 20 Items - Curated Images
    const items: CardItem[] = useMemo(() => [
        { id: 1, title: "WORKS", subtitle: "VIEW PROJECT GALLERY", image: "/dark-futuristic-web-interface-quantum-computing.jpg", action: onWorkClick },
        { id: 2, title: "LINKEDIN", subtitle: "CONNECT PROFESSIONALLY", image: "/dark-modern-tesla-portfolio.jpg", link: "https://www.linkedin.com/in/bikash-kh-5544ba298/" },
        { id: 3, title: "LEETCODE", subtitle: "ALGORITHMIC MASTERY", image: "/dark-ai-neural-network-visualization-platform.jpg", link: "https://leetcode.com/u/bikashkh/" },
        { id: 4, title: "CODECHEF", subtitle: "COMPETITIVE PROGRAMMING", image: "/dark-crypto-blockchain-decentralized-interface.jpg", link: "https://www.codechef.com/users/khbikash" },
        { id: 5, title: "GITHUB", subtitle: "OPEN SOURCE CODE", image: "/dark-multiplayer-collaboration-interface.jpg", link: "https://github.com" },
        { id: 6, title: "RESUME", subtitle: "DOWNLOAD CV", image: "/dark-modern-portfolio-website-tesla.jpg", link: "/resume.pdf" },

        // Skills
        { id: 7, title: "AI ENGINEER", subtitle: "CORE SPECIALIZATION", image: "/dark-ai-neural-network-visualization-platform.jpg" },
        { id: 8, title: "COMPUTER VISION", subtitle: "IMAGE PROCESSING", image: "/dark-vr-virtual-reality-interface.jpg" },
        { id: 9, title: "GEN AI", subtitle: "LLMS & DIFFUSION", image: "/dark-digital-art-installation.jpg" },
        { id: 10, title: "DEEP LEARNING", subtitle: "NEURAL ARCHITECTURES", image: "/dark-space-themed-analytics-dashboard.jpg" },
        { id: 11, title: "NLP", subtitle: "NATURAL LANGUAGE", image: "/dark-social-gaming-platform.jpg" },

        // Tech
        { id: 12, title: "NEXT.JS", subtitle: "REACT FRAMEWORK", image: "/dark-futuristic-nike-website.jpg" },
        { id: 13, title: "WEBGL", subtitle: "3D GRAPHICS", image: "/dark-digital-art-installation-museum.jpg" },
        { id: 14, title: "PYTHON", subtitle: "DATA SCIENCE", image: "/dark-multiplayer-collaboration.jpg" },
        { id: 15, title: "PYTORCH", subtitle: "ML FRAMEWORK", image: "/dark-ai-neural-network-visualization-platform.jpg" },
        { id: 16, title: "THREE.JS", subtitle: "IMMERSIVE WEB", image: "/dark-vr-virtual-reality-immersive-experience.jpg" },

        // Sections/Extras
        { id: 17, title: "CONTACT", subtitle: "GET IN TOUCH", image: "/dark-mobile-app-music-streaming-interface.jpg", link: "mailto:contact@example.com" },
        { id: 18, title: "BLOG", subtitle: "THOUGHTS & IDEAS", image: "/minimal-dark-apple-ecommerce.jpg" },
        { id: 19, title: "SERVICES", subtitle: "FREELANCE", image: "/dark-luxury-retail-installation.jpg" },
        { id: 20, title: "ABOUT", subtitle: "MY STORY", image: "/placeholder-user.jpg" },
    ], [onWorkClick])

    // Cylinder Params
    const CARD_WIDTH = 300
    const RADIUS = 1100 // Large radius for "Wall" effect
    const ANGLE_STEP = 360 / items.length

    // Animation Loop (Inertia)
    useEffect(() => {
        const update = () => {
            if (!isMouseDown.current) {
                // Apply friction
                velocity.current *= 0.95
                if (Math.abs(velocity.current) > 0.01) {
                    setRotation(r => r + velocity.current)
                }
            }
            animationFrame.current = requestAnimationFrame(update)
        }
        update()
        return () => cancelAnimationFrame(animationFrame.current)
    }, [])

    // Mouse Handlers
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        isMouseDown.current = true
        setIsDragging(true)
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        setStartX(clientX)
        lastX.current = clientX
        velocity.current = 0
    }

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isMouseDown.current) return
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

        const delta = clientX - lastX.current
        setRotation(r => r + delta * 0.2) // Sensitivity
        velocity.current = delta * 0.2

        lastX.current = clientX
        setCurrentX(clientX)
    }

    const handleMouseUp = () => {
        isMouseDown.current = false
        setIsDragging(false)
    }

    return (
        <div
            className="relative w-full h-full flex items-center justify-center perspective-[2000px] overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
        >
            <div
                className="relative transform-style-3d transition-transform duration-75 ease-out" // short duration for distinct drag, handled mostly by state
                style={{
                    transform: `rotateY(${rotation}deg)`
                }}
            >
                {items.map((item, index) => {
                    const angle = index * ANGLE_STEP
                    return (
                        <div
                            key={item.id}
                            className={cn(
                                "absolute bg-black/90 border border-white/10 group",
                                "w-[300px] h-[400px] rounded-lg overflow-hidden backface-visible",
                                "hover:border-primary/50 transition-colors duration-300"
                            )}
                            style={{
                                top: '50%',
                                left: '50%',
                                marginTop: -200, // Half height
                                marginLeft: -150, // Half width
                                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                            }}
                            onClick={() => {
                                if (Math.abs(velocity.current) < 0.5) { // Only click if not dragging fast
                                    if (item.action) item.action()
                                    if (item.link) window.open(item.link, "_blank")
                                }
                            }}
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 will-change-transform"
                                />
                                {/* Vignette / Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {item.subtitle}
                                </p>
                                <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
                                    {item.title}
                                </h3>
                                <div className="w-8 h-[1px] bg-primary mt-4 group-hover:w-full transition-all duration-500 ease-out" />
                            </div>

                        </div>
                    )
                })}
            </div>

            {/* Overlay instruction */}
            <div className="absolute bottom-12 text-center pointer-events-none mix-blend-difference opacity-50 z-10 w-full flex justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[1px] h-8 bg-white/50 animate-pulse" />
                    <p className="text-[10px] tracking-[0.5em] uppercase">DRAG TO EXPLORE</p>
                </div>
            </div>
        </div>
    )
}
