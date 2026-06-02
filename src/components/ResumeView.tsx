"use client"

import { useUIStore } from "@/lib/ui-store"
import { motion } from "framer-motion"
import { ExternalLink, Github, Mail, MapPin } from "lucide-react"

export function ResumeView() {
    const toggle = useUIStore(state => state.toggleRecruiterMode)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            data-lenis-prevent
            className="fixed inset-0 z-[9999] bg-gray-100/90 backdrop-blur-sm text-black overflow-y-auto font-sans selection:bg-black selection:text-white flex justify-center py-8 print:py-0 print:bg-white"
        >
            {/* Action Bar (Hidden in Print) */}
            <div className="fixed top-6 right-6 flex gap-4 print:hidden z-50">
                <button
                    onClick={() => window.print()}
                    className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg"
                >
                    Download PDF
                </button>
                <button
                    onClick={toggle}
                    className="bg-white text-black border border-gray-200 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-lg"
                >
                    Close
                </button>
            </div>

            {/* A4 Page Container */}
            <div 
                className="w-[210mm] min-h-[297mm] max-h-[297mm] bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] relative box-border overflow-hidden print:m-0 print:p-[15mm] print:w-[210mm] print:h-[297mm] print:break-inside-avoid origin-top"
                style={{ WebkitFontSmoothing: 'antialiased', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            >
                {/* Header */}
                <header className="border-b-2 border-black pb-4 mb-5">
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-black">KHUNDRAKPAM BIKASH MEITEI</h1>
                    <p className="text-sm font-mono text-gray-600 mb-3 font-semibold">AI ENGINEER | GENERATIVE AI | MACHINE LEARNING</p>
                    
                    <div className="flex gap-4 text-[10px] font-mono text-gray-600">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> khbikash17@gmail.com</span>
                        <span className="flex items-center gap-1"><Github className="w-3 h-3" /> github.com/kh-bikash</span>
                        <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> linkedin.com/in/kh-bikash</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> India</span>
                    </div>
                </header>

                <div className="text-[11.5px] leading-relaxed mb-6 text-gray-800 text-justify">
                    AI Engineer and Software Engineering undergraduate (CGPA: 9.32) specializing in Generative AI, Agentic AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Semantic Search, NLP, and Intelligent Automation Systems. Experienced in building scalable AI applications, AI agents, vector retrieval systems, low-latency APIs, and production-grade backend services using Python, FastAPI, LangChain, PostgreSQL, Docker, ChromaDB, Pandas, and NumPy.
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column (Skills, Edu) */}
                    <div className="col-span-4 space-y-5">
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 text-black">Technical Skills</h3>
                            <div className="space-y-3 text-[10.5px]">
                                <div>
                                    <span className="font-bold block text-gray-900">AI & Machine Learning</span>
                                    <span className="text-gray-600 leading-snug block">LLMs, RAG, Agentic AI, NLP, PyTorch, LangChain, CrewAI, HuggingFace</span>
                                </div>
                                <div>
                                    <span className="font-bold block text-gray-900">Programming</span>
                                    <span className="text-gray-600 leading-snug block">Python, TypeScript, JavaScript, SQL, C++</span>
                                </div>
                                <div>
                                    <span className="font-bold block text-gray-900">Backend & Cloud</span>
                                    <span className="text-gray-600 leading-snug block">FastAPI, Node.js, Docker, PostgreSQL, ChromaDB, Pinecone, Redis</span>
                                </div>
                                <div>
                                    <span className="font-bold block text-gray-900">Frontend</span>
                                    <span className="text-gray-600 leading-snug block">React, Next.js, Tailwind CSS</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 text-black">Education</h3>
                            <div className="text-[10.5px]">
                                <h4 className="font-bold text-gray-900">B.Tech Software Eng.</h4>
                                <p className="text-gray-600">SRM Institute of Science and Technology</p>
                                <p className="text-gray-500 font-mono text-[9px] mt-0.5">2022 - 2026</p>
                                <p className="font-bold text-gray-900 mt-1">CGPA: 9.32</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 text-black">Achievements</h3>
                            <ul className="text-[10.5px] text-gray-600 list-disc pl-3 space-y-1.5">
                                <li>4★ Coder on CodeChef (Max Rating: 1819)</li>
                                <li>Solved 700+ DSA problems</li>
                                <li>Top 1% in Internal Hackathons</li>
                            </ul>
                        </section>
                    </div>

                    {/* Right Column (Experience, Projects) */}
                    <div className="col-span-8 space-y-5">
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 text-black">Experience</h3>
                            
                            <div className="mb-4">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-[12px] font-bold text-black">AI & ML Intern</h4>
                                    <span className="text-[9px] font-mono text-gray-500 font-semibold">Nov 2023 - Present</span>
                                </div>
                                <p className="text-[10.5px] text-gray-600 font-semibold mb-1.5">Bot Point • Remote</p>
                                <ul className="text-[11px] leading-relaxed text-gray-700 list-disc pl-3 space-y-1">
                                    <li>Architected and deployed multi-agent LLM systems using LangChain and CrewAI, automating document analysis workflows and reducing manual review time by 60%.</li>
                                    <li>Built a highly scalable semantic search engine using FastAPI and ChromaDB vector database.</li>
                                    <li>Containerized backend services using Docker, ensuring consistent deployment across cloud environments.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 text-black">Featured Projects</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="text-[12px] font-bold text-black">ReflexCube - AI Agentic Platform</h4>
                                    </div>
                                    <div className="flex gap-1.5 mb-1.5">
                                        {['Python', 'FastAPI', 'LangChain', 'React'].map(t => (
                                            <span key={t} className="px-1.5 py-[2px] bg-gray-100 border border-gray-200 text-[8px] uppercase font-bold text-gray-600 rounded-sm">{t}</span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-gray-700">
                                        A comprehensive no-code AI platform enabling users to build, test, and deploy intelligent agents. Engineered a low-latency execution engine using FastAPI, supporting memory management and dynamic tool calling. Implemented a visual node-based editor in React for intuitive workflow design.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="text-[12px] font-bold text-black">CreditWise Analytics Engine</h4>
                                    </div>
                                    <div className="flex gap-1.5 mb-1.5">
                                        {['Python', 'XGBoost', 'PostgreSQL', 'Docker'].map(t => (
                                            <span key={t} className="px-1.5 py-[2px] bg-gray-100 border border-gray-200 text-[8px] uppercase font-bold text-gray-600 rounded-sm">{t}</span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-gray-700">
                                        Machine learning system designed to predict credit default probabilities. Trained an XGBoost model on 10M+ financial records with 94% accuracy. Deployed the inference API in Docker containers with PostgreSQL caching, achieving sub-50ms response times for real-time risk assessment.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="text-[12px] font-bold text-black">Real-Time Sign Language Translator</h4>
                                    </div>
                                    <div className="flex gap-1.5 mb-1.5">
                                        {['PyTorch', 'OpenCV', 'MediaPipe'].map(t => (
                                            <span key={t} className="px-1.5 py-[2px] bg-gray-100 border border-gray-200 text-[8px] uppercase font-bold text-gray-600 rounded-sm">{t}</span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-gray-700">
                                        End-to-end computer vision pipeline capable of translating ASL alphabet and common phrases into text in real-time. Built using MediaPipe for hand landmark extraction and a custom PyTorch temporal convolutional network, maintaining 30 FPS inference on edge devices.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                
                {/* Bottom decorative line */}
                <div className="absolute bottom-[15mm] left-[15mm] right-[15mm] border-t border-black pt-2 flex justify-between text-[8px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                    <span>Generated {new Date().getFullYear()}</span>
                    <span>KHUNDRAKPAM BIKASH MEITEI</span>
                </div>
            </div>
            
            {/* Print specific global styles */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { size: A4; margin: 0; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; margin: 0; padding: 0; }
                    ::-webkit-scrollbar { display: none; }
                }
            `}} />
        </motion.div>
    )
}
