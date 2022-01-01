export const fragmentShader = /* glsl */ `
    varying float vStrength; 

    void main() {
        gl_FragColor = vec4(vStrength, vStrength, vStrength, vStrength);
    }
`
