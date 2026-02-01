"use client"

import { motion } from "framer-motion"
import { Book, Star } from "lucide-react"

const BOOKS = [
    { title: "Superintelligence", author: "Nick Bostrom", color: "bg-blue-600" },
    { title: "Life 3.0", author: "Max Tegmark", color: "bg-cyan-600" },
    { title: "The Singularity Is Near", author: "Ray Kurzweil", color: "bg-purple-600" },
    { title: "Clean Code", author: "Robert C. Martin", color: "bg-green-600" },
    { title: "Snow Crash", author: "Neal Stephenson", color: "bg-red-600" },
    { title: "Neuromancer", author: "William Gibson", color: "bg-pink-600" },
    { title: "Zero to One", author: "Peter Thiel", color: "bg-yellow-600" }
]

export function ReadingList() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="flex items-end gap-1 perspective-[1000px]">
                {BOOKS.map((book, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: 200 + Math.random() * 100 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`relative w-12 rounded-t-sm border-l border-t border-white/20 hover:-translate-y-4 transition-transform duration-300 group cursor-pointer ${book.color} backdrop-blur-md bg-opacity-40`}
                    >
                        {/* SPINE TEXT */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white/80 -rotate-90 whitespace-nowrap tracking-wider">
                                {book.title}
                            </span>
                        </div>

                        {/* GLOW ON HOVER */}
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* HOVER DETAILS TOOLTIP */}
                        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-white/20 p-4 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                            <div className="flex justify-between items-start mb-2">
                                <Book className="w-4 h-4 text-primary" />
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2 h-2 text-yellow-500 fill-yellow-500" />)}
                                </div>
                            </div>
                            <h4 className="text-sm font-bold text-white mb-1">{book.title}</h4>
                            <p className="text-[10px] text-gray-400">By {book.author}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-10 text-center w-full pointer-events-none">
                <h2 className="text-white/20 text-xs font-mono mb-1">NEURAL_LIBRARY_ARCHIVE</h2>
                <p className="text-[8px] text-primary/50 tracking-[0.5em]">KNOWLEDGE_BASE</p>
            </div>
        </div>
    )
}
