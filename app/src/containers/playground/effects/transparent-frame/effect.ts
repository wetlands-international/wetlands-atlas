// TransparentFrameEffect.js
import { Effect } from "postprocessing";
import { Uniform, Vector2, WebGLRenderer } from "three";

import fragmentShader from "./fragment.glsl";

export class TransparentFrameEffect extends Effect {
  constructor({ borderSize = 0.01 } = {}) {
    super("TransparentFrameEffect", fragmentShader, {
      uniforms: new Map<string, Uniform<number | Vector2>>([
        ["borderSize", new Uniform(borderSize)],
        ["resolution", new Uniform(new Vector2(1, 1))],
        ["uTime", new Uniform(0)],
      ]),
    });
  }

  update(renderer: WebGLRenderer) {
    const size = renderer.getSize(new Vector2());

    if (this.uniforms && this.uniforms.has("resolution")) {
      this.uniforms.get("resolution")!.value.set(size.width, size.height);
      this.uniforms.get("uTime")!.value = performance.now() / 1000; // Update time in seconds
    }
  }
}
