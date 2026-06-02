import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

export function RobotCharacter(props: any) {
  const [, get] = useKeyboardControls()
  const group = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Group>(null)
  const rightLeg = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!group.current || !leftLeg.current || !rightLeg.current || !leftArm.current || !rightArm.current) return
    const { forward, backward, left, right } = get()
    // ecctrl might also use other keys or gamepad, but this is a simple approximation
    const isMoving = forward || backward || left || right
    
    if (isMoving) {
      const t = state.clock.getElapsedTime() * 15
      leftLeg.current.rotation.x = Math.sin(t) * 0.6
      rightLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.6
      leftArm.current.rotation.x = Math.sin(t + Math.PI) * 0.6
      rightArm.current.rotation.x = Math.sin(t) * 0.6
      group.current.position.y = Math.abs(Math.sin(t * 2)) * 0.05
    } else {
      leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1)
      rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1)
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1)
      rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 0.1)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#E2D4C5" roughness={0.3} />
        {/* Eyes */}
        <mesh position={[-0.1, 0.05, 0.251]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#3A352F" />
        </mesh>
        <mesh position={[0.1, 0.05, 0.251]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#3A352F" />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#3A352F" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial color="#C85A5A" emissive="#C85A5A" emissiveIntensity={2} />
        </mesh>
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#3A352F" roughness={0.8} />
      </mesh>

      {/* Left Arm (grouped for pivot at shoulder) */}
      <group ref={leftArm} position={[-0.4, 1.1, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#E2D4C5" />
        </mesh>
      </group>

      {/* Right Arm (grouped for pivot at shoulder) */}
      <group ref={rightArm} position={[0.4, 1.1, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#E2D4C5" />
        </mesh>
      </group>

      {/* Left Leg (grouped for pivot at hip) */}
      <group ref={leftLeg} position={[-0.15, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#3A352F" />
        </mesh>
      </group>

      {/* Right Leg (grouped for pivot at hip) */}
      <group ref={rightLeg} position={[0.15, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#3A352F" />
        </mesh>
      </group>
    </group>
  )
}
