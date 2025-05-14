"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useWindowSize } from "usehooks-ts";

import { Disc } from "@/containers/playground/disc";

export const Playground = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />

        {/* <Ring color="#FF00FF" size={128} radius={0.25} innerRadius={0} outerRadius={0.25} />
        <Ring color="#00FF00" size={254} radius={0.5} innerRadius={0.25} outerRadius={0.75} />
        <Ring color="#1166EE" size={512} radius={1} innerRadius={0.75} outerRadius={1} /> */}

        {/* <Rong color="#DDDD49" innerRadius={0} outerRadius={0.25} />
        <Rong color="#00CC33" innerRadius={0.25} outerRadius={0.75} />
        <Rong color="#1166EE" innerRadius={0.75} outerRadius={1} /> */}

        <Disc />

        <OrbitControls />

        <OrthographicCamera
          makeDefault
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
