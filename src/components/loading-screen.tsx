"use client"

import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing")

  useEffect(() => {
    const texts = ["Initializing", "Loading assets", "Preparing experience", "Almost ready"]
    let textIndex = 0

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 600)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 8, 100))
    }, 100)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-background z-[200] flex flex-col items-center justify-center">
      {/* Glowing orb */}
      <div className="relative mb-16">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-cyan-400/20 animate-ping" />
          </div>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-48 h-[2px] bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className="mt-6 flex items-center gap-2">
        <p className="text-xs text-muted-foreground font-mono tracking-[0.2em]">{loadingText}</p>
        <span className="text-xs text-cyan-400 font-mono">{Math.floor(progress)}%</span>
      </div>
    </div>
  )
}
