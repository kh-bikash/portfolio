"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    // Mouse position state
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Ultra-snappy, Zero-Lag Physics (iPad Style)
    const springConfig = { damping: 35, stiffness: 1000, mass: 0.05 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        // Hide default cursor globally
        document.body.style.cursor = 'none'

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        // Check for interactive elements to expand cursor
        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Look for closest interactive element parent
            const interactiveElement = target.closest('a, button, input, textarea, select, [role="button"]')
            if (interactiveElement) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mousemove", handleHoverStart)
        document.body.addEventListener("mouseleave", handleMouseLeave)
        document.body.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            document.body.style.cursor = 'auto'
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mousemove", handleHoverStart)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
            document.body.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [cursorX, cursorY, isVisible])

    // If on mobile/touch screens, hide custom cursor entirely
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsVisible(false)
            document.body.style.cursor = 'auto'
        }
    }, [])

    if (!isVisible) return null

    return (
        <motion.div
            className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] items-center justify-center mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <motion.div
                animate={{
                    width: isHovering ? 56 : 8,
                    height: isHovering ? 56 : 8,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
                    border: isHovering ? "1px solid rgba(255, 255, 255, 0.4)" : "0px solid rgba(255, 255, 255, 0)",
                    backdropFilter: isHovering ? "blur(4px)" : "blur(0px)"
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-full shadow-sm"
            />
        </motion.div>
    )
}
