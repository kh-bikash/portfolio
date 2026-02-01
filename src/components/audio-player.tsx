"use client"

import { useEffect, useRef } from "react"

export function AudioPlayer() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const isPlayingRef = useRef(false)

  useEffect(() => {
    const startAmbientAudio = () => {
      if (isPlayingRef.current) return

      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx
      isPlayingRef.current = true

      // Deep bass drone
      const bass = ctx.createOscillator()
      bass.type = "sine"
      bass.frequency.value = 55
      const bassGain = ctx.createGain()
      bassGain.gain.value = 0.1
      bass.connect(bassGain)
      bassGain.connect(ctx.destination)
      bass.start()

      // Mid-range with slow modulation
      const mid = ctx.createOscillator()
      mid.type = "sine"
      mid.frequency.value = 110
      const midGain = ctx.createGain()
      midGain.gain.value = 0.05
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.06
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.025
      lfo.connect(lfoGain)
      lfoGain.connect(midGain.gain)
      mid.connect(midGain)
      midGain.connect(ctx.destination)
      mid.start()
      lfo.start()

      // High ethereal tone
      const high = ctx.createOscillator()
      high.type = "sine"
      high.frequency.value = 220
      const highGain = ctx.createGain()
      highGain.gain.value = 0.015
      high.connect(highGain)
      highGain.connect(ctx.destination)
      high.start()

      // Filtered noise for texture
      const bufferSize = 2 * ctx.sampleRate
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }
      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      noise.loop = true
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = "lowpass"
      noiseFilter.frequency.value = 250
      const noiseGain = ctx.createGain()
      noiseGain.gain.value = 0.012
      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start()
    }

    startAmbientAudio()

    const handleInteraction = () => {
      if (!isPlayingRef.current) startAmbientAudio()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="flex items-center gap-4 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/30">
        {/* Animated equalizer bars */}
        <div className="flex items-end gap-0.5 h-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-cyan-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground font-mono tracking-wider">
          Downtown Binary — Other Worlds
        </span>
      </div>
    </div>
  )
}
