#include "lygia/generative/fbm.glsl"
#include "lygia/generative/curl.glsl"

uniform sampler2D uImage;
uniform float uTime;
uniform float uRevealThreshold;
uniform vec2 uRandomCenter; // Random center for the reveal
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // 1. Distance from random center
  float distFromRandomCenter = distance(uv, uRandomCenter);

  // 2. Normalize distance to ensure full coverage
  float maxDistance = length(vec2(1.0, 1.0)); // Maximum distance in normalized UV space
  float normalizedDistance = distFromRandomCenter / maxDistance;

  // 3. Organic texture for variation
  float noiseValue = fbm(uv * 3.0 + uTime * 0.1) * (1.0 - uRevealThreshold);

  // 4. Combine distance + noise for organic mask
  float fluidMask = smoothstep(uRevealThreshold + 0.1, uRevealThreshold - 0.1, normalizedDistance + noiseValue * 0.2);

  // 5. Apply distortion only at the edges of the reveal
  float edgeMask = smoothstep(0.5, 0.0, abs(fluidMask - 0.5)); // Highlight edges of the reveal
  vec2 distortion = curl(uv * 10.0 + uTime * 0.5) * 0.5 * edgeMask;

  // 6. Distort UVs only at the edges
  vec2 distortedUV = uv + distortion;

  // 7. Sample texture
  vec4 texColor = texture2D(uImage, distortedUV);

  // 8. Final color with alpha from fluid mask
  gl_FragColor = vec4(texColor.rgb, fluidMask);
}