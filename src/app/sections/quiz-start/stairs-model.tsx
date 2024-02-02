'use client'
import { Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { useMedia } from '~/hooks/use-media'
import { isProd } from '~/lib/constants'
import { Animation, useScrollytelling } from '~/lib/scrollytelling-client'

import { ArrowModel } from './arrow-model'

type GLTFResult = GLTF & {
  nodes: {
    Column: THREE.Mesh
    Rail: THREE.Mesh
    GuardRail: THREE.Mesh
    Stairs: THREE.Mesh
  }
  materials: {
    column: THREE.Material
    railing: THREE.Material
    stairs: THREE.Material
    m_transparent: THREE.Material
  }
}

const modelUrl = (isProd ? '/teams' : '') + '/models/staircase.glb'

const scale = 0.1

useGLTF.preload(modelUrl)

const StairsModel = () => {
  const { timeline } = useScrollytelling()
  const { nodes } = useGLTF(modelUrl) as GLTFResult

  const { materials: vMaterials } = useGLTF(
    (isProd ? '/teams' : '') + '/models/house.glb'
  ) as GLTFResult

  const innerRef = useRef<THREE.Group>(null)

  const width = useThree(
    (state: { viewport: { width: any } }) => state.viewport.width
  )

  const isMobileSize = useMedia('(max-width: 767px)')
  const isTablet = useMedia('(max-width: 1239px)')

  let prevProgress = 0

  useFrame(() => {
    if (!innerRef.current) {
      return
    }

    if (!timeline?.scrollTrigger) return

    const curProgress = timeline.scrollTrigger.progress

    if (curProgress >= 0.56 && curProgress !== prevProgress) {
      innerRef.current.rotation.y += 0.075
    } else {
      innerRef.current.rotation.y += 0.0025
    }

    prevProgress = curProgress
  })

  return (
    <Float floatIntensity={0.1} rotationIntensity={0.5}>
      <group
        dispose={null}
        scale={
          isMobileSize ? width * 0.42 : isTablet ? width * 0.3 : width * 0.18
        }
        ref={innerRef}
      >
        <group scale={[scale, scale * 1.2, scale]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Column.geometry}
            material={vMaterials.m_transparent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Stairs.geometry}
            material={vMaterials.m_transparent}
          />
        </group>
      </group>
    </Float>
  )
}

export const CanvasWithStairsModel = ({ onPress }: { onPress: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <Animation
      tween={{
        start: 50,
        end: 100,
        fromTo: [
          { scale: 1, opacity: 1 },
          { scale: 2.2, opacity: 0, ease: 'power1' }
        ]
      }}
    >
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
            { opacity: 1, scale: 1, duration: 1 }
          )
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ opacity: 0, scale: 1 }}
        ref={canvasRef}
        data-mac-canvas-container
        onClick={onPress}
      >
        <pointLight position={[1, 0, 0]} intensity={1.5} />
        <pointLight position={[0, 0, 1]} intensity={1.7} />
        <pointLight position={[0, -1, 0]} intensity={2.2} />
        <StairsModel />
        <ArrowModel
          locations={[
            { position: [-1.48, 0.8, 0], rotation: [0.4, -0.1, -0.4] },
            { position: [0, 0.6, -1.52], rotation: [-0.4, 0.5, 10] },
            { position: [-1.4, -0.9, 0], rotation: [0.6, 0.2, 0.1] },
            { position: [0, -1, -1.29], rotation: [0.2, 0.1, 9] }
          ]}
        />
      </Canvas>
    </Animation>
  )
}
