import { useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { ProjectBillboard } from './ProjectBillboard'
import { Project, fetchGithubProjects } from '@/lib/project-data'

export function CityEnvironment() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchGithubProjects().then((data) => {
      // Take up to 8 projects to place around the city
      setProjects(data.slice(0, 8))
    })
  }, [])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[20, 30, 10]} intensity={1.5} castShadow />
      
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[200, 1, 200]} />
          <meshStandardMaterial color="#A29485" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Buildings (Simple Blocks to form streets) */}
      <RigidBody type="fixed" colliders="cuboid" position={[-15, 5, -15]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#827465" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[20, 8, -25]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[12, 16, 12]} />
          <meshStandardMaterial color="#726455" />
        </mesh>
      </RigidBody>
      
      <RigidBody type="fixed" colliders="cuboid" position={[25, 4, 15]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[14, 8, 14]} />
          <meshStandardMaterial color="#625445" />
        </mesh>
      </RigidBody>
      
      <RigidBody type="fixed" colliders="cuboid" position={[-25, 12, 20]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[10, 24, 10]} />
          <meshStandardMaterial color="#524435" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[-5, 3, 30]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[8, 6, 8]} />
          <meshStandardMaterial color="#726455" />
        </mesh>
      </RigidBody>

      {/* Central Monument / Fountain placeholder */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, 1, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 2, 8]} />
          <meshStandardMaterial color="#C85A5A" />
        </mesh>
      </RigidBody>

      {/* Billboards scattered around the plaza */}
      {projects.map((project, index) => {
        // Place them in a circle around the center, radius 15
        const angle = (index / projects.length) * Math.PI * 2
        const radius = 12
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        // Rotate billboard to face the center
        const rotationY = -angle + Math.PI / 2
        
        return (
          <RigidBody type="fixed" colliders="hull" key={project.id}>
            <ProjectBillboard 
              project={project} 
              position={[x, 0, z]} 
              rotation={[0, rotationY, 0]} 
            />
          </RigidBody>
        )
      })}
    </>
  )
}
