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

    float generateElevation(vec3 _position) {

        float elevation = 1.0;  

        float wave1 = distance(_position.xy, vec2(1.0, 0.0));
        float wave2 = 1.0 - distance(_position.yy, vec2(0.0));
        float wave = smoothstep(0.7, 1.0, wave1) + smoothstep(0.8, 1.2, wave2);

        elevation += wave;
        elevation += (cnoise(vec3(_position.xy * 8.0, wave)) + 0.5);
        elevation += (cnoise(vec3((_position.xy + 123.0) * 10.0 , 1.0)) + 0.5);

        return elevation; 
    }

    void main() {
        vec3 displaced = offset; 
        vec2 particleUv = offset.xy / uTextureSize; 

        //_ distort the positions
        float elevation = generateElevation(vec3(particleUv, pindex));   
        float wave = sin(uTime) * 0.5 + 0.5; 
        elevation = floor(elevation * 4.0) * uMouse.y;
        displaced.z += 2.0 + elevation; 

        //_ interaction
        displaced.z -= uMouse.y * 20.0;
        displaced.x += uMouse.x * 10.0;

        //_ final position
        vec4 transformedPosition = modelViewMatrix * vec4(displaced, 1.0); 
        transformedPosition.xyz += position * 0.8; 
        gl_Position = projectionMatrix * transformedPosition;
 
        //_ passing the varyings
        vUv = adjustedUv; 
        vDetails = elevation; 
        vMouse = uMouse; 
        vTime = uTime; 
    }
`
