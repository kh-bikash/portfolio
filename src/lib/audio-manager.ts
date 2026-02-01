"use client"

// Singleton to hold audio state
class AudioManager {
    ctx: AudioContext | null = null
    analyser: AnalyserNode | null = null
    dataArray: Uint8Array | null = null

    init() {
        if (this.ctx) return

        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        this.ctx = new AudioContext()
        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 256 // Resolution
        const bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(bufferLength)
    }

    // Connect an existing node (e.g. master gain) to the analyser
    connectSource(node: AudioNode) {
        if (!this.analyser) this.init()
        if (this.analyser) {
            node.connect(this.analyser)
        }
    }

    getFrequencyData() {
        if (!this.analyser || !this.dataArray) return null
        this.analyser.getByteFrequencyData(this.dataArray)
        return this.dataArray
    }

    // Resume context if suspended (browser requirements)
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume()
        }
    }
}

export const audioManager = new AudioManager()
