precision mediump float;

varying vec2 vUv;
varying vec3 v_normal;

void main() {
  // pass varyings to frag shader
  vUv = uv;
  v_normal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, position.z, 1.0 );
}
