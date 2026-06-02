import { Text } from '@react-three/drei'
import { Project } from '@/lib/project-data'

export function ProjectBillboard({ 
  project, 
  position, 
  rotation 
}: { 
  project: Project
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Billboard backing */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[6, 4, 0.5]} />
        <meshStandardMaterial color="#2A2520" />
      </mesh>
      {/* Stand */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 3]} />
        <meshStandardMaterial color="#1A1510" />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 3, 0.26]}>
        <planeGeometry args={[5.8, 3.8]} />
        <meshBasicMaterial color="#E2D4C5" />
      </mesh>

      {/* Content on Screen */}
      <group position={[0, 3, 0.27]}>
        <Text
          position={[-2.6, 1.4, 0]}
          fontSize={0.4}
          color="#3A352F"
          anchorX="left"
          anchorY="top"
          maxWidth={5.2}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          position={[-2.6, 0.8, 0]}
          fontSize={0.2}
          color="#8A8580"
          anchorX="left"
          anchorY="top"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {project.language} | ⭐ {project.stars}
        </Text>
        <Text
          position={[-2.6, 0.3, 0]}
          fontSize={0.18}
          color="#3A352F"
          anchorX="left"
          anchorY="top"
          maxWidth={5.2}
          lineHeight={1.4}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {project.description.substring(0, 150)}{project.description.length > 150 ? '...' : ''}
        </Text>
        <Text
          position={[-2.6, -1.5, 0]}
          fontSize={0.15}
          color="#C85A5A"
          anchorX="left"
          anchorY="top"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          Topics: {project.topics.slice(0, 4).join(', ') || 'None'}
        </Text>
      </group>
    </group>
  )
}
