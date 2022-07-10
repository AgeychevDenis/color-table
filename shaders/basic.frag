#ifdef GL_ES
precision highp float;
#endif

varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 brown = vec3(.99, .0, .0);
    vec3 sunlightDirection = vec3(0., 0., 1.);
    float lightness = -clamp(dot(normalize(vNormal), normalize(sunlightDirection)), -1., 1.);
    gl_FragColor = vec4(brown * lightness, 1.);
}

