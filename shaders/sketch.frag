precision mediump float;

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

uniform float iGlobalTime;
varying vec2 vUv;
varying vec3 v_normal;

const vec3 lightDirection = vec3(1.0,1.0,0.8);

void main() {
  float d = dot(v_normal,lightDirection);

  //float f = mix(1.0, 2.0, (sin(vUv.x * 1000.0)));

  float f = mix(1.0, 2.5, (sin(vUv.x * 900.0)));
  float g = mix(1.0, 2.5, (sin(vUv.y * 900.0)));

  float linesX = 1.0 - (f * 1000.0);
  float linesY = 1.0 - (g * 1000.0);

  float n = cnoise2(vUv * 100. + iGlobalTime) * 1.0;

  vec3 col = vec3(linesX - linesY * n);
  gl_FragColor = vec4( -col, 1.0 );
}
