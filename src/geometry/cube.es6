import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { DefaultMaterial } from '../material/default'
import { Geometry } from '../core/geometry'

let vertices = function(width, height, depth) {
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

let indices = function() {
  return [0,  1,  2,  0,  2,  3,
          4,  5,  6,  4,  6,  7,
          8,  9,  10, 8,  10, 11,
          12, 13, 14, 12, 14, 15,
          16, 17, 18, 16, 18, 19,
          20, 21, 22, 20, 22, 23]
}

let texCoords = function() {
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

let normals = function() {
  return [
  // Front
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,

  // Back
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,

  // Top
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,

  // Bottom
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,

  // Right
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,

  // Left
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0
];
}

export class Cube extends Geometry {
  constructor(opts = {}) {
    opts = {...Cube.defaultOpts, ...opts}
    super()
    this.vertices = vertices(opts.width, opts.height, opts.depth)
    this.indices = indices()
    this.normals = normals()
    this.texCoords = texCoords()
    this.colors = flatten(map(new Array(24), (b) => opts.color.rgba), true)
    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { width: 5.0,
             height: 5.0,
             depth: 5.0,
             color: Color.fromHex('#ffffff'),
             material: new DefaultMaterial() }
  }
}