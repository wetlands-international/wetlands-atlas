"use client";
// components/ImageReveal.tsx
import { useMemo, useRef } from "react";

import { useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

import RevealMaterial from "@/containers/playground/image/material";

extend({ RevealMaterial }); // Makes <revealMaterial /> usable in JSX

export function generateHeightmapTexture(size: number): THREE.DataTexture {
  const noise2D = createNoise2D();
  const data = new Uint8Array(size * size);

  const octaves = 5;
  const persistence = 0.2;
  const lacunarity = 2.0;
  const baseFrequency = 0.005;
  const heightMultiplier = 128;

  let i = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let amplitude = 1;
      let frequency = baseFrequency;
      let noiseValue = 0;

      for (let o = 0; o < octaves; o++) {
        const nx = x * frequency;
        const ny = y * frequency;
        noiseValue += noise2D(nx, ny) * amplitude;

        amplitude *= persistence;
        frequency *= lacunarity;
      }

      // Normalize to [0, 1]
      const normalized = (noiseValue + 1) / 2 - 0.01;
      // Clamp to [0, 1]
      const clamped = Math.max(0, Math.min(1, normalized));
      data[i++] = clamped * heightMultiplier;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
}

export function ImageReveal({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const imageTexture = useTexture(imageUrl);
  const heightmapTexture = useMemo(() => generateHeightmapTexture(512), []);

  const scale = useAspect(imageTexture.image.width, imageTexture.image.height, 1);

  useFrame(({ clock }, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      materialRef.current.uniforms.uRevealThreshold.value = Math.min(
        materialRef.current.uniforms.uRevealThreshold.value + delta,
        1,
      );
    }
  });

  return (
    <mesh scale={scale}>
      <planeGeometry />
      <revealMaterial
        ref={materialRef}
        args={[
          {
            uImage: imageTexture,
            uHeightmap: heightmapTexture,
            uRandomCenter: new THREE.Vector2(
              Math.random() < 0.5 ? Math.random() * 0.25 : Math.random() * 0.25 + 0.75, // x-coordinate close to edges
              Math.random() < 0.5 ? Math.random() * 0.25 : Math.random() * 0.25 + 0.75, // y-coordinate close to edges
            ),
          },
        ]}
        transparent
      />
    </mesh>
  );
}
