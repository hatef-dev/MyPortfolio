uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform vec3 uModelPosition;
varying vec2 vUv;
mat2 rotate(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float twinPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.3 - uTime * 0.005)).r;
    float angle = twinPerlin * 12.0;

    modelPosition.xz *= rotate(angle);

    vec2 twinOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.005)).r - 0.5,
        texture(uPerlinTexture, vec2(0.75, uTime * 0.005)).r - 0.5
    );
    twinOffset *= pow(uv.y, 2.0) * 7.0;
    modelPosition.xz += twinOffset;
    modelPosition.y += uModelPosition.y;
    modelPosition.x += uModelPosition.x;
    modelPosition.z += uModelPosition.z;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}