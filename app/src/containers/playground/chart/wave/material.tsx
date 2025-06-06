import { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class WaveMaterial extends THREE.ShaderMaterial {
  constructor(color: string, startRadius: number, endRadius: number, normalTexture: THREE.Texture) {
    const uniforms = {
      uTime: { value: 0 },
      uDpr: { value: window.devicePixelRatio },
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
    waveMaterial: ThreeElement<typeof WaveMaterial>;
  }
}

export default WaveMaterial;
