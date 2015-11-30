import normals from 'normals'
  import { mat4, vec3 } from 'gl-matrix'
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

  bake(vertices, indices, texCoords, normals, colors) {
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

    if (this.colors) {
      this.colorsIndex = colors.length * FLOAT_SIZE
      colors.push.apply(colors, this.colors)
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
      return positions
    }

    if (shading == SMOOTH_SHADING) {
      return positions
    }

    if (shading == FLAT_SHADING) {
      return Geometry.unindexify(positions, cells)
    }

    return []
  }

  static calculateNormals(positions, cells, shading = SMOOTH_SHADING) {
    // TODO: Calculate normals if there are no cells.

    if (shading == SMOOTH_SHADING) {
      return normals.vertexNormals(Geometry.unindexCells(cells), positions)
    }

    if (shading == FLAT_SHADING) {
      return Geometry.expandNormals(cells, normals.vertexNormals(Geometry.unindexCells(cells), positions))
    }

    return []
  }

  static averageNormals(cell, normals) {
    let n = map(reduce(map(cell, (c) => normals[c]),
                       (total, n) => [total[0] + n[0],
                                      total[1] + n[1],
                                      total[2] + n[2]]),
                (n) => n / cell.length)

    return n
  }

  static expandNormals(cells, normals) {
    let expanded = []

    for (let i = 0; i < cells.length; i++) {
      let repeat = (cells[i].length - 2) * 3
      let face = []

      for (let j = 0; j < repeat; j++) {
        face.push(Geometry.averageNormals(cells[i], normals))
      }

      expanded.push(face)
    }

    return expanded
  }

  static unindexCells(cells) {
    let unindexed = []

    for (let cell of cells) {
      for (let j = 2; j < cell.length; ++j) {
        let c = []
        c.push(cell[0])
        c.push(cell[j-1])
        c.push(cell[j])
        unindexed.push(c)
      }
    }

    return unindexed
  }

  static unindexify(vertices, cells) {
    let unindexed = []

    for (let cell of cells) {
      for (let j = 2; j < cell.length; ++j) {
        let tri = []
        tri.push(vertices[cell[0]])
        tri.push(vertices[cell[j-1]])
        tri.push(vertices[cell[j]])
        unindexed.push(tri)
      }
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