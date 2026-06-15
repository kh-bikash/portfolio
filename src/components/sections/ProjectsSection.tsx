"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowRight, Hand, ThumbsUp } from 'lucide-react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { useState, useEffect } from 'react'
import { ReflexCubeDetail } from '@/components/sections/ReflexCubeDetail'

// Live Animated UI for ReflexCube Light Mode
function ReflexCubeLiveUI() {
  const text = "Build an AI agent that searches my database..."
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i))
      i++
      if (i > text.length + 20) {
        i = 0
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-[#E8E8ED] flex items-center justify-center p-4 sm:p-8 overflow-hidden pointer-events-none">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-[280px] sm:max-w-xs aspect-[4/5] bg-[#F5F5F7] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col items-center pt-6"
      >
        {/* Search Pill */}
        <div className="relative z-20 w-[85%] h-10 sm:h-12 bg-[#EBEBEF] border border-white rounded-full flex items-center px-4 shadow-[inset_0_2px_5px_rgba(0,0,0,0.05),0_5px_15px_rgba(0,0,0,0.05)]">
            <span className="text-gray-500 font-medium text-[10px] sm:text-xs font-sans tracking-wide flex items-center truncate">
                {displayText}
                <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-3 sm:h-4 bg-blue-500 ml-1"
                />
            </span>
        </div>

        {/* Fluid Abstract Generation */}
        <div className="absolute inset-0 z-10 flex items-center justify-center mt-12 opacity-80 mix-blend-multiply">
            <motion.div 
                animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    borderRadius: ["40%", "60%", "30%", "50%", "40%"]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-gradient-to-tr from-blue-300 via-purple-300 to-cyan-200 blur-2xl"
            />
             <motion.div 
                animate={{ 
                    rotate: [360, 270, 180, 90, 0],
                    scale: [0.9, 1.1, 1, 1.2, 0.9],
                    borderRadius: ["50%", "30%", "60%", "40%", "50%"]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-gradient-to-br from-indigo-200 via-pink-200 to-sky-200 blur-xl mix-blend-overlay"
            />
        </div>

        {/* Generated UI Blocks */}
        <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-end pb-6 gap-3 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={displayText.length > 15 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-12 sm:h-14 bg-white/60 backdrop-blur-xl border border-white rounded-2xl shadow-sm flex items-center px-3"
            >
                <div className="w-6 h-6 rounded-full bg-blue-100" />
                <div className="ml-3 flex-1 space-y-1.5">
                    <div className="w-2/3 h-1.5 bg-gray-200 rounded-full" />
                    <div className="w-1/3 h-1.5 bg-gray-100 rounded-full" />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={displayText.length > 25 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-12 sm:h-14 bg-white/60 backdrop-blur-xl border border-white rounded-2xl shadow-sm flex items-center px-3"
            >
                <div className="w-6 h-6 rounded-full bg-purple-100" />
                <div className="ml-3 flex-1 space-y-1.5">
                    <div className="w-1/2 h-1.5 bg-gray-200 rounded-full" />
                    <div className="w-3/4 h-1.5 bg-gray-100 rounded-full" />
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Live Animated UI for CreditWise
function CreditWiseLiveUI() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#E8E8ED] flex items-center justify-center p-4 sm:p-8 overflow-hidden pointer-events-none">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-[280px] sm:max-w-xs aspect-[4/5] bg-[#F5F5F7] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col p-6"
      >
        {/* Soft Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-40">
           <motion.div 
               animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-emerald-200 to-teal-100 blur-3xl rounded-full"
           />
           <motion.div 
               animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
               transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-gradient-to-tr from-blue-200 to-cyan-100 blur-3xl rounded-full"
           />
        </div>

        {/* Header Pill */}
        <div className="relative z-10 w-full flex justify-between items-center mb-6">
            <div className="w-20 h-3 bg-gray-200 rounded-full shadow-inner" />
            <div className="w-8 h-3 bg-emerald-100 border border-emerald-200 rounded-full shadow-sm" />
        </div>

        {/* Elegant SVG Line Chart */}
        <div className="relative z-10 w-full h-32 mt-4 flex items-center justify-center">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
                {/* Grid Lines */}
                <line x1="0" y1="25" x2="100" y2="25" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 2" />
                
                {/* Gradient Fill under line */}
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 0 50 C 20 50, 30 20, 50 25 C 70 30, 80 10, 100 5"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* Animated Line */}
                <motion.path
                    d="M 0 50 C 20 50, 30 20, 50 25 C 70 30, 80 10, 100 5"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* Moving Dot */}
                <motion.circle 
                    r="2" fill="#10B981" stroke="#fff" strokeWidth="1"
                    initial={{ cx: 0, cy: 50 }}
                    animate={{ cx: [0, 50, 100], cy: [50, 25, 5] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
            </svg>
        </div>

        {/* Minimalist Data Cards */}
        <div className="relative z-10 mt-auto flex gap-3">
            <div className="flex-1 bg-white/60 backdrop-blur-md border border-white rounded-2xl p-3 shadow-sm flex flex-col justify-center">
                <div className="w-10 h-1.5 bg-gray-200 rounded-full mb-2" />
                <div className="w-16 h-2 bg-gray-800 rounded-full" />
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-md border border-white rounded-2xl p-3 shadow-sm flex flex-col justify-center">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-2" />
                <div className="w-14 h-2 bg-gray-800 rounded-full" />
            </div>
        </div>
      </motion.div>
    </div>
  )
}

// Live Animated UI for Sign Language Detection
function SignLangLiveUI() {
  const [gestureIdx, setGestureIdx] = useState(0)
  const gestures = [
      { id: 'hello', text: 'Hello', Icon: Hand, color: 'bg-blue-400' },
      { id: 'good', text: 'Good', Icon: ThumbsUp, color: 'bg-emerald-400' }
  ]

  useEffect(() => {
      const interval = setInterval(() => {
          setGestureIdx(prev => (prev + 1) % gestures.length)
      }, 3000)
      return () => clearInterval(interval)
  }, [])

  const currentGesture = gestures[gestureIdx]
  const Icon = currentGesture.Icon

  return (
    <div className="absolute inset-0 w-full h-full bg-[#E8E8ED] flex items-center justify-center p-4 sm:p-8 overflow-hidden pointer-events-none">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-[280px] sm:max-w-xs aspect-[4/5] bg-[#F5F5F7] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col items-center justify-center pt-4"
      >
        
        {/* Soft abstract shape background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
            <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 bg-gradient-to-t from-gray-300 to-gray-100 rounded-full blur-2xl"
            />
        </div>

        {/* The Animated Hand Icon */}
        <div className="relative z-10 w-full h-32 flex items-center justify-center mb-12 mt-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentGesture.id}
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-400 drop-shadow-md"
                >
                    <Icon strokeWidth={1.5} className="w-24 h-24" />
                </motion.div>
            </AnimatePresence>

            {/* Elegant tracking reticle around the hand */}
            <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 z-20 pointer-events-none"
            >
                <div className="absolute inset-0 border border-gray-300/80 rounded-[2rem] shadow-sm" />
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-white" />
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-white" />
                <div className="absolute left-0 top-8 bottom-8 w-[1px] bg-white" />
                <div className="absolute right-0 top-8 bottom-8 w-[1px] bg-white" />

                {/* Status Dot */}
                <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`w-3 h-3 rounded-full absolute -top-1 -right-1 border-2 border-[#F5F5F7] ${currentGesture.color}`}
                />
            </motion.div>
        </div>

        {/* Top Status */}
        <div className="absolute top-5 left-6 right-6 flex justify-between items-center z-20">
            <div className="w-12 h-2 bg-gray-200 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
        </div>

        {/* Translation Output Pill */}
        <div className="absolute bottom-8 z-20 w-full flex flex-col items-center justify-end">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`pill-${currentGesture.id}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-3 bg-white/80 backdrop-blur-xl border border-white shadow-lg rounded-full flex items-center gap-3"
                >
                    <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${currentGesture.color}`} />
                    </div>
                    <span className="text-gray-700 text-sm font-semibold tracking-wide">"{currentGesture.text}"</span>
                </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>
    </div>
  )
}

const FEATURED_PROJECTS = [
  {
    title: 'ReflexCube',
    subtitle: 'No-Code AI Platform',
    problem: 'Organizations struggle to build, scale, and integrate custom AI agents and RAG pipelines without deep coding knowledge.',
    solution: 'A visual AI development platform combining agent builders, dynamic workflow builders, semantic search, dataset management, and scaling systems.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'ChromaDB', 'Docker'],
    github: 'https://github.com/kh-bikash/Reflex-Cube',
    image: '/projects/reflexcube_dashboard.png',
  },
  {
    title: 'CreditWise',
    subtitle: 'Loan Prediction System',
    problem: 'Financial institutions need accurate, real-time analytics to forecast loan default risks and manage portfolios.',
    solution: 'An automated machine learning pipeline featuring feature engineering and ensemble models to predict creditworthiness.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    github: 'https://github.com/kh-bikash/CreditWiseLoan',
    image: '/projects/creditwise_analytics.png',
  },
  {
    title: 'Sign Language Detection',
    subtitle: 'Real-time CNN System',
    problem: 'Hearing-impaired users require fast, accessible, real-time gesture translation interfaces for daily communication.',
    solution: 'A computer vision pipeline using Convolutional Neural Networks (CNNs) for real-time sign language detection.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'CNN'],
    github: 'https://github.com/kh-bikash/sign_lang_detector',
    image: '/projects/signlang_cv.png',
  },
]

// Separate component for each alternating block so useScrollReveal gets its own hook invocation.
function ProjectShowcaseBlock({ project, isEven, onDeepDive }: { project: typeof FEATURED_PROJECTS[0], isEven: boolean, onDeepDive?: () => void }) {
  const { ref, isInView } = useScrollReveal({ margin: '-100px' })

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="w-full max-w-7xl mx-auto px-6 md:px-12"
    >
      <div className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        
        {/* Text Content */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase border border-white/20 text-white/80">
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            {project.title}
          </h3>
          
          <p className="text-lg md:text-xl font-sans text-white/60 leading-relaxed mb-10 font-light">
            <strong className="text-white font-medium block mb-2">{project.problem}</strong>
            {project.solution}
          </p>

          <div className="flex items-center gap-6">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
            
            {onDeepDive && (
              <button 
                onClick={onDeepDive}
                className="text-white/60 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors border-b border-transparent hover:border-white pb-0.5"
              >
                Deep Dive Case Study
              </button>
            )}
          </div>
        </div>

        {/* Image Showcase */}
        <div className="flex-1 w-full" style={{ perspective: '1000px' }}>
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.95, rotateY: isEven ? 5 : -5 },
              visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
            }}
            className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 group shadow-2xl"
          >
            {project.title === 'ReflexCube' ? (
                <ReflexCubeLiveUI />
            ) : project.title === 'CreditWise' ? (
                <CreditWiseLiveUI />
            ) : project.title === 'Sign Language Detection' ? (
                <SignLangLiveUI />
            ) : (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}


export function ProjectsSection() {
  const { ref: headerRef, isInView: isHeaderInView } = useScrollReveal({ margin: '-80px' })
  const [isReflexCubeOpen, setIsReflexCubeOpen] = useState(false)

  return (
    <section id="projects" className="relative w-full bg-[var(--bg-primary)] py-32 md:py-48 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-40 relative z-10">
        <motion.div
          ref={headerRef}
          initial="hidden" animate={isHeaderInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={defaultTransition}
        >
          <span className="font-serif text-sm tracking-[0.5em] text-white/60 mb-4 block uppercase">
            System Archives
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter">
            Featured Works.
          </h2>
        </motion.div>
      </div>

      {/* Alternating Projects List */}
      <div className="flex flex-col gap-32 md:gap-48">
        {FEATURED_PROJECTS.map((project, idx) => (
          <ProjectShowcaseBlock 
            key={project.title} 
            project={project} 
            isEven={idx % 2 === 0} 
            onDeepDive={project.title === 'ReflexCube' ? () => setIsReflexCubeOpen(true) : undefined}
          />
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="mt-32 md:mt-48 flex justify-center px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          variants={revealVariants.fadeUp} transition={defaultTransition}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 mx-auto">
            <ArrowRight className="w-6 h-6 text-white/60" />
          </div>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Explore the Full Archive
          </h3>
          <button 
            onClick={() => window.location.hash = '#/projects'}
            className="mt-6 px-10 py-5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white transition-all hover:text-black shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            Open Projects Directory
          </button>
        </motion.div>
      </div>

      <ReflexCubeDetail isOpen={isReflexCubeOpen} onClose={() => setIsReflexCubeOpen(false)} />
    </section>
  )
}
