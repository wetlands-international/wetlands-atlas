import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class DiscMaterial extends THREE.ShaderMaterial {
  constructor(
    color: string,
    startRadius: number,
    endRadius: number,
    speed: number,
    normalTexture: THREE.Texture,
  ) {
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uStartRadius: { value: startRadius },
      uEndRadius: { value: endRadius },
      uSpeed: { value: speed },
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
    discMaterial: ThreeElement<typeof DiscMaterial>;
  }
}

export default DiscMaterial;
