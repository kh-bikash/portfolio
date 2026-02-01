"use client"

import { motion } from "framer-motion"

const EXPERIENCE = [
    {
        company: "Amazon Web Services (AWS)",
        role: "Software Engineering Intern",
        period: "Jun 2025 - Jul 2025",
        description: "Developed backend services handling 100K+ API requests/day. Built automated data validation pipelines for analytics and ML preprocessing workflows."
    },
    {
        company: "SAP",
        role: "Technical Consulting Intern",
        period: "Jun 2025 - Jul 2025",
        description: "Processed enterprise datasets with 50K+ records for analytics. Improved dataset consistency and accuracy by 30%."
    }
]

export function CleanResume() {
    return (
        <section className="min-h-screen bg-zinc-50 flex items-center justify-center p-8 md:p-20">
            <div className="max-w-4xl w-full bg-white shadow-xl shadow-zinc-200/50 rounded-2xl p-12 md:p-20 border border-zinc-100">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-100 pb-12 mb-12">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tighter mb-2">Khundrakpam Bikash</h2>
                        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Software & AI Engineer</p>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <p className="text-zinc-400 text-sm">based in</p>
                        <p className="font-medium">Andhra Pradesh, India</p>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left Column: Stats/Skills */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Core Stack</h3>
                            <ul className="space-y-2 text-sm text-zinc-600 font-medium">
                                <li>Python / C++ / Java</li>
                                <li>Next.js / React</li>
                                <li>Cloud (AWS)</li>
                                <li>PyTorch / TensorFlow</li>
                                <li>SQL / PostgreSQL</li>
                                <li>Data Structures & Algos</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Focus Areas</h3>
                            <ul className="space-y-2 text-sm text-zinc-600">
                                <li>Scalable Systems</li>
                                <li>AI/ML Pipelines</li>
                                <li>Full Stack Dev</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Experience */}
                    <div className="md:col-span-2 space-y-12">
                        {EXPERIENCE.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{job.company}</h4>
                                    <span className="text-xs font-mono text-zinc-400">{job.period}</span>
                                </div>
                                <p className="text-sm font-medium text-zinc-800 mb-2">{job.role}</p>
                                <p className="text-zinc-500 leading-relaxed text-sm">
                                    {job.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Footer Signature */}
                <div className="mt-20 pt-12 border-t border-zinc-100 flex justify-between items-center opacity-50">
                    <div className="h-12 w-32 bg-zinc-100 rounded rotate-1" /> {/* Fake Signature Placeholder */}
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Verified Human</p>
                </div>

            </div>
        </section>
    )
}
