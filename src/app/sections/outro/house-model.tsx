'use client'
import { Float, useGLTF } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { useMedia } from '~/hooks/use-media'
import { isProd } from '~/lib/constants'

type GLTFResult = GLTF & {
  nodes: {
    House: THREE.Mesh
    House_1: THREE.Mesh
    House_2: THREE.Mesh
    House_3: THREE.Mesh
    House_4: THREE.Mesh
    House_5: THREE.Mesh
    House_6: THREE.Mesh
    House_7: THREE.Mesh
    House_8: THREE.Mesh
  }
  materials: {
    m_wall: THREE.Material
    m_roof: THREE.Material
    m_handle: THREE.Material
    m_transparent: THREE.Material
  }
}

useGLTF.preload((isProd ? '/teams' : '') + '/models/house.glb')

const HouseModel = () => {
  const { nodes, materials } = useGLTF(
    (isProd ? '/teams' : '') + '/models/house.glb'
  ) as GLTFResult
  const innerRef = useRef<THREE.Group>(null)
  const width = useThree(
    (state: { viewport: { width: any } }) => state.viewport.width
  )
  const isMobileSize = useMedia('(max-width: 768px)')

  return (
    <Float>
      <group
        dispose={null}
        scale={isMobileSize ? width * 0.42 : width * 0.22}
        ref={innerRef}
      >
        <group position={[0, 0, 0]} rotation={[0, 10, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_1.geometry}
            material={materials.m_transparent} // wall
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_2.geometry}
            material={materials.m_roof} // roof
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_3.geometry} // door
            material={materials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_4.geometry}
            material={materials.m_handle} // door handle
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_5.geometry}
            material={materials.m_transparent} // window frame & stuff
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_7.geometry}
            material={materials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.House_8.geometry}
            material={materials.m_transparent}
          />
        </group>
      </group>
    </Float>
  )
}

export const CanvasWithHouseModel = () => {
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
          canvasRef.current?.closest('[data-house-canvas-container="true"]') ||
            null,
          { opacity: 1, scale: 1, duration: 0.15 }
        )
      }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{
        opacity: 0,
        scale: 1
      }}
      ref={canvasRef}
      data-house-canvas-container
    >
      <pointLight position={[1, 0, 0]} intensity={1.5} />
      <pointLight position={[0, 0, 1]} intensity={1.7} />
      <pointLight position={[0, -1, 0]} intensity={2.2} />
      <HouseModel />
    </Canvas>
  )
}
