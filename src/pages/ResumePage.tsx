"use client"

import { motion } from 'framer-motion'
import { ArrowLeft, FileDown, Briefcase, GraduationCap, Code2, Terminal, Award, Link as LinkIcon, Database, Layers, CheckCircle2, Cpu } from 'lucide-react'
import { useEffect } from 'react'

const TECH_LOGOS: Record<string, string> = {
  Python: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
  TypeScript: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
  React: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  FastAPI: 'https://cdn.worldvectorlogo.com/logos/fastapi.svg',
  PyTorch: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png',
  Docker: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg',
  PostgreSQL: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
  AWS: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  GCP: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
}

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL'],
    icon: Code2,
  },
  {
    title: 'AI / ML & LLM Engineering',
    skills: ['Generative AI', 'LLMs', 'RAG', 'Semantic Search', 'Embeddings', 'Transformers', 'HuggingFace Pipelines', 'Prompt Engineering', 'NLP', 'Fine-Tuning', 'Reinforcement Learning', 'ROUGE', 'BERTScore', 'MLflow', 'MLOps'],
    icon: Cpu,
  },
  {
    title: 'Agentic AI & Orchestration',
    skills: ['LangChain', 'LlamaIndex', 'Multi-Agent Systems', 'AI Agents', 'Function Calling', 'Tool Calling', 'Vector Databases', 'SSE Streaming', 'Workflow Orchestration', 'Intelligent Automation'],
    icon: Terminal,
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['FastAPI', 'React 18', 'Next.js', 'Three.js / React Three Fiber', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Recharts', 'Pandas', 'NumPy', 'Pydantic', 'Streamlit'],
    icon: Layers,
  },
  {
    title: 'Backend, Databases & DevOps',
    skills: ['PostgreSQL', 'SQLite', 'ChromaDB', 'Pinecone', 'Redis', 'Docker', 'GitHub Actions CI/CD', 'AWS', 'GCP', 'Git LFS', 'Linux', 'REST APIs', 'JWT Auth', 'RBAC'],
    icon: Database,
  }
]

export function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goBack = () => {
    window.location.hash = '#/'
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F5F7] text-gray-900 font-sans selection:bg-blue-200">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>

        <a 
            href="/Khundrakpam_Bikash_Meitei_Resume.pdf"
            download
            className="flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium items-center gap-2 transition-colors shadow-sm"
        >
            <FileDown className="w-4 h-4" /> 
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
        </a>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24">
        
        {/* Header / Summary */}
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-20 text-center"
        >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 tracking-tighter mb-4">
                Khundrakpam Bikash Meitei
            </h1>
            <p className="text-lg md:text-xl text-blue-600 font-medium mb-6">
                AI Engineer | Generative AI | Agentic AI | LLM Engineering | Full-Stack AI Systems
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 font-medium mb-8">
                <span>+91 7005513301</span> • 
                <a href="mailto:khbikash17@gmail.com" className="hover:text-blue-600 transition-colors">khbikash17@gmail.com</a> • 
                <a href="https://linkedin.com/in/khundrakpam-bikash-meitei-5544ba298" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a> • 
                <a href="https://github.com/kh-bikash" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto text-left bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                AI Engineer and CSE undergraduate (<strong>CGPA: 9.32</strong>) specializing in <strong>Generative AI, Agentic AI, RAG pipelines, and LLM Engineering</strong>. Founder of <strong>ReflexCube</strong> — a production-grade, prompt-driven AI platform with 15 domain-specific intelligence agents, real-time SSE training streams, and a 3D visualization interface, backed by published research. Experienced in end-to-end ML lifecycles, multi-agent orchestration, RL environments, and LLM evaluation using <strong>Python, FastAPI, LangChain, HuggingFace Transformers, PyTorch, MLflow, PostgreSQL, and Docker</strong>.
            </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="mb-24">
            <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="text-3xl font-heading font-bold text-gray-900 mb-10 flex items-center gap-3"
            >
                <Code2 className="text-blue-600 w-8 h-8" /> Technical Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_CATEGORIES.map((category, idx) => (
                    <motion.div 
                        key={category.title}
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } } }}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <category.icon className="w-5 h-5 text-blue-500" /> {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-100 flex items-center gap-1.5">
                                    {TECH_LOGOS[skill] && <img src={TECH_LOGOS[skill]} alt={skill} className="w-3.5 h-3.5 object-contain" />}
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-24">
            <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="text-3xl font-heading font-bold text-gray-900 mb-10 flex items-center gap-3"
            >
                <Briefcase className="text-blue-600 w-8 h-8" /> Professional Experience
            </motion.h2>

            <div className="space-y-12 border-l-2 border-gray-200 ml-4 pl-8 relative">
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="relative"
                >
                    <div className="absolute -left-[43px] top-1.5 w-5 h-5 bg-[#F5F5F7] border-4 border-blue-500 rounded-full" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">AI/ML Intern <span className="text-gray-400 font-light">— Bot Point</span></h3>
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-2 sm:mt-0">May 2026 - Present</span>
                    </div>
                    <ul className="space-y-3 text-gray-600 text-lg leading-relaxed mt-4">
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                            <span>Built and deployed <strong>LLM-based AI agents</strong> using <strong>Python, LangChain, and HuggingFace Transformers</strong> to handle <strong>1K+ user queries/day</strong> for an AI-powered business automation platform, improving response accuracy by <strong>30%</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                            <span>Designed <strong>API-driven AI workflows</strong> with prompt engineering and automated evaluation pipelines, reducing manual intervention by <strong>40%</strong> and improving system reliability.</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>

        {/* Projects */}
        <div className="mb-24">
            <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="text-3xl font-heading font-bold text-gray-900 mb-10 flex items-center gap-3"
            >
                <Terminal className="text-blue-600 w-8 h-8" /> Key Projects
            </motion.h2>

            <div className="space-y-8">
                {/* ReflexCube */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">ReflexCube <span className="text-gray-400 font-light">— Prompt-Driven Modular AI Platform</span></h3>
                        <div className="flex gap-3 mt-3 md:mt-0">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">Founder</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-6 font-mono flex flex-wrap gap-2">
                        <span className="text-blue-500 font-semibold">Stack:</span> Python, FastAPI, PyTorch, HuggingFace Transformers, LangChain, React 18, Three.js, SQLite, Docker, SSE
                    </div>
                    <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Architected a production-grade no-code AI platform with <strong>15 domain-specific intelligence agents</strong> (Legal, Finance, HR, Vision, Memory, etc.), each an isolated async agent via FastAPI ThreadPool with <strong>subprocess-isolated ML workers</strong> (zero GIL lockups).</li>
                        <li>Built <strong>real-time SSE log streaming</strong> (live JSONL output to frontend terminal) and an <strong>immersive 3D React Three Fiber</strong> interface; full pipeline: prompt → train → version (Git LFS) → predict → download .zip.</li>
                        <li>Achieved <strong>200ms</strong> inference latency, <strong>10K+ dataset</strong> support, <strong>40%</strong> semantic retrieval improvement, and <strong>70%</strong> reduction in AI development effort; co-authored published research paper.</li>
                    </ul>
                </motion.div>

                {/* AgentBench */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">AgentBench <span className="text-gray-400 font-light">— LLM Evaluation & Benchmarking</span></h3>
                    <div className="text-sm text-gray-500 mb-6 font-mono flex flex-wrap gap-2">
                        <span className="text-blue-500 font-semibold">Stack:</span> Python, FastAPI, LangChain, MLflow, ROUGE-L, BERTScore, React 19, TypeScript, Recharts, SQLite, Docker
                    </div>
                    <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Built a full-stack LLM evaluation platform for <strong>side-by-side multi-model comparison</strong> (Gemini 2.5 Flash, Llama 3, Mixtral); automated scoring with <strong>ROUGE-L and BERTScore F1</strong>, latency and token-cost tracking per run.</li>
                        <li>Integrated <strong>MLflow experiment tracking</strong> and <strong>HotpotQA benchmark</strong> (50-question validation set); analytics dashboard with Latency vs Accuracy scatter plot and CSV/JSON export.</li>
                    </ul>
                </motion.div>

                {/* MonsoonRelief */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">MonsoonRelief-OpenEnv <span className="text-gray-400 font-light">— Disaster Response RL Environment</span></h3>
                    <div className="text-sm text-gray-500 mb-6 font-mono flex flex-wrap gap-2">
                        <span className="text-blue-500 font-semibold">Stack:</span> Python, Pydantic, FastAPI, Docker, HuggingFace Spaces, Reinforcement Learning, OpenEnv
                    </div>
                    <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Built an <strong>OpenEnv-compliant RL environment</strong> simulating multi-objective disaster response (flood zones, scarce resources, demographic vulnerabilities); Pydantic-typed observation/action spaces with dynamic scalar reward logic.</li>
                        <li>Implemented a <strong>3-tier programmatic grader</strong> (Easy/Medium/Hard) with zero-to-one scoring; zero-shot Llama-3.3-70B baseline achieved <strong>2.50/3.00 aggregate</strong> (88% Easy, 76% Medium, 86% Hard) — deployed on HuggingFace Spaces via Docker.</li>
                    </ul>
                </motion.div>
            </div>
        </div>

        {/* Education & Research */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div>
                <motion.h2 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="text-3xl font-heading font-bold text-gray-900 mb-8 flex items-center gap-3"
                >
                    <GraduationCap className="text-emerald-600 w-8 h-8" /> Education
                </motion.h2>

                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">KL University</h3>
                    <h4 className="text-lg text-gray-500 font-medium mb-6">Andhra Pradesh, India</h4>
                    
                    <p className="text-gray-800 font-medium text-lg mb-4">Bachelor of Technology in Computer Science and Engineering</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">2023 – 2027</span>
                        <span className="text-emerald-600 font-bold text-2xl tracking-tight">9.32 <span className="text-sm font-medium text-emerald-600/60">CGPA</span></span>
                    </div>
                </motion.div>
            </div>

            <div>
                <motion.h2 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="text-3xl font-heading font-bold text-gray-900 mb-8 flex items-center gap-3"
                >
                    <LinkIcon className="text-purple-600 w-8 h-8" /> Research & Publications
                </motion.h2>

                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">ReflexCube: A No-Code AI Platform Architecture for LLM Application Development</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Naitik Dubey, Vivek Dubey, Rohit Singh, Prateek Singh, <strong>K. Bikash Meitei</strong>, Dr. Lakshminarayana K., KL University, 2026.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors">
                        <FileDown className="w-4 h-4" /> View Paper
                    </a>
                </motion.div>
            </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="mb-24">
            <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="text-3xl font-heading font-bold text-gray-900 mb-8 flex items-center gap-3"
            >
                <Award className="text-orange-500 w-8 h-8" /> Achievements & Certifications
            </motion.h2>

            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
                <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">Certifications</h4>
                    <div className="flex flex-wrap gap-4">
                        <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-sm font-bold border border-orange-100">SAP Generative AI Developer (2026)</span>
                        <span className="px-4 py-2 bg-red-50 text-red-700 rounded-xl text-sm font-bold border border-red-100">OCI Architect Associate (2025)</span>
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100">Salesforce AI Associate (2025)</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">Key Achievements</h4>
                    <ul className="space-y-4 text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Solved <strong>700+ DSA problems</strong> across LeetCode (321 solved, 8 badges incl. 100 Days 2026) and CodeChef (4-Star); <strong>26 public GitHub repositories</strong> spanning AI, full-stack, and MLOps.</li>
                        <li>Built <strong>7+ production AI systems</strong> including a 15-agent platform, LLM evaluation suite with MLflow, a disaster response RL environment (2.50/3.00 benchmark), and a Generative AI document analyzer.</li>
                    </ul>
                </div>
            </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center pt-10 border-t border-gray-200"
        >
            <a 
                href="/Khundrakpam_Bikash_Meitei_Resume.pdf"
                download
                className="px-10 py-5 bg-gray-900 hover:bg-black text-white rounded-full text-lg font-semibold flex items-center gap-3 transition-transform hover:scale-105 shadow-2xl shadow-black/20"
            >
                <FileDown className="w-6 h-6" /> Download PDF Version
            </a>
            <p className="text-gray-400 mt-6">Standard 1-page format optimized for ATS systems.</p>
        </motion.div>

      </main>
    </div>
  )
}
