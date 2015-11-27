import { Color } from '../core/color'
import { ColorMaterial } from '../material/color'
import { Geometry } from '../core/geometry'

let vertices = function(width, height) {
  return [-width, -height, 0.0,
          -width, height, 0.0,
          width,  height, 0.0,
          width,  -height, 0.0]
}

let indices = function() {
  return [0, 1, 2, 0, 2, 3]
}

let texCoords = function() {
  return [0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0]
}

export class Quad extends Geometry {
  constructor(opts = {}) {
    super()
    opts = {...Quad.defaultOpts, ...opts}
    this.vertices = vertices(opts.width, opts.height)
    this.indices = indices()
    this.texCoords = texCoords();
    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { width: 5.0, height: 5.0, material: new ColorMaterial() }
  }
}