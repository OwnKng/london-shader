// @ts-nocheck
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Image from "./Image"
import { Suspense } from "react"

const Scene = () => (
  <Canvas>
    <OrbitControls />
    <Suspense fallback={null}>
      <Image />
    </Suspense>
  </Canvas>
)

export default Scene
