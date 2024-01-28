'use client'
import { Float, useGLTF } from '@react-three/drei'
import { Euler, useThree, Vector3 } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { useMedia } from '~/hooks/use-media'
import { isProd } from '~/lib/constants'

type GLTFResult = GLTF & {
  nodes: {
    Arrow: THREE.Mesh
  }
  materials: {
    material: THREE.Material
  }
}

useGLTF.preload((isProd ? '/teams' : '') + '/models/arrow.glb')

export const ArrowModel = ({
  locations
}: {
  locations: { position: Vector3; rotation: Euler }[]
}) => {
  const { nodes, materials } = useGLTF(
    (isProd ? '/teams' : '') + '/models/arrow.glb'
  ) as GLTFResult

  const width = useThree(
    (state: { viewport: { width: any } }) => state.viewport.width
  )
  const isMobileSize = useMedia('(max-width: 768px)')

  const arrows = locations.map(({ position, rotation }, index) => {
    return (
      <Float key={index} floatIntensity={0.5} rotationIntensity={0.5}>
        <group
          dispose={null}
          scale={isMobileSize ? width * 0.42 : width * 0.25}
        >
          <group
            position={position}
            rotation={rotation}
            scale={[0.15, 0.15, 0.15]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Arrow.geometry}
              material={materials.material}
            />
          </group>
        </group>
      </Float>
    )
  })

  return <>{arrows}</>
}
