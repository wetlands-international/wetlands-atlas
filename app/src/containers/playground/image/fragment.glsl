uniform sampler2D uImage;
uniform sampler2D uHeightmap;

uniform float uTime;
uniform float uRevealThreshold;

varying vec2 vUv;

#include "lygia/generative/curl.glsl";

void main() {
  vec4 heightTexture = texture2D(uHeightmap, vUv);
  vec4 colorTexture = texture2D(uImage, vUv);

  float progress = uRevealThreshold;
  // progress = clamp(progress, 0.0, 1.0);

  float revealAlpha = smoothstep(heightTexture.r, 1.0, progress);

  vec3 noise = curl(vec3(vUv, progress));
  vec2 displacedUv = vUv + sin(noise.xy * 0.05); // Adjust the scale of the noise as needed
  vec4 displacedColor = texture2D(uImage, displacedUv);
  colorTexture.rgb = mix(displacedColor.rgb, colorTexture.rgb, revealAlpha);
  // colorTexture.rgb = mix(colorTexture.rgb, displacedColor.rgb, sin(uTime) * 0.5 + 0.5); // Use sine wave for smooth transition

  // add a frame around the image to indicate the reveal
  gl_FragColor = vec4(colorTexture.rgb, revealAlpha);
}