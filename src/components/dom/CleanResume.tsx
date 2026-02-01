"use client"

import { motion } from "framer-motion"
import { useUIStore } from "@/lib/ui-store"

const EXPERIENCE = [
    {
        company: "Amazon Web Services (AWS)",
        role: "Software Engineering Intern",
        period: "Jun 2025 - Jul 2025",
        description: "Developed backend services handling 100K+ API requests/day, improving system reliability and throughput. Built automated data validation pipelines used in analytics and ML preprocessing workflows. Analyzed production logs and SQL datasets to identify performance bottlenecks, reducing recurring service failures by 20%."
    },
    {
        company: "SAP",
        role: "Technical Consulting Intern",
        period: "Jun 2025 - Jul 2025",
        description: "Processed enterprise datasets with 50K+ records for analytics and reporting pipelines. Designed preprocessing logic for handling missing values, normalization, and schema validation. Improved dataset consistency and accuracy by 30%, enabling reliable downstream experimentation."
    }
]

const PROJECTS = [
    { name: "Reflex Cube", tech: "Typescript, NLP, AI Agents", desc: "Modular AI-powered platform for building NLP applications directly from prompts. Features a Cube Architecture where each module acts as an independent intelligent agent.", stats: "LATENCY: 50ms | UPTIME: 99.9%" },
    { name: "Student Yatra", tech: "React, FaceAPI, AI Models", desc: "Full-stack career guidance platform with face recognition login, skill tracking, and AI-based interview prep.", stats: "PERFORMANCE: Fast | LATENCY: 100ms" },
    { name: "Legalease AI", tech: "Python, LLMs, PDF Processing", desc: "AI tool to summarize, question, and highlight legal documents (PDF/TXT). Accelerates legal research and document understanding.", stats: "PERFORMANCE: 100 Pgs/min" },
    { name: "Sign Detector", tech: "Python, OpenCV, MediaPipe", desc: "Real-time sign language detection system using MediaPipe and Deep Learning. Bridges communication gaps with instant translation.", stats: "PERFORMANCE: 30 FPS" },
    { name: "AlgoGenesis 3D", tech: "Python, 3D Graphics, React", desc: "Visualizing complex algorithms in 3D. Transforms code execution into stunning, interactive animations for better understanding.", stats: "PERFORMANCE: 60 FPS | LATENCY: 16ms" }
]

export function CleanResume() {
    return (
        <section className="min-h-screen bg-zinc-50 flex items-center justify-center p-8 md:p-20 print:p-0">
            {/* Exit Button - Hidden in Print */}
            <button
                onClick={() => useUIStore.getState().toggleRecruiterMode()}
                className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors shadow-lg print:hidden"
            >
                EXIT RECRUITER MODE
            </button>

            <div className="max-w-4xl w-full bg-white shadow-xl shadow-zinc-200/50 rounded-2xl p-12 md:p-16 border border-zinc-100 print:shadow-none print:border-none print:p-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start border-b border-zinc-100 pb-8 mb-10">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tighter mb-2 text-zinc-900">Khundrakpam Bikash Meitei</h2>
                        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-1">Creative Technologist // Full Stack Engineer</p>
                        <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 mt-2">
                            <span>khbikash17@gmail.com</span>
                            <span>•</span>
                            <span>+91 7005513301</span>
                            <span>•</span>
                            <a href="https://www.linkedin.com/in/bikash-kh-5544ba298/" className="hover:text-primary transition-colors">LinkedIn</a>
                            <span>•</span>
                            <a href="https://github.com/kh-bikash" className="hover:text-primary transition-colors">GitHub</a>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 text-right hidden md:block">
                        <div className="text-xs font-bold bg-zinc-900 text-white px-3 py-1 rounded-full inline-block">OPEN TO WORK</div>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Left Column: Skills & Education */}
                    <div className="space-y-10 md:col-span-1">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b border-zinc-100 pb-2">Technical Skills</h3>
                            <ul className="space-y-3 text-sm text-zinc-600 font-medium">
                                <li className="leading-tight">Python, C++, Java, SQL</li>
                                <li className="leading-tight">React / Next.js / TS</li>
                                <li className="leading-tight">Three.js / WebGL / R3F</li>
                                <li className="leading-tight">Node.js / PostgreSQL</li>
                                <li className="leading-tight">PyTorch / TensorFlow</li>
                                <li className="leading-tight">AWS / Docker / CI/CD</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b border-zinc-100 pb-2">Education</h3>
                            <div className="text-sm text-zinc-800 font-bold">B.Tech in CSE</div>
                            <div className="text-xs text-zinc-500 mb-1">KL University</div>
                            <div className="text-xs font-mono text-zinc-400">2023 - 2027</div>
                            <div className="text-xs font-mono text-zinc-400 mt-1">CGPA: 9.32</div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b border-zinc-100 pb-2">Interests</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                Machine Learning, NLP, Scalable Systems, Optimization, Applied AI
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Experience & Projects */}
                    <div className="md:col-span-3 space-y-10">

                        {/* Experience Section */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                Professional Experience
                            </h3>
                            <div className="space-y-8">
                                {EXPERIENCE.map((job, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors">{job.company}</h4>
                                            <span className="text-xs font-mono text-zinc-400 whitespace-nowrap ml-4">{job.period}</span>
                                        </div>
                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{job.role}</p>
                                        <p className="text-sm text-zinc-600 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                Selected Works
                            </h3>
                            <div className="space-y-6">
                                {PROJECTS.map((project, i) => (
                                    <div key={i} className="bg-zinc-50 p-5 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-zinc-900">{project.name}</h4>
                                            <div className="text-[10px] font-mono text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-100">{project.stats}</div>
                                        </div>
                                        <p className="text-xs font-mono text-primary mb-2 opacity-80">{project.tech}</p>
                                        <p className="text-sm text-zinc-600 leading-relaxed">
                                            {project.desc}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                </div>

                {/* Footer Signature */}
                <div className="mt-16 pt-8 border-t border-zinc-100 flex justify-between items-end opacity-60">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400">Generated by PortfolioOS v2.0</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400">Verified Human</p>
                        <div className="h-8 md:h-12 w-24 md:w-32 bg-zinc-100 rounded rotate-2 mt-2" />
                    </div>
                </div>

            </div>
        </section>
    )
}
