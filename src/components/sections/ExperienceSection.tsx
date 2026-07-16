"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'
import { ArrowUpRight, Pin, Sparkles, TrendingUp, Eye, BarChart3, Search, GraduationCap, Briefcase, Rocket, Activity, Award, Repeat } from 'lucide-react'

// ── Profile ──
const PROFILE = {
  name: 'Khundrakpam Bikash Meitei',
  pronouns: 'He/Him',
  headline: 'AI & Backend Engineer — Building scalable AI systems, distributed backends & LLM-powered platforms | Python · FastAPI · React · Docker | Open to SWE & AI/ML Internships',
  location: 'Imphal, Manipur, India',
  connections: '500+',
  followers: '1,053',
}
export { PROFILE }

// ── 3 Experience entries from LinkedIn ──
const ROLES = [
  {
    id: 'bfai',
    role: 'Artificial Intelligence Engineer',
    company: 'Build Fast with AI',
    type: 'Internship',
    period: 'Jun 2026 — Present',
    duration: '2 mos',
    location: 'Bengaluru, Karnataka, India · Remote',
    status: 'active' as const,
    order: '01',
    headline: "ISN'T JUST AN INTERNSHIP.",
    points: [
      'Architected LLM-powered solutions to automate workflows and enhance business productivity for diverse clients.',
      'Developed AI agents that streamline operations and deliver scalable solutions tailored to client needs.',
      'Built scalable SaaS platforms, enabling businesses to efficiently manage their processes and improve overall performance.',
    ],
    tech: ['LLM', 'AI Agents', 'SaaS', 'Python', 'FastAPI', 'Workflow Automation'],
  },
  {
    id: 'botpoint',
    role: 'Artificial Intelligence Intern',
    company: 'Bot Point',
    type: 'Internship',
    period: 'May 2026 — Jun 2026',
    duration: '2 mos',
    location: 'Remote',
    status: 'past' as const,
    order: '02',
    headline: "WAS THE FIRST STEP.",
    points: [
      'Design and implement machine learning models, analyze data, and assist in building AI-driven applications.',
    ],
    tech: ['Machine Learning', 'Data Analysis', 'AI Applications'],
  },
  {
    id: 'reflexcube',
    role: 'Founder',
    company: 'ReflexCube',
    type: 'Self-employed',
    period: 'Jan 2025 — May 2026',
    duration: '1 yr 5 mos',
    location: 'India · On-site',
    status: 'founder' as const,
    order: '03',
    headline: "ISN'T JUST A STARTUP.",
    points: [
      'Building an AI-driven platform focused on intelligent automation, modular LLM workflows, and scalable backend infrastructure.',
      'Designed backend systems using Python, FastAPI, PostgreSQL, and API-driven architectures to support AI-powered applications and automation pipelines.',
      'Developed production-style AI systems including RAG pipelines, NLP-based workflow generation, and scalable REST APIs.',
      'Built and experimented with distributed architectures, asynchronous processing, Dockerized deployments, and cloud-ready services.',
      'Led product ideation, system architecture, and technical implementation across multiple AI and backend engineering projects.',
      'Exploring practical applications of LLMs, AI orchestration, and intelligent automation for real-world engineering workflows.',
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'RAG', 'NLP', 'LLM Orchestration', 'REST APIs', 'Cloud'],
  },
]

const EDUCATION = {
  school: 'KL University',
  degree: 'Bachelor of Technology — BTech, Computer Software Engineering',
  period: 'Aug 2023 — May 2027',
  grade: '9.4',
  headline: "ISN'T JUST A DEGREE.",
  body:
    'Computer Science Engineering student focused on AI/ML systems and backend development. Active member of the Startup Society, contributing to product innovation and entrepreneurial initiatives. Currently building an AI-based startup focused on intelligent automation and real-world problem solving.',
  activities: ['Startup Society Member', 'AI Startup Builder', 'FastAPI · React · Docker · PostgreSQL · LLMs'],
  stats: [
    { value: 9.4, label: 'CGPA', decimals: 1 },
    { value: 500, suffix: '+', label: 'Connections' },
    { value: 1053, suffix: '', label: 'Followers' },
  ],
}

const CERTIFICATIONS = [
  {
    id: 'sap-genai',
    name: 'Generative AI Developer',
    issuer: 'SAP',
    issued: 'Mar 2026',
    expires: 'Mar 2027',
    skills: ['Generative AI Hub', 'Prompt Engineering', 'LLM Evaluation', 'AI Orchestration'],
    featured: true,
  },
  {
    id: 'sas-bitathon',
    name: 'Bitathon',
    issuer: 'SAS',
    issued: 'Mar 2026',
    expires: null,
    skills: [],
    featured: false,
  },
]

const FEATURED = [
  {
    id: 'resume',
    type: 'Media',
    title: 'My Resume',
    description: 'Full CV — AI & Backend Engineer, open to SWE & AI/ML internships.',
    href: '/Khundrakpam_Bikash_Meitei_Resume.pdf',
    cta: 'Open PDF',
  },
  {
    id: 'reflexcube',
    type: 'Research Paper',
    title: 'ReflexCube: NLP-Driven AI Model Generation',
    description: 'A no-code AI platform enabling users to build, deploy, and manage AI and LLM-powered applications through guided workflows.',
    href: '#/projects',
    cta: 'View Project',
  },
  {
    id: 'portfolio',
    type: 'Link',
    title: 'Personal Portfolio — Bikash Kh',
    description: 'khbikashportfolio.vercel.app — the live portfolio.',
    href: 'https://khbikashportfolio.vercel.app',
    cta: 'Visit',
  },
]

const ANALYTICS = [
  { value: 120, label: 'Profile Views', sub: 'Past 7 days', icon: Eye },
  { value: 143, label: 'Post Impressions', sub: 'Past 7 days', icon: BarChart3 },
  { value: 17, label: 'Search Appearances', sub: 'Past 7 days', icon: Search },
]

// ── All 10 posts from LinkedIn activity ──
const POSTS = [
  {
    id: 'octosense',
    period: '1W',
    isRepost: true,
    author: 'Nicolai Nielsen',
    title: 'SELF-SUPERVISED LEARNING FOR MULTIMODAL ROBOT PERCEPTION',
    body:
      'OctoSense — one platform, eight sensors, one clock, synchronized multimodal driving across day, night, and degraded conditions. Aligns all sensors to a single timeline using PPS time-sync hardware. Native rates produce ~1.7 GB/s; on-board compression cuts that 21× to 78.7 MB/s with no dropped data.',
    metric: '2,078 reactions · 38 comments · 111 reposts',
    tags: ['Robotics', 'Self-Supervised', 'Multimodal'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'confident-person',
    period: '6D',
    isRepost: false,
    author: null,
    title: 'CONFIDENCE IS NOT THE PRICE OF ADMISSION',
    body:
      'The most confident person in the room usually isn\'t the smartest. They are just the most comfortable being wrong out loud. I used to stay quiet in meetings until I was 100% sure. Then I noticed the people getting ahead weren\'t smarter than me — they just spoke at 70% certainty and figured out the other 30% in the conversation.',
    metric: '5 reactions · 136 impressions',
    tags: ['Mindset', 'Career', 'Growth'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'fable-5',
    period: '1W',
    isRepost: false,
    author: null,
    title: 'THE NEXT FEW YEARS ARE GOING TO BE WILD · FABLE 5',
    body:
      'Fable 5 — the most powerful LLM is now available again on Claude. Banned by US Govt on June 12 because it is too powerful for public access. Now back with enhanced guardrails. One of the best models I have used especially for design and coding. It solves the design problems which all LLMs have.',
    metric: '2 reactions · 96 impressions',
    tags: ['AI', 'GenerativeAI', 'LLM', 'Fable 5'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'gemini-computer-use',
    period: '2W',
    isRepost: false,
    author: null,
    title: 'AGENTS THAT USE A SCREEN',
    body:
      'Gemini 3.5 Flash computer use: give your agent a screen and a goal, it figures out the actions. Supports browser, mobile, and desktop with integrated safeguards, user confirmation, auto-stop on prompt injection, and additional training against prompt injection.',
    metric: '2 reactions · 109 impressions',
    tags: ['Agentic AI', 'Gemini', 'Automation', 'DeepMind'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'face-machine',
    period: '2W',
    isRepost: false,
    author: null,
    title: 'A FACE, TO A MACHINE',
    body:
      '225, 59, 3, 46, 17, 42… × 40 billion. No face. No person. Just numbers and a label. That is image classification.',
    metric: '8 reactions · 486 impressions',
    tags: ['Machine Learning', 'Computer Vision', 'AI'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'magica',
    period: '2W',
    isRepost: true,
    author: 'Magica',
    title: 'MAGICA — YOUR AI SUPER AGENT',
    body:
      'You don\'t need to know which AI model creates the best content. Your AI super agent already does — and it handles everything from prompt to polished output, automatically. No learning curve. No tool-hopping. Just done.',
    metric: '12 reactions · 6 reposts',
    tags: ['AI', 'Agents', 'SaaS'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'pr-review-me',
    period: '2W',
    isRepost: false,
    author: null,
    title: 'SHIPPED: PR-REVIEW-ME',
    body:
      'Just shipped my first open-source Python package. Built with LangGraph to spin up 3 parallel AI agents (Security, Performance, Code Quality) that analyze your code concurrently and deliver specialized feedback in seconds right to your terminal. pip install pr-review-me.',
    metric: '11 reactions · 2 comments · 657 impressions',
    tags: ['Python', 'LangGraph', 'Open Source', 'AI'],
    href: 'https://github.com/kh-bikash',
  },
  {
    id: 'ubersim',
    period: '3W',
    isRepost: false,
    author: null,
    title: 'UBERSIM — RIDE-SHARING MARKETPLACE',
    body:
      'Built a production-grade simulation of the core systems that power ride-sharing. Demand forecasting (R² = 0.89), multi-objective dynamic pricing with fairness constraint (Gini ≤ 0.15), and Hungarian-algorithm real-time matching. Result: +39.4% revenue uplift vs. flat pricing — without pricing out neighborhoods.',
    metric: '7 reactions · 207 impressions',
    tags: ['Machine Learning', 'Optimization', 'Streamlit', 'Uber'],
    href: 'https://github.com/kh-bikash',
  },
  {
    id: 'lost-in-middle',
    period: '3W',
    isRepost: false,
    author: null,
    title: 'BIGGER CONTEXT ≠ BETTER MEMORY',
    body:
      'A 1M-token LLM can still miss a single important fact buried in the middle. "Lost in the Middle" is a structural limitation, not a training problem. Long context is a memory problem (KV cache), not a compute problem. Attention routes information. FFNs store knowledge.',
    metric: '5 reactions · 131 impressions',
    tags: ['LLM', 'Transformers', 'RAG', 'Mamba'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
  {
    id: 'subquadratic',
    period: '3W',
    isRepost: false,
    author: null,
    title: 'EVERY AI AGENT HAS THE SAME HIDDEN PROBLEM',
    body:
      'Subquadratic\'s model SubQ uses SSA (Subquadratic Sparse Attention) — 12M token context, 52x faster than FlashAttention at 1M tokens, 97% on RULER-128K. If SSA scales, RAG, chunking, and multi-agent handoffs stop being features and start being workarounds we built around a broken architecture.',
    metric: '6 reactions · 1 comment · 200 impressions',
    tags: ['LLM', 'Attention', 'Agents', 'Architecture'],
    href: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  },
]

// ── Animated counter ──
function Counter({
  value, suffix = '', decimals = 0, duration = 1.6,
}: {
  value: number; suffix?: string; decimals?: number; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
          const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(v),
          })
          return () => controls.stop()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, started, duration])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString()

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}

// ── Scroll progress bar ──
function ScrollProgressBar({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  })
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--color-ember-accent), var(--color-warm-cream))',
      }}
    />
  )
}

// ── Magnetic hover card ──
function MagneticCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.06)
    y.set((e.clientY - cy) * 0.06)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Status icon per role type ──
function RoleIcon({ status }: { status: string }) {
  if (status === 'active') return <Sparkles className="w-7 h-7 text-[var(--color-warm-cream)] relative z-10" />
  if (status === 'founder') return <Rocket className="w-7 h-7 text-[var(--color-warm-cream)] relative z-10" />
  return <Briefcase className="w-7 h-7 text-[var(--color-warm-cream)] relative z-10" />
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, isInView } = useScrollReveal()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-12"
      style={{ background: 'var(--color-walnut-shadow)' }}
    >
      <ScrollProgressBar targetRef={sectionRef} />

      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(56, 36, 22, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* ── Section Header ── */}
      <div ref={ref} className="max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Experience
        </motion.div>

        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-4"
        >
          Professional <span className="text-[var(--color-ember-accent)]">journey.</span>
        </motion.h2>

        <motion.p
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.18 }}
          className="oryzo-body max-w-2xl mb-16"
          style={{ fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', lineHeight: 1.26 }}
        >
          Currently open to SWE &amp; AI/ML internships — India, on-site, hybrid, or remote. Volunteering interest in Arts &amp; Culture, Education, Human Rights, Science &amp; Technology.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         01–03 · ROLES — all three, scroll-reactive
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24 flex flex-col gap-28">
        {ROLES.map((role) => (
          <RoleReveal key={role.id} role={role} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         04 · EDUCATION — KL University
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24">
        <RevealHeader label="04 · Education" headline="ISN'T JUST A DEGREE." delay={0.1} />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ ...defaultTransition, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-[12px] uppercase font-medium text-[var(--text-secondary)]">{EDUCATION.period}</span>
            </div>
            <h3 className="oryzo-wordmark text-[28px] md:text-[34px] leading-[0.9] mb-2">KL UNIVERSITY</h3>
            <p className="text-[14px] uppercase font-medium text-[var(--text-secondary)] mb-2">{EDUCATION.degree}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {EDUCATION.activities.map((a, i) => (
                <motion.span
                  key={a}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ ...defaultTransition, delay: 0.3 + i * 0.06 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-1 text-[10px] uppercase font-medium"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-full)' }}
                >
                  {a}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Center — scroll-reactive degree badge */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...defaultTransition, delay: 0.25 }}
          >
            <div className="relative w-36 h-36 flex flex-col items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full" style={{ border: '1px dashed var(--color-cork-border)' }}
                animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-5 rounded-full" style={{ background: 'var(--color-bark-brown)' }} />
              <span className="oryzo-wordmark text-[22px] leading-none relative z-10">B.TECH</span>
              <span className="text-[10px] uppercase text-[var(--text-muted)] mt-2 relative z-10">CSE</span>
            </div>
          </motion.div>

          {/* Right — body + animated stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ ...defaultTransition, delay: 0.3 }}
            className="flex flex-col"
          >
            <p className="text-[var(--color-warm-cream)] mb-6" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', lineHeight: 1.26, fontWeight: 400, textTransform: 'none' }}>
              {EDUCATION.body}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {EDUCATION.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ ...defaultTransition, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'var(--color-warm-cream)' }}
                  className="text-center py-4 px-2" style={{ border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-cards)' }}
                >
                  <div className="oryzo-wordmark text-[20px] leading-none mb-1">
                    <Counter value={s.value} suffix={s.suffix || ''} decimals={s.decimals || 0} />
                  </div>
                  <div className="text-[9px] uppercase text-[var(--text-muted)]">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         05 · CERTIFICATIONS
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24">
        <RevealHeader label="05 · Certifications" headline="LICENSED &amp; CERTIFIED." delay={0.1} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ ...defaultTransition, delay: 0.15 + i * 0.12 }}
              whileHover={{ y: -6, borderColor: 'var(--color-warm-cream)' }}
              className="p-6" style={{ borderRadius: 'var(--radius-cards)', background: 'rgba(27, 17, 8, 0.5)', border: '1px solid var(--color-cork-border)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--color-bark-brown)' }}
                  whileHover={{ rotate: 15 }}
                  animate={c.featured ? { boxShadow: ['0 0 0px rgba(220,80,0,0)', '0 0 16px rgba(220,80,0,0.15)', '0 0 0px rgba(220,80,0,0)'] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Award className="w-4 h-4 text-[var(--color-warm-cream)]" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-[var(--text-muted)]">{c.issuer}</span>
                  {c.featured && <span className="text-[9px] uppercase text-[var(--color-ember-accent)]">Featured</span>}
                </div>
              </div>
              <h4 className="oryzo-wordmark text-[18px] leading-tight mb-3">{c.name}</h4>
              <div className="flex items-center gap-3 text-[11px] uppercase text-[var(--text-muted)] mb-4">
                <span>Issued {c.issued}</span>
                {c.expires && <><span className="opacity-40">·</span><span>Expires {c.expires}</span></>}
              </div>
              {c.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px dashed var(--color-cork-border)' }}>
                  {c.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-[10px] uppercase font-medium" style={{ color: 'var(--text-muted)', border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-full)' }}>{s}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: 0.5 }}
          className="mt-4 text-[11px] uppercase text-[var(--text-muted)] text-center"
        >
          + 5 more licenses &amp; certifications on LinkedIn
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         06 · FEATURED — magnetic hover cards
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24">
        <RevealHeader label="06 · Featured" headline="THINGS I'VE SHIPPED." delay={0.1} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {FEATURED.map((f, i) => (
            <MagneticCard key={f.id}>
              <motion.a
                href={f.href}
                target={f.href.startsWith('http') || f.href.endsWith('.pdf') ? '_blank' : undefined}
                rel="noopener noreferrer"
                download={f.href.endsWith('.pdf') ? 'Khundrakpam_Bikash_Meitei_Resume.pdf' : undefined}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ ...defaultTransition, delay: 0.15 + i * 0.1 }}
                whileHover={{ borderColor: 'var(--color-warm-cream)' }}
                className="group block p-6 h-full"
                style={{ borderRadius: 'var(--radius-cards)', background: 'rgba(27, 17, 8, 0.5)', border: '1px solid var(--color-cork-border)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] uppercase font-medium px-2.5 py-1" style={{ color: 'var(--color-ember-accent)', border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-full)' }}>{f.type}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] transition-colors group-hover:text-[var(--color-warm-cream)]" />
                </div>
                <h4 className="oryzo-wordmark text-[18px] leading-tight mb-3">{f.title}</h4>
                <p className="text-[13px] text-[var(--text-secondary)] mb-5" style={{ fontWeight: 400, textTransform: 'none', lineHeight: 1.55 }}>{f.description}</p>
                <div className="pt-4 text-[11px] uppercase font-medium text-[var(--color-warm-cream)] flex items-center gap-2" style={{ borderTop: '1px dashed var(--color-cork-border)' }}>
                  {f.cta}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
                </div>
              </motion.a>
            </MagneticCard>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         07 · ANALYTICS
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24">
        <RevealHeader label="07 · Analytics" headline="WHO'S LOOKING." delay={0.1} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {ANALYTICS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 28, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ ...defaultTransition, delay: 0.15 + i * 0.12 }}
              whileHover={{ y: -6, borderColor: 'var(--color-warm-cream)' }}
              className="p-6 flex items-center gap-4"
              style={{ borderRadius: 'var(--radius-cards)', background: 'rgba(27, 17, 8, 0.5)', border: '1px solid var(--color-cork-border)' }}
            >
              <motion.div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-bark-brown)' }}
                whileHover={{ rotate: 15 }}
                animate={{ boxShadow: ['0 0 0px rgba(255,237,215,0)', '0 0 16px rgba(255,237,215,0.08)', '0 0 0px rgba(255,237,215,0)'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                <a.icon className="w-4 h-4 text-[var(--color-warm-cream)]" />
              </motion.div>
              <div className="flex flex-col">
                <div className="oryzo-wordmark text-[28px] leading-none"><Counter value={a.value} /></div>
                <div className="text-[11px] uppercase text-[var(--text-secondary)] mt-1">{a.label}</div>
                <div className="text-[9px] uppercase text-[var(--text-muted)] mt-0.5">{a.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-20" /></div>

      {/* ═══════════════════════════════════════════════════
         08 · ACTIVITY — all 10 posts, scroll-reactive
         ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto mb-24">
        <RevealHeader label="08 · Activity" headline="THINGS I'M WRITING." delay={0.1} />

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ ...defaultTransition, delay: 0.2 }}
          className="flex items-center gap-3 mt-6 mb-10 text-[12px] uppercase font-medium text-[var(--text-muted)]"
        >
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Activity className="w-3.5 h-3.5 text-[var(--color-ember-accent)]" />
          </motion.span>
          1,053 followers · LinkedIn · Public
          <TrendingUp className="w-3.5 h-3.5" />
        </motion.div>

        <div className="flex flex-col gap-0">
          {POSTS.map((p) => (
            <PostRow key={p.id} post={p} />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto"><div className="section-divider mb-12" /></div>

      {/* Future marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="max-w-6xl mx-auto flex items-center justify-center gap-4 py-8"
      >
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ border: '1px dashed var(--color-cork-border)', background: 'var(--color-walnut-shadow)' }}
          animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <Pin className="w-4 h-4 text-[var(--text-muted)]" />
        </motion.div>
        <span className="text-[12px] uppercase font-medium text-[var(--text-muted)]">Your company could be next</span>
      </motion.div>
    </section>
  )
}

// ── Role Reveal — scroll-reactive three-column void-mode ──
function RoleReveal({ role }: { role: (typeof ROLES)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.1, 0.85])
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 120])
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const isActive = role.status === 'active'

  return (
    <div ref={ref} className="relative">
      <RevealHeader label={`${role.order} · ${role.type}`} headline={role.headline} delay={0.1} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-center mt-12">
        {/* Left — role title + period */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ ...defaultTransition, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-5">
            {isActive && (
              <motion.span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--color-ember-accent)' }}
                animate={{ boxShadow: ['0 0 8px var(--color-ember-accent)', '0 0 20px var(--color-ember-accent)', '0 0 8px var(--color-ember-accent)'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <span
              className="text-[12px] uppercase font-medium"
              style={{ color: isActive ? 'var(--color-ember-accent)' : 'var(--text-secondary)' }}
            >
              {isActive ? 'Active · Present' : role.period}
            </span>
            {role.status === 'founder' && <Rocket className="w-3.5 h-3.5 text-[var(--text-muted)]" />}
            {!isActive && role.status !== 'founder' && <Briefcase className="w-3.5 h-3.5 text-[var(--text-muted)]" />}
          </div>
          <h3 className="oryzo-wordmark text-[26px] md:text-[32px] leading-[0.9] mb-2">{role.role.toUpperCase()}</h3>
          <p className="text-[14px] uppercase font-medium text-[var(--text-secondary)] mb-1">{role.company}</p>
          <p className="text-[11px] uppercase text-[var(--text-muted)] mb-1">{role.location}</p>
          {isActive && <p className="text-[11px] uppercase text-[var(--text-muted)] mt-1">{role.period} · {role.duration}</p>}
          {!isActive && <p className="text-[11px] uppercase text-[var(--text-muted)] mt-1">{role.duration}</p>}
        </motion.div>

        {/* Center — scroll-reactive focal orb */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          style={{ scale: orbScale, rotate: orbRotate, y: orbY }}
        >
          <div className="relative w-36 h-36 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full" style={{ border: '1px dashed var(--color-cork-border)' }}
              animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-3 rounded-full" style={{ border: '1px solid var(--color-driftwood)', opacity: 0.4 }}
              animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-6 rounded-full" style={{ background: 'var(--color-bark-brown)' }} />
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-full" style={{ border: '1px solid var(--color-ember-accent)' }}
                animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <RoleIcon status={role.status} />
          </div>
        </motion.div>

        {/* Right — achievement points + tech */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ ...defaultTransition, delay: 0.3 }}
          className="flex flex-col"
        >
          <ul className="flex flex-col gap-3 mb-6">
            {role.points.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ ...defaultTransition, delay: 0.35 + i * 0.08 }}
                className="text-[var(--text-secondary)] flex gap-3"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', lineHeight: 1.5, fontWeight: 400, textTransform: 'none' }}
              >
                <span className="text-[var(--color-ember-accent)] mt-1 flex-shrink-0">—</span>
                {pt}
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {role.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ ...defaultTransition, delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.06, borderColor: 'var(--color-warm-cream)' }}
                className="px-3 py-1.5 text-[11px] uppercase font-medium cursor-default"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-full)' }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Post row — scroll-reactive, hover lift ──
function PostRow({ post }: { post: (typeof POSTS)[0] }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.a
      ref={ref}
      href={post.href}
      target={post.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{ x, opacity }}
      whileHover={{ scale: 1.01 }}
      transition={{ ...defaultTransition }}
      className="group grid grid-cols-[60px_1fr_auto] gap-4 md:gap-6 py-7 cursor-pointer"
    >
      <span className="text-[11px] uppercase font-medium text-[var(--text-muted)] pt-1">{post.period}</span>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          {post.isRepost && (
            <span className="flex items-center gap-1 text-[9px] uppercase font-medium text-[var(--color-ember-accent)]">
              <Repeat className="w-2.5 h-2.5" />
              Reposted · {post.author}
            </span>
          )}
        </div>
        <motion.h4 className="oryzo-wordmark text-[16px] md:text-[18px] leading-tight mb-2" whileHover={{ x: 4 }}>
          {post.title}
        </motion.h4>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] mb-3 max-w-2xl" style={{ fontWeight: 400, textTransform: 'none', lineHeight: 1.55 }}>
          {post.body}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="px-2.5 py-0.5 text-[10px] uppercase font-medium" style={{ color: 'var(--text-muted)', border: '1px solid var(--color-cork-border)', borderRadius: 'var(--radius-full)' }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-3 pt-1">
        <motion.div whileHover={{ x: 4, y: -4 }}>
          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] transition-colors group-hover:text-[var(--color-ember-accent)]" />
        </motion.div>
        <span className="text-[10px] uppercase text-[var(--text-muted)] text-right">{post.metric}</span>
      </div>

      <motion.div className="col-span-3 -mt-7" style={{ borderTop: '1px dashed var(--color-cork-border)' }} />
    </motion.a>
  )
}

// ── Reveal header ──
function RevealHeader({
  label, headline, delay = 0,
}: {
  label: string; headline: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ ...defaultTransition, delay }}
    >
      <div className="section-label mb-4">{label}</div>
      <h3 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>{headline}</h3>
    </motion.div>
  )
}
