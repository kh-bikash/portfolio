"use client"

import { useEffect, useRef, useCallback } from "react"

type AmbientSound = "wind" | "rain" | "train" | "night" | "water"

// Cinematic Ambient Audio Engine
// Generates huge, soothing ambient synth pads instead of literal noise.
class AmbientAudioEngine {
    private ctx: AudioContext | null = null
    private masterGain: GainNode | null = null
    private reverb: ConvolverNode | null = null
    private activeNodes: Map<string, { nodes: AudioNode[]; gain: GainNode }> = new Map()
    private _muted = false
    private _volume = 0.4

    private getCtx(): AudioContext {
        if (!this.ctx) {
            this.ctx = new AudioContext()
            this.masterGain = this.ctx.createGain()
            this.masterGain.gain.value = this._volume

            // Create a massive reverb impulse response procedurally
            this.reverb = this.ctx.createConvolver()
            const length = this.ctx.sampleRate * 4 // 4 second reverb tail
            const impulse = this.ctx.createBuffer(2, length, this.ctx.sampleRate)
            for (let i = 0; i < length; i++) {
                const decay = Math.exp(-i / (this.ctx.sampleRate * 1.5))
                impulse.getChannelData(0)[i] = (Math.random() * 2 - 1) * decay
                impulse.getChannelData(1)[i] = (Math.random() * 2 - 1) * decay
            }
            this.reverb.buffer = impulse

            this.reverb.connect(this.masterGain)
            this.masterGain.connect(this.ctx.destination)
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume()
        }
        return this.ctx
    }

    get muted() { return this._muted }

    setVolume(v: number) {
        this._volume = Math.max(0, Math.min(1, v))
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this._muted ? 0 : this._volume, this.ctx!.currentTime, 0.3)
        }
    }

    toggleMute() {
        this._muted = !this._muted
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this._muted ? 0 : this._volume, this.ctx!.currentTime, 0.3)
        }
        return this._muted
    }

    // Creates a soothing, evolving chord using sine and triangle waves
    private createCinematicPad(ctx: AudioContext, baseFreq: number, chord: number[]): { nodes: AudioNode[], gain: GainNode } {
        const padGain = ctx.createGain()
        padGain.gain.value = 0
        padGain.connect(this.reverb!)
        
        // Also connect dry signal slightly
        const dryGain = ctx.createGain()
        dryGain.gain.value = 0.2
        padGain.connect(dryGain)
        dryGain.connect(this.masterGain!)

        const nodes: AudioNode[] = [padGain, dryGain]

        // Lowpass filter that slowly sweeps
        const filter = ctx.createBiquadFilter()
        filter.type = "lowpass"
        filter.frequency.value = baseFreq * 3
        filter.Q.value = 0.5
        filter.connect(padGain)
        nodes.push(filter)

        const lfo = ctx.createOscillator()
        lfo.frequency.value = 0.05 // Very slow sweep
        const lfoGain = ctx.createGain()
        lfoGain.gain.value = baseFreq * 2
        lfo.connect(lfoGain)
        lfoGain.connect(filter.frequency)
        lfo.start()
        nodes.push(lfo, lfoGain)

        // Generate the chord
        chord.forEach((semitones, i) => {
            const freq = baseFreq * Math.pow(2, semitones / 12)
            
            // Sub/body (sine)
            const osc1 = ctx.createOscillator()
            osc1.type = "sine"
            osc1.frequency.value = freq
            
            // Harmonics/texture (triangle)
            const osc2 = ctx.createOscillator()
            osc2.type = "triangle"
            osc2.frequency.value = freq * 2 // Octave up
            // Detune slightly for lushness
            osc2.detune.value = i % 2 === 0 ? 5 : -5

            const oscGain = ctx.createGain()
            oscGain.gain.value = 1 / (chord.length * 2) // Balance volume

            // Subtle tremolo
            const tremolo = ctx.createOscillator()
            tremolo.frequency.value = 0.1 + (i * 0.02)
            const tremGain = ctx.createGain()
            tremGain.gain.value = 0.3
            tremolo.connect(tremGain)
            tremGain.connect(oscGain.gain)

            osc1.connect(oscGain)
            osc2.connect(oscGain)
            oscGain.connect(filter)

            osc1.start()
            osc2.start()
            tremolo.start()
            
            nodes.push(osc1, osc2, oscGain, tremolo, tremGain)
        })

        return { nodes, gain: padGain }
    }

    play(sound: AmbientSound) {
        if (this.activeNodes.has(sound)) return
        const ctx = this.getCtx()

        let baseFreq = 110 // A2
        let chord = [0, 4, 7, 11] // A Major 7

        // Assign different musical moods to different sections
        switch (sound) {
            case "wind": // Dawn Hero / Flight: E Major 9 (Soaring, bright)
                baseFreq = 82.41 // E2
                chord = [0, 4, 7, 11, 14] 
                break
            case "rain": // Room: C Major 7 (Warm, intimate)
                baseFreq = 65.41 // C2
                chord = [0, 4, 7, 11]
                break
            case "train": // Journey: F Major 7 (Moving, open)
                baseFreq = 87.31 // F2
                chord = [0, 4, 7, 11]
                break
            case "night": // Night Drive: A Minor 9 (Deep, moody)
                baseFreq = 55.00 // A1 (Sub)
                chord = [0, 3, 7, 10, 14]
                break
            case "water": // Water Drift: G Major 9 (Calm, resolved)
                baseFreq = 98.00 // G2
                chord = [0, 4, 7, 11, 14]
                break
        }

        const { nodes, gain } = this.createCinematicPad(ctx, baseFreq, chord)
        
        // Very slow, cinematic fade-in
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3)
        
        this.activeNodes.set(sound, { nodes, gain })
    }

    stop(sound: AmbientSound) {
        const entry = this.activeNodes.get(sound)
        if (!entry) return
        const ctx = this.getCtx()
        
        // Very slow, cinematic fade-out
        entry.gain.gain.cancelScheduledValues(ctx.currentTime)
        entry.gain.gain.setValueAtTime(entry.gain.gain.value, ctx.currentTime)
        entry.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
        
        setTimeout(() => {
            entry.nodes.forEach(n => {
                try { (n as any).stop?.() } catch {}
                try { n.disconnect() } catch {}
            })
            this.activeNodes.delete(sound)
        }, 5000)
    }

    stopAll() {
        this.activeNodes.forEach((_, key) => this.stop(key as AmbientSound))
    }

    destroy() {
        this.stopAll()
        if (this.ctx) {
            this.ctx.close()
            this.ctx = null
        }
    }
}

// Singleton instance
let engine: AmbientAudioEngine | null = null

function getEngine(): AmbientAudioEngine {
    if (!engine) engine = new AmbientAudioEngine()
    return engine
}

// React hook for components to control audio
export function useAmbientAudio() {
    const play = useCallback((sound: AmbientSound) => getEngine().play(sound), [])
    const stop = useCallback((sound: AmbientSound) => getEngine().stop(sound), [])
    const stopAll = useCallback(() => getEngine().stopAll(), [])
    const toggleMute = useCallback(() => getEngine().toggleMute(), [])
    const setVolume = useCallback((v: number) => getEngine().setVolume(v), [])

    return { play, stop, stopAll, toggleMute, setVolume }
}

// Hook to play a sound when a section is in view
export function useAmbientSection(sound: AmbientSound) {
    const ref = useRef<HTMLDivElement>(null)
    const audioRef = useRef<{ play: (s: AmbientSound) => void; stop: (s: AmbientSound) => void } | null>(null)

    useEffect(() => {
        audioRef.current = { play: (s) => getEngine().play(s), stop: (s) => getEngine().stop(s) }
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    audioRef.current?.play(sound)
                } else {
                    audioRef.current?.stop(sound)
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => {
            observer.disconnect()
            audioRef.current?.stop(sound)
        }
    }, [sound])

    return ref
}
