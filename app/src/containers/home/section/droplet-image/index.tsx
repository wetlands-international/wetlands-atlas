"use client";
import React, { useState, useCallback } from "react";

import { motion } from "motion/react";

const SIZE = 600;
const RADIUS = 250;
const POINTS = 60;
const EDGE_RANGE = RADIUS * 0.13;
const BULGE_PX = RADIUS * 0.15;

function angleDiff(a: number, b: number) {
  let diff = a - b;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  return Math.abs(diff);
}

function circleBulgePath(
  cx: number,
  cy: number,
  radius: number,
  pointerAngle: number | null,
  bulge: number,
) {
  let d = "";
  for (let i = 0; i <= POINTS; i++) {
    const angle = (i / POINTS) * Math.PI * 2;
    let thisRadius = radius;
    if (pointerAngle !== null && angleDiff(angle, pointerAngle) < Math.PI / 6) {
      const diff = angleDiff(angle, pointerAngle) / (Math.PI / 6);
      thisRadius += bulge * Math.exp(-4 * diff * diff);
    }
    const x = cx + Math.cos(angle) * thisRadius;
    const y = cy + Math.sin(angle) * thisRadius;
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }
  d += "Z";
  return d;
}

interface DropletImageProps {
  imageUrl: string;
}

const DropletImage: React.FC<DropletImageProps> = ({ imageUrl }) => {
  const [pointerAngle, setPointerAngle] = useState<number | null>(null);
  const [bulge, setBulge] = useState(0);
  const clipPathId = `circle-bulge-${imageUrl}`;
  const gradientId = `circle-bg-gradient-${imageUrl}`;
  const path = circleBulgePath(SIZE / 2, SIZE / 2, RADIUS, pointerAngle, bulge);

  const onPointerMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2,
      cy = rect.height / 2;
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    const dx = x - cx,
      dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > RADIUS - EDGE_RANGE && distance < RADIUS + EDGE_RANGE) {
      setPointerAngle(Math.atan2(dy, dx));
      setBulge(BULGE_PX);
    } else {
      setPointerAngle(null);
      setBulge(0);
    }
  }, []);

  const onPointerLeave = useCallback(() => {
    setBulge(0);
    setPointerAngle(null);
  }, []);

  return (
    <svg
      width={SIZE}
      height={SIZE}
      className="block cursor-pointer"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <defs>
        <clipPath id={clipPathId}>
          <motion.path
            d={path}
            animate={{ d: path }}
            transition={{ type: "spring", stiffness: 560, damping: 40 }}
          />
        </clipPath>
        <radialGradient id={gradientId} cx="48.61%" cy="50.65%" r="60%" fx="48.61%" fy="50.65%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.00)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.10)" />
        </radialGradient>
      </defs>

      <image
        href={imageUrl}
        x={SIZE / 2 - RADIUS - BULGE_PX}
        y={SIZE / 2 - RADIUS - BULGE_PX}
        width={RADIUS * 2 + BULGE_PX * 2}
        height={RADIUS * 2 + BULGE_PX * 2}
        clipPath={`url(#${clipPathId})`}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill={`url(#${gradientId})`} /> */}

      <motion.path
        d={path}
        fill="none"
        animate={{ d: path }}
        transition={{ type: "spring", stiffness: 560, damping: 36 }}
        pointerEvents="none"
      />
    </svg>
  );
};

export default DropletImage;
