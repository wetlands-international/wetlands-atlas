uniform sampler2D uImage;
uniform sampler2D uHeightmap;

uniform float uTime;
uniform float uRevealThreshold;

varying vec2 vUv;

#include "lygia/generative/voronoise.glsl";


void main() {
  vec4 heightTexture = texture2D(uHeightmap, vUv);
  vec4 colorTexture = texture2D(uImage, vUv);

  float progress = uRevealThreshold;
  // progress = clamp(progress, 0.0, 1.0);

  // reveal the image from the center towards the edges, they should end up with an alpha of 1.0
  // Compute radial distance from center
  vec2 center = vec2(0.5, 0.5); // Image center in UV space
  float dist = distance(vUv, center);

  // Use smoothstep to create a soft radial reveal
  float radialAlpha = smoothstep(progress - 0.1, progress + 0.1, dist);

  float revealAlpha = smoothstep(heightTexture.r, 1.0, progress);

  float noise = voronoise(vUv, progress, progress);
  vec2 displacedUv = vUv + vec2(sin(noise * 0.05)); // Adjust the scale of the noise as needed
  vec4 displacedColor = texture2D(uImage, displacedUv);
  colorTexture.rgb = mix(displacedColor.rgb, colorTexture.rgb, revealAlpha);


  
  // add a frame around the image to indicate the reveal
  gl_FragColor = vec4(colorTexture.rgb, (1.0 - radialAlpha) * revealAlpha);
}