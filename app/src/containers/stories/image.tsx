"use client";
// App.tsx
import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

import { TransparentFrame } from "@/containers/playground/effects/transparent-frame";
import { ImageReveal } from "@/containers/playground/image";

export default function StoryImage() {
  return (
    <Suspense fallback={null}>
      <div className="-mx-11 my-10 aspect-[1280/853]">
        <Canvas
          resize={{ scroll: false }}
          gl={{ alpha: true, preserveDrawingBuffer: true }}
          className="bg-background"
        >
          <color attach="background" args={["#0b2b3c"]} />
          <EffectComposer>
            <TransparentFrame />
          </EffectComposer>
          <Suspense fallback={null}>
            <ImageReveal imageUrl="/test.jpg" />
          </Suspense>
        </Canvas>
      </div>
    </Suspense>
  );
}
