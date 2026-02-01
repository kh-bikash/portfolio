"use client"

import { EtherealHero } from "@/components/dom/EtherealHero"
import { FloatingNavbar } from "@/components/dom/FloatingNavbar"
import { GalleryRail } from "@/components/dom/GalleryRail"
import { SkillOrchestra } from "@/components/dom/SkillOrchestra"
import { CleanResume } from "@/components/dom/CleanResume"
import { ContactPaper } from "@/components/dom/ContactPaper"
import { VerticalGallery } from "@/components/dom/VerticalGallery"
import { AuroraBackground } from "@/components/dom/AuroraBackground"
import { MassiveFooter } from "@/components/dom/MassiveFooter"

export function PortfolioEntry() {
    return (
        <main className="relative w-full min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
            <FloatingNavbar />

            {/* 1. HERO SECTION (Character & Intro) */}
            <section id="home">
                <EtherealHero />
            </section>

            {/* 2. GALLERY RAIL */}
            <section id="work">
                <GalleryRail />
            </section>

            {/* 3. STUDIO / SKILLS */}
            <section id="about">
                <SkillOrchestra />
            </section>

            {/* 4. FOOTER (Coming Soon) */}

        </main>
    )
}
