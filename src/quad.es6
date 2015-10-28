import { Color } from './color'
import { ColorMaterial } from './color_material'
import { Renderable } from './renderable'

let calculateVertices = function(width, height) {
  return [-width, -height, 0.0,
          -width, height, 0.0,
          width,  height, 0.0,
          width,  -height, 0.0]
}

let calculateIndices = function() {
  return [0, 1, 2, 3, 0, 2, 3]
}

let calculateTexCoords = function() {
  return [0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0]
}

export class Quad extends Renderable {
  constructor(opts = {}) {
    opts = {...Quad.defaultOpts, ...opts}
    super()

    this.width = opts.width
    this.height = opts.height
    this.vertices = calculateVertices(opts.width, opts.height)
    this.indices = calculateIndices()
    this.texCoords = calculateTexCoords();
    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { width: 5.0, height: 5.0, material: new ColorMaterial() }
  }
}