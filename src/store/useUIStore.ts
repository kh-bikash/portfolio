import { create } from 'zustand'
// TYPES
export type ViewState = 'LANDING' | 'HOME' | 'WORK' | 'ABOUT' | 'SKILLS' | 'DATA' | 'HARDWARE' | 'THOUGHTS'

interface UIState {
    view: ViewState
    audioEnabled: boolean
    isLoaded: boolean
    activeProjectImage: string | null
    activeProject: any | null
    consoleOpen: boolean
    visionMode: boolean
    sandboxOpen: boolean
    contactOpen: boolean

    setView: (view: ViewState) => void
    toggleAudio: () => void
    setLoaded: (loaded: boolean) => void
    setActiveProjectImage: (image: string | null) => void
    setActiveProject: (project: any | null) => void
    toggleConsole: () => void
    toggleVision: () => void
    toggleSandbox: () => void
    toggleContact: () => void
}

export const useUIStore = create<UIState>((set) => ({
    view: 'LANDING', // Start at LANDING
    audioEnabled: false,
    isLoaded: false,
    activeProjectImage: null,
    activeProject: null,
    consoleOpen: false,
    visionMode: false,
    sandboxOpen: false,
    contactOpen: false,

    setView: (view) => set({ view }),
    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    setLoaded: (loaded) => set({ isLoaded: loaded }),
    setActiveProjectImage: (image) => set({ activeProjectImage: image }),
    setActiveProject: (project) => set({ activeProject: project }),
    toggleConsole: () => set((state) => ({ consoleOpen: !state.consoleOpen })),
    toggleVision: () => set((state) => ({ visionMode: !state.visionMode })),
    toggleSandbox: () => set((state) => ({ sandboxOpen: !state.sandboxOpen })),
    toggleContact: () => set((state) => ({ contactOpen: !state.contactOpen })),
}))
