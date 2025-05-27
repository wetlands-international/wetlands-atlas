"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

import { TransparentFrame } from "@/containers/playground/effects/transparent-frame";
import { ImageReveal } from "@/containers/playground/image";

import { Story, Media } from "@/payload-types";

export default function StoryImage(props: Story) {
  const image = props.cover as Media;
  if (!image || !image.url) {
    return null;
  }

  return (
    <div className="-mx-11 my-10 aspect-[1280/853]">
      <Canvas
        linear
        resize={{ scroll: false }}
        gl={{ alpha: true, preserveDrawingBuffer: true, antialias: true }}
        className="bg-background"
      >
        <EffectComposer>
          <TransparentFrame />
        </EffectComposer>

        <ImageReveal imageUrl={image.url} />
      </Canvas>
    </div>
  );
}
