//@ts-nocheck
import { useTexture } from "@react-three/drei"
import { useMemo, useRef } from "react"
import Material from "./Material"

const Image = () => {
  const map = useTexture("map.png")
  const { width, height } = map.image
  const numPoints = width * height
  const threshold = 180

  const ref = useRef(null!)

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

  //_ image cleanup
  const { originalColors, numVisible } = useMemo(() => {
    let numVisible = 0

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = width
    canvas.height = height

    ctx.scale(1, -1)
    ctx.drawImage(map.image, 0, 0, width, height * -1)

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const originalColors = Float32Array.from(data)

    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] >= threshold) numVisible++
    }

    return { originalColors, numVisible }
  }, [numPoints, width, height, map])

  //_ set instance attributes
  const { offsets, indices } = useMemo(() => {
    const offsets = new Float32Array(numVisible * 3)
    const indices = new Uint16Array(numVisible)

    for (let i = 0, j = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] >= threshold) {
        offsets[j * 3 + 0] = i % width
        offsets[j * 3 + 1] = Math.floor(i / width)
        offsets[j * 3 + 2] = 0
        indices[j] = [i]
        j++
      }
    }

    return { offsets, indices }
  }, [numVisible, originalColors, threshold, numPoints, width])

  return (
    <instancedMesh
      args={[null, null, numVisible]}
      position={[-width / 2, -height / 2, 0]}
      ref={ref}
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
