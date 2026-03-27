export interface Project {
    id: string
    title: string
    description: string
    githubUrl: string
    topics: string[]
    stars: number
    language: string
    updatedAt: string
}

function extractDescriptionFromReadme(markdown: string): string {
    const lines = markdown.split('\n')
    for (const line of lines) {
        const trimmed = line.trim()
        // Skip empty lines, headers, blockquotes, HTML tags, images/badges, and lists
        if (
            trimmed &&
            !trimmed.startsWith('#') &&
            !trimmed.startsWith('>') &&
            !trimmed.startsWith('<') &&
            !trimmed.startsWith('![') &&
            !trimmed.startsWith('-') &&
            !trimmed.startsWith('*')
        ) {
            // Remove any markdown links e.g. [text](url) -> text
            const textOnly = trimmed.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
            return textOnly.length > 200 ? textOnly.substring(0, 197) + '...' : textOnly
        }
    }
    return ''
}

async function fetchReadmeDescription(username: string, repoName: string, defaultBranch: string): Promise<string> {
    const possibleNames = ['README.md', 'readme.md', 'README.txt', 'Readme.md']
    
    for (const name of possibleNames) {
        try {
            const res = await fetch(`https://raw.githubusercontent.com/${username}/${repoName}/${defaultBranch}/${name}`)
            if (res.ok) {
                const markdown = await res.text()
                const desc = extractDescriptionFromReadme(markdown)
                if (desc) return desc
            }
        } catch (e) {
            // Ignore fetch errors and try next
        }
    }
    return 'No description provided.'
}

export async function fetchGithubProjects(username: string = 'kh-bikash'): Promise<Project[]> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`)
        }
        const repos = await response.json()
        
        // Filter out forks and the profile readme repository
        const validRepos = repos.filter((r: any) => !r.fork && r.name !== username)

        const projects = await Promise.all(validRepos.map(async (repo: any) => {
            let desc = repo.description
            
            // If there's no description from the GitHub API, attempt to extract it from the README
            if (!desc || desc.trim() === '') {
                desc = await fetchReadmeDescription(username, repo.name, repo.default_branch || 'main')
            }

            return {
                id: repo.name,
                title: repo.name.replace(/-/g, ' '),
                description: desc,
                githubUrl: repo.html_url,
                topics: repo.topics || [],
                stars: repo.stargazers_count || 0,
                language: repo.language || 'Unknown',
                updatedAt: repo.updated_at
            }
        }))

        return projects
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return []
    }
}
