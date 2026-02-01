import { create } from 'zustand'

export type BiomeType = 'cyber' | 'organic' | 'industrial'

interface BiomeColors {
    fog: string
    lightA: string // Key light
    lightB: string // Fill light
    accent: string // UI / Particles
    background: string
}

interface BiomeState {
    currentBiome: BiomeType
    colors: BiomeColors
    setBiome: (biome: BiomeType) => void
}

const PALETTES: Record<BiomeType, BiomeColors> = {
    cyber: {
        fog: '#050505',
        lightA: 'cyan',
        lightB: 'magenta',
        accent: '#00ffff',
        background: '#000000'
    },
    organic: {
        fog: '#1a0b1e', // Dark purple
        lightA: '#ff0055', // Pink
        lightB: '#4400ff', // Deep Blue
        accent: '#ff99cc',
        background: '#12001f'
    },
    industrial: {
        fog: '#0a0a05', // Muddy dark
        lightA: '#ffaa00', // Sodium vapor orange
        lightB: '#554433', // Warm grey
        accent: '#ffcc00',
        background: '#0a0500'
    }
}

export const useBiomeStore = create<BiomeState>((set) => ({
    currentBiome: 'cyber',
    colors: PALETTES.cyber,
    setBiome: (biome) => set({
        currentBiome: biome,
        colors: PALETTES[biome]
    })
}))
