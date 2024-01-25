import * as Scrollytelling from "@bsmnt/scrollytelling";
import React, { useMemo } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Euler, Vector3 } from "three";
import { useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Vlogo: THREE.Mesh;
  };
  materials: {
    ["m_Vlogo"]: THREE.MeshStandardMaterial;
  };
};

const capProps: { position: Vector3; rotation: Euler; progress: number }[] = [
  {
    position: new Vector3(-0.08, -0.1, 0.1),
    rotation: new Euler(0.4, -0.6, 0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.5, -0.1, 0.55),
    rotation: new Euler(0, -0.3, -0.5, "ZYX"),
    progress: 0,
  },
  {
    position: new Vector3(0.22, 0.15, 0.4),
    rotation: new Euler(0.55, -0.6, 0.8, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.05, 0.12, 1.1),
    rotation: new Euler(0.1, -0.6, -0.4, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.3, -0.13, 1.1),
    rotation: new Euler(0.1, -0.7, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(0.48, 0.22, 0.8),
    rotation: new Euler(0.5, 0, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.48, 0.26, 0.8),
    rotation: new Euler(0.5, 0.9, 0.5, "XZY"),
    progress: 0,
  },
  {
    position: new Vector3(-0.12, -0.26, 1),
    rotation: new Euler(0.2, 0.65, 0.5, "XZY"),
    progress: 0,
  },
];

export const VlogosModel = () => {
  const innerRef = React.useRef<THREE.Group>(null);
  const { width } = useThree((state) => state.viewport);
  const { nodes, materials } = useGLTF("/models/vlogo.glb") as GLTFResult;

  const clonedMaterials: {
    "m_Vlogo": THREE.MeshStandardMaterial;
  }[] = useMemo(() => {
    materials["m_Vlogo"].transparent = true;
    materials["m_Vlogo"].opacity = 0;

    return Array(capProps.length)
      .fill(0)
      .map((_, idx) => {
        const clonedMaterials = {
          ["m_Vlogo"]: materials["m_Vlogo"].clone(),
        };

        clonedMaterials["m_Vlogo"].userData.idx = idx;

        return clonedMaterials;
      });
  }, [materials]);

  const responsiveVPWidth = Math.max(width, 4);
  const halfViewportWidth = responsiveVPWidth / 2;
  const fadeInYoffset = 0.1;


  const handleUpdate = React.useCallback(
    (idx: number) => {
      const currMaterials = clonedMaterials[idx];

      if (!currMaterials) return;

      const currCapProps = capProps[idx];
      const currObj = innerRef.current?.children[idx] as THREE.Object3D;

      if (!currObj || !currCapProps) return;

      const isEven = idx % 2 === 0;
      const currObjPosition = currCapProps.position
        .clone()
        .multiplyScalar(halfViewportWidth);
      const invProgress = 1 - currCapProps.progress;

      currMaterials["m_Vlogo"].opacity = currCapProps.progress;

      currObj.rotation.y =
        currCapProps.rotation.y +
        (isEven ? 1 : -1) * (currCapProps.progress * Math.PI * 2);
      currObj.position.y = currObjPosition.y - invProgress * fadeInYoffset;
    },
    [clonedMaterials, halfViewportWidth]
  );

  return (
    <>
      <Scrollytelling.Stagger
        overlap={0.65}
        tween={
          {
            start: 48,
            end: 100,
            target: capProps,
            to: {
              progress: 1,
              ease: "power2.inOut",
              /* We pass current target idx by params */
              onUpdate: (idx) => {
                handleUpdate(idx);
              },
            },
          }
        }
      />

      {/* clean this up when the scrollytelling leaves, as when scrolling really fast,
          GSAP is not being able to do so */}
      <Scrollytelling.Waypoint
        // at the very start of the scrollTrigger
        at={0}
        // when user scrolls back to the top
        onReverseCall={() => {
          // reset all caps
          capProps.forEach((capProp, idx) => {
            capProp.progress = 0;
            handleUpdate(idx);
          });
        }}
      />

      <group ref={innerRef}>
        {capProps.map(({ position, rotation }, idx) => {
          return (
            <group
              scale={responsiveVPWidth / 9}
              position={position.clone().multiplyScalar(halfViewportWidth)}
              rotation={rotation.clone()}
              key={idx}
            >
              <Float>
                <mesh
                  geometry={nodes.Vlogo.geometry}
                  material={clonedMaterials[idx]?.["m_Vlogo"]}
                />
                {/* <mesh
                  geometry={nodes.Vlogo.geometry}
                /> */}
              </Float>
              <pointLight position={[10, 0, 0]} intensity={1.5} />
              <pointLight position={[0, 0, 10]} intensity={1.7} />
              <pointLight position={[0, -10, 0]} intensity={2.2} />
            </group>
          );
        })}
      </group>
    </>
  );
};
