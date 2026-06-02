"use client"

import { motion } from 'framer-motion'
import { X, Github, ExternalLink, ArrowUpRight, Cpu, Layers, Database, Compass, Terminal, Shield, Workflow } from 'lucide-react'
import { useEffect } from 'react'

interface ReflexCubeDetailProps {
  isOpen: boolean
  onClose: () => void
}

export function ReflexCubeDetail({ isOpen, onClose }: ReflexCubeDetailProps) {
  // Lock scroll when open
  useEffect(() => {
    const lenis = (window as any).lenis
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)] select-none cursor-default"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Decorative background effects */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[var(--accent-red-glow)] to-transparent pointer-events-none opacity-40 blur-[100px]" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-[var(--accent-gold-glow)] pointer-events-none opacity-30 blur-[120px]" />

      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--glass-border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-red)] to-[var(--accent-gold)] p-0.5 flex items-center justify-center shadow-glow-red">
            <span className="font-heading text-sm font-bold text-white">RC</span>
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold tracking-tight">ReflexCube</h1>
            <span className="text-[10px] font-mono tracking-wider text-[var(--accent-gold)] uppercase">Flagship AI Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kh-bikash/Reflex-Cube"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline py-1.5 px-3 text-xs flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Source</span>
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass glass-hover transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Breadcrumb & Label */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--text-muted)]">
          <span className="cursor-pointer hover:text-[var(--text-secondary)]" onClick={onClose}>Projects</span>
          <span>/</span>
          <span className="text-[var(--accent-red)]">ReflexCube</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="mb-6 flex flex-wrap gap-2">
            {['Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'ChromaDB', 'Docker'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs font-mono rounded-full bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
                {tech}
              </span>
            ))}
          </div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
            No-Code AI & LLM <br className="hidden md:inline" />
            <span className="text-gradient-red">Development Ecosystem.</span>
          </h2>

          <p className="text-lg md:text-xl font-sans text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
            ReflexCube is a next-generation platform designed to democratize AI agent creation, Retrieval-Augmented Generation (RAG) pipelines, and intelligent system integration. Build, deploy, and monitor scalable LLM services through visual, guided workflows.
          </p>

          {/* Banner Graphic */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden glass-card shadow-premium border border-[var(--glass-border)] mb-12">
            <img
              src="/projects/reflexcube_dashboard.png"
              alt="ReflexCube AI Dashboard Visual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Core Vision & Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 border border-[var(--glass-border)]">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
              <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">The Vision</h3>
            </div>
            <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
              To empower developers, researchers, and enterprises to build modular, production-grade AI agents and semantic search systems without writing boilerplate code. By shielding builders from complex API interfaces, distributed memory syncs, and prompt management layers, ReflexCube compresses development time from weeks to minutes.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-[var(--glass-border)]">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[var(--accent-red)]" />
              <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">Problem Statement</h3>
            </div>
            <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
              Deploying LLM applications in enterprise environments involves managing multiple APIs, vector databases, prompt versioning, agent memory, and evaluation pipelines. This complexity leads to fragmented development cycles, fragile orchestrations, slow inference APIs, and massive security and compliance bottlenecks.
            </p>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
            <Layers className="w-6 h-6 text-[var(--accent-red)]" />
            System Architecture
          </h3>
          <p className="text-sm font-sans text-[var(--text-muted)] max-w-2xl mb-8">
            A modular multi-tier architecture running containerized services with separate execution contexts for prompt evaluations, database storage, and agent runtime loops.
          </p>

          {/* SVG Architecture Diagram */}
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-[var(--glass-border)] overflow-x-auto bg-[var(--bg-secondary)]/50">
            <div className="min-w-[700px] flex flex-col items-center gap-8 py-4 font-mono text-xs">
              
              {/* Clients Layer */}
              <div className="flex justify-center gap-12 w-full">
                <div className="px-5 py-3 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-secondary)] flex flex-col items-center">
                  <span className="font-semibold">Web Client UI</span>
                  <span className="text-[10px] text-[var(--text-muted)]">No-Code Workspace</span>
                </div>
                <div className="px-5 py-3 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-secondary)] flex flex-col items-center">
                  <span className="font-semibold">REST API Client</span>
                  <span className="text-[10px] text-[var(--text-muted)]">External Integrations</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="h-6 w-[1px] bg-gradient-to-b from-[var(--accent-gold)] to-[var(--accent-red)]" />

              {/* Gateway / Server Layer */}
              <div className="px-6 py-4 rounded-xl border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5 text-center max-w-md w-full shadow-glow-red">
                <span className="font-semibold text-[var(--text-primary)] text-sm">FastAPI Application Gateway</span>
                <p className="text-[10px] text-[var(--text-secondary)] mt-1">Route Handling · Rate Limiting · JWT Auth · Async Task Spawning</p>
              </div>

              {/* Arrow splitter */}
              <div className="w-[80%] flex justify-between px-16">
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
              </div>

              {/* Engines Layer */}
              <div className="grid grid-cols-3 gap-6 w-full text-center">
                <div className="p-4 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-primary)]">
                  <span className="text-[var(--accent-gold)] font-semibold">Workflow Engine</span>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1">DAG Executor<br />State Automation</p>
                </div>
                <div className="p-4 rounded-lg border border-[var(--accent-red)]/20 bg-[var(--bg-primary)]">
                  <span className="text-[var(--accent-red)] font-semibold">Agentic Orchestrator</span>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1">Multi-Agent Loops<br />Tool Execution</p>
                </div>
                <div className="p-4 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-primary)]">
                  <span className="text-[#6E8C7D] font-semibold">RAG Pipeline</span>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1">ChromaDB Retrieval<br />Semantic Embeddings</p>
                </div>
              </div>

              {/* Arrow merger */}
              <div className="w-[80%] flex justify-between px-16">
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
                <div className="h-6 w-[1px] bg-[var(--glass-border)]" />
              </div>

              {/* Databases & Storage */}
              <div className="flex justify-center gap-12 w-full">
                <div className="px-5 py-3 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#6E8C7D] flex flex-col items-center">
                  <span className="font-semibold">ChromaDB Vector Store</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Semantic Knowledge Storage</span>
                </div>
                <div className="px-5 py-3 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#5A6E8C] flex flex-col items-center">
                  <span className="font-semibold">PostgreSQL Relational DB</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Users, Workflows, Audit Logs</span>
                </div>
              </div>

              {/* Base layer */}
              <div className="w-full text-center border-t border-[var(--glass-border)] pt-4 mt-2">
                <span className="text-[10px] text-[var(--text-muted)]">Deployment Infrastructure: Containerized via Docker & Deployed on Scalable Cloud Instances</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Workflow / Layer Cards */}
        <div className="space-y-12 mb-20">
          
          {/* AI Workflow Engine */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg">Workflow Engine</h4>
            </div>
            <div className="glass-card rounded-xl p-6 border border-[var(--glass-border)]">
              <h5 className="font-sans font-semibold text-[var(--text-primary)] mb-2">Guided Visual Automation</h5>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                The visual workflow engine translates drag-and-drop actions into a Directed Acyclic Graph (DAG) for stateful process execution. It supports conditional logic routing, input validation mapping, and error-catching fallbacks to guarantee robust AI systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['DAG Execution', 'State Automation', 'Stateful Variables', 'Error Fallback'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Agentic AI Layer */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-red)]/10 text-[var(--accent-red)]">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg">Agentic AI Layer</h4>
            </div>
            <div className="glass-card rounded-xl p-6 border border-[var(--glass-border)]">
              <h5 className="font-sans font-semibold text-[var(--text-primary)] mb-2">ReAct Loop & Multi-Agent Collaboration</h5>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                Leverages a framework for autonomous planning, tool usage, and function calling. AI agents can dynamically call tools (e.g., database queries, web scrapers, code execution sandboxes) to fulfill intricate user tasks. Multi-agent rooms enable cooperative problem solving through peer verification.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tool Integration', 'Autonomous Planning', 'Function Calling', 'Multi-Agent Rooms'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RAG Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#6E8C7D]/10 text-[#6E8C7D]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg">RAG Pipeline</h4>
            </div>
            <div className="glass-card rounded-xl p-6 border border-[var(--glass-border)]">
              <h5 className="font-sans font-semibold text-[var(--text-primary)] mb-2">Hybrid Retrieval & Context Summarization</h5>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                Combines sparse text indexes (BM25) and dense embeddings (Transformers) to achieve high retrieval precision. Contextual items are re-ranked (using cross-encoders), parsed, and summarized dynamically to stay within token windows and prevent hallunications.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Hybrid Search', 'BM25 Indexing', 'Cross-Encoder Re-ranking', 'Context Compression'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vector Database Integration */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#5A6E8C]/10 text-[#5A6E8C]">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg">Data Storage</h4>
            </div>
            <div className="glass-card rounded-xl p-6 border border-[var(--glass-border)]">
              <h5 className="font-sans font-semibold text-[var(--text-primary)] mb-2">Vector Search with ChromaDB & PostgreSQL</h5>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                Maintains low-latency vector indexes inside ChromaDB for semantic documents, code snippets, and conversational histories. Accompanied by PostgreSQL for critical application states, workflow logs, authorization credentials, and user dashboard telemetry.
              </p>
              <div className="flex flex-wrap gap-2">
                {['ChromaDB', 'PostgreSQL', 'Low-Latency Index', 'Vector Embeddings'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg">Deployment</h4>
            </div>
            <div className="glass-card rounded-xl p-6 border border-[var(--glass-border)]">
              <h5 className="font-sans font-semibold text-[var(--text-primary)] mb-2">Dockerized Microservices & API Scaling</h5>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                The entire ecosystem runs as isolated Docker microservices orchestrated to enable independent horizontal scaling of API instances, vector query engines, and database replication clusters. Health checking, telemetry endpoints, and automated recovery loops are configured.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Docker Containers', 'Microservice Orchestration', 'Horizontal Scaling', 'Health Check Loops'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Key Features Block */}
        <div className="mb-20">
          <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-8 text-center">Key Platform Capabilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'No-Code AI Development',
              'AI Agent Builder',
              'RAG Pipeline Builder',
              'Semantic Search',
              'Dataset Management',
              'Workflow Automation',
              'API Integration',
              'Model Deployment',
              'Analytics Dashboard',
              'Enterprise Scalability'
            ].map((feature, i) => (
              <div key={feature} className="glass-card rounded-xl p-4 text-center border border-[var(--glass-border)] flex flex-col justify-center min-h-[100px]">
                <div className="text-gradient-red font-mono text-xs font-bold mb-1">0{i + 1}</div>
                <div className="text-xs font-sans text-[var(--text-primary)] font-medium leading-snug">{feature}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-10 text-center">Future Roadmap</h3>
          <div className="relative border-l border-[var(--glass-border)] ml-4 md:ml-32 pl-8 space-y-12">
            {[
              {
                phase: 'Phase 1: Advanced Agent Collaboration',
                details: 'Support for decentralized agent negotiation and dynamic task division across highly specialized autonomous nodes.'
              },
              {
                phase: 'Phase 2: Local LLM Execution Engine',
                details: 'Integrate native local model serving capabilities using Llama.cpp directly inside runtime containers for edge deployments.'
              },
              {
                phase: 'Phase 3: Visual Evaluator & Audit Trails',
                details: 'Real-time trace logs for agent actions, cost estimation telemetry, token usage, and automatic output compliance guarding.'
              }
            ].map((step, index) => (
              <div key={step.phase} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 border-[var(--accent-red)] bg-[var(--bg-primary)] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)]" />
                </div>

                <div className="text-xs font-mono text-[var(--accent-gold)] mb-1">Q{index + 1} Target</div>
                <h4 className="text-base font-heading font-semibold text-[var(--text-primary)] mb-2">{step.phase}</h4>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed max-w-2xl">{step.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button / Bottom Area */}
        <div className="flex justify-center border-t border-[var(--glass-border)] pt-12">
          <button
            onClick={onClose}
            className="btn-primary py-3 px-8 flex items-center gap-2 text-sm"
          >
            Back to Portfolio
          </button>
        </div>

      </div>
    </motion.div>
  )
}
