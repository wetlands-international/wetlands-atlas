// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

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

  // Each wave progresses through its band (0–1)
  float progress = fract(baseTime + waveOffset);
  vProgress = progress;
  // float progress = fract(uTime * aRandom.x * 0.2 + aRandom.z * 20.); ;

  vec3 pos = getPos(progress);
  float noise = snoise(pos.xy * aRandom.y * progress);
  pos += noise * 0.1 * aSize * (1. - progress);

  // pos = vec3(progress);


  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 5.0 * aSize * (1. - progress) * uDpr;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 1.0;
}
