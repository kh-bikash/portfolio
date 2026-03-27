"use client"

import { PrismNav } from "@/components/dom/PrismNav"
import { HeroSection } from "@/components/dom/HeroSection"
import { SkillsConstellation } from "@/components/dom/SkillsConstellation"
import { HoloContact } from "@/components/dom/HoloContact"
import { MassiveFooter } from "@/components/dom/MassiveFooter"
import { AboutSection } from "@/components/dom/AboutSection"
import { ExperienceTimeline } from "@/components/dom/ExperienceTimeline"
import { ResumeView } from "@/components/dom/ResumeView"
import { useUIStore } from "@/lib/ui-store"

export function NexusEntry() {
    const isRecruiterMode = useUIStore((state) => state.isRecruiterMode)

    return (
        <main className={`relative w-full min-h-screen ${isRecruiterMode ? 'bg-white dark:bg-[#0a0a0a]' : 'bg-[#fafafa] dark:bg-black'} text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-700`}>
            
            {!isRecruiterMode && <PrismNav />}

            {/* Resume Mode Toggle Button */}
            {!isRecruiterMode && (
                <div className="fixed top-8 right-8 md:right-16 z-[60]">
                    <button
                        onClick={() => useUIStore.getState().toggleRecruiterMode()}
                        className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-semibold tracking-widest uppercase hover:scale-105 active:scale-95 transition-transform shadow-lg"
                    >
                        Resume Mode
                    </button>
                </div>
            )}

            {isRecruiterMode ? (
                <ResumeView />
            ) : (
                /* Scrollable Aesthetic Content */
                <div className="relative z-10 font-sans">
                    <HeroSection />
                    <AboutSection />
                    <ExperienceTimeline />
                    <SkillsConstellation />
                    <HoloContact />
                    <MassiveFooter />
                </div>
            )}

        </main>
    )
}
