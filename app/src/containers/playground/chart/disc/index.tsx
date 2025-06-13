import { useRef } from "react";

import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import DiscMaterial from "@/containers/playground/chart/disc/material";

export type DiscProps = {
  values?: number[][];
  colors?: string[];
};

extend({ DiscMaterial: DiscMaterial });

export const Disc = ({ values }: DiscProps) => {
  const discMaterialRef = useRef<DiscMaterial>(null);

  useFrame(({ clock }) => {
    if (discMaterialRef.current) {
      discMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      discMaterialRef.current.uniforms.uDpr.value = window.devicePixelRatio;
      discMaterialRef.current.uniforms.uValues.value = values?.map((v) => {
        return new THREE.Vector2(v[0], v[1]);
      });
    }
  });

  return (
    <mesh onClick={() => console.log("click")} scale={[0.75, 0.75, 0.75]} position={[0, 0, 0]}>
      <circleGeometry args={[1, 64]} scale={[1, 1, 0.01]} />
      <discMaterial ref={discMaterialRef} transparent />
    </mesh>
  );
};
