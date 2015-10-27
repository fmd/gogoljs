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

export class Quad extends Renderable {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.vertices = calculateVertices(width, height)
    this.indices = calculateIndices()
    this.useMaterial(new ColorMaterial())
  }
}