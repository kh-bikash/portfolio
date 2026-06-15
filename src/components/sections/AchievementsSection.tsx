"use client"

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { Award, Code2, Trophy, Cpu, BookOpen, GraduationCap, X, ExternalLink } from 'lucide-react'

const ACHIEVEMENTS = [
  {
    icon: Code2,
    title: 'DSA Problems',
    value: '700+',
    label: 'Problems Solved',
    description: 'Solved over 700 data structures and algorithms problems across competitive platforms.',
    color: '#4ade80',
  },
  {
    icon: Trophy,
    title: 'CodeChef Rating',
    value: '4★',
    label: 'Star Rating',
    description: 'CodeChef 4-star rating demonstrating strong algorithmic problem-solving abilities.',
    color: '#f59e0b',
  },
  {
    icon: BookOpen,
    title: 'ReflexCube Research',
    value: '1',
    label: 'Architecture Paper',
    description: 'Detailed research work and engineering design on ReflexCube multi-agent visual compiler.',
    color: '#38bdf8',
  },
  {
    icon: Cpu,
    title: 'AI Systems Deployed',
    value: '5+',
    label: 'Built & Deployed',
    description: 'Designed and deployed 5+ end-to-end AI applications, agent systems, and pipelines.',
    color: '#86efac',
  },
  {
    icon: GraduationCap,
    title: 'Academic Performance',
    value: '9.32',
    label: 'Cumulative CGPA',
    description: 'Undergraduate study in Software Engineering with consistent top-tier results.',
    color: '#4ade80',
  },
]

const CERTIFICATIONS = [
  { 
    name: 'SAP Generative AI Developer', 
    org: 'SAP', 
    year: '2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    certImage: '/certificates/sap-cert.jpg',
    color: '#008fd3'
  },
  { 
    name: 'OCI Architect Associate', 
    org: 'Oracle', 
    year: '2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    certImage: '/certificates/oracle-cert.png',
    color: '#f01414'
  },
  { 
    name: 'Salesforce AI Associate', 
    org: 'Salesforce', 
    year: '2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    certImage: '/certificates/salesforce-cert.png',
    color: '#00a1e0'
  },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const displayRef = useRef<HTMLSpanElement>(null)
  const { ref, isInView } = useScrollReveal({ margin: '-40px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 2, ease: [0.16, 1, 0.3, 1] })
      return controls.stop
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = v.toString() + suffix
    })
    return unsubscribe
  }, [rounded, suffix])

  return (
    <div ref={ref}>
      <span ref={displayRef} className="text-3xl md:text-4xl font-heading font-bold">
        0{suffix}
      </span>
    </div>
  )
}

export function AchievementsSection() {
  const { ref, isInView } = useScrollReveal()
  const [selectedCert, setSelectedCert] = useState<string | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [hoveredCertIdx, setHoveredCertIdx] = useState<number | null>(null)

  return (
    <section id="achievements" className="relative w-full py-28 md:py-36 px-6 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.03) 0%, transparent 70%)' }}
      />
      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Achievements & Certifications
        </motion.div>

        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-16"
        >
          Proven <span className="text-gradient-gold">track record.</span>
        </motion.h2>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {ACHIEVEMENTS.map((achievement, i) => {
            const Icon = achievement.icon
            const numericValue = parseFloat(achievement.value.replace(/[^0-9.]/g, ''))
            const suffix = achievement.value.replace(/[0-9.]/g, '')
            const isHovered = hoveredIdx === i

            return (
              <motion.div
                key={achievement.title}
                initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                variants={revealVariants.fadeUp}
                transition={{ ...defaultTransition, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-card rounded-2xl p-6 text-center group transition-all duration-300 border border-white/5"
                style={{
                  borderColor: isHovered ? achievement.color : 'rgba(255,255,255,0.06)',
                  boxShadow: isHovered ? `0 15px 35px -10px ${achievement.color}40` : 'none',
                }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${achievement.color}12` }}
                  animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-5 h-5" style={{ color: achievement.color }} />
                </motion.div>

                <div style={{ color: achievement.color }}>
                  <AnimatedCounter value={numericValue} suffix={suffix} />
                </div>

                <div
                  className="text-xs font-mono font-medium tracking-[0.15em] uppercase mt-1 mb-3"
                  style={{ color: achievement.color, opacity: 0.8 }}
                >
                  {achievement.label}
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.6 }}
        >
          <h3
            className="text-sm font-mono font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6 flex items-center gap-2"
          >
            <Award className="w-4 h-4" style={{ color: '#f59e0b' }} />
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, i) => {
              const isHovered = hoveredCertIdx === i
              return (
                <motion.div
                  key={cert.name}
                  initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                  variants={revealVariants.fadeUp}
                  transition={{ ...defaultTransition, delay: 0.7 + i * 0.1 }}
                  onClick={() => setSelectedCert(cert.name)}
                  onMouseEnter={() => setHoveredCertIdx(i)}
                  onMouseLeave={() => setHoveredCertIdx(null)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card rounded-xl p-5 group cursor-pointer transition-all duration-300 relative overflow-hidden border border-white/5"
                  style={{
                    borderColor: isHovered ? cert.color : 'rgba(255,255,255,0.06)',
                    boxShadow: isHovered ? `0 15px 35px -10px ${cert.color}40` : 'none',
                  }}
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white/50" />
                  </div>
                  
                  <div className="h-10 mb-6 flex items-center justify-start">
                      <motion.img 
                          src={cert.logo} 
                          alt={`${cert.org} logo`} 
                          className="max-h-full max-w-[100px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                          animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
                      />
                  </div>

                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1 group-hover:text-white transition-colors">
                    {cert.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <span>{cert.org}</span>
                    <span>·</span>
                    <span>{cert.year}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
                <span className="text-white/80 font-mono text-sm tracking-widest uppercase ml-2 pointer-events-auto">
                    {selectedCert}
                </span>
                <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2.5 bg-black/50 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors pointer-events-auto backdrop-blur-sm"
                >
                    <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#0a0a0a]">
                <img 
                    src={CERTIFICATIONS.find(c => c.name === selectedCert)?.certImage} 
                    alt={`${selectedCert} Certificate`}
                    className="w-full h-auto max-h-[85vh] object-contain"
                    onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('placehold.co')) return; // Prevent infinite loop
                    target.src = `https://placehold.co/1200x800/111/fff?text=Certificate+Not+Found%5CnPlease+upload+${CERTIFICATIONS.find(c => c.name === selectedCert)?.certImage.split('/').pop()}+to+public/certificates/`
                    }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
