import { noise } from "./noise"

export const vertexShader = /* glsl */ `
    attribute vec3 offset; 
    attribute float pindex; 

    uniform vec2 uTextureSize; 
    uniform sampler2D uTexture; 
    uniform float uTime; 

    varying float vStrength; 

    float random(float n) {
	    return fract(sin(n) * 43758.5453123);
    }

    ${noise}

    void main() {
        vec3 displaced = offset; 
        vec2 particleUv = offset.xy / uTextureSize; 

        vec4 color = texture2D(uTexture, particleUv); 
        float strength = color.r * 0.30 + color.g * 0.30 + color.b * 0.40; 

        //_ distort the positions
        float randomNoise = (random(pindex) + noise(vec2(particleUv.y, uTime * 0.1))) * 20.0;
        displaced.z += randomNoise;

        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position; 
        gl_Position = projectionMatrix * transformedPosition;

        //_ passing the varyings
        vStrength = strength; 
    }
`
