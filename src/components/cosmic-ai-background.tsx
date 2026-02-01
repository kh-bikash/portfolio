"use client"

import { useEffect, useRef } from "react"
import { useUIStore } from "@/store/useUIStore"

export function CosmicAIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeProjectImage } = useUIStore()
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Load Project Image
  useEffect(() => {
    if (activeProjectImage) {
      const img = new Image()
      img.src = activeProjectImage
      img.onload = () => { imageRef.current = img }
    } else {
      imageRef.current = null
    }
  }, [activeProjectImage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    let nodes: Node[] = [] // NEURAL NODES

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    // Config
    const isMobile = window.innerWidth < 768
    const STAR_COUNT = isMobile ? 300 : 800
    const NODE_COUNT = isMobile ? 30 : 60
    const SPEED = 0.05
    const CONNECTION_DIST = isMobile ? 100 : 150
    const MOUSE_DIST = isMobile ? 150 : 250

    interface Star {
      x: number, y: number, z: number
      size: number, brightness: number, pulseSpeed: number
      color: string, type: 'star' | 'nebula'
    }

    interface Node {
      x: number, y: number
      vx: number, vy: number
    }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = []
      nodes = []

      // 1. Background Stars (Deep Space)
      const hours = new Date().getHours()
      const isDay = hours >= 6 && hours < 18

      // 1. Background Stars (Deep Space)
      for (let i = 0; i < STAR_COUNT; i++) {
        const isNebula = Math.random() > 0.8
        // Day: Cyan/White (180-220), Night: Purple/Blue (230-290)
        const baseHue = isDay ? 190 : 240
        const hue = isNebula ? (Math.random() * 60 + baseHue) : (Math.random() * 40 + (baseHue - 20))

        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 3,
          y: (Math.random() - 0.5) * canvas.height * 3,
          z: Math.random() * canvas.width,
          size: Math.random() * (isNebula ? 4 : 2),
          brightness: Math.random(),
          pulseSpeed: 0.01 + Math.random() * 0.02,
          color: `hsla(${hue}, ${isNebula ? '60%' : '80%'}, ${isNebula ? '50%' : '80%'},`,
          type: isNebula ? 'nebula' : 'star'
        })
      }

      // 2. Network Nodes (Floating Overlay)
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        })
      }
    }

    const animate = () => {
      // TIME OF DAY CHECK
      const hours = new Date().getHours()
      const isDay = hours >= 6 && hours < 18

      // CLEAR & PROJECTION LAYER
      if (imageRef.current) {
        ctx.globalAlpha = 0.15
        // Center crop logic
        const img = imageRef.current
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
        const centerShift_x = (canvas.width - img.width * ratio) / 2
        const centerShift_y = (canvas.height - img.height * ratio) / 2
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
        ctx.globalAlpha = 1.0

        ctx.fillStyle = "rgba(2, 2, 8, 0.85)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // DYNAMIC BACKGROUND GRADIENT
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);

        if (isDay) {
          // DAY: Brighter, Cyan/Teal Tint
          gradient.addColorStop(0, "rgba(5, 30, 40, 0.3)");
          gradient.addColorStop(1, "rgba(0, 10, 15, 0.6)");
        } else {
          // NIGHT: Deep Void, Purple Tint
          gradient.addColorStop(0, "rgba(5, 10, 30, 0.2)");
          gradient.addColorStop(1, "rgba(0, 0, 5, 0.5)");
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.globalCompositeOperation = "lighter"

      // Smooth Parallax
      targetX += (mouseX - targetX) * 0.02
      targetY += (mouseY - targetY) * 0.02
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // RIPPLE EFFECT (Task 47)
      const ripples: { x: number, y: number, r: number, alpha: number }[] = (canvas as any).ripples || []

      // Add new ripple occasionally on mouse move
      if (Math.random() > 0.8 && mouseX !== 0) { // Check mouseX instead of mouse object
        ripples.push({ x: mouseX + centerX, y: mouseY + centerY, r: 0, alpha: 1 })
      }

      // Draw Ripples
      ripples.forEach((ripple, i) => {
        ripple.r += 2
        ripple.alpha -= 0.02

        if (ripple.alpha <= 0) {
          ripples.splice(i, 1)
          return
        }

        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${isDay ? '0,255,255' : '100,100,255'}, ${ripple.alpha * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

        // Save ripples for next frame
        ; (canvas as any).ripples = ripples

      // RENDER STARS (3D)
      stars.forEach((star) => {
        const speed = star.type === 'nebula' ? SPEED * 10 : SPEED * 30
        star.z -= speed
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 3
          star.y = (Math.random() - 0.5) * canvas.height * 3
          star.z = canvas.width
        }

        const k = 400 / star.z
        const px = (star.x + targetX * (star.type === 'nebula' ? 0.2 : 0.5)) * k + centerX
        const py = (star.y + targetY * (star.type === 'nebula' ? 0.2 : 0.5)) * k + centerY

        const projectedSize = Math.max(0.1, star.size * k)
        star.brightness += star.pulseSpeed
        const opacity = (Math.sin(star.brightness) + 1) / 2
        const depthOpacity = Math.min(1, (canvas.width - star.z) / 1000)

        // Tint stars if projection active
        const color = imageRef.current ? `hsla(40, 90%, 70%,` : star.color

        ctx.beginPath()
        ctx.fillStyle = `${color} ${opacity * depthOpacity})`
        ctx.arc(px, py, projectedSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // RENDER NEURAL NETWORK (2D Overlay)
      const mouseNode = { x: mouseX + centerX, y: mouseY + centerY } // Correct mouse pos

      ctx.lineWidth = 1
      nodes.forEach((node, i) => {
        // Move
        node.x += node.vx
        node.y += node.vy

        // Bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Connect to Mouse (Gravity + Line)
        const dxMouse = mouseNode.x - node.x
        const dyMouse = mouseNode.y - node.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < MOUSE_DIST) {
          // Gravity Pull
          node.x += dxMouse * 0.005
          node.y += dyMouse * 0.005

          // Line
          const alpha = 1 - distMouse / MOUSE_DIST
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.5})`
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseNode.x, mouseNode.y)
          ctx.stroke()
        }

        // Connect to Neighbors
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j]
          const dx = nodeB.x - node.x
          const dy = nodeB.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = 1 - dist / CONNECTION_DIST
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.2})` // Faint cyan
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()
          }
        }

        // Draw Node
        ctx.fillStyle = `rgba(0, 229, 255, 0.5)`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = "source-over"
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2)
      mouseY = (e.clientY - window.innerHeight / 2)
    }

    window.addEventListener("resize", init)
    window.addEventListener("mousemove", handleMouseMove)
    init()
    animate()

    return () => {
      window.removeEventListener("resize", init)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [activeProjectImage])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none bg-black transition-opacity duration-1000"
        aria-hidden="true"
      />
      {/* DAY/NIGHT INDICATOR (Optional debug or just ambiance) */}
      {/* <div className="fixed top-4 left-4 z-50 text-[9px] text-white/20 font-mono pointer-events-none">
            {new Date().getHours() >= 6 && new Date().getHours() < 18 ? "SOLAR SYSTEM: DAY" : "SOLAR SYSTEM: NIGHT"} 
        </div> */}
    </>
  )
}
