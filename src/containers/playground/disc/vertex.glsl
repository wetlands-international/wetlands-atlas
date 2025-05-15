attribute vec3 aRandom;
attribute float aSize;

uniform float uTime;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uSpeed;

varying vec2 vUv;

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
  float progress = fract(aRandom.x + (uTime * aSize * uSpeed * 0.025));
  vec3 pos = getPos(progress);

  // Calculate the tangent and normal vectors
  // The tangent vector is the derivative of the position vector with respect to the angle
  // The binormal vector is the cross product of the normal vector and the tangent vector
  vec3 tangent = getTangent(progress);
  vec3 normal = getNormal(progress);
  vec3 binormal = normalize(cross(normal, tangent));

  float radius = 0.05 + (aSize * 0.05);
  float cx = radius * cos(aSize * uTime * 2.0 * PI * 0.1 + (aRandom.z * 7.0));
  float cy = radius * sin(aSize * uTime * 2.0 * PI * 0.1 + (aRandom.z * 7.0));

  vec3 offset = (normal * cx) + (binormal * cy);

  pos += offset;

  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 8.0 * (1. - aSize + 0.5);
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 1.0;
}
