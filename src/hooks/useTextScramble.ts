import { useState, useEffect, useCallback, useRef } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Text scramble/decode effect. Cycles through random characters
 * before revealing the final text.
 */
export function useTextScramble(texts: string[], interval: number = 3000) {
  const [displayText, setDisplayText] = useState(texts[0] || '')
  const [currentIndex, setCurrentIndex] = useState(0)
  const frameRef = useRef<number>(0)
  const iterationRef = useRef(0)

  const scramble = useCallback((target: string) => {
    iterationRef.current = 0
    const totalIterations = target.length * 3

    const animate = () => {
      iterationRef.current++
      const progress = iterationRef.current / totalIterations
      
      const result = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iterationRef.current / 3) return target[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayText(target)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % texts.length
      setCurrentIndex(nextIndex)
      scramble(texts[nextIndex])
    }, interval)

    return () => {
      clearInterval(timer)
      cancelAnimationFrame(frameRef.current)
    }
  }, [currentIndex, texts, interval, scramble])

  return displayText
}
