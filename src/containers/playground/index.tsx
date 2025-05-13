"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useWindowSize } from "usehooks-ts";

// import { Ring } from "@/containers/playground/ring";
import { Rong } from "@/containers/playground/rong";

export const Playground = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
        <ambientLight intensity={0.5} />

        {/* <Ring color="#FF00FF" size={128} radius={0.25} innerRadius={0} outerRadius={0.25} />
        <Ring color="#00FF00" size={254} radius={0.5} innerRadius={0.25} outerRadius={0.75} />
        <Ring color="#1166EE" size={512} radius={1} innerRadius={0.75} outerRadius={1} /> */}

        <Rong color="#FF00FF" innerRadius={0} outerRadius={0.25} />
        <Rong color="#00FF00" innerRadius={0.25} outerRadius={0.75} />
        <Rong color="#1166EE" innerRadius={0.75} outerRadius={1} />

        <OrbitControls />

        <OrthographicCamera
          makeDefault
          position={[0, 0, -1]}
          zoom={200}
          left={-width / 2}
          right={width / 2}
          top={height / 2}
          bottom={-height / 2}
          near={0.1}
          far={1000}
        />
      </Canvas>
    </div>
  );
};
