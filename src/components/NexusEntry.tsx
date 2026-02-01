"use client"

import { NeuralGrid } from "@/components/dom/NeuralGrid"
import { NeuralMind } from "@/components/dom/NeuralMind"
import { PrismNav } from "@/components/dom/PrismNav"
import { SkillsConstellation } from "@/components/dom/SkillsConstellation"


import { HoloContact } from "@/components/dom/HoloContact"
import { MassiveFooter } from "@/components/dom/MassiveFooter"
import { ExperienceTimeline } from "@/components/dom/ExperienceTimeline"
import { GlassHUD } from "@/components/dom/GlassHUD"

import { LiveStats } from "@/components/dom/LiveStats"
import { ThoughtStream } from "@/components/dom/ThoughtStream"
import { useState } from "react"

import { ThemeMutator } from "@/components/dom/ThemeMutator"
import { AIDreamMode } from "@/components/dom/AIDreamMode"
import { SystemArchitecture } from "@/components/dom/SystemArchitecture"
import { TerminalOverride } from "@/components/dom/TerminalOverride"
import { EngineersHUD } from "@/components/dom/EngineersHUD"

export function NexusEntry() {
    return (
        <main className="relative w-full min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">

            {/* 1. Global UI Layers (Fixed) */}
            <PrismNav />
            {/* ProjectWarp removed in favor of /work page */}
            <GlassHUD />
            <EngineersHUD />

            {/* Control Cluster */}
            <div className="fixed top-8 right-8 z-[60] flex items-center gap-3 control-cluster">
                <ThemeMutator />
            </div>

            <AIDreamMode />
            <TerminalOverride />
            <ThoughtStream />

            {/* 2. Scrollable Content */}
            <div className="relative z-10 font-sans">
                <SystemArchitecture />
                <NeuralGrid />
                <ExperienceTimeline />
                <SkillsConstellation />
                <LiveStats />
                <HoloContact />
                <MassiveFooter />
            </div>

        </main>
    )
}
