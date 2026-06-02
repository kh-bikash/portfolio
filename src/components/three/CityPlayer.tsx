import Ecctrl from 'ecctrl'
import { RobotCharacter } from './RobotCharacter'

export function CityPlayer() {
  return (
    <Ecctrl
      debug={false}
      maxVelLimit={6}
      jumpVel={5}
      position={[0, 5, 0]}
      camInitDis={-5}
      camMaxDis={-7}
      camMinDis={-2}
      camInitDir={{ x: 0, y: 0 }}
      camTargetPos={{ x: 0, y: 1.5, z: 0 }}
      mode="CameraBasedMovement"
      capsuleHalfHeight={0.4}
      capsuleRadius={0.4}
    >
      <RobotCharacter position={[0, -0.8, 0]} />
    </Ecctrl>
  )
}
