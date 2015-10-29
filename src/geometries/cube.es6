import { Color } from '../core/color'
import { ColorMaterial } from '../materials/color'
import { Geometry } from '../core/geometry'

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

let calculateTexCoords = function() {
  return [0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0,

          0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0,

          0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0,

          0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0,

          0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0,

          0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0]
}

export class Cube extends Geometry {
  constructor(opts = {}) {
    opts = {...Cube.defaultOpts, ...opts}
    super()
    this.width = opts.width
    this.height = opts.height
    this.depth = opts.depth
    this.vertices = calculateVertices(opts.width, opts.height, opts.depth)
    this.indices = calculateIndices()
    this.texCoords = calculateTexCoords()
    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { width: 5.0,
             height: 5.0,
             depth: 5.0,
             material: new ColorMaterial() }
  }
}