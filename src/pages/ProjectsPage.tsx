"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useProjectStore } from '@/store/useProjectStore'
import { Project } from '@/lib/project-data'
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Search,
  Filter,
  Clock,
  Activity,
  FolderGit,
  BookOpen,
  Code2,
  HardDrive,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ReflexCubeDetail } from '@/components/sections/ReflexCubeDetail'

interface CommitActivity {
  sha: string
  message: string
  authorName: string
  authorAvatar: string
  date: string
}

interface RepoDetailsCache {
  readme: string
  commits: CommitActivity[]
  architecture: string
  techDetails: string
}

const FEATURED_META = {
  reflexcube: {
    subtitle: 'No-Code AI Platform',
    image: '/projects/reflexcube_dashboard.png',
  },
  creditwiseloan: {
    subtitle: 'Loan Prediction System',
    image: '/projects/creditwise_analytics.png',
  },
  sign_lang_detector: {
    subtitle: 'Real-time CNN System',
    image: '/projects/signlang_cv.png',
  }
}

export function ProjectsPage() {
  const { projects, isLoading, fetchProjects } = useProjectStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [languages, setLanguages] = useState<string[]>([])
  const [expandedRepoId, setExpandedRepoId] = useState<string | null>(null)
  
  // Cache for fetched details
  const [detailsCache, setDetailsCache] = useState<Record<string, RepoDetailsCache>>({})
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [isReflexCubeOpen, setIsReflexCubeOpen] = useState(false)
  
  const detailsRef = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Extract languages from projects when loaded
  useEffect(() => {
    if (projects.length > 0) {
      const uniqueLanguages = new Set<string>()
      projects.forEach((p) => {
        if (p.language && p.language !== 'Unknown') {
          uniqueLanguages.add(p.language)
        }
      })
      setLanguages(['All', ...Array.from(uniqueLanguages)])
    }
  }, [projects])

  // Handle expanding repository cards
  const handleExpandRepo = async (project: Project) => {
    if (expandedRepoId === project.id) {
      setExpandedRepoId(null)
      return
    }

    setExpandedRepoId(project.id)

    // Smooth scroll to card
    setTimeout(() => {
      detailsRef.current[project.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 150)

    if (detailsCache[project.id]) return

    setIsDetailLoading(true)
    let readme = ''
    let commits: CommitActivity[] = []
    let architecture = ''
    let techDetails = ''

    // Fetch README
    const branches = [project.defaultBranch || 'main', 'main', 'master']
    const readmeFiles = ['README.md', 'readme.md', 'README.txt', 'Readme.md']
    
    let readmeFetched = false
    for (const branch of branches) {
      if (readmeFetched) break
      for (const filename of readmeFiles) {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/kh-bikash/${project.id}/${branch}/${filename}`)
          if (res.ok) {
            readme = await res.text()
            readmeFetched = true
            break
          }
        } catch (e) {}
      }
    }

    if (!readme) {
      readme = `### ${project.title}\n\n${project.description || 'No detailed README provided in this repository.'}\n\n*View source files and configuration directly on GitHub.*`
    }

    // Fetch Commits
    try {
      const res = await fetch(`https://api.github.com/repos/kh-bikash/${project.id}/commits?per_page=5`)
      if (res.ok) {
        const commitsData = await res.json()
        if (Array.isArray(commitsData)) {
          commits = commitsData.map((c: any) => ({
            sha: c.sha.substring(0, 7),
            message: c.commit.message.split('\n')[0],
            authorName: c.commit.author.name,
            authorAvatar: c.author?.avatar_url || 'https://github.com/identicons/default.png',
            date: c.commit.author.date,
          }))
        }
      }
    } catch (e) {
      console.warn('Commits fetch failed', e)
    }

    // Generate architecture metadata
    const isPython = project.language === 'Python' || project.topics.includes('python')
    const isJS = project.language === 'JavaScript' || project.language === 'TypeScript' || project.topics.includes('javascript')

    if (isPython) {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Core modules)\n├── 📂 tests/ (Unit & Integration tests)\n├── 📄 requirements.txt (Dependencies)\n├── 📄 Dockerfile (Container definition)\n└── 📄 README.md`
      techDetails = `**Language:** Python\n**Framework:** ${project.topics.includes('fastapi') ? 'FastAPI' : 'Standard Python'}\n**Environment:** Virtualenv / Conda\n**CI/CD:** GitHub Actions`
    } else if (isJS) {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Components & Logic)\n├── 📂 public/ (Static Assets)\n├── 📄 package.json (Dependency Manifest)\n├── 📄 vite.config.ts (Build file)\n└── 📄 README.md`
      techDetails = `**Language:** JavaScript / TypeScript\n**Build Tool:** Vite / Webpack\n**Dependencies:** Node.js package manifest\n**Hosting:** Vercel / Netlify`
    } else {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Source code)\n├── 📂 config/ (Configurations)\n├── 📄 LICENSE (MIT)\n└── 📄 README.md`
      techDetails = `**Language:** ${project.language || 'Multi-language'}\n**VCS:** Git & GitHub\n**Status:** Maintained\n**License:** MIT / Open Source`
    }

    setDetailsCache((prev) => ({
      ...prev,
      [project.id]: {
        readme,
        commits,
        architecture,
        techDetails,
      },
    }))
    setIsDetailLoading(false)
  }

  const goBack = () => {
    window.location.hash = '#/'
  }

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLanguage = selectedLanguage === 'All' || p.language === selectedLanguage
    return matchesSearch && matchesLanguage
  })

  // Separate Featured and General repositories
  const featuredIds = ['Reflex-Cube', 'CreditWiseLoan', 'sign_lang_detector']
  const featuredProjects = projects.filter((p) => featuredIds.includes(p.id))
  
  // Sort projects so that non-featured list doesn't duplicate featured ones unless search/filter is on
  const generalProjects = filteredProjects.filter((p) => !featuredIds.includes(p.id))

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--accent-red-glow)] to-transparent pointer-events-none opacity-20 blur-[100px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-10 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO HOME / 戻る</span>
        </button>

        {/* Title */}
        <div className="mb-16">
          <span className="font-serif text-sm tracking-[0.5em] text-[var(--accent-red)] mb-4 block">
            作品集 — SHOWCASE
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
            Technical Projects
          </h1>
          <p className="text-sm font-sans text-[var(--text-muted)] mt-2">
            A comprehensive archive of all deployed AI systems, machine learning pipelines, and open-source contributions.
          </p>
        </div>

        {/* Featured Projects Showcase (Rendered first if no search active) */}
        {searchQuery === '' && selectedLanguage === 'All' && featuredProjects.length > 0 && (
          <div className="mb-20">
            <h2 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider mb-8 flex items-center gap-2">
              <Star className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Flagship Developments</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((p) => {
                const meta = FEATURED_META[p.id.toLowerCase().replace('-', '') as keyof typeof FEATURED_META] || {
                  subtitle: 'Featured Project',
                  image: '/placeholder.jpg'
                }
                
                return (
                  <div
                    key={p.id}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-[var(--glass-border)] group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={meta.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <span className="text-[10px] font-mono tracking-wider text-[var(--accent-gold)] uppercase block mb-1">
                          {meta.subtitle}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-3">
                          {p.title}
                        </h3>
                        <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer / Tech */}
                    <div className="p-6 pt-0">
                      <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {p.language}
                        </span>
                        <div className="flex gap-3">
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--accent-red)] flex items-center gap-1"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          {p.id === 'Reflex-Cube' && (
                            <button
                              onClick={() => setIsReflexCubeOpen(true)}
                              className="text-[10px] font-sans font-semibold text-[var(--accent-red)] hover:text-[var(--text-primary)] cursor-pointer"
                            >
                              Deep Dive
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Filters and search */}
        <div className="border-t border-[var(--glass-border)] pt-12 mb-10">
          <h2 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider mb-6">
            Explore Codebase Archive
          </h2>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search repository index by name, stack, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-red)]/50 transition-all font-sans"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
              <Filter className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex-shrink-0 cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[var(--accent-red)]/15 text-[var(--accent-red)] border border-[var(--accent-red)]/35'
                      : 'bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Repository list */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--accent-red)] animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {generalProjects.map((project) => (
              <div
                key={project.id}
                ref={(el) => (detailsRef.current[project.id] = el as any)}
                className="glass-card rounded-2xl overflow-hidden border border-[var(--glass-border)] transition-all hover:border-[var(--glass-border-hover)]"
              >
                {/* Header */}
                <div
                  onClick={() => handleExpandRepo(project)}
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none hover:bg-[var(--glass-bg)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] capitalize">
                        {project.title}
                      </h3>
                      {project.language && (
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
                          {project.language}
                        </span>
                      )}
                    </div>
                    
                    {/* Live updated / enriched description */}
                    <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                      {project.description === 'No description provided.' ? (
                        <span className="text-[var(--text-muted)] italic">Extracting description from README...</span>
                      ) : (
                        project.description
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5" title="Stars">
                        <Star className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1.5" title="Forks">
                        <GitFork className="w-3.5 h-3.5" />
                        {project.forksCount}
                      </span>
                      <span className="hidden sm:flex items-center gap-1.5" title="Size">
                        <HardDrive className="w-3.5 h-3.5" />
                        {project.size > 1024 ? `${(project.size / 1024).toFixed(1)}MB` : `${project.size}KB`}
                      </span>
                    </div>

                    <div className="p-2 rounded-full border border-[var(--glass-border)] bg-[var(--bg-primary)] text-[var(--text-muted)] transition-all">
                      {expandedRepoId === project.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Project Details */}
                <AnimatePresence initial={false}>
                  {expandedRepoId === project.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-[var(--glass-border)] bg-[var(--bg-primary)]/40"
                    >
                      {isDetailLoading && !detailsCache[project.id] ? (
                        <div className="flex justify-center items-center py-16 gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-[var(--accent-red)] animate-spin" />
                          <span className="text-xs font-mono text-[var(--text-muted)]">Fetching repository metadata...</span>
                        </div>
                      ) : (
                        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                          
                          {/* Left Column - README & Code architecture */}
                          <div className="space-y-6 min-w-0">
                            
                            {/* README Preview */}
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                <BookOpen className="w-4 h-4 text-[var(--accent-red)]" />
                                <span>README Preview</span>
                              </div>
                              <div data-lenis-prevent className="glass-card rounded-xl p-6 border border-[var(--glass-border)] max-h-[450px] overflow-y-auto bg-white/50 prose max-w-none text-sm text-gray-800 font-sans leading-relaxed scrollbar-thin">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                  {detailsCache[project.id]?.readme}
                                </ReactMarkdown>
                              </div>
                            </div>

                            {/* Project Architecture */}
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                <FolderGit className="w-4 h-4 text-[var(--accent-gold)]" />
                                <span>Project Architecture</span>
                              </div>
                              <div className="glass-card rounded-xl p-5 border border-[var(--glass-border)] bg-white/50">
                                <pre className="font-mono text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                                  {detailsCache[project.id]?.architecture}
                                </pre>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Stats & Commits */}
                          <div className="space-y-6">
                            
                            {/* Detailed Telemetry Stats */}
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                <Activity className="w-4 h-4 text-[#6E8C7D]" />
                                <span>Repository Stats</span>
                              </div>
                              <div className="glass-card rounded-xl p-4 border border-[var(--glass-border)] bg-[var(--bg-secondary)]/30 space-y-2.5 font-sans text-xs">
                                <div className="flex justify-between">
                                  <span className="text-[var(--text-muted)]">Default Branch:</span>
                                  <span className="font-mono text-[var(--text-primary)]">{project.defaultBranch}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[var(--text-muted)]">Open Issues:</span>
                                  <span className="font-mono text-[var(--text-primary)]">{project.openIssuesCount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[var(--text-muted)]">Watchers:</span>
                                  <span className="font-mono text-[var(--text-primary)]">{project.watchersCount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[var(--text-muted)]">Last Push:</span>
                                  <span className="font-mono text-[var(--text-primary)]">{formatDate(project.pushedAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[var(--text-muted)]">Created Date:</span>
                                  <span className="font-mono text-[var(--text-primary)]">{formatDate(project.updatedAt)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Live Commit Activity */}
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-purple-600" />
                                <span>Recent Commit Activity</span>
                              </div>
                              <div className="glass-card rounded-xl p-4 border border-[var(--glass-border)] bg-[var(--bg-secondary)]/30 space-y-4">
                                {detailsCache[project.id]?.commits && detailsCache[project.id].commits.length > 0 ? (
                                  <div className="relative pl-4 border-l border-[var(--glass-border)] space-y-4 text-xs">
                                    {detailsCache[project.id].commits.map((commit) => (
                                      <div key={commit.sha} className="relative">
                                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent-red)] border-2 border-[var(--bg-primary)]" />
                                        <div className="flex items-start justify-between gap-2 min-w-0">
                                          <p className="font-sans font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">
                                            {commit.message}
                                          </p>
                                          <span className="font-mono text-[10px] text-[var(--text-muted)] bg-[var(--glass-bg)] px-1.5 py-0.5 rounded flex-shrink-0">
                                            {commit.sha}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-[var(--text-muted)]">
                                          <img
                                            src={commit.authorAvatar}
                                            alt={commit.authorName}
                                            className="w-3.5 h-3.5 rounded-full"
                                          />
                                          <span>{commit.authorName}</span>
                                          <span>·</span>
                                          <span>{formatDate(commit.date)}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-4 text-xs font-mono text-[var(--text-muted)]">
                                    No recent commit activity detected.
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Technical Stack details */}
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                <Code2 className="w-4 h-4 text-emerald-600" />
                                <span>Technical Details</span>
                              </div>
                              <div className="glass-card rounded-xl p-4 border border-[var(--glass-border)] bg-white/50 text-xs font-sans text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {detailsCache[project.id]?.techDetails}
                              </div>
                            </div>

                            {/* GitHub Navigation Button */}
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 shadow-premium font-sans"
                            >
                              <Github className="w-4 h-4" />
                              <span>Open on GitHub</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {generalProjects.length === 0 && (
              <div className="text-center py-20 glass-card rounded-2xl">
                <span className="text-sm font-sans text-[var(--text-muted)]">
                  No repositories match the current filter parameters.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <ReflexCubeDetail isOpen={isReflexCubeOpen} onClose={() => setIsReflexCubeOpen(false)} />
    </div>
  )
}
