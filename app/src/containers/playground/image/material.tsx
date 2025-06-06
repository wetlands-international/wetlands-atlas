import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class RevealMaterial extends THREE.ShaderMaterial {
  constructor({ uImage, uRandomCenter }: { uImage: THREE.Texture; uRandomCenter: THREE.Vector2 }) {
    const uniforms = {
      uTime: { value: 0 },
      uImage: { value: uImage },
      uRandomCenter: { value: uRandomCenter },
      uRevealThreshold: { value: 0 },
      uDpr: { value: window.devicePixelRatio },
    };

    super({
      uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
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
