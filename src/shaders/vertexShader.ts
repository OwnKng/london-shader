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
    varying float vElevation; 
    varying float vRings; 

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
        float randomNoise = cnoise(vec3(2.0, particleUv)) * 0.25;
        float rings = distance(particleUv + randomNoise, vec2(0.0, 0.2));
        rings = mod(rings * 2.0, 1.0);
        float elevation = ceil(rings * 4.0); 
 
        // displaced.z += elevation;

        //_ size 
        // float psize = cnoise(vec3(particleUv, mod(rings * 10.0, 2.5))) + 2.0;
        // psize *= 0.4; 
        // psize *= max(strength, 0.1);

        //_ final position
        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position * 0.6;
        gl_Position = projectionMatrix * transformedPosition;
 
        //_ passing the varyings
        vStrength = strength; 
        vUv = adjustedUv; 
        vElevation = elevation; 
        vRings = rings; 
    }
`
