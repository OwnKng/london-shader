//@ts-nocheck
import { useTexture } from "@react-three/drei"
import { useMemo, useRef } from "react"
import Material from "./Material"

const Image = () => {
  const map = useTexture("map.png")
  const { width, height } = map.image
  const numPoints = width * height

  //_ vertices and index for the map
  const vertices = useMemo(
    () =>
      new Float32Array([
        -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
      ]),
    []
  )

  const index = useMemo(() => new Uint16Array([0, 2, 1, 2, 3, 1]), [])

  const uvs = useMemo(() => new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), [])

  const { offsets, indices } = useMemo(() => {
    const offsets = new Float32Array(numPoints * 3)
    const indices = new Uint16Array(numPoints)

    for (let i = 0; i < numPoints; i++) {
      offsets[i * 3 + 0] = i % width
      offsets[i * 3 + 1] = Math.floor(i / width)
      offsets[i * 3 + 2] = 0
    }

    return { offsets, indices }
  }, [numPoints, width])

  return (
    <instancedMesh
      args={[null, null, numPoints]}
      position={[-width / 2, -height / 2, 0]}
    >
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          args={[vertices, 3]}
        />
        <bufferAttribute
          attachObject={["attributes", "adjustedUv"]}
          args={[uvs, 2]}
        />
        <bufferAttribute
          attach='index'
          array={index}
          count={index.length}
          itemSize={1}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "offset"]}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "pindex"]}
          args={[indices, 1]}
        />
      </bufferGeometry>
      <Material texture={map} />
    </instancedMesh>
  )
}

export default Image
