import { Renderable } from './renderable'

var calculateVertices = function(width, height) {
  return [-width, -height, 0.0,
          -width, height, 0.0,
          width,  height, 0.0,
          width,  -height, 0.0]
}

var calculateIndices = function() {
  return [0, 1, 2, 3, 0, 2, 3]
}

export class Quad extends Renderable {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.vertices = calculateVertices(width, height)
    this.indices = calculateIndices()
  }
}