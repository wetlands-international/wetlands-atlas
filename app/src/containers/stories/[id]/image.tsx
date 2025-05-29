"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

import { TransparentFrame } from "@/containers/playground/effects/transparent-frame";
import { ImageReveal } from "@/containers/playground/image";

export const StoryImage = () => {
  return (
    <div className="-mx-11 my-10 aspect-[1280/853]">
      <Canvas
        linear
        resize={{ scroll: false, offsetSize: false }}
        gl={{ alpha: true, preserveDrawingBuffer: true, antialias: true }}
        className="bg-background"
      >
        <EffectComposer>
          <TransparentFrame />
        </EffectComposer>

        <ImageReveal />
      </Canvas>
    </div>
  );
};
