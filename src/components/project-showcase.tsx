"use client"
import { useState, useRef, useEffect } from "react"

const projects: Record<
  string,
  Array<{
    id: string
    title: string
    client: string
    image: string
  }>
> = {
  web: [
    { id: "1", title: "Reflex Cube", client: "Modular AI Platform", image: "/dark-futuristic-nike-website.jpg" },
    { id: "2", title: "Nova University ERP", client: "EdTech Platform", image: "/minimal-dark-apple-ecommerce.jpg" },
    { id: "3", title: "Student Yatra", client: "Career Guidance", image: "/dark-modern-tesla-portfolio.jpg" },
    { id: "4", title: "Fitness Tracker", client: "Health Tech", image: "/dark-mobile-game-ui.jpg" },
    { id: "5", title: "Riddle Game", client: "Interactive Web", image: "/dark-cyberpunk-game-interface.jpg" },
  ],
  ai_research: [
    { id: "6", title: "LegalEase AI", client: "Legal Tech", image: "/dark-vr-virtual-reality-headset.jpg" },
    { id: "7", title: "Sign Lang Detector", client: "Computer Vision", image: "/dark-ar-augmented-reality-furniture.jpg" },
    { id: "8", title: "AlgoGenesis 3D", client: "Algorithm Viz", image: "/dark-digital-art-installation-museum.jpg" },
    { id: "9", title: "ReflexCube v1", client: "Legacy System", image: "/dark-multiplayer-collaboration-tool.jpg" },
  ],
}

interface ProjectShowcaseProps {
  category: string
  onClose: () => void
}

export function ProjectShowcase({ category, onClose }: ProjectShowcaseProps) {
  const categoryProjects = projects[category] || []
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm overflow-auto cursor-none">
      {hoveredProject && (
        <div
          className="fixed w-80 h-48 pointer-events-none z-50 transition-opacity duration-200"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 100,
            opacity: hoveredProject ? 1 : 0,
          }}
        >
          <img
            src={categoryProjects.find((p) => p.id === hoveredProject)?.image || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
      >
        Close
      </button>

      {/* Project List - Portfolio style */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        <div className="mb-8">
          <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">{category}</span>
        </div>

        <div className="space-y-0">
          {categoryProjects.map((project, index) => (
            <div
              key={project.id}
              className="group border-t border-border/30 py-6 cursor-none"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-normal text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground tracking-wide">{project.client}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
