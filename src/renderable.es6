import { mat4 } from 'gl-matrix'
import { gl, VERTEX_SIZE, FLOAT_SIZE } from './engine'
import { Transform } from './transform'

export class Renderable extends Transform {
  constructor() {
    super()
    this._material = null

    this.vertices = []
    this.indices = []

    this.verticesIndex = null
    this.indicesIndex = null
  }

  useMaterial(material) {
    this._material = material
    material.target = this
  }

  get material() {
    return this._material
  }

  bake(vertices, indices) {
    this.verticesIndex = vertices.length * FLOAT_SIZE

    vertices.push.apply(vertices, this.vertices)

    this.indicesIndex = indices.length
    indices.push.apply(indices, this.indices)
  }

  render(pvMatrix) {
    let mvp = mat4.create()
    mat4.mul(mvp, pvMatrix, this.worldMatrix)
    this.material.render(mvp, this.verticesIndex, this.indicesIndex, this.indices.length)
  }
}