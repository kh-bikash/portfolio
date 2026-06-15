"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * FalseEarthWebGL — immersive Three.js neural particle field
 * Inspired by the false-earth bioluminescent atmospheric aesthetic.
 * Features:
 *  - Floating particle sphere (neural network nodes)
 *  - Animated connection lines between nearby nodes (synapses)
 *  - Slow cosmic rotation
 *  - Mouse parallax interaction
 *  - Bloom-like glow via additive blending
 */
export function FalseEarthWebGL() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene Setup ─────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 28)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Particle Nodes ───────────────────────────────────────
    const NODE_COUNT = 220
    const RADIUS = 10

    const nodePositions: THREE.Vector3[] = []
    const nodeVelocities: THREE.Vector3[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = RADIUS * (0.6 + Math.random() * 0.4)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      nodePositions.push(new THREE.Vector3(x, y, z))
      nodeVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
      ))
    }

    // ── Node Points (green dots) ─────────────────────────────
    const nodeGeo = new THREE.BufferGeometry()
    const nodePos = new Float32Array(NODE_COUNT * 3)
    const nodeColors = new Float32Array(NODE_COUNT * 3)

    nodePositions.forEach((p, i) => {
      nodePos[i * 3] = p.x
      nodePos[i * 3 + 1] = p.y
      nodePos[i * 3 + 2] = p.z
      // Mix green (#4ade80) and amber (#f59e0b) with slight variation
      const isAmber = Math.random() < 0.2
      nodeColors[i * 3] = isAmber ? 0.96 : 0.29
      nodeColors[i * 3 + 1] = isAmber ? 0.62 : 0.87
      nodeColors[i * 3 + 2] = isAmber ? 0.04 : 0.50
    })

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3))
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3))

    const nodeMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const nodePoints = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodePoints)

    // ── Connection Lines ─────────────────────────────────────
    const MAX_CONNECTIONS = 500
    const CONNECTION_DIST = 5.5

    const lineGeo = new THREE.BufferGeometry()
    const linePos = new Float32Array(MAX_CONNECTIONS * 2 * 3) // 2 verts per line
    const lineColors = new Float32Array(MAX_CONNECTIONS * 2 * 3)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    scene.add(lineMat)

    // ── Ambient starfield (background dots) ──────────────────
    const STAR_COUNT = 600
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xd4e8d4,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    scene.add(new THREE.Points(starGeo, starMat))

    // ── Outer glow ring (atmospheric) ───────────────────────
    const ringGeo = new THREE.TorusGeometry(12, 0.05, 8, 120)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    scene.add(ring)

    // ── Mouse Tracking ───────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ── Resize Handler ───────────────────────────────────────
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // ── Animation Loop ───────────────────────────────────────
    let frameId: number
    let t = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.003

      // Slow group rotation
      nodePoints.rotation.y = t * 0.15
      nodePoints.rotation.x = Math.sin(t * 0.08) * 0.15
      lineMat.rotation.y = t * 0.15
      lineMat.rotation.x = Math.sin(t * 0.08) * 0.15
      ring.rotation.z = t * 0.04
      ring.rotation.y = t * 0.02

      // Animate individual nodes (subtle float)
      const posArr = nodeGeo.attributes.position.array as Float32Array
      nodePositions.forEach((p, i) => {
        p.addScaledVector(nodeVelocities[i], 1)
        // Keep on sphere surface — soft radial clamp
        const dist = p.length()
        const targetR = RADIUS * (0.6 + 0.4 * Math.abs(Math.sin(t + i * 0.4)))
        if (dist > targetR * 1.1 || dist < targetR * 0.9) {
          p.setLength(targetR)
          nodeVelocities[i].negate()
        }
        posArr[i * 3] = p.x
        posArr[i * 3 + 1] = p.y
        posArr[i * 3 + 2] = p.z
      })
      nodeGeo.attributes.position.needsUpdate = true

      // Rebuild connections
      let connIdx = 0
      outer: for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (connIdx >= MAX_CONNECTIONS) break outer
          const dx = nodePositions[i].x - nodePositions[j].x
          const dy = nodePositions[i].y - nodePositions[j].y
          const dz = nodePositions[i].z - nodePositions[j].z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECTION_DIST) {
            const alpha = 1 - dist / CONNECTION_DIST
            const base = connIdx * 6
            linePos[base] = nodePositions[i].x; linePos[base + 1] = nodePositions[i].y; linePos[base + 2] = nodePositions[i].z
            linePos[base + 3] = nodePositions[j].x; linePos[base + 4] = nodePositions[j].y; linePos[base + 5] = nodePositions[j].z
            // green lines with alpha fade
            lineColors[base] = 0.29 * alpha; lineColors[base + 1] = 0.87 * alpha; lineColors[base + 2] = 0.50 * alpha
            lineColors[base + 3] = 0.29 * alpha; lineColors[base + 4] = 0.87 * alpha; lineColors[base + 5] = 0.50 * alpha
            connIdx++
          }
        }
      }
      // Zero out unused slots
      for (let i = connIdx * 6; i < MAX_CONNECTIONS * 6; i++) linePos[i] = 0
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true

      // Mouse parallax camera drift
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
