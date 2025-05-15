uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uNormalTexture;

void main() {
  // Initialize the color with the provided uniform color
  vec3 color = uColor.rgb;
  // Get the UV coordinates of the current fragment within the point
  vec2 uv = gl_PointCoord.xy;

  // Calculate the distance from the center of the point to create a circular mask
  float disc = length(uv - vec2(0.5));
  // Smoothly transition the alpha value near the edge of the circle
  float alpha = smoothstep(0.5, 0.48, disc);
  
  // Sample the normal texture at the current UV coordinates
  vec4 normalTexture = texture2D(uNormalTexture, uv);
  // Calculate the normal vector from the normal texture and apply lighting effects
  vec3 normal = vec3(normalTexture.rg * 2.0 - 1.0, 0.0);
  // Compute the z-component of the normal vector to ensure it is a unit vector
  normal.z = sqrt(1.0 - dot(normal.xy, normal.xy));
  // Normalize the normal vector to ensure it has a length of 1
  normal = normalize(normal);
  // Define the light position as a normalized vector pointing diagonally
  vec3 lightPos = normalize(vec3(1.0, 1.0, 1.0));
  // Calculate the diffuse lighting intensity based on the angle between the normal and light direction
  float diffuse = max(dot(normal, lightPos), 0.0);

  // Set the final fragment color, modulating the alpha by the diffuse lighting intensity
  gl_FragColor = vec4(vec3(color), alpha * diffuse * 0.75); 
}
