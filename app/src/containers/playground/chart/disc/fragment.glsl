uniform float uTime;
uniform vec3 uColor;

uniform float uDpr;

uniform vec2 uValues[3];
uniform vec3 uColors[3];

varying vec2 vUv;

void main() {
  // radial gradient
  float dist = distance(vUv, vec2(0.5)) * 2.0;
  // normalize distance to 0-1
  dist = 1.0 - dist;
  
  // loop through the values and asign one color per range of values, be sure that you don't assign the same color to two ranges. Loop please
  vec3 color = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    if (dist <= uValues[i].y && dist > uValues[i].x) {
      color = uColors[i];
      break;
    }
  }

  gl_FragColor = vec4(uColors[0], dist * 0.25);
}
  
  
