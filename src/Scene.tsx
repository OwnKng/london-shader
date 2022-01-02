import { Canvas } from "@react-three/fiber"
import Image from "./Image"
import { Suspense } from "react"

const Scene = () => (
  <Canvas camera={{ position: [0, -5, 120] }}>
    <Suspense fallback={null}>
      <Image />
    </Suspense>
  </Canvas>
)

export default Scene
