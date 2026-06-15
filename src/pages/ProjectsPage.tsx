"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useProjectStore } from '@/store/useProjectStore'
import { Project } from '@/lib/project-data'
import {
  Star,
  GitFork,
  Github,
  Search,
  ArrowLeft,
  X,
  Activity,
  FolderGit
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import mermaid from 'mermaid'
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

function MermaidChart({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let isMounted = true
    if (containerRef.current) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' })
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart)
        .then(({ svg }) => {
          if (isMounted && containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        })
        .catch(e => {
          console.error('Mermaid render error', e)
          if (isMounted && containerRef.current) {
            containerRef.current.innerText = 'Failed to render diagram.'
          }
        })
    }
    return () => { isMounted = false }
  }, [chart])

  return <div ref={containerRef} className="flex justify-center my-8 p-6 bg-white/5 rounded-xl border border-white/10 overflow-x-auto" />
}

export function ProjectsPage() {
  const { projects, isLoading, fetchProjects } = useProjectStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [languages, setLanguages] = useState<string[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  
  // Cache for fetched details
  const [detailsCache, setDetailsCache] = useState<Record<string, RepoDetailsCache>>({})
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [isReflexCubeOpen, setIsReflexCubeOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
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

  // Handle selecting repository
  const handleSelectRepo = async (project: Project) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(0, { behavior: 'smooth' })
    }
    setSelectedProjectId(project.id)

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
      readme = `# ${project.title}\n\n${project.description || 'No detailed README provided in this repository.'}\n\n*View source files and configuration directly on GitHub.*`
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
    const isPython = project.language === 'Python' || project.topics?.includes('python')
    const isJS = project.language === 'JavaScript' || project.language === 'TypeScript' || project.topics?.includes('javascript')

    if (isPython) {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Core modules)\n├── 📂 tests/ (Unit & Integration tests)\n├── 📄 requirements.txt (Dependencies)\n├── 📄 Dockerfile (Container definition)\n└── 📄 README.md`
      techDetails = `Language: Python\nFramework: ${project.topics.includes('fastapi') ? 'FastAPI' : 'Standard Python'}\nEnvironment: Virtualenv / Conda\nCI/CD: GitHub Actions`
    } else if (isJS) {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Components & Logic)\n├── 📂 public/ (Static Assets)\n├── 📄 package.json (Dependency Manifest)\n├── 📄 vite.config.ts (Build file)\n└── 📄 README.md`
      techDetails = `Language: JavaScript / TypeScript\nBuild Tool: Vite / Webpack\nDependencies: Node.js package manifest\nHosting: Vercel / Netlify`
    } else {
      architecture = `📂 ${project.id}/\n├── 📂 src/ (Source code)\n├── 📂 config/ (Configurations)\n├── 📄 LICENSE (MIT)\n└── 📄 README.md`
      techDetails = `Language: ${project.language || 'Multi-language'}\nVCS: Git & GitHub\nStatus: Maintained\nLicense: MIT / Open Source`
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
                          p.topics?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLanguage = selectedLanguage === 'All' || p.language === selectedLanguage
    return matchesSearch && matchesLanguage
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const activeProject = projects.find(p => p.id === selectedProjectId)

  return (
    <div className="min-h-screen w-full bg-[var(--bg-primary)] overflow-x-hidden flex flex-col font-sans">
      
      {/* Dynamic Navigation Bar */}
      <header className="sticky top-0 h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-12 bg-black/60 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="hidden md:flex h-4 w-px bg-white/10" />
          <span className="hidden md:block font-medium text-white/80 tracking-wide text-sm">
            {activeProject ? activeProject.title : 'Directory'}
          </span>
        </div>
        
        {!activeProject && (
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/30"
              />
            </div>
          </div>
        )}

        {activeProject && (
          <button
            onClick={() => {
              setSelectedProjectId(null)
              window.scrollTo(0, 0)
              const lenis = (window as any).lenis
              if (lenis) {
                lenis.scrollTo(0, { immediate: true })
              }
            }}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium px-4 py-2 bg-white/5 rounded-full"
          >
            <X className="w-4 h-4" />
            Close Article
          </button>
        )}
      </header>

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: DIRECTORY GRID */}
          {!activeProject && (
            <motion.div 
              key="directory-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20"
            >
              {/* Header */}
              <div className="mb-16">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4">
                  Projects Directory.
                </h1>
                <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl">
                  A complete archive of repositories, experiments, and applications.
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none mb-12 pb-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedLanguage === lang
                        ? 'bg-white text-black shadow-lg shadow-white/10'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-32">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <motion.button
                      key={project.id}
                      onClick={() => handleSelectRepo(project)}
                      className="group relative w-full text-left bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                    >
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white shadow-xl">
                            {project.language === 'Python' ? 'Py' : project.language === 'TypeScript' ? 'TS' : project.language === 'JavaScript' ? 'JS' : '•'}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-medium text-white/40">
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {project.stars}</span>
                            <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {project.forksCount}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 flex-1 font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.topics?.slice(0, 3).map(t => (
                            <span key={t} className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-black/50 text-white/60 rounded-lg">
                              {t}
                            </span>
                          ))}
                          {project.topics && project.topics.length > 3 && (
                            <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-black/50 text-white/40 rounded-lg">
                              +{project.topics.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW 2: PRODUCT ARTICLE (FULL SCREEN) */}
          {activeProject && (
            <motion.div 
              key="article-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full pb-32"
            >
              {/* Massive Article Header */}
              <div className="w-full py-24 md:py-32 px-6 md:px-12 bg-black border-b border-white/5 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
                
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {activeProject.topics?.map(t => (
                      <span key={t} className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-white/10 text-white/80 rounded-full border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter mb-8">
                    {activeProject.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-white/60 max-w-3xl font-light leading-relaxed mb-12">
                    {activeProject.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white text-black text-sm font-semibold rounded-full flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                      <Github className="w-5 h-5" />
                      View Source on GitHub
                    </a>
                    {activeProject.id === 'Reflex-Cube' && (
                      <button
                        onClick={() => setIsReflexCubeOpen(true)}
                        className="px-8 py-4 bg-white/5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
                      >
                        Deep Dive Case Study
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Two Column Layout for Article Content */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left/Main Column: README Rendering */}
                <div className="lg:col-span-8">
                  {isDetailLoading && !detailsCache[activeProject.id] ? (
                    <div className="flex items-center gap-4 text-white/50 py-20 justify-center">
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span className="font-medium tracking-wide">Compiling Documentation...</span>
                    </div>
                  ) : (
                    <div className="markdown-article">
                      <style>{`
                        .markdown-article {
                          color: rgba(255, 255, 255, 0.7);
                          font-size: 1.125rem;
                          line-height: 1.8;
                          font-weight: 300;
                        }
                        .markdown-article h1, .markdown-article h2, .markdown-article h3 {
                          color: white;
                          font-family: var(--font-heading);
                          font-weight: 700;
                          letter-spacing: -0.02em;
                          margin-top: 2.5em;
                          margin-bottom: 1em;
                        }
                        .markdown-article h1 { font-size: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5em; }
                        .markdown-article h2 { font-size: 2rem; }
                        .markdown-article h3 { font-size: 1.5rem; }
                        .markdown-article p { margin-bottom: 1.5em; }
                        .markdown-article a { color: white; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: rgba(255,255,255,0.3); transition: all 0.2s; }
                        .markdown-article a:hover { text-decoration-color: white; }
                        .markdown-article ul, .markdown-article ol { padding-left: 1.5em; margin-bottom: 1.5em; }
                        .markdown-article li { margin-bottom: 0.5em; }
                        .markdown-article code { background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.875em; font-family: monospace; color: white; }
                        .markdown-article pre { background: #000; border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; overflow-x: auto; margin-bottom: 2em; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
                        .markdown-article pre code { background: transparent; padding: 0; color: inherit; font-size: 0.875em; }
                        .markdown-article blockquote { border-left: 4px solid rgba(255,255,255,0.2); padding-left: 1.5em; margin-left: 0; font-style: italic; color: rgba(255,255,255,0.5); }
                        .markdown-article img { max-width: 100%; height: auto; border-radius: 1rem; margin: 2em 0; border: 1px solid rgba(255,255,255,0.1); }
                      `}</style>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            if (match && match[1] === 'mermaid') {
                              return <MermaidChart chart={String(children).replace(/\n$/, '')} />
                            }
                            return <code {...rest} className={className}>{children}</code>
                          },
                          img(props) {
                            let src = props.src
                            if (src && !src.startsWith('http') && activeProject) {
                              const branch = activeProject.defaultBranch || 'main'
                              src = `https://raw.githubusercontent.com/kh-bikash/${activeProject.id}/${branch}/${src.replace(/^[\.\/]+/, '')}`
                            }
                            return <img {...props} src={src} />
                          }
                        }}
                      >
                        {detailsCache[activeProject.id]?.readme}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {/* Right Column: Sticky Sidebar (Meta, Architecture, Commits) */}
                <div className="lg:col-span-4 relative">
                  <div className="sticky top-32 space-y-12">
                    
                    {/* Repository Meta */}
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                        Repository Details
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/50 text-sm">Language</span>
                          <span className="text-white text-sm font-medium">{activeProject.language || 'Multiple'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/50 text-sm">Last Pushed</span>
                          <span className="text-white text-sm font-medium">{formatDate(activeProject.pushedAt)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/50 text-sm">Size</span>
                          <span className="text-white text-sm font-medium">
                            {activeProject.size > 1024 ? `${(activeProject.size / 1024).toFixed(1)}MB` : `${activeProject.size}KB`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/50 text-sm">Stars</span>
                          <span className="text-white text-sm font-medium flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {activeProject.stars}</span>
                        </div>
                      </div>
                    </div>

                    {/* Architecture Tree */}
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                        <FolderGit className="w-4 h-4 text-white/50" />
                        Structure
                      </h4>
                      <div className="bg-black border border-white/10 rounded-2xl p-5 overflow-x-auto scrollbar-thin">
                        {isDetailLoading && !detailsCache[activeProject.id] ? (
                          <div className="animate-pulse h-20 bg-white/5 rounded" />
                        ) : (
                          <pre className="text-xs font-mono text-white/60 leading-relaxed">
                            {detailsCache[activeProject.id]?.architecture}
                          </pre>
                        )}
                      </div>
                    </div>

                    {/* Commits Timeline */}
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                        <Activity className="w-4 h-4 text-white/50" />
                        Changelog
                      </h4>
                      <div className="space-y-6">
                        {isDetailLoading && !detailsCache[activeProject.id] ? (
                          <div className="animate-pulse h-32 bg-white/5 rounded" />
                        ) : (
                          detailsCache[activeProject.id]?.commits?.map((commit, i) => (
                            <div key={i} className="flex gap-4">
                              <img src={commit.authorAvatar} alt="" className="w-8 h-8 rounded-full border border-white/10" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium line-clamp-1 mb-1">{commit.message}</p>
                                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                                  <span className="bg-white/10 px-2 py-0.5 rounded text-white/70">{commit.sha}</span>
                                  <span>·</span>
                                  <span>{formatDate(commit.date)}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                        {(!detailsCache[activeProject.id]?.commits || detailsCache[activeProject.id]?.commits.length === 0) && (
                          <div className="text-sm text-white/40 italic">No recent activity found.</div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ReflexCubeDetail isOpen={isReflexCubeOpen} onClose={() => setIsReflexCubeOpen(false)} />
    </div>
  )
}
