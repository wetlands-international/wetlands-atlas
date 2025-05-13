"use client";
import {
  GradientTexture,
  GradientType,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useWindowSize } from "usehooks-ts";

export const Playground = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 5]} />

        <mesh>
          <circleGeometry args={[4, 64, 0]} />
          <meshStandardMaterial>
            <GradientTexture
              stops={[0, 0.3, 0.35, 0.65, 0.67, 1]} // As many stops as you want
              colors={["aquamarine", "aquamarine", "hotpink", "hotpink", "yellow", "yellow"]} // Colors need to match the number of stops
              size={1024} // Size (height) is optional, default = 1024
              width={1024} // Width of the canvas producing the texture, default = 16
              type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
              innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
              outerCircleRadius={"auto"} // Optional, the radius of the outer circle of the gradient, default = auto
            />
          </meshStandardMaterial>
        </mesh>
        <EffectComposer>
          <DotScreen blendFunction={BlendFunction.MULTIPLY} scale={1} opacity={1} />
        </EffectComposer>

        <OrthographicCamera
          makeDefault
          zoom={100}
          top={height / 2}
          bottom={-height / 2}
          left={width / 2}
          right={-width / 2}
          near={1}
          far={2000}
          position={[0, 0, -200]}
        />

        <OrbitControls />
      </Canvas>
    </div>
  );
};
