import normals from 'normals'
import { mat4 } from 'gl-matrix'
import { reduce, find, flatten, map } from 'lodash'
import { gl, VERTEX_SIZE, FLOAT_SIZE } from './engine'
import { Transform } from './transform'

const FLAT_SHADING = 1
const SMOOTH_SHADING = 2

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

  static calculateVertices(positions, cells, shading = SMOOTH_SHADING) {
    if (!cells.length > 0) {
      return flatten(positions, true)
    }

    if (shading == SMOOTH_SHADING) {
      return flatten(positions, true)
    }

    if (shading == FLAT_SHADING) {
      return flatten(Geometry.unindexify(positions, cells), true)
    }

    return []
  }

  static calculateNormals(positions, cells, shading = SMOOTH_SHADING) {
    if (shading == SMOOTH_SHADING) {
      return flatten(normals.vertexNormals(cells, positions), true)
    }

    if (shading == FLAT_SHADING) {
      return flatten(map(normals.faceNormals(cells, positions), (n) => {
        return [n, n, n]
      }), true)
    }

    return []
  }

  static unindexify(vertices, indices) {
    let unindexed = []

    for (let i of indices) {
      unindexed.push([vertices[i[0]], vertices[i[1]], vertices[i[2]]])
    }

    return unindexed
  }

  static indexify(vertices) {
    return reduce(vertices, (indexed, v) => {
      let found = find(indexed, function(i) {
        return (v[0] == i[0] && v[1] == i[1] && v[2] == i[2])
      })

      if (typeof found === 'undefined') {
        return [...indexed, v]
      }

      return indexed
    }, [])
  }
}

Geometry.FLAT_SHADING = FLAT_SHADING
Geometry.SMOOTH_SHADING = SMOOTH_SHADING