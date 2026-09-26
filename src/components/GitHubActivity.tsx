import { useEffect, useState } from 'react'
import { hiddenRepos, profile, repoNotes } from '../content'

type Repo = {
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string | null
  pushed_at: string
  fork: boolean
}

const fallback: Repo[] = Object.entries(repoNotes).map(([name, description]) => ({
  name,
  description,
  language: null,
  html_url: `${profile.github}/${name}`,
  homepage: null,
  pushed_at: '',
  fork: false,
}))

const month = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' })

// Pulls the most recently pushed public repos, so this list stays current without redeploying.
export default function GitHubActivity({ limit = 6 }: { limit?: number }) {
  const [repos, setRepos] = useState<Repo[]>(fallback.slice(0, limit))

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=30`, { signal: controller.signal })
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Repo[]) => {
        const recent = data
          .filter(r => !r.fork && !hiddenRepos.has(r.name))
          .map(r => ({ ...r, description: r.description || repoNotes[r.name] || null }))
          .filter(r => r.description)
          .slice(0, limit)
        if (recent.length) setRepos(recent)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [limit])

  return (
    <ul className="repo-list">
      {repos.map(repo => (
        <li key={repo.name}>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            <span className="repo-name">{repo.name}</span>
            {repo.description && <span className="repo-desc">{repo.description}</span>}
            <span className="repo-meta">
              {[repo.language, repo.pushed_at && month.format(new Date(repo.pushed_at))].filter(Boolean).join(' · ')}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
