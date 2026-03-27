"use client"

import { motion } from "framer-motion"
import { useUIStore } from "@/lib/ui-store"

export function ResumeView() {
    const toggleRecruiterMode = useUIStore((state) => state.toggleRecruiterMode)

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-zinc-100 font-sans tracking-tight py-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto"
        >
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-24 border-b border-black/10 dark:border-white/10 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">Recruiter Profile View</span>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => window.print()}
                        className="text-xs font-semibold tracking-widest uppercase text-black dark:text-white border border-black/20 dark:border-white/20 px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        Save PDF
                    </button>
                    <button 
                        onClick={toggleRecruiterMode}
                        className="text-xs font-semibold tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
                    >
                        Close View
                    </button>
                </div>
            </div>

            {/* Header Identity */}
            <header className="mb-20">
                <h1 className="text-5xl sm:text-7xl font-semibold mb-4 text-black dark:text-white leading-[0.9] tracking-tighter">Bikash.</h1>
                <h2 className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-tight mb-8">AI Engineer & Software Architect</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <a href="mailto:khbikash17@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">khbikash17@gmail.com</a>
                    <a href="https://github.com/kh-bikash" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">github.com/kh-bikash</a>
                    <a href="https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn Profile</a>
                    <span>India</span>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
                
                {/* Left Column (Skills & Ed) */}
                <div className="space-y-16">
                    <section>
                        <h3 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-2">Technical Substrate</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-black dark:text-white font-semibold mb-1">Machine Intelligence</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">TensorFlow, PyTorch, HuggingFace, OpenAI, Scikit-Learn</p>
                            </div>
                            <div>
                                <h4 className="text-black dark:text-white font-semibold mb-1">Core Languages</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Python, TypeScript, JavaScript, SQL, C++</p>
                            </div>
                            <div>
                                <h4 className="text-black dark:text-white font-semibold mb-1">Cloud Native</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">AWS, Aviatrix, Docker, CI/CD</p>
                            </div>
                            <div>
                                <h4 className="text-black dark:text-white font-semibold mb-1">Frontend Engineering</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">React, Next.js, Framer Motion, Tailwind CSS</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-2">Credentials</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex flex-col">
                                <span className="font-semibold text-black dark:text-white">Generative AI Developer</span>
                                <span className="text-zinc-500">SAP • 2025</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-black dark:text-white">Generative AI Professional</span>
                                <span className="text-zinc-500">Oracle • 2025</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-black dark:text-white">Multicloud Network Associate</span>
                                <span className="text-zinc-500">Aviatrix • 2025</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-black dark:text-white">Certified AI Associate</span>
                                <span className="text-zinc-500">Salesforce • 2024</span>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Right Column (Experience & Projects) */}
                <div className="space-y-16">
                    <section>
                        <h3 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-8 border-b border-black/10 dark:border-white/10 pb-2">Professional Experience</h3>
                        
                        <div className="space-y-12">
                            <div className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-semibold text-black dark:text-white">Amazon Web Services (AWS)</h4>
                                    <span className="text-sm font-medium text-zinc-500">2025</span>
                                </div>
                                <div className="text-sm font-medium text-black dark:text-white mb-4">Software Engineering Intern</div>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl marker:text-zinc-300 dark:marker:text-zinc-700">
                                    <li>Engineered scalable backend services capable of handling massive API request volume (100K+/day) with perfect reliability.</li>
                                    <li>Architected automated data validation pipelines to streamline mission-critical ML preprocessing workflows.</li>
                                </ul>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-semibold text-black dark:text-white">SAP</h4>
                                    <span className="text-sm font-medium text-zinc-500">2025</span>
                                </div>
                                <div className="text-sm font-medium text-black dark:text-white mb-4">Technical Consulting Intern</div>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl marker:text-zinc-300 dark:marker:text-zinc-700">
                                    <li>Optimized enterprise datasets containing over 50,000 records for complex analytics pipelines.</li>
                                    <li>Significantly improved dataset consistency and accuracy by 30%, enabling highly reliable downstream experimentation.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

        </motion.div>
    )
}
