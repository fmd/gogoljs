import { Color } from './color'
import { ColorMaterial } from './color_material'
import { Renderable } from './renderable'

let calculateVertices = function(width, height, depth) {
  return [-width, -height, depth,
           width, -height, depth,
           width,  height, depth,
          -width,  height, depth,

          -width, -height, -depth,
          -width,  height, -depth,
           width,  height, -depth,
           width, -height, -depth,

          // Top face
          -width,  height, -depth,
          -width,  height,  depth,
           width,  height,  depth,
           width,  height, -depth,

          // Bottom face
          -width, -height, -depth,
           width, -height, -depth,
           width, -height,  depth,
          -width, -height,  depth,

          // Right face
           width, -height, -depth,
           width,  height, -depth,
           width,  height,  depth,
           width, -height,  depth,

          // Left face
          -width, -height, -depth,
          -width, -height,  depth,
          -width,  height,  depth,
          -width,  height, -depth]
}

let calculateIndices = function() {
  return [0,  1,  2,  0,  2,  3,
          4,  5,  6,  4,  6,  7,
          8,  9,  10, 8,  10, 11,
          12, 13, 14, 12, 14, 15,
          16, 17, 18, 16, 18, 19,
          20, 21, 22, 20, 22, 23]
}

export class Cube extends Renderable {
  constructor(width, height, depth) {
    super()
    this.width = width
    this.height = height
    this.depth = depth
    this.vertices = calculateVertices(width, height, depth)
    this.indices = calculateIndices()
    this.useMaterial(new ColorMaterial())
  }
}