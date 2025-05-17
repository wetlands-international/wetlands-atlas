"use client";
import { useMemo, useRef } from "react";

import { useFBO } from "@react-three/drei";
import { useFrame, extend, createPortal } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "./fragment.glsl";
import SimulationMaterial from "./materials/simulation";
import vertexShader from "./vertex.glsl";

extend({ SimulationMaterial: SimulationMaterial });

export type RingProps = {
  size?: number;
  color?: string;
  radius?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export const Ring = (props: RingProps) => {
  const size = props.size || 128;
  const color = props.color || "#ff0000";
  const radius = props.radius || 1;
  const innerRadius = props.innerRadius || 0;
  const outerRadius = props.outerRadius || 1;

  const points =
    useRef<THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>>(
      null,
    );
  const simulationMaterialRef = useRef<SimulationMaterial>(null);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 100), 1);
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
  const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(
    () => ({
      uColor: {
        value: new THREE.Color(color),
      },
      uPositions: {
        value: null,
      },
      uRadius: {
        value: radius,
      },
    }),
    [color, radius],
  );

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (points.current) {
      points.current.material.uniforms.uPositions.value = renderTarget.texture;
    }

    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <>
      {createPortal(
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              args={[positions, 3]}
              attach="attributes-position"
              count={positions.length / 3}
            />
            <bufferAttribute args={[uvs, 2]} attach="attributes-uv" count={uvs.length / 2} />
          </bufferGeometry>
          <simulationMaterial ref={simulationMaterialRef} args={[size, innerRadius, outerRadius]} />
        </mesh>,
        scene,
      )}

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            args={[particlesPosition, 3]}
            attach="attributes-position"
            count={particlesPosition.length / 3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          transparent
        />
      </points>
    </>
  );
};
