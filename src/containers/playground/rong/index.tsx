import { useMemo, useRef } from "react";

import { extend, useFrame } from "@react-three/fiber";

import { getRandomDataRing } from "@/containers/playground/ring/materials/simulation";
import RongMaterial from "@/containers/playground/rong/material";

export type RongProps = {
  size?: number;
  color?: string;
  innerRadius?: number;
  outerRadius?: number;
};

extend({ RongMaterial: RongMaterial });

export const Rong = (props: RongProps) => {
  const size = props.size ?? 100;
  const innerRadius = props.innerRadius ?? 0.5;
  const outerRadius = props.outerRadius ?? 1;
  const color = props.color || "#FF00FF";

  const rongMaterialRef = useRef<RongMaterial>(null);

  const positions = useMemo(() => {
    return getRandomDataRing({
      size,
      innerRadius,
      outerRadius,
    });
  }, [size, innerRadius, outerRadius]);

  useFrame(({ clock }) => {
    if (rongMaterialRef.current) {
      rongMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={positions.length / 3}
        />
      </bufferGeometry>
      <rongMaterial ref={rongMaterialRef} attach="material" args={[color]} transparent />
    </points>
  );
};
