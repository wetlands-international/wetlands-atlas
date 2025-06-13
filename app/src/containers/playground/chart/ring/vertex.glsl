attribute vec3 aRandom;
attribute float aSize;

uniform float uTime;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uSpeed;
uniform float uDpr;

varying vec2 vUv;

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

float PI = 3.14159265358979323846;

vec3 getPos(float progress) {
  float angle = progress * 2.0 * PI;

  // ring
  float radius = uStartRadius + (uEndRadius - uStartRadius);
  float x = cos(angle) * radius;
  float y = sin(angle) * radius;
  float z = 0.0;

  return vec3(x, y, z);
}

vec3 getTangent(float progress) {
  float angle = progress * 2.0 * PI;
  float dx = -sin(angle) * 2.0 * PI;
  float dy = cos(angle) * 2.0 * PI;
  return normalize(vec3(dx, dy, 0.0));
}

vec3 getNormal(float progress) {
  float angle = progress * 2.0 * PI;
  float dx = -cos(angle) * 2.0 * PI;
  float dy = -sin(angle) * 2.0 * PI;
  return normalize(vec3(dx, dy, 0.0));
}

void main() {
  float progress = fract(aRandom.x + (uTime * aSize * uSpeed * 0.0075));
  
  float t = (sin(uTime * 0.1) * 2.0 - 1.0);

  vec3 pos = getPos(progress);

  // Calculate the tangent and normal vectors
  // The tangent vector is the derivative of the position vector with respect to the angle
  // The binormal vector is the cross product of the normal vector and the tangent vector
  vec3 tangent = getTangent(progress);
  vec3 normal = getNormal(progress);
  vec3 binormal = normalize(cross(normal, tangent));
  
  float noise = snoise(pos.xy + t * 0.1) * 1.0 * uStartRadius;

  float radius = 0.05 + (aSize * 0.05);
  float cx = radius * cos(aSize * uTime * 2.0 * PI * 0.1 + (aRandom.z * 7.0));
  float cy = radius * sin(aSize * uTime * 2.0 * PI * 0.1 + (aRandom.z * 7.0));

  vec3 offset = (normal * cx * noise) + (binormal * cy * noise);

  pos += offset;

  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 6.0 * (1. - aSize + 0.5) * uDpr;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 1.0;
}
