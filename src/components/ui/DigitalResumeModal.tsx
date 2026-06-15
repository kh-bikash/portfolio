"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, FileDown, Briefcase, GraduationCap, Code } from 'lucide-react'
import { useEffect } from 'react'

interface DigitalResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DigitalResumeModal({ isOpen, onClose }: DigitalResumeModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Main Modal Window */}
          <motion.div 
            initial={{ y: "100%", scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: "100%", scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-[#F5F5F7] rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Nav */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-[#F5F5F7]/80 backdrop-blur-xl z-20 border-b border-gray-200/50 flex items-center justify-between px-8">
                <span className="font-heading font-semibold text-gray-800 text-lg tracking-tight">Interactive Resume</span>
                <div className="flex items-center gap-4">
                    <a 
                        href="/Khundrakpam_Bikash_Meitei_Resume.pdf"
                        download
                        className="hidden sm:flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium items-center gap-2 transition-colors shadow-sm"
                    >
                        <FileDown className="w-4 h-4" /> Download PDF
                    </a>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-200/80 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pt-32 pb-32 px-6 sm:px-16">
                
                {/* Hero */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-24"
                >
                    <h1 className="text-5xl sm:text-7xl font-heading font-bold text-gray-900 tracking-tighter mb-6">
                        Khundrakpam Bikash Meitei
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
                        AI Engineer specializing in Agentic AI, Generative Models, and scalable machine learning systems. Turning complex data into impact.
                    </p>
                </motion.div>

                {/* Experience */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900">Experience</h2>
                    </div>

                    <div className="space-y-12 border-l-2 border-gray-200 ml-6 pl-8 sm:pl-12 relative">
                        {/* Job 1 */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative"
                        >
                            <div className="absolute -left-[41px] sm:-left-[57px] top-1 w-5 h-5 bg-[#F5F5F7] border-4 border-blue-500 rounded-full" />
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest block mb-2">June 2024 - Present</span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">Software Development Engineer Intern</h3>
                            <h4 className="text-lg text-gray-500 font-medium mb-4">The Active Theory Project</h4>
                            <p className="text-gray-600 leading-relaxed max-w-2xl">
                                Engineered advanced 3D web experiences using React Three Fiber. Optimized rendering pipelines resulting in a 40% performance increase on mobile devices.
                            </p>
                        </motion.div>

                        {/* Open Source / Projects as Experience */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative"
                        >
                            <div className="absolute -left-[41px] sm:-left-[57px] top-1 w-5 h-5 bg-[#F5F5F7] border-4 border-blue-500 rounded-full" />
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest block mb-2">2023 - 2024</span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">Lead AI Developer</h3>
                            <h4 className="text-lg text-gray-500 font-medium mb-4">ReflexCube (Open Source)</h4>
                            <p className="text-gray-600 leading-relaxed max-w-2xl">
                                Architected and launched a no-code visual AI platform combining Agent Builders, RAG pipelines, and seamless FastAPI integration.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Education */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900">Education</h2>
                    </div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border border-gray-200 rounded-[2rem] p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">National Institute of Technology Rourkela</h3>
                                <h4 className="text-lg text-gray-600">B.Tech in Metallurgical and Materials Engineering</h4>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="block text-emerald-600 font-bold text-xl mb-1">CGPA: 8.84</span>
                                <span className="text-gray-400 font-medium">Class of 2025</span>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-100 mb-6" />
                        <p className="text-gray-500 text-sm leading-relaxed">
                            <strong className="text-gray-700">Relevant Coursework:</strong> Data Structures & Algorithms, Object Oriented Programming, DBMS, Machine Learning, Operating Systems.
                        </p>
                    </motion.div>
                </div>

                {/* Footer CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center py-12"
                >
                    <a 
                        href="/Khundrakpam_Bikash_Meitei_Resume.pdf"
                        download
                        className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full text-base font-semibold flex items-center gap-3 transition-transform hover:scale-105 shadow-xl shadow-black/10"
                    >
                        <FileDown className="w-5 h-5" /> Download Official PDF
                    </a>
                    <p className="text-gray-400 text-sm mt-6">Standard 1-page format optimized for ATS systems.</p>
                </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
