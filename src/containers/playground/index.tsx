"use client";

import { Fragment, useMemo, useState } from "react";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useWindowSize } from "usehooks-ts";

import { Disc } from "@/containers/playground/disc";
import { Wave } from "@/containers/playground/wave";

export const Playground = () => {
  const [click, setClick] = useState(0);
  const { width, height } = useWindowSize();

  const DATA = useMemo(() => {
    // Generate random values that sum 1 on every click
    const randomValues = Array.from({ length: 3 }, () => Math.random());
    const sum = randomValues.reduce((acc, curr) => acc + curr, 0);
    const normalizedValues = randomValues.map((value) => value / sum);
    const colors = ["#4287f5", "#77bbe6", "#77d9e6"];
    const newData = normalizedValues.map((value, index) => ({
      id: index + click,
      name: `Disc ${index + 1}`,
      color: colors[index],
      value,
      speed: Math.random() * 2,
    }));

    return newData;

    // return [
    //   { id: 1, name: "Disc 1", color: "#4287f5", value: 0.25, speed: 0.5 },
    //   { id: 2, name: "Disc 2", color: "#77bbe6", value: 0.5, speed: 1 },
    //   { id: 3, name: "Disc 3", color: "#77d9e6", value: 0.25, speed: 1.5 },
    // ];
  }, [click]);
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />

        <group>
          {DATA.map((disc, i, arr) => {
            const startRadius = arr
              .filter((_, j) => j <= i)
              .reduce((acc, curr) => {
                // sum only the previous value but not the current one
                if (curr.id === disc.id) return acc;
                return acc + curr.value;
              }, 0);
            const endRadius = startRadius + disc.value;

            return (
              <Fragment key={disc.id}>
                <Disc
                  color={disc.color}
                  startRadius={startRadius}
                  endRadius={endRadius}
                  speed={disc.speed}
                />
                <Wave
                  //
                  color={arr[i - 1]?.color || disc.color}
                  innerRadius={startRadius}
                  outerRadius={endRadius}
                />
              </Fragment>
            );
          })}
          <mesh onClick={() => setClick((prev) => prev + 1)}>
            <circleGeometry args={[1, 64]} scale={[1, 1, 0.01]} />
            <meshStandardMaterial
              color="#000000"
              transparent
              opacity={0.25}
              depthWrite={false}
              depthTest={false}
            />
          </mesh>
        </group>

        {/* <Disc /> */}

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
