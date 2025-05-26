#include "lygia/generative/snoise.glsl";

uniform float borderSize;
uniform vec2 resolution;
uniform float uTime;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  float border = borderSize * min(resolution.x, resolution.y);

  // Distance to top and bottom edges
  float distToEdge = min(fragCoord.y, resolution.y - fragCoord.y);

  // Add noise to the distance
  float t = sin(uTime * 0.1) * 0.5 + 0.5 + 1.0; // oscillate between 0 and 1
  float n = snoise(uv * 5.0); // higher = more detail
  distToEdge += n * border; // distort the border

  if (distToEdge < border) {
    outputColor = vec4(0.0); // fully transparent
  } else {
    outputColor = inputColor;
  }
}
