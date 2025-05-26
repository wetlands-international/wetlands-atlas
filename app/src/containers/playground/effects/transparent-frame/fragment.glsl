vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1,311.7)),
           dot(p, vec2(269.5,183.3)));
  return -1.0 + 2.0 * fract(sin(p)*43758.5453123);
}

float noise(vec2 p) {
  const float K1 = 0.366025404; // (sqrt(3)-1)/2
  const float K2 = 0.211324865; // (3-sqrt(3))/6
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(hash(i), a), dot(hash(i + o), b), dot(hash(i + 1.0), c));
  return dot(n, vec3(70.0));
}

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
  float n = noise(uv * 20.0); // higher = more detail
  distToEdge += n * border * 0.4; // distort the border

  if (distToEdge < border) {
    outputColor = vec4(0.0); // fully transparent
  } else {
    outputColor = inputColor;
  }
}
