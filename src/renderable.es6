import { mat4 } from 'gl-matrix'
import { gl, VERTEX_SIZE, FLOAT_SIZE } from './engine'
import { Transform } from './transform'

export class Renderable extends Transform {
  constructor() {
    super()
    this.material = null

    this.vertices = []
    this.indices = []

    // Set when the scene is baked.
    this.verticesIndex = null
    this.indicesIndex = null
  }

  bake(vertices, indices) {
    this.verticesIndex = vertices.length * FLOAT_SIZE

    vertices.push.apply(vertices, this.vertices)

    this.indicesIndex = indices.length
    indices.push.apply(indices, this.indices)

    for (let child of this.children) {
      if (child.vertices && child.indices) {
        child.bake(vertices, indices)
      }
    }
  }

  render(pvMatrix) {
    let mvp = mat4.create()
    mat4.mul(mvp, pvMatrix, this.worldMatrix)
    this.material.render(mvp, this.verticesIndex, this.indicesIndex, this.indices.length)

    for (let child of this.children) {
      if (!child.material) {
        continue
      }

      child.render(pvMatrix)
    }
  }
}