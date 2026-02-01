export interface Project {
    id: string
    title: string
    type: string
    description: string
    year: string
    image: string
    tech: string[]
    stats: {
        performance: string
        latency: string
        uptime: string
    }
    story?: {
        title: string
        text: string
        visualState: "chaos" | "grid" | "network" | "code"
    }[]
}

export const PROJECTS: Project[] = [
    {
        id: "reflex-cube",
        title: "REFLEX CUBE",
        type: "AI PLATFORM",
        year: "2025",
        description: "Modular AI-powered platform for building NLP applications directly from prompts. Features a Cube Architecture where each module acts as an independent intelligent agent.",
        image: "/dark-ai-neural-network-visualization-platform.jpg",
        tech: ["TypeScript", "NLP", "AI Agents", "React"],
        stats: { performance: "High", latency: "50ms", uptime: "99.9%" },
        story: [
            {
                title: "THE PROBLEM",
                text: "Building complex AI applications requires stitching together disparate tools. We needed a unified, modular system.",
                visualState: "chaos"
            },
            {
                title: "CUBE ARCHITECTURE",
                text: "We designed 'Cubes' - independent AI modules that can be orchestrated together. This allows for infinite scalability and mix-and-match capabilities.",
                visualState: "grid"
            },
            {
                title: "PROMPT TO APP",
                text: "The core engine translates natural language prompts into functional application logic, bridging the gap between idea and execution.",
                visualState: "network"
            }
        ]
    },
    {
        id: "nova-erp",
        title: "NOVA ERP",
        type: "EDTECH SYSTEM",
        year: "2025",
        description: "Comprehensive University ERP with multi-role access (Admin, Faculty, Student). Manages attendance, fees, exams, and hostel logistics securely.",
        image: "/minimal-dark-apple-ecommerce.jpg",
        tech: ["Next.js", "PostgreSQL", "Auth", "TypeScript"],
        stats: { performance: "50K+ Users", latency: "120ms", uptime: "99.9%" }
    },
    {
        id: "legalease-ai",
        title: "LEGALEASE AI",
        type: "LEGAL TECH",
        year: "2025",
        description: "AI tool to summarize, question, and highlight legal documents (PDF/TXT). Accelerates legal research and document understanding.",
        image: "/dark-futuristic-web-interface-quantum-computing.jpg",
        tech: ["Python", "LLMs", "NLP", "PDF Processing"],
        stats: { performance: "100 Pgs/min", latency: "2s", uptime: "99.5%" }
    },
    {
        id: "sign-lang",
        title: "SIGN DETECTOR",
        type: "COMPUTER VISION",
        year: "2025",
        description: "Real-time sign language detection system using MediaPipe and Deep Learning. Bridges communication gaps with instant translation.",
        image: "/dark-vr-virtual-reality-headset.jpg",
        tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
        stats: { performance: "30 FPS", latency: "33ms", uptime: "100%" }
    },
    {
        id: "algogenesis",
        title: "ALGOGENESIS 3D",
        type: "ALGO VISUALIZATION",
        year: "2025",
        description: "Visualizing complex algorithms in 3D. Transforms code execution into stunning, interactive animations for better understanding.",
        image: "/dark-digital-art-installation-museum.jpg",
        tech: ["Python", "3D Graphics", "Education", "React"],
        stats: { performance: "60 FPS", latency: "16ms", uptime: "100%" }
    },
    {
        id: "student-yatra",
        title: "STUDENT YATRA",
        type: "CAREER PLATFORM",
        year: "2025",
        description: "Full-stack career guidance platform with face recognition login, skill tracking, and AI-based interview prep.",
        image: "/dark-modern-tesla-portfolio.jpg",
        tech: ["JavaScript", "React", "AI Models", "FaceAPI"],
        stats: { performance: "Fast", latency: "100ms", uptime: "99.9%" }
    },
    {
        id: "fitness-tracker",
        title: "FITNESS TRACKER",
        type: "HEALTH TECH",
        year: "2025",
        description: "Personal health tracking application for monitoring workouts, nutrition, and progress over time.",
        image: "/dark-mobile-game-ui.jpg",
        tech: ["TypeScript", "React", "Data Viz", "APIs"],
        stats: { performance: "Real-time", latency: "50ms", uptime: "99.9%" }
    },
    {
        id: "riddle-game",
        title: "RIDDLE GAME",
        type: "INTERACTIVE WEB",
        year: "2025",
        description: "Interactive puzzle game challenging users to solve riddles. Simple, engaging, and fun.",
        image: "/dark-cyberpunk-game-interface.jpg",
        tech: ["HTML", "JavaScript", "CSS", "Game Logic"],
        stats: { performance: "60 FPS", latency: "0ms", uptime: "100%" }
    },
    {
        id: "reflex-cube-v1",
        title: "REFLEXCUBE V1",
        type: "LEGACY SYSTEM",
        year: "2025",
        description: "The initial prototype of the Reflex Cube system. Laid the foundation for the modular AI architecture.",
        image: "/dark-multiplayer-collaboration-tool.jpg",
        tech: ["Python", "Prototype", "Research", "Testing"],
        stats: { performance: "Experimental", latency: "Var", uptime: "N/A" }
    }
]

export function getProject(id: string) {
    return PROJECTS.find(p => p.id === id)
}

export function getNextProject(id: string) {
    const index = PROJECTS.findIndex(p => p.id === id)
    if (index === -1) return null
    return PROJECTS[(index + 1) % PROJECTS.length]
}
