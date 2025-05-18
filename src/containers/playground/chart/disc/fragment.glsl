uniform float uTime;
uniform vec3 uColor;

uniform float uDpr;

varying vec2 vUv;

void main() {
  // radial gradient
  float dist = distance(vUv, vec2(0.5));
  float wave = sin(uTime * 2.0 + dist * -80.0) * 0.5 + 0.5;

  vec3 color = mix(uColor.rgb, vec3(0.0), wave);
  // color += vec3(0.5, 0.0, 0.5) * wave;

  gl_FragColor = vec4(color, wave * 0.1);
}
  
  
