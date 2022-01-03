import { hsl2rgb } from "./hsl2rgb"

export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying float vDetails; 
    varying vec2 vMouse; 
    varying float vTime; 

    ${hsl2rgb}

    void main() {
        float wave = sin(vTime) * 0.5 + 0.5; 

        float brightness = ceil(vDetails) * 0.125; 
        vec3 color = hsl2rgb(0.5 - brightness * wave * 0.15, 0.4, brightness);

        gl_FragColor = vec4(color, 1.0);
    }
`
