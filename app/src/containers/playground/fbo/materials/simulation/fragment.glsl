#include "node_modules/lygia/generative/curl.glsl"

uniform sampler2D positions;
uniform float uTime;
uniform float uFrequency;

varying vec2 vUv;


void main() {
  vec3 pos = texture2D(positions, vUv).rgb;
  vec3 curlPos = texture2D(positions, vUv).rgb;

  pos = curl(pos * uFrequency + uTime * 0.01);
  curlPos = curl(curlPos * uFrequency + uTime * 0.01);
  // curlPos += curlNoise(curlPos * uFrequency * 2.0) * 0.5;

  gl_FragColor = vec4(mix(pos, curlPos, sin(uTime)), 1.0);
}
