'use client'
import { Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { useMedia } from '~/hooks/use-media'
import { isProd } from '~/lib/constants'
import { useScrollytelling } from '~/lib/scrollytelling-client'

type GLTFResult = GLTF & {
  nodes: {
    Door_1: THREE.Mesh
    Door_2: THREE.Mesh
    Door_3: THREE.Mesh
    Door_4: THREE.Mesh
    Door_5: THREE.Mesh
    Door_6: THREE.Mesh
  }
  materials: {
    m_hinge: THREE.Material
    m_key: THREE.Material
    m_light_rim: THREE.Material
    m_light: THREE.Material
    m_wood: THREE.Material
    m_frame: THREE.Material
    m_transparent: THREE.Material
  }
}

useGLTF.preload((isProd ? '/teams' : '') + '/models/door.glb')

const DoorModel = ({ onPress }: { onPress: () => void }) => {
  const { timeline } = useScrollytelling()
  const { nodes, materials } = useGLTF(
    (isProd ? '/teams' : '') + '/models/door.glb'
  ) as GLTFResult

  const { materials: vMaterials } = useGLTF(
    (isProd ? '/teams' : '') + '/models/house.glb'
  ) as GLTFResult

  const innerRef = useRef<THREE.Group>(null)
  const width = useThree(
    (state: { viewport: { width: any } }) => state.viewport.width
  )
  const isMobileSize = useMedia('(max-width: 768px)')
  useFrame(() => {
    if (!innerRef.current || !timeline?.scrollTrigger) return

    innerRef.current.rotation.y = Math.PI * 2 * timeline.scrollTrigger.progress
  })

  return (
    <Float onClick={onPress}>
      <group
        dispose={null}
        scale={isMobileSize ? width * 0.42 : width * 0.25}
        ref={innerRef}
      >
        <group
          position={[0, -0.8, 0]}
          rotation={[-1.6, 0, 0.6]}
          scale={[0.15, 0.15, 0.15]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_1.geometry}
            material={vMaterials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_2.geometry}
            material={vMaterials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_3.geometry}
            material={materials.m_light_rim}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_4.geometry}
            material={materials.m_light}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_5.geometry}
            material={vMaterials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Door_6.geometry}
            material={materials.m_frame}
          />
        </group>
      </group>
    </Float>
  )
}

export const CanvasWithDoorModel = ({ onPress }: { onPress: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <Canvas
      camera={{ position: [1, 0, 1], fov: 77 }}
      onCreated={() => {
        gsap.set(canvasRef.current, {
          width: '100%',
          height: '100vh'
        })
        gsap.to(
          canvasRef.current?.closest('[data-mac-canvas-container="true"]') ||
            null,
          { opacity: 1, scale: 1, duration: 0.15 }
        )
      }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ opacity: 0, scale: 1 }}
      ref={canvasRef}
      data-mac-canvas-container
    >
      <pointLight position={[1, 0, 0]} intensity={1.5} />
      <pointLight position={[0, 0, 1]} intensity={1.7} />
      <pointLight position={[0, -1, 0]} intensity={2.2} />
      <DoorModel onPress={onPress} />
    </Canvas>
  )
}
