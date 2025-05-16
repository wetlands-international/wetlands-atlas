import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class RongMaterial extends THREE.ShaderMaterial {
  constructor(color: string, startRadius: number, endRadius: number, normalTexture: THREE.Texture) {
    const uniforms = {
      uTime: { value: 0 },
      uStartRadius: { value: startRadius },
      uEndRadius: { value: endRadius },
      uColor: { value: new THREE.Color(color) },
      uNormalTexture: { value: normalTexture },
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
    rongMaterial: ThreeElement<typeof RongMaterial>;
  }
}

export default RongMaterial;
