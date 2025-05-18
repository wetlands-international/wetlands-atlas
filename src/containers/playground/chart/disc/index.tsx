import { useRef } from "react";

import { extend, useFrame } from "@react-three/fiber";

import DiscMaterial from "@/containers/playground/chart/disc/material";

export type DiscProps = {
  size?: number;
  color?: string;
  innerRadius?: number;
  outerRadius?: number;
};

extend({ DiscMaterial: DiscMaterial });

export const Disc = () => {
  const discMaterialRef = useRef<DiscMaterial>(null);

  useFrame(({ clock }) => {
    if (discMaterialRef.current) {
      discMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      discMaterialRef.current.uniforms.uDpr.value = window.devicePixelRatio;
    }
  });

  return (
    <mesh onClick={() => console.log("click")}>
      <circleGeometry args={[1, 64]} scale={[1, 1, 0.01]} />
      <discMaterial ref={discMaterialRef} transparent />
    </mesh>
  );
};
