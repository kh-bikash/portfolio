"use client"

import { SmoothScroll } from "@/components/dom/SmoothScrollProvider"
import { InkCursor } from "@/components/dom/InkCursor"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SmoothScroll>
            <InkCursor />
            {children}
        </SmoothScroll>
    )
}
