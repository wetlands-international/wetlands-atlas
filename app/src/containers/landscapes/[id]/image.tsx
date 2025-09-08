"use client";

import { FC } from "react";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

import { TransparentFrame } from "@/containers/playground/effects/transparent-frame";
import { ImageReveal } from "@/containers/playground/image";

export const LandscapeImage: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className="-mx-11 my-10 aspect-[1280/853] grow">
      <Canvas
        linear
        resize={{ scroll: false, offsetSize: false, debounce: { scroll: 0, resize: 250 } }}
        gl={{ alpha: true, preserveDrawingBuffer: true, antialias: true }}
        className="bg-background"
      >
        <EffectComposer>
          <TransparentFrame />
        </EffectComposer>

        <ImageReveal imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
};
