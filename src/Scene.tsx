//@ts-nocheck
import { Canvas } from "@react-three/fiber"
import Image from "./Image"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"

const Scene = () => (
  <Canvas camera={{ position: [0, -50, 120] }}>
    <Suspense fallback={null}>
      <OrbitControls />
      <Image />
    </Suspense>
  </Canvas>
)

export default Scene
