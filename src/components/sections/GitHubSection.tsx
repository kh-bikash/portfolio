"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { ExternalLink, Star, GitFork, Github, Sparkles } from 'lucide-react'
import { useProjectStore } from '@/store/useProjectStore'

// 1. AgentBench Visualizer
function AgentBenchVisualizer({ isHovered }: { isHovered: boolean }) {
  const [activeScore, setActiveScore] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScore(prev => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-4 overflow-hidden relative font-mono text-[9px]">
      <div className="w-full max-w-[240px] flex flex-col gap-2 bg-black/80 border border-white/10 rounded-xl p-3 shadow-lg shadow-black/50">
        <div className="flex justify-between items-center border-b border-white/5 pb-1.5 text-white/40 text-[7px]">
          <span>RUN #042</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            BENCHMARKING
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-white/70">
            <span>Gemini 2.5 Flash</span>
            <span className="text-emerald-400 font-bold">92.4%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: activeScore === 0 ? '92.4%' : '20%' }}
              transition={{ duration: isHovered ? 0.6 : 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-white/70">
            <span>Llama 3.3 70B</span>
            <span className="text-blue-400 font-bold">88.1%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: activeScore === 0 ? '88.1%' : '15%' }}
              transition={{ duration: isHovered ? 0.6 : 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-white/40 text-[7px]">
          <div>latency: <span className="text-white">184ms</span></div>
          <div>cost/1k: <span className="text-white">$0.0001</span></div>
        </div>
      </div>
    </div>
  )
}

// 2. MonsoonRelief Visualizer
function MonsoonReliefVisualizer({ isHovered }: { isHovered: boolean }) {
  const path = [
    { x: 30, y: 75 },
    { x: 80, y: 55 },
    { x: 130, y: 35 },
    { x: 170, y: 80 },
    { x: 210, y: 45 }
  ]
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % path.length)
    }, isHovered ? 800 : 1600)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-3 overflow-hidden relative">
      <div className="relative w-[240px] h-[100px] border border-white/10 bg-black/80 rounded-xl overflow-hidden shadow-lg shadow-black/50">
        <div className="absolute inset-x-0 bottom-0 h-8 bg-blue-500/10 border-t border-blue-500/20 flex items-center justify-between px-3 text-[7px] font-mono text-blue-400/50">
          <span>FLOOD ZONE ACCURACY</span>
          <span>EVAC: 88%</span>
        </div>

        <div className="absolute top-6 left-12 w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
        <div className="absolute top-12 left-32 w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
        <div className="absolute top-4 left-40 w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points={path.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>

        <motion.div
          animate={{ x: path[step].x - 4, y: path[step].y - 4 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-yellow-500/20 z-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
        </motion.div>

        <AnimatePresence>
          {step > 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: path[step-1].y - 12, x: path[step-1].x }}
              animate={{ opacity: 1, y: path[step-1].y - 25 }}
              exit={{ opacity: 0 }}
              className="absolute text-[7px] font-mono font-bold text-emerald-400 bg-black/80 border border-emerald-500/20 px-1 py-0.5 rounded shadow-sm"
            >
              +10 Reward
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 3. LegalEase AI Visualizer
function LegalEaseVisualizer({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-3 overflow-hidden relative">
      <div className="w-full max-w-[240px] h-[100px] border border-white/10 bg-black/80 rounded-xl p-3 flex flex-col justify-between font-sans relative overflow-hidden shadow-lg shadow-black/50">
        <div className="space-y-1">
          <div className="w-3/4 h-1.5 bg-white/10 rounded" />
          <div className="w-full h-1.5 bg-white/10 rounded flex items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="h-full bg-emerald-500/30 border-l border-r border-emerald-400 rounded"
            />
          </div>
          <div className="w-5/6 h-1.5 bg-white/10 rounded" />
        </div>

        <motion.div
          animate={{ opacity: [0, 1, 1, 0], y: [3, 0, 0, 3] }}
          transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.15, 0.85, 1] }}
          className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded p-1 text-[7px] font-mono text-emerald-300"
        >
          <Sparkles className="w-2 h-2 text-emerald-400 shrink-0" />
          <span className="truncate">Extracted clause 14: indemnity limit...</span>
        </motion.div>

        <motion.div
          animate={{ y: [-10, 110] }}
          transition={{ repeat: Infinity, duration: isHovered ? 1.2 : 2, ease: 'linear' }}
          className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        />
      </div>
    </div>
  )
}

// 4. Self-Healing Engine Visualizer
function SelfHealingVisualizer({ isHovered }: { isHovered: boolean }) {
  const [lineIdx, setLineIdx] = useState(0)
  const logs = [
    { text: '$ python run_tests.py', color: 'text-white/60' },
    { text: '✖ Traceback: ZeroDivisionError at math.py:12', color: 'text-rose-400' },
    { text: '⚙ Healing... Injecting fallback divisor', color: 'text-amber-400' },
    { text: '✔ Tests passed. Self-healed [OK]', color: 'text-emerald-400' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIdx(prev => (prev + 1) % (logs.length + 1))
    }, isHovered ? 800 : 1500)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-3 overflow-hidden relative">
      <div className="w-full max-w-[240px] h-[100px] border border-white/10 bg-black/80 rounded-xl p-3 flex flex-col gap-1 font-mono text-[7px] justify-center relative overflow-hidden shadow-lg shadow-black/50">
        <div className="absolute top-0 inset-x-0 h-4 bg-white/5 border-b border-white/5 flex items-center justify-between px-2 text-white/30 text-[6px]">
          <span>TERMINAL - AUTOREPAIR</span>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="space-y-0.5 mt-2">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -3 }}
              animate={lineIdx > idx ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={log.color}
            >
              {log.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. Algogenesis 3D Visualizer
function AlgogenesisVisualizer({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-3 overflow-hidden relative">
      <div className="relative w-[240px] h-[100px] border border-white/10 bg-black/80 rounded-xl overflow-hidden flex items-center justify-around px-4 shadow-lg shadow-black/50">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="40" y1="25" x2="120" y2="20" stroke="#fff" strokeWidth="0.5" />
          <line x1="40" y1="25" x2="120" y2="50" stroke="#fff" strokeWidth="0.5" />
          <line x1="40" y1="75" x2="120" y2="50" stroke="#fff" strokeWidth="0.5" />
          <line x1="40" y1="75" x2="120" y2="80" stroke="#fff" strokeWidth="0.5" />
          <line x1="120" y1="20" x2="200" y2="50" stroke="#fff" strokeWidth="0.5" />
          <line x1="120" y1="50" x2="200" y2="50" stroke="#fff" strokeWidth="0.5" />
          <line x1="120" y1="80" x2="200" y2="50" stroke="#fff" strokeWidth="0.5" />
        </svg>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.circle
            r="1.5"
            fill="#10b981"
            animate={{
              cx: [40, 120, 200],
              cy: [25, 50, 50]
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 1 : 2,
              ease: 'easeInOut'
            }}
          />
          <motion.circle
            r="1.5"
            fill="#3b82f6"
            animate={{
              cx: [40, 120, 200],
              cy: [75, 80, 50]
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 1.2 : 2.2,
              ease: 'easeInOut',
              delay: 0.4
            }}
          />
        </svg>

        <div className="flex flex-col gap-6 relative z-10">
          <motion.div animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} className="w-3.5 h-3.5 rounded-full bg-blue-500/80 border border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <motion.div animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-3.5 h-3.5 rounded-full bg-blue-500/80 border border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          <div className="w-3 h-3 rounded-full bg-white/20 border border-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/20 border border-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/20 border border-white/40" />
        </div>

        <div className="relative z-10">
          <motion.div animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} className="w-4 h-4 rounded-full bg-emerald-500/80 border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
    </div>
  )
}

// 6. CloudPulse Visualizer
function CloudPulseVisualizer({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full bg-black/40 flex items-center justify-center p-3 overflow-hidden relative">
      <div className="w-full max-w-[240px] h-[100px] border border-white/10 bg-black/80 rounded-xl p-3 flex flex-col justify-between font-mono relative overflow-hidden shadow-lg shadow-black/50">
        <div className="flex justify-between items-center text-[7px] text-white/40">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEMS NOMINAL
          </span>
          <span>99.9% UPTIME</span>
        </div>

        <div className="w-full h-6 flex items-end justify-between gap-1 mt-1">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: isHovered 
                  ? [8, 22, 12, 18, 8][i % 5] 
                  : [6, 14, 10, 12, 6][i % 5]
              }}
              transition={{
                repeat: Infinity,
                duration: isHovered ? 1 : 1.8,
                delay: i * 0.06,
                ease: 'easeInOut'
              }}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-emerald-400"
            />
          ))}
        </div>

        <div className="flex justify-between text-[6px] text-white/40 pt-1 border-t border-white/5">
          <span>LATENCY: 42ms</span>
          <span>REQS: 12.4k/s</span>
        </div>
      </div>
    </div>
  )
}

// Noteworthy Projects Local Data Config
const NOTEWORTHY_PROJECTS = [
  {
    id: 'agentbench',
    title: 'AgentBench',
    subtitle: 'LLM Evaluation Suite',
    description: 'A full-stack LLM evaluation platform for side-by-side benchmarking of models (Gemini, Llama, Mixtral) with automated scoring and latency tracking.',
    tech: ['TypeScript', 'Python', 'FastAPI', 'MLflow', 'LangChain'],
    githubUrl: 'https://github.com/kh-bikash/agentbench',
    defaultStars: 12,
    defaultForks: 2,
    Visualizer: AgentBenchVisualizer
  },
  {
    id: 'MonsoonRelief-OpenEnv',
    title: 'MonsoonRelief RL',
    subtitle: 'Disaster Response Gym',
    description: 'An OpenEnv-compliant reinforcement learning simulation simulating multi-objective disaster response missions with dynamic scalar reward models.',
    tech: ['Python', 'RL Gym', 'Pydantic', 'Docker', 'FastAPI'],
    githubUrl: 'https://github.com/kh-bikash/MonsoonRelief-OpenEnv',
    defaultStars: 8,
    defaultForks: 1,
    Visualizer: MonsoonReliefVisualizer
  },
  {
    id: 'LegalEase-AI',
    title: 'LegalEase AI',
    subtitle: 'AI Document Summarizer',
    description: 'Generative AI assistant designed to demystify complex legal documents, featuring key terms extraction, semantic summarization, and interactive QA.',
    tech: ['Python', 'HuggingFace', 'FastAPI', 'LangChain'],
    githubUrl: 'https://github.com/kh-bikash/LegalEase-AI',
    defaultStars: 7,
    defaultForks: 0,
    Visualizer: LegalEaseVisualizer
  },
  {
    id: 'self-healing-engine',
    title: 'Self-Healing Engine',
    subtitle: 'Autonomous Code Repair',
    description: 'An agentic developer loop that detects compilation errors, parses compiler tracebacks, and executes autonomous self-repair operations.',
    tech: ['Python', 'LLM Agents', 'Git', 'Docker'],
    githubUrl: 'https://github.com/kh-bikash/self-healing-engine',
    defaultStars: 9,
    defaultForks: 1,
    Visualizer: SelfHealingVisualizer
  },
  {
    id: 'algogenesis-3d',
    title: 'Algogenesis 3D',
    subtitle: 'Neural Simulation Engine',
    description: 'An interactive 3D web-simulator visualizing neural network weights, backpropagation pathways, and algorithmic data flow graph arrays.',
    tech: ['Python', 'Three.js', 'WebGL', 'Pygame'],
    githubUrl: 'https://github.com/kh-bikash/algogenesis-3d',
    defaultStars: 11,
    defaultForks: 3,
    Visualizer: AlgogenesisVisualizer
  },
  {
    id: 'CloudPulse',
    title: 'CloudPulse',
    subtitle: 'Serverless Metrics Tracker',
    description: 'A lightweight serverless monitoring telemetry dashboard tracking request rates, processing latency, and infrastructure uptime.',
    tech: ['Python', 'Prometheus', 'AWS Lambda', 'React'],
    githubUrl: 'https://github.com/kh-bikash/CloudPulse',
    defaultStars: 6,
    defaultForks: 1,
    Visualizer: CloudPulseVisualizer
  }
]

export function GitHubSection() {
  const { ref, isInView } = useScrollReveal()
  const { projects, isLoading, fetchProjects } = useProjectStore()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Map and sync repository stars and forks with live values from GitHub store if fetched
  const displayProjects = NOTEWORTHY_PROJECTS.map(repo => {
    const apiRepo = projects.find(p => p.id.toLowerCase() === repo.id.toLowerCase())
    return {
      ...repo,
      stars: apiRepo ? apiRepo.stars : repo.defaultStars,
      forksCount: apiRepo ? apiRepo.forksCount : repo.defaultForks,
    }
  })

  return (
    <section id="github" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Open Source Archive
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Other <span className="text-gradient-bio">Noteworthy Projects.</span>
        </motion.h2>

        {isLoading && displayProjects.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--accent-red)] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((repo, index) => {
              const Visualizer = repo.Visualizer
              const isHovered = hoveredIdx === index

              return (
                <motion.a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={repo.id}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={revealVariants.fadeUp}
                  transition={{ ...defaultTransition, delay: 0.2 + (index * 0.08) }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="glass-card rounded-2xl flex flex-col h-full group cursor-pointer relative overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 shadow-xl"
                  style={{ minHeight: '380px' }}
                >
                  {/* Visualizer header slot (similar to featured showcase but scaled down for grid cards) */}
                  <div className="relative w-full h-32 bg-black/30 border-b border-white/5 overflow-hidden flex items-center justify-center">
                    <Visualizer isHovered={isHovered} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-red)] transition-colors duration-300">
                        {repo.title}
                      </h3>
                      <div className="text-[var(--text-muted)] group-hover:text-[var(--accent-red)] transition-colors transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed mb-6 flex-grow line-clamp-3">
                      {repo.description}
                    </p>

                    <div className="mt-auto">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {repo.tech.map(tech => (
                          <span key={tech} className="px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono rounded bg-white/5 text-white/60 border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--text-muted)] font-medium pt-3.5 border-t border-white/5">
                        <span className="flex items-center gap-1 hover:text-[var(--accent-gold)] transition-colors" title="Stars">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1 hover:text-[var(--accent-gold)] transition-colors" title="Forks">
                          <GitFork className="w-3.5 h-3.5 text-blue-400" />
                          {repo.forksCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        )}

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/kh-bikash"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline py-3 px-8 text-sm font-mono flex items-center gap-2 hover:bg-white hover:text-black transition-colors rounded-full"
          >
            <Github className="w-4 h-4" />
            <span>View Full Archive on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

