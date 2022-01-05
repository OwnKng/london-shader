import { hsl2rgb } from "./hsl2rgb"

export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying float vDetails; 
    varying vec2 vMouse; 
    varying float vTime; 

    ${hsl2rgb}

    void main() {
        float wave = abs(sin(vTime)); 
        float brightness = (vDetails) * 0.025; 
        vec3 color = hsl2rgb(0.5 + brightness * 0.5, 0.5, 0.5 + brightness * 0.5);

        gl_FragColor = vec4(color, 1.0);
    }
`
