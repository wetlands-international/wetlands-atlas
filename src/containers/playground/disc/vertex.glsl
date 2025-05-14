attribute vec3 aRandom;
attribute float aSize;

uniform float uTime;

float PI = 3.14159265358979323846;

vec3 getPos(float progress) {
  float angle = progress * 2.0 * PI;

  // ring
  float radius = aRandom.z;
  vec3 p = vec3(cos(angle) * radius, sin(angle) * radius, aSize);
  // spiral
  // float radius = 0.5 + progress * 0.5;
  // vec3 p = vec3(cos(angle) * radius, sin(angle) * radius, progress);

  return p;
}

vec3 getTangent(float progress) {
  float angle = progress * 2.0 * PI;
  float x = cos(angle) + 4.0 * cos(2.0 * angle);
  float y = -sin(angle) + 4.0 * sin(2.0 * angle);
  float z = 3.0 * -cos(3.0 * angle);
  
  return normalize(vec3(x, y, 1.0));
}

vec3 getNormal(float progress) {
  float angle = progress * 2.0 * PI;
  float x = -sin(angle) - 8.0 * sin(2.0 * angle);
  float y = -cos(angle) + 8.0 * cos(2.0 * angle);
  float z = 9.0 * sin(3.0 * angle);
  
  return normalize(vec3(x, y, 1.0));
}

void main() {
  float progress = fract(aRandom.x + (uTime * aSize * 0.02 * aRandom.y));
  vec3 pos = getPos(progress);
  vec3 tangent = getTangent(progress);
  vec3 normal = getNormal(progress);
  vec3 binormal = cross(tangent, normal);



  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 3.0 * aSize;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 1.0;
}
