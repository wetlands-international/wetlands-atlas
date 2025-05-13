import { useMemo } from "react";

import { getRandomDataRing } from "@/containers/playground/ring/materials/simulation";

export type RongProps = {
  size?: number;
  color?: string;
  innerRadius?: number;
  outerRadius?: number;
};

export const Rong = (props: RongProps) => {
  const size = props.size ?? 100;
  const innerRadius = props.innerRadius ?? 0.5;
  const outerRadius = props.outerRadius ?? 1;
  const color = props.color || "#FF00FF";

  const positions = useMemo(() => {
    return getRandomDataRing({
      size,
      innerRadius,
      outerRadius,
    });
  }, [size, innerRadius, outerRadius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={color}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        transparent={true}
        alphaMap={null}
      />
    </points>
  );
};
