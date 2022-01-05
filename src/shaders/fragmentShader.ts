import { hsl2rgb } from "./hsl2rgb"

export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying float vDetails; 
    varying vec2 vMouse; 
    varying float vTime; 

    ${hsl2rgb}

    void main() {
        float sinWave = mix(0.0, 1.0, vDetails / 50.0);
       
        float brightness = (vDetails) * 0.025; 
        vec3 color = hsl2rgb(0.5 + sinWave, 0.3, 0.5 + sinWave);

        gl_FragColor = vec4(color, 1.0);
    }
`
