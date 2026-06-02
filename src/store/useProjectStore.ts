import { create } from 'zustand'
import { fetchGithubProjects, Project, extractDescriptionFromReadme } from '@/lib/project-data'

interface ProjectStore {
    projects: Project[]
    isLoading: boolean
    error: string | null
    fetchProjects: (username?: string) => Promise<void>
}

const enrichDescriptions = async (projects: Project[], set: any) => {
  // 1. First, check localStorage for cached descriptions
  const updatedProjects = projects.map(p => {
    if (p.description === 'No description provided.' || !p.description) {
      const cached = localStorage.getItem(`repo_desc_${p.id}`)
      if (cached) {
        return { ...p, description: cached }
      }
    }
    return p
  })

  // Update store immediately with cached values
  set({ projects: updatedProjects })

  // 2. Identify projects that still need descriptions
  const projectsToFetch = updatedProjects.filter(
    p => p.description === 'No description provided.' || !p.description
  )

  if (projectsToFetch.length === 0) return

  // Fetch READMEs in the background to avoid rate limits
  for (const project of projectsToFetch) {
    try {
      const branches = ['main', 'master']
      const readmeFiles = ['README.md', 'readme.md', 'README.txt', 'Readme.md']
      let readmeText = ''
      
      for (const branch of branches) {
        if (readmeText) break
        for (const file of readmeFiles) {
          const res = await fetch(
            `https://raw.githubusercontent.com/kh-bikash/${project.id}/${branch}/${file}`
          )
          if (res.ok) {
            readmeText = await res.text()
            break
          }
        }
      }

      if (readmeText) {
        const desc = extractDescriptionFromReadme(readmeText)
        if (desc) {
          localStorage.setItem(`repo_desc_${project.id}`, desc)
          set((state: any) => ({
            projects: state.projects.map((p: any) =>
              p.id === project.id ? { ...p, description: desc } : p
            ),
          }))
        }
      }
    } catch (err) {
      console.warn(`Failed to background fetch description for ${project.id}`, err)
    }
    // Small delay between fetches to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 300))
  }
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
            
            // Trigger background description enrichment
            enrichDescriptions(projects, set)
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    }
}))
