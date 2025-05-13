"use client";
import { OrbitControls, OrthographicCamera, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { EffectComposer, DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Color, DoubleSide } from "three";
import { useWindowSize } from "usehooks-ts";
declare module "@react-three/fiber" {
  interface ThreeElements {
    ringGradientMaterial: ThreeElement<typeof RingGradientMaterial>;
  }
}
const RingGradientMaterial = shaderMaterial(
  {
    uColor1: new Color("#ffffff"),
    uColor2: new Color("#ff0080"),
  },
  // Vertex Shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  /*glsl*/ `
    varying vec2 vUv;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      float dist = length(vUv - 0.5) * 2.0; // radial distance
      vec3 color = mix(uColor1, uColor2, dist);
      gl_FragColor = vec4(color, 1.0 - smoothstep(1.0, 1.05, dist)); // optional fade
    }
  `,
);

extend({ RingGradientMaterial });

export const Playground = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="grid min-h-[100svh] items-center justify-items-center">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 5]} />

        <mesh>
          <ringGeometry args={[0, 2, 64]} />
          <ringGradientMaterial
            uColor1={"navajowhite"}
            uColor2={"silver"}
            side={DoubleSide}
            transparent
            // wireframe
          />
        </mesh>
        <EffectComposer>
          <DotScreen blendFunction={BlendFunction.MULTIPLY} scale={20} opacity={1} />
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
