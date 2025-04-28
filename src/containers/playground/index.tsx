"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const Playground = () => {
  return (
    <div className="grid min-h-[calc(100svh_-_theme(spacing.16))] items-center justify-items-center">
      <Canvas linear>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 5]} />

        <points>
          <torusKnotGeometry args={[1, 0.4, 100, 16]} />
          <pointsMaterial size={0.05} color="orange" />
        </points>

        <OrbitControls />
      </Canvas>
    </div>
  );
};
