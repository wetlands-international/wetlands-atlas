import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import simulationFragmentShader from "./fragment.glsl";
import simulationVertexShader from "./vertex.glsl";

export const getRandomDataSphere = ({
  size,
}: {
  size: number;
  innerRadius?: number;
  outerRadius?: number;
}): Float32Array => {
  const width = size;
  const height = size;
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[stride] = distance * Math.sin(theta) * Math.cos(phi);
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] = 1.0;
    data[stride + 3] = 1.0; // this value will not have any impact
  }

  return data;
};

export const getRandomDataRing = ({
  size,
  innerRadius,
  outerRadius,
}: {
  size: number;
  innerRadius: number;
  outerRadius: number;
}): Float32Array => {
  const width = size;
  const height = size;
  const length = width * height * 3;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride = i * 3;
    const angle = Math.random() * Math.PI * 2;
    // Radio aleatorio entre inner y outer radius
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    // Radio aleatorio entre 0 y 1
    data[stride] = radius * Math.cos(angle); // x
    data[stride + 1] = radius * Math.sin(angle); // y
    data[stride + 2] = (Math.random() - 0.5) * 0.2; // z
    data[stride + 3] = 1.0;
  }

  return data;
};

class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size: number, innerRadius: number, outerRadius: number) {
    const positionsTexture = new THREE.DataTexture(
      getRandomDataSphere({
        size,
        innerRadius,
        outerRadius,
      }),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType,
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 1 },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    simulationMaterial: ThreeElement<typeof SimulationMaterial>;
  }
}

export default SimulationMaterial;
