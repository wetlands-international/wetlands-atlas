#include "lygia/generative/snoise.glsl";

uniform float borderSize;
uniform vec2 resolution;
uniform float uTime;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  float border = borderSize * min(resolution.x, resolution.y);

  // Rotate UV coordinates
  float angle = sin(-0.15) * 0.5; // oscillating rotation angle
  mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 rotatedUV = (uv - 0.5) * rotationMatrix + 0.5; // rotate around the center

  vec2 rotatedFragCoord = rotatedUV * resolution;

  // Distance to top and bottom edges in rotated space
  float distToEdge = min(rotatedFragCoord.y, resolution.y - rotatedFragCoord.y);

  // Add noise to the distance
  float t = sin(uTime * 0.1) * 0.5 + 0.5 + 1.0; // oscillate between 0 and 1
  float n = snoise(rotatedUV * 50.0); // higher = more detail
  distToEdge += n * border * 2.0; // distort the border

  if (distToEdge < border) {
    outputColor = vec4(0.0); // fully transparent
  } else {
    outputColor = inputColor;
  }
}
