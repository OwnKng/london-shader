import { hsl2rgb } from "./hsl2rgb"

export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying float vDetails; 
    varying vec2 vMouse; 

    ${hsl2rgb}

    void main() {
        float brightness = mod(vDetails * 2.0, 1.0);
        vec3 color = hsl2rgb(0.55 + 0.05 * vMouse.x, 0.5 + brightness * 0.4, 0.5 + brightness * 0.4);

        gl_FragColor = vec4(color, 1.0);
    }
`
