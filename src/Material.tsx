import { useMemo, useRef } from "react"
import * as THREE from "three"
import { vertexShader } from "./shaders/vertexShader"
import { fragmentShader } from "./shaders/fragmentShader"
import { useFrame } from "@react-three/fiber"
import { ShaderMaterial } from "three"

const Material = ({ texture }: any) => {
  const ref = useRef<ShaderMaterial>(null!)
  const { width, height } = texture.image

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uTextureSize: { value: new THREE.Vector2(width, height) },
    }),
    []
  )

  useFrame(({ clock }) => {
    ref.current.uniforms.uTime.value = clock.getElapsedTime()
    ref.current.uniformsNeedUpdate = true
  })

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
    />
  )
}

export default Material
