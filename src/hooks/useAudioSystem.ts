import { useRef, useCallback, useEffect } from 'react'
import { useUIStore } from '@/store/useUIStore'

export function useAudioSystem() {
    const { audioEnabled } = useUIStore()
    const ctxRef = useRef<AudioContext | null>(null)

    // Initialize Audio Context on first user interaction
    const initAudio = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume()
        }
    }, [])

    // HOVER SOUND: High-tech Chirp (FM Synthesis)
    const playHover = useCallback(() => {
        if (!audioEnabled || !ctxRef.current) return

        const t = ctxRef.current.currentTime
        const osc = ctxRef.current.createOscillator()
        const gain = ctxRef.current.createGain()

        // FM Operator
        const fmOsc = ctxRef.current.createOscillator()
        const fmGain = ctxRef.current.createGain()

        osc.connect(gain)
        gain.connect(ctxRef.current.destination)

        // Connect FM
        fmOsc.connect(fmGain)
        fmGain.connect(osc.frequency)

        // Configuration
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, t)
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05)

        fmOsc.type = 'square'
        fmOsc.frequency.setValueAtTime(50, t)

        fmGain.gain.setValueAtTime(200, t)
        fmGain.gain.exponentialRampToValueAtTime(0.01, t + 0.05)

        gain.gain.setValueAtTime(0.05, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)

        osc.start(t)
        fmOsc.start(t)
        osc.stop(t + 0.1)
        fmOsc.stop(t + 0.1)
    }, [audioEnabled])

    // CLICK SOUND: Heavy Mechanical Thud
    const playClick = useCallback(() => {
        if (!audioEnabled || !ctxRef.current) return

        const t = ctxRef.current.currentTime
        const osc = ctxRef.current.createOscillator()
        const gain = ctxRef.current.createGain()
        const filter = ctxRef.current.createBiquadFilter()

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctxRef.current.destination)

        // Config: Low frequency impulse
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(150, t)
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.2)

        // Filter: Lowpass sweep usually sounds like a "thud"
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(3000, t)
        filter.frequency.exponentialRampToValueAtTime(100, t + 0.1)

        gain.gain.setValueAtTime(0.3, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)

        osc.start(t)
        osc.stop(t + 0.2)
    }, [audioEnabled])

    // WARP SOUND: Rising Shephard-like Tone
    const playWarp = useCallback(() => {
        if (!audioEnabled || !ctxRef.current) return

        const t = ctxRef.current.currentTime
        const osc = ctxRef.current.createOscillator()
        const gain = ctxRef.current.createGain()

        osc.connect(gain)
        gain.connect(ctxRef.current.destination)

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(200, t)
        osc.frequency.exponentialRampToValueAtTime(2000, t + 1.5) // Rise over 1.5s

        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.2, t + 0.5)
        gain.gain.linearRampToValueAtTime(0, t + 1.5)

        osc.start(t)
        osc.stop(t + 1.5)
    }, [audioEnabled])

    return { initAudio, playHover, playClick, playWarp }
}
