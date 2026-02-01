import { create } from 'zustand'

interface UIState {
    isRecruiterMode: boolean
    toggleRecruiterMode: () => void
}

export const useUIStore = create<UIState>((set) => ({
    isRecruiterMode: false,
    toggleRecruiterMode: () => set((state) => ({ isRecruiterMode: !state.isRecruiterMode })),
}))
