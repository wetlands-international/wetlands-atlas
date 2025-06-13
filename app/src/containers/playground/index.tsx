"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useWindowSize } from "usehooks-ts";

import { RingChart } from "@/containers/playground/chart";

export const Playground = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />

        <RingChart />

        <OrbitControls />

        <OrthographicCamera
          // makeDefault
          position={[0, 0, 1]}
          zoom={200}
          left={-width / 2}
          right={width / 2}
          top={height / 2}
          bottom={-height / 2}
          near={0.1}
          far={1000}
        />

        <EffectComposer enabled={false}>
          <DotScreen blendFunction={BlendFunction.ADD} scale={10} opacity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
