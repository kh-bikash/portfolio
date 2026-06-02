export interface Project {
    id: string
    title: string
    description: string
    readme?: string
    githubUrl: string
    topics: string[]
    stars: number
    language: string
    updatedAt: string
    forksCount: number
    watchersCount: number
    openIssuesCount: number
    size: number
    pushedAt: string
    defaultBranch: string
}

export function extractDescriptionFromReadme(markdown: string): string {
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

async function fetchReadmeData(username: string, repoName: string, defaultBranch: string): Promise<{ description: string, readme: string } | null> {
    const possibleNames = ['README.md', 'readme.md', 'README.txt', 'Readme.md']
    
    for (const name of possibleNames) {
        try {
            const res = await fetch(`https://raw.githubusercontent.com/${username}/${repoName}/${defaultBranch}/${name}`)
            if (res.ok) {
                const markdown = await res.text()
                const desc = extractDescriptionFromReadme(markdown)
                return { description: desc || 'No description provided.', readme: markdown }
            }
        } catch (e) {
            // Ignore fetch errors and try next
        }
    }
    return null
}

export async function fetchGithubProjects(username: string = 'kh-bikash'): Promise<Project[]> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`)
        }
        const repos = await response.json()
        
        const validRepos = repos.filter((r: any) => !r.fork && r.name !== username)

        const projects = validRepos.map((repo: any) => {
            const desc = repo.description || 'No description provided.'

            return {
                id: repo.name,
                title: repo.name.replace(/-/g, ' '),
                description: desc,
                readme: '',
                githubUrl: repo.html_url,
                topics: repo.topics || [],
                stars: repo.stargazers_count || 0,
                language: repo.language || 'Unknown',
                updatedAt: repo.updated_at,
                forksCount: repo.forks_count || 0,
                watchersCount: repo.watchers_count || 0,
                openIssuesCount: repo.open_issues_count || 0,
                size: repo.size || 0,
                pushedAt: repo.pushed_at || repo.updated_at,
                defaultBranch: repo.default_branch || 'main'
            }
        })

        return projects
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return []
    }
}
