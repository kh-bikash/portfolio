import { useRef } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

interface ScrollRevealOptions {
  /** Trigger margin (negative shrinks viewport trigger) */
  margin?: string
  /** Only trigger once */
  once?: boolean
  /** Amount visible before triggering (0-1) */
  amount?: number
}

/**
 * Simplified scroll reveal hook wrapping Framer Motion's useInView.
 * Returns a ref and isInView boolean for consistent scroll-triggered reveals.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { margin = '-100px', once = true } = options
  const ref = useRef<HTMLDivElement>(null)
  
  const inViewOptions: UseInViewOptions = {
    once,
    margin: margin as any,
  }
  
  if (options.amount !== undefined) {
    inViewOptions.amount = options.amount
  }
  
  const isInView = useInView(ref, inViewOptions)

  return { ref, isInView }
}

/**
 * Common animation variants for scroll-triggered reveals
 */
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

/** Default spring transition */
export const defaultTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
}

/** Stagger children transition */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}
