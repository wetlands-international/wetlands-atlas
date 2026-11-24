"use client";

import { FC } from "react";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

import { TransparentFrame } from "@/containers/playground/effects/transparent-frame";
import { ImageReveal } from "@/containers/playground/image";

export const LandscapeImage: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    // From an edge of the article to the other, whatever its padding
    <div className="-mx-4 my-6 aspect-[1280/853] grow sm:-mx-6 lg:-mx-11 lg:my-10">
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
