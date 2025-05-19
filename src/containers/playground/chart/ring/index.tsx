import { useMemo, useRef } from "react";

import { useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import RingMaterial from "@/containers/playground/chart/ring/material";

export type RingProps = {
  size?: number;
  color?: string;
  startRadius?: number;
  endRadius?: number;
  speed?: number;
};

extend({ RingMaterial: RingMaterial });

export const Ring = (props: RingProps) => {
  const size = props.size ?? 25;
  const color = props.color || "#34c9eb";
  const startRadius = props.startRadius ?? 0;
  const endRadius = props.endRadius ?? 1;
  const speed = props.speed ?? 1;

  const ringMaterialRef = useRef<RingMaterial>(null);

  const normalTexture = useTexture("/textures/sphere-normal.webp");

  const buffers = useMemo(() => {
    const positions = new Float32Array(size * size * 3);
    const randoms = new Float32Array(size * size * 3);
    const sizes = new Float32Array(size * size);

    for (let i = 0; i < size * size; i++) {
      const stride = i * 3;
      positions[stride] = Math.random() - 0.5; // x
      positions[stride + 1] = Math.random() - 0.5; // y
      positions[stride + 2] = Math.random() - 0.5; // z
      randoms[stride] = Math.random();
      randoms[stride + 1] = Math.random();
      randoms[stride + 2] = Math.random();
      sizes[i] = 0.5 + Math.random() * 0.5;
    }
    return { positions, randoms, sizes };
  }, [size]);

  useFrame(({ clock }) => {
    if (ringMaterialRef.current) {
      ringMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      ringMaterialRef.current.uniforms.uDpr.value = window.devicePixelRatio;
    }
  });

  return (
    <>
      {/* <mesh>
        <torusGeometry args={[1, 0.1, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} />
      </mesh> */}
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
        <ringMaterial
          ref={ringMaterialRef}
          attach="material"
          args={[color, startRadius, endRadius, speed, normalTexture]}
          transparent
          depthWrite={false}
          depthTest={false}
        />
      </points>
    </>
  );
};
