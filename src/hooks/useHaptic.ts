"use client"

import { useCallback } from "react"

export function useHaptic() {
    const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern)
        }
    }, [])

    return { triggerHaptic }
}
