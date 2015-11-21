import { mat4 } from 'gl-matrix'
import { gl, VERTEX_SIZE, FLOAT_SIZE } from './engine'
import { Transform } from './transform'

export class Geometry extends Transform {
  constructor() {
    super()
    this._material = null

    this.texCoords = []
    this.vertices = []
    this.indices = []

    this.texCoordsIndex = null
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

  bake(vertices, indices, texCoords, normals) {
    this.verticesIndex = vertices.length * FLOAT_SIZE
    vertices.push.apply(vertices, this.vertices)

    if (this.indices) {
      this.indicesIndex = indices.length
      indices.push.apply(indices, this.indices)
    }

    if (this.texCoords) {
      this.texCoordsIndex = texCoords.length * FLOAT_SIZE
      texCoords.push.apply(texCoords, this.texCoords)
    }

    if (this.normals) {
      this.normalsIndex = normals.length * FLOAT_SIZE
      normals.push.apply(normals, this.normals)
    }
  }

  render(v, p) {
    this.material.render(this.worldMatrix, v, p)
  }
}