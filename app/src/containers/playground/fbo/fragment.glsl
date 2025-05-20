uniform vec3 uColor;

void main() {
  vec3 color = uColor.rgb;
  // Rounded point sprite
  // gl_PointCoord is a built-in variable that contains the coordinates of the current fragment in the point sprite
  // gl_PointCoord is in the range [0, 1], so we need to transform it to the range [-1, 1]
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  // The distance from the center of the point sprite to the current fragment
  float delta = fwidth(r);     
  // The distance from the center of the point sprite to the edge of the point sprite
  float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
  gl_FragColor = vec4(color, 1.0) * mask; 
}
