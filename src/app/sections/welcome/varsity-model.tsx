"use client";
import { gsap } from "gsap";
import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useScrollytelling } from "~/lib/scrollytelling-client";
import { useMedia } from "~/hooks/use-media";

type GLTFResult = GLTF & {
  nodes: {
    Vlogo: THREE.Mesh;
  };
  materials: {
    m_Vlogo: THREE.Material;
  };
};

useGLTF.preload("/models/varsity.glb");

const VarsityModel = () => {
  const { timeline } = useScrollytelling();
  const { nodes, materials } = useGLTF(
    "/models/varsity.glb"
  ) as GLTFResult;
  const innerRef = useRef<THREE.Group>(null);
  const width = useThree((state: { viewport: { width: any; }; }) => state.viewport.width);
  const isMobileSize = useMedia("(max-width: 768px)");
  useFrame(() => {
    if (!innerRef.current || !timeline?.scrollTrigger) return;

    innerRef.current.rotation.y = Math.PI * 2 * timeline.scrollTrigger.progress;
  });

  return (
    <Float>
      <group dispose={null} scale={isMobileSize ? width * 1.2 : width * 0.5} ref={innerRef}>
        <group position={[0, 0, 0]} rotation={[0, 0.05, 0.05]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vlogo.geometry}
            material={materials.m_Vlogo}
          />
        </group>
      </group>
    </Float>
  );
};

export const CanvasWithVarsityModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ position: [1, 0, 1], fov: 55 }}
      onCreated={() => {
        gsap.set(canvasRef.current, {
          width: "100%",
          height: "100vh",
        });
        gsap.to(
          canvasRef.current?.closest('[data-mac-canvas-container="true"]') ||
            null,
          { opacity: 0.7, scale: 1, duration: 0.15 }
        );
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ opacity: 0, scale: 1 }}
      ref={canvasRef}
      data-mac-canvas-container
    >
      <pointLight position={[1, 0, 0]} intensity={1.5} />
      <pointLight position={[0, 0, 1]} intensity={1.7} />
      <pointLight position={[0, -1, 0]} intensity={2.2} />
      <VarsityModel />
    </Canvas>
  );
};
