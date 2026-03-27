import { create } from 'zustand'
import { fetchGithubProjects, Project } from '@/lib/project-data'

interface ProjectStore {
    projects: Project[]
    isLoading: boolean
    error: string | null
    fetchProjects: (username?: string) => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    isLoading: true,
    error: null,
    fetchProjects: async (username = 'kh-bikash') => {
        set({ isLoading: true, error: null })
        try {
            const projects = await fetchGithubProjects(username)
            set({ projects, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    }
}))
