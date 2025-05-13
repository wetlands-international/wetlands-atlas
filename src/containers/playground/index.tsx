"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Ring } from "@/containers/playground/ring";

export const Playground = () => {
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
        <ambientLight intensity={0.5} />

        <Ring color="#FF00FF" size={128} radius={0.25} innerRadius={0} outerRadius={0.25} />
        <Ring color="#00FF00" size={254} radius={0.5} innerRadius={0.25} outerRadius={0.75} />
        <Ring color="#1166EE" size={512} radius={1} innerRadius={0.75} outerRadius={1} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};
