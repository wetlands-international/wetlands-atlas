import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class RevealMaterial extends THREE.ShaderMaterial {
  constructor({ uImage, uHeightmap }: { uImage: THREE.Texture; uHeightmap: THREE.Texture }) {
    console.log({ uImage, uHeightmap, fragmentShader, vertexShader });
    const uniforms = {
      uTime: { value: 0 },
      uImage: { value: uImage },
      uHeightmap: { value: uHeightmap },
      uRevealThreshold: { value: 0 },
      uDpr: { value: window.devicePixelRatio },
    };

    super({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      // blending: THREE.SubtractiveBlending,
    });
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    revealMaterial: ThreeElement<typeof RevealMaterial>;
  }
}

export default RevealMaterial;
