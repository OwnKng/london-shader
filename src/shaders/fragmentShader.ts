export const fragmentShader = /* glsl */ `
    varying float vStrength; 
    varying vec2 vUv; 

    void main() {
        float alpha = 1.0 - step(0.5, distance(vUv, vec2(0.5)));
        if(vStrength < 0.6) discard; 

        gl_FragColor = vec4(vStrength, vStrength, vStrength, 1.0);
    }
`
