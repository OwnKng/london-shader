import { noise } from "./noise"

export const vertexShader = /* glsl */ `
    attribute vec3 offset; 
    attribute float pindex; 
    attribute vec2 adjustedUv; 

    uniform vec2 uTextureSize; 
    uniform sampler2D uTexture; 
    uniform float uTime; 

    varying float vStrength; 
    varying vec2 vUv; 

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
        float rings = 1.0 - mod(distance(particleUv, vec2(0.5)) * 10.0, 1.0);
        float randomNoise = cnoise(vec3(particleUv, pindex));
        displaced.z += (rings * randomNoise) * 5.0;

        //_ size 
        float psize = cnoise(vec3(particleUv, pindex)) + 2.0;
        psize *= 0.4; 
        psize *= max(strength, 0.2);

        //_ final position
        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position * psize; 
        gl_Position = projectionMatrix * transformedPosition;
 
        //_ passing the varyings
        vStrength = strength; 
        vUv = adjustedUv; 
    }
`
