"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { CosmicAIBackground } from "./cosmic-ai-background"
import { AudioPlayer } from "./audio-player"
// import { CardCarousel } from "./card-carousel" // Replaced by DNA System
import { DNAHelixCardSystem } from "./dna-helix-card-system"
import { AILogoCursorTrail } from "./ai-logo-cursor-trail"
import { cn } from "@/lib/utils"
// import { LoadingScreen } from "./loading-screen" 

const projects = [
  {
    id: "1",
    title: "REFLEX CUBE",
    category: "AI PLATFORM",
    year: "2025",
    image: "/dark-futuristic-web-interface-quantum-computing.jpg",
  },
  {
    id: "2",
    title: "NOVA ERP",
    category: "EDTECH SYSTEM",
    year: "2025",
    image: "/dark-ai-neural-network-visualization-platform.jpg",
  },
  {
    id: "3",
    title: "LEGALEASE AI",
    category: "LEGAL TECH",
    year: "2025",
    image: "/dark-space-themed-analytics-dashboard.jpg",
  },
  {
    id: "4",
    title: "SIGN LANG DETECTOR",
    category: "COMPUTER VISION",
    year: "2025",
    image: "/dark-crypto-blockchain-decentralized-interface.jpg",
  },
  {
    id: "5",
    title: "ALGOGENESIS 3D",
    category: "VIZ TOOL",
    year: "2025",
    image: "/dark-mobile-app-music-streaming-interface.jpg",
  },
]

export function PortfolioHero() {
  const [view, setView] = useState<"HOME" | "WORK" | "CONTACT">("HOME")
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // DNA Menu Items
  const dnaItems = useMemo(() => [
    { id: 1, title: "WORKS", subtitle: "VIEW PROJECT GALLERY", image: "/dark-futuristic-web-interface-quantum-computing.jpg", action: () => setView("WORK") },
    { id: 2, title: "LINKEDIN", subtitle: "CONNECT PROFESSIONALLY", image: "/dark-modern-tesla-portfolio.jpg", link: "https://www.linkedin.com/in/bikash-kh-5544ba298/" },
    { id: 3, title: "LEETCODE", subtitle: "ALGORITHMIC MASTERY", image: "/dark-ai-neural-network-visualization-platform.jpg", link: "https://leetcode.com/u/bikashkh/" },
    { id: 4, title: "CODECHEF", subtitle: "COMPETITIVE PROGRAMMING", image: "/dark-crypto-blockchain-decentralized-interface.jpg", link: "https://www.codechef.com/users/khbikash" },
    { id: 5, title: "GITHUB", subtitle: "OPEN SOURCE CODE", image: "/dark-multiplayer-collaboration-interface.jpg", link: "https://github.com" },
    { id: 6, title: "RESUME", subtitle: "DOWNLOAD CV", image: "/dark-modern-portfolio-website-tesla.jpg", link: "/resume.pdf" },

    // Skills
    { id: 7, title: "AI ENGINEER", subtitle: "CORE SPECIALIZATION", image: "/dark-ai-neural-network-visualization-platform.jpg" },
    { id: 8, title: "COMPUTER VISION", subtitle: "IMAGE PROCESSING", image: "/dark-vr-virtual-reality-interface.jpg" },
    { id: 9, title: "GEN AI", subtitle: "LLMS & DIFFUSION", image: "/dark-digital-art-installation.jpg" },
    { id: 10, title: "DEEP LEARNING", subtitle: "NEURAL ARCHITECTURES", image: "/dark-space-themed-analytics-dashboard.jpg" },
    { id: 11, title: "NLP", subtitle: "NATURAL LANGUAGE", image: "/dark-social-gaming-platform.jpg" },

    // Tech
    { id: 12, title: "NEXT.JS", subtitle: "REACT FRAMEWORK", image: "/dark-futuristic-nike-website.jpg" },
    { id: 13, title: "WEBGL", subtitle: "3D GRAPHICS", image: "/dark-digital-art-installation-museum.jpg" },
    { id: 14, title: "PYTHON", subtitle: "DATA SCIENCE", image: "/dark-multiplayer-collaboration.jpg" },
    { id: 15, title: "PYTORCH", subtitle: "ML FRAMEWORK", image: "/dark-ai-neural-network-visualization-platform.jpg" },
    { id: 16, title: "THREE.JS", subtitle: "IMMERSIVE WEB", image: "/dark-vr-virtual-reality-immersive-experience.jpg" },

    // Sections/Extras
    { id: 17, title: "CONTACT", subtitle: "GET IN TOUCH", image: "/dark-mobile-app-music-streaming-interface.jpg", action: () => setView("CONTACT") },
    { id: 18, title: "BLOG", subtitle: "THOUGHTS & IDEAS", image: "/minimal-dark-apple-ecommerce.jpg" },
    { id: 19, title: "SERVICES", subtitle: "FREELANCE", image: "/dark-luxury-retail-installation.jpg" },
    { id: 20, title: "ABOUT", subtitle: "MY STORY", image: "/placeholder-user.jpg" },
  ], [])

  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground overflow-x-hidden">

      {/* Background Layer */}
      <CosmicAIBackground />

      {/* Glitter Cursor Trail */}
      <AILogoCursorTrail />

      {/* --- UI FRAME --- */}

      {/* Top Left Logo (Name) */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference">
        <button
          onClick={() => setView("HOME")}
          className="text-sm font-bold tracking-[0.2em] hover:opacity-70 transition-opacity uppercase"
        >
          KHUNDRAKPAM BIKASH MEITEI ©
        </button>
      </div>

      {/* Top Right Navigation */}
      <nav className="fixed top-8 right-8 z-50 flex gap-6 text-xs font-bold tracking-[0.2em] mix-blend-difference">
        <button
          onClick={() => setView("WORK")}
          className={cn("transition-colors hover:text-primary", view === "WORK" && "text-primary")}
        >
          WORK
        </button>
        <span className="opacity-30">|</span>
        <button
          className="hover:text-primary transition-colors"
          onClick={() => setView("CONTACT")}
        >
          CONTACT
        </button>
      </nav>

      {/* Left Sidebar Filters (Only visible in WORK view) */}
      {view === "WORK" && (
        <div className="fixed top-1/2 left-8 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 text-[10px] font-bold tracking-[0.2em] text-muted-foreground mix-blend-difference animate-fade-in">
          {["ALL", "WEBSITES", "INSTALLATIONS", "APPS"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left transition-colors hover:text-primary flex items-center gap-2 ${activeCategory === cat ? "text-primary" : ""}`}
            >
              {activeCategory === cat && <span className="text-primary">→</span>}
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Left Search/AI Pill */}
      <div className="fixed bottom-8 left-8 z-50">
        <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-[10px] tracking-widest hover:bg-white/20 transition-all uppercase">
          Ask me anything...
        </button>
      </div>

      {/* --- MAIN CONTENT LAYERS --- */}

      {/* 1. HOME VIEW: DNA Helix System */}
      {view === "HOME" && (
        <main className="relative w-full h-screen flex flex-col justify-center items-center z-30 animate-fade-in overflow-hidden">

          <DNAHelixCardSystem items={dnaItems} onCardClick={(item) => {
            if (item.action) item.action()
          }} />

          {/* Background Title Watermark - Adjusted opacity */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-[0.03] whitespace-nowrap">
            <h1 className="text-[12vw] font-bold tracking-tighter text-transparent text-stroke-white transform -rotate-90 md:rotate-0">
              AI ENGINEER
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 text-center pointer-events-none mix-blend-difference opacity-50 z-10 w-full flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-[1px] h-8 bg-white/50 animate-pulse" />
              <p className="text-[10px] tracking-[0.5em] uppercase">SCROLL TO ANALYZE DNA</p>
            </div>
          </div>
        </main>
      )}

      {/* 2. WORK VIEW: Project List */}
      {view === "WORK" && (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 z-30 animate-fade-in">
          <div className="w-full max-w-4xl px-6 flex flex-col gap-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative w-full border-b border-white/10 py-12 flex justify-between items-baseline cursor-pointer transition-colors hover:border-primary/50"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Index */}
                <span className="text-xs text-muted-foreground font-light w-12">
                  0{index + 1}
                </span>

                {/* Title */}
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter group-hover:text-transparent group-hover:text-stroke-primary transition-all duration-300">
                  {project.title}
                </h2>

                {/* Category */}
                <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 hidden md:block w-32 text-right group-hover:text-primary">
                  {project.category}
                </span>

                {/* Hover Image Reveal */}
                <div
                  className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none transition-opacity duration-500 z-[-1] mix-blend-screen opacity-0 ${hoveredProject === project.id ? "opacity-40" : ""}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-2xl mt-48 text-center px-6">
            <p className="text-muted-foreground text-sm leading-loose tracking-widest">
              DIGITAL CRAFTSMANSHIP • CREATIVE DEVELOPMENT
            </p>
          </div>
        </div>
      )}

      {/* 3. CONTACT VIEW (Simple Placeholder for now) */}
      {view === "CONTACT" && (
        <div className="relative w-full h-screen flex flex-col justify-center items-center z-30 animate-fade-in">
          <h2 className="text-4xl font-bold tracking-widest mb-4">GET IN TOUCH</h2>
          <a href="mailto:contact@example.com" className="text-primary hover:underline text-xl">contact@example.com</a>
        </div>
      )}

      <AudioPlayer />
    </div>
  )
}
