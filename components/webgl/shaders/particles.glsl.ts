/**
 * GLSL shaders for the connected-particle field effect.
 * Used by ParticleField.tsx via THREE.ShaderMaterial.
 */

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  varying float vDistance;

  void main() {
    // Gentle sinusoidal drift based on original position + time
    vec3 pos = position;
    pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.4;
    pos.y += cos(uTime * 0.25 + position.x * 0.4) * 0.35;
    pos.z += sin(uTime * 0.2 + position.x * 0.3) * 0.15;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Perspective-scaled point size
    gl_PointSize = uSize * aScale * (1.0 / -mvPosition.z);

    // Pass normalised distance for fragment attenuation (farther = dimmer)
    vDistance = 1.0 - clamp(-mvPosition.z / 10.0, 0.0, 1.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = /* glsl */ `
  varying float vDistance;

  void main() {
    // Distance from centre of the point sprite (0 = centre, 1 = edge)
    float d = length(gl_PointCoord - vec2(0.5));

    // Discard fragments outside the circle
    if (d > 0.5) discard;

    // Smooth core circle
    float circle = 1.0 - smoothstep(0.15, 0.45, d);

    // Outer glow halo (softer, more transparent)
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow *= 0.35;

    float alpha = (circle + glow) * vDistance;

    // Neutral white
    vec3 color = vec3(0.85, 0.85, 0.85);

    gl_FragColor = vec4(color, alpha);
  }
`;
