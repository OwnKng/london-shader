import { useMemo, useRef } from "react"
import * as THREE from "three"
import { vertexShader } from "./shaders/vertexShader"
import { fragmentShader } from "./shaders/fragmentShader"
import { useFrame } from "@react-three/fiber"
import { ShaderMaterial } from "three"
import { lerp } from "three/src/math/MathUtils"

const Material = ({ texture }: any) => {
  const ref = useRef<ShaderMaterial>(null!)
  const { width, height } = texture.image

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uTextureSize: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture, width, height]
  )

  useFrame(({ clock, mouse }) => {
    ref.current.uniforms.uTime.value = clock.getElapsedTime()

    const x = lerp(
      ref.current.uniforms.uMouse.value.x,
      mouse.x * 0.5 + 0.5,
      0.1
    )
    const y = lerp(
      ref.current.uniforms.uMouse.value.y,
      mouse.y * 0.5 + 0.5,
      0.1
    )
    ref.current.uniforms.uMouse.value = new THREE.Vector2(x, y)

    ref.current.uniformsNeedUpdate = true
  })

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      blending={THREE.AdditiveBlending}
    />
  )
}

export default Material
