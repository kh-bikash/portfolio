"use client"

import { useEffect, useRef } from "react"
import { DawnHero } from "@/components/sections/DawnHero"
import { CloudFlight } from "@/components/travel/CloudFlight"
import { FivePathsRoles } from "@/components/sections/FivePathsRoles"
import { CorridorWalk } from "@/components/travel/CorridorWalk"
import { RainRoomAbout } from "@/components/sections/RainRoomAbout"
import { TrainWindow } from "@/components/travel/TrainWindow"
import { TrainStopsExperience } from "@/components/sections/TrainStopsExperience"
import { SpecialistSkills } from "@/components/sections/SpecialistSkills"
import { GalleryProjects } from "@/components/sections/GalleryProjects"
import { NightRainDrive } from "@/components/travel/NightRainDrive"
import { WaterDrift } from "@/components/travel/WaterDrift"
import { DoorwayContact } from "@/components/sections/DoorwayContact"
import { CreditsFooter } from "@/components/sections/CreditsFooter"
import { useAmbientAudio } from "@/lib/ambient-audio"

// Wrapper to auto-play/stop ambient sound when a section enters/leaves viewport
function AudioZone({ sound, children }: { sound: "wind" | "rain" | "train" | "night" | "water"; children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const { play, stop } = useAmbientAudio()

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    play(sound)
                } else {
                    stop(sound)
                }
            },
            { threshold: 0.2 }
        )

        observer.observe(el)
        return () => {
            observer.disconnect()
            stop(sound)
        }
    }, [sound, play, stop])

    return <div ref={ref}>{children}</div>
}

export function ScrollDirector() {
    return (
        <div className="film-reel paper-texture">
            {/* ═══ ACT 1: ARRIVAL — Wind ═══ */}
            <AudioZone sound="wind">
                <DawnHero />
                <CloudFlight />
            </AudioZone>

            {/* ═══ ACT 2: DISCOVERY — (quiet) ═══ */}
            <FivePathsRoles />
            <CorridorWalk />

            {/* ═══ ACT 3: INTIMACY — Rain ═══ */}
            <AudioZone sound="rain">
                <RainRoomAbout />
            </AudioZone>

            {/* ═══ ACT 4: JOURNEY — Train ═══ */}
            <AudioZone sound="train">
                <TrainWindow />
                <TrainStopsExperience />
            </AudioZone>

            {/* ═══ ACT 5: GALLERY — (quiet) ═══ */}
            <GalleryProjects />

            {/* ═══ ACT 6: NIGHT — Night drive ═══ */}
            <AudioZone sound="night">
                <NightRainDrive />
            </AudioZone>

            {/* ═══ ACT 7: WONDER — Skills ═══ */}
            <SpecialistSkills />

            {/* ═══ ACT 8: WATER — Water ═══ */}
            <AudioZone sound="water">
                <WaterDrift />
            </AudioZone>

            {/* ═══ ACT 9: CONNECTION ═══ */}
            <DoorwayContact />
            <CreditsFooter />
        </div>
    )
}
