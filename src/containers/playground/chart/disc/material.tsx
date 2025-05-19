import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class DiscMaterial extends THREE.ShaderMaterial {
  constructor() {
    const uniforms = {
      uTime: { value: 0 },
      uDpr: { value: window.devicePixelRatio },
    };

    super({
      uniforms,
      vertexShader,
      fragmentShader,
    });
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    discMaterial: ThreeElement<typeof DiscMaterial>;
  }
}

export default DiscMaterial;
