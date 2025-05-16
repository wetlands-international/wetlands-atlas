import { useMemo, useRef } from "react";

import { useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import { getRandomDataRing } from "@/containers/playground/ring/materials/simulation";
import WaveMaterial from "@/containers/playground/wave/material";

export type WaveProps = {
  size?: number;
  color?: string;
  innerRadius?: number;
  outerRadius?: number;
};

extend({ WaveMaterial: WaveMaterial });

export const Wave = (props: WaveProps) => {
  const size = props.size ?? 50;
  const innerRadius = props.innerRadius ?? 0.5;
  const outerRadius = props.outerRadius ?? 1;
  const color = props.color || "#FF00FF";

  const waveMaterialRef = useRef<WaveMaterial>(null);

  const normalTexture = useTexture("/textures/sphere-normal.webp");

  const buffers = useMemo(() => {
    const positions = getRandomDataRing({
      size,
      innerRadius,
      outerRadius,
    });

    const randoms = new Float32Array(size * size * 3);
    const sizes = new Float32Array(size * size);
    for (let i = 0; i < size * size; i++) {
      const stride = i * 3;
      randoms[stride] = Math.random();
      randoms[stride + 1] = Math.random();
      randoms[stride + 2] = Math.random();

      sizes[i] = 0.5 + Math.random() * 0.5;
    }
    return { positions, randoms, sizes };
  }, [size, innerRadius, outerRadius]);

  useFrame(({ clock }) => {
    if (waveMaterialRef.current) {
      waveMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          args={[buffers.positions, 3]}
          attach="attributes-position"
          count={buffers.positions.length / 3}
        />
        <bufferAttribute
          args={[buffers.randoms, 3]}
          attach="attributes-aRandom"
          count={buffers.randoms.length / 3}
        />
        <bufferAttribute
          args={[buffers.sizes, 1]}
          attach="attributes-aSize"
          count={buffers.sizes.length}
        />
      </bufferGeometry>
      <waveMaterial
        ref={waveMaterialRef}
        attach="material"
        args={[color, innerRadius, outerRadius, normalTexture]}
        transparent
      />
    </points>
  );
};
