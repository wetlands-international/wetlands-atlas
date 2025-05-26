import { ThreeElement } from "@react-three/fiber";
import { resolveLygia } from "resolve-lygia";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class DiscMaterial extends THREE.ShaderMaterial {
  constructor() {
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x4287f5) },
      uDpr: { value: window.devicePixelRatio },
      uValues: {
        value: [
          new THREE.Vector2(0, 0.25),
          new THREE.Vector2(0.25, 0.5),
          new THREE.Vector2(0.5, 1),
        ],
      },
      uColors: {
        value: [new THREE.Color(0x4287f5), new THREE.Color(0x77bbe6), new THREE.Color(0x77d9e6)],
      },
    };

    super({
      uniforms,
      vertexShader: resolveLygia(vertexShader),
      fragmentShader: resolveLygia(fragmentShader),
      transparent: true,
      // blending: THREE.SubtractiveBlending,
    });
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    discMaterial: ThreeElement<typeof DiscMaterial>;
  }
}

export default DiscMaterial;
