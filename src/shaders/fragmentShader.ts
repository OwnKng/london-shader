import { hsl2rgb } from "./hsl2rgb"

export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying vec2 vUv; 
    varying float vElevation; 
    varying float vRings; 

    ${hsl2rgb}

    void main() {
        float color = vElevation * 0.2;
        float ringsStep = mod(vRings * 10.0, 2.5);

        vec3 finalColor = hsl2rgb(0.6, 0.5, 0.5 + 1.0 - ringsStep * 0.5); 
        if(vStrength < 0.6) discard; 

        gl_FragColor = vec4(finalColor, 1.0);
    }
`
