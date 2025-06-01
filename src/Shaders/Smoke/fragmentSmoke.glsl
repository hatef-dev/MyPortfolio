uniform sampler2D uPerlinTexture;
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
void main(){
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;

    smokeUv.y -= uTime * 0.05;

    float PerlinNosie = texture(uPerlinTexture, smokeUv).r;
    PerlinNosie *= smoothstep(0.4, 1.0, PerlinNosie);
    PerlinNosie *= smoothstep(0.0, 0.1, vUv.x);
    PerlinNosie *= smoothstep(0.0, 0.1, vUv.y);
    PerlinNosie *= smoothstep(1.0, 0.9, vUv.x);
    PerlinNosie *= smoothstep(1.0, 0.9, vUv.y);

    gl_FragColor = vec4(uColor, PerlinNosie);
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>


}