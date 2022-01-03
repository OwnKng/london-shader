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
    varying float vTime; 


    float random(float n) {
	    return fract(sin(n) * 43758.5453123);
    }

    ${noise}

    void main() {
        vec3 displaced = offset; 
        vec2 particleUv = offset.xy / uTextureSize; 

        //_ distort the positions
        float dist = (sin(particleUv.x * 3.142 * 2.0) * 0.5 + 0.5 + cos(particleUv.y * 3.142 * 1.5) * 0.5 + 0.5);  
        float bigNoise = cnoise(vec3(dist, particleUv.y, particleUv.x)) * 6.0;
        float details = (cnoise(vec3(bigNoise, 0.1, 0.1)) + 1.0) * 6.0;
        
        displaced.z += ceil(details); 

        //_ size 
       

        //_ interaction
        displaced.z -= uMouse.y * 20.0;
        displaced.x += uMouse.x * 10.0;

        //_ final position
        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position * 0.8;
        gl_Position = projectionMatrix * transformedPosition;
 
        //_ passing the varyings
        vUv = adjustedUv; 
        vDetails = details; 
        vMouse = uMouse; 
        vTime = uTime; 
    }
`
