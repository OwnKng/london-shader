import { noise } from "./noise"

export const vertexShader = /* glsl */ `
    attribute vec3 offset; 
    attribute float pindex; 
    attribute vec2 adjustedUv; 

    uniform vec2 uTextureSize; 
    uniform sampler2D uTexture; 
    uniform float uTime; 
    uniform vec2 uMouse; 

    varying float vStrength; 
    varying vec2 vUv; 
    varying float vElevation; 
    varying float vDetails; 
    varying vec2 vMouse; 


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
        float wave = sin(uTime * 0.1) * 0.5 + 0.5; 
        float dist = distance(particleUv, vec2(0.5, 0.2)); 
        float bigNoise = cnoise(vec3(dist * 1.5, particleUv.y, particleUv.x)) * 8.0 * wave + 0.5;
        float details = cnoise(vec3(bigNoise, 1.0, 1.0)) + 0.5;
        float elevation = mod(details * 2.0, 1.0) * 8.0;

        displaced.z += ceil(elevation); 

        //_ size 
        float psize = elevation / 10.0; 

        //_ final position
        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position * max(psize, 0.4);
        gl_Position = projectionMatrix * transformedPosition;
 
        //_ passing the varyings
        vStrength = strength; 
        vUv = adjustedUv; 
        vElevation = elevation;
        vDetails = details; 
        vMouse = uMouse; 
    }
`
