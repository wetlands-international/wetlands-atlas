#include "node_modules/lygia/generative/snoise.glsl"

attribute vec3 aRandom;
attribute float aSize;

uniform float uTime;
uniform float uDpr;
uniform float uStartRadius;
uniform float uEndRadius;

varying float vProgress;

float PI = 3.14159265358979323846;

vec3 getPos(float progress) {
  float angle = aRandom.y * 20.0 * PI + progress * 0.1 * 2.0 * PI;
  
  float radius = mix(uStartRadius, uEndRadius, progress);

  float x = cos(angle) * radius;
  float y = sin(angle) * radius;
  float z = 0.01;

  return vec3(x, y, z);
}

void main() {
  // Number of simultaneous waves
  const float waveCount = 4.0;

  // Which wave does this point belong to?
  float waveIndex = floor(aRandom.z * 4.0);  // 0, 1, or 2

  // Offset each wave evenly within the total animation range
  float waveOffset = waveIndex / waveCount;

  // Animate shared time
  float baseTime = mod(uTime * 0.1, 1.0);

  // Each wave progresses through its band (0–1-0)
  float progress = fract(baseTime + waveOffset);
  vProgress = progress;
  // float progress = fract(uTime * aRandom.x * 0.2 + aRandom.z * 20.); ;

  vec3 pos = getPos(progress);

  float noise = snoise(pos.xy * aRandom.z);
  float noisea = snoise(vec2(aRandom.x, aRandom.y)) * (1.0 - progress);
  pos += (noise * 0.02) + (noisea * 0.02);

  // pos = vec3(progress);


  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 5.0 * aSize * (1. - progress) * uDpr;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 1.0;
}
