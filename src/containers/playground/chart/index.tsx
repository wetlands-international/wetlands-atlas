import { Fragment, useMemo, useState } from "react";

import { Ring } from "@/containers/playground/chart/ring";
import { Wave } from "@/containers/playground/chart/wave";

export const RingChart = () => {
  const [click, setClick] = useState(0);

  const DATA = useMemo(() => {
    // Generate random values that sum 1 on every click
    const randomValues = Array.from({ length: 3 }, () => Math.random());
    const sum = randomValues.reduce((acc, curr) => acc + curr, 0);
    const normalizedValues = randomValues.map((value) => value / sum);
    const colors = ["#4287f5", "#77bbe6", "#77d9e6"];
    const newData = normalizedValues.map((value, index) => ({
      id: index + click,
      name: `Ring ${index + 1}`,
      color: colors[index],
      value,
      speed: Math.random() * 2,
    }));

    return newData;

    // return [
    //   { id: 1, name: "Ring 1", color: "#4287f5", value: 0.25, speed: 0.5 },
    //   { id: 2, name: "Ring 2", color: "#77bbe6", value: 0.5, speed: 1 },
    //   { id: 3, name: "Ring 3", color: "#77d9e6", value: 0.25, speed: 1.5 },
    // ];
  }, [click]);

  return (
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
            <Ring
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
  );
};
