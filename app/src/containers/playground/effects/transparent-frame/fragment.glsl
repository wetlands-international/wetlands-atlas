#include "lygia/generative/snoise.glsl";

uniform float borderSize;
uniform vec2 resolution;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  float border = borderSize * min(resolution.x, resolution.y);

  // Distance to closest edge
  float distToEdge = min(
    min(fragCoord.x, resolution.x - fragCoord.x),
    min(fragCoord.y, resolution.y - fragCoord.y)
  );

  // Add noise to the distance
  float n = snoise(uv * 20.0); // higher = more detail
  distToEdge += n * border * 0.4; // distort the border

  if (distToEdge < border) {
    outputColor = vec4(0.0); // fully transparent
  } else {
    outputColor = inputColor;
  }
}
