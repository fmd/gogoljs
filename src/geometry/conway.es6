import normals from 'normals'
import conway from 'conway-hart'
import { vec3 } from 'gl-matrix'
import { Color } from '../core/color'
import { flatten, uniq, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorMaterial } from '../material/color'

export class Conway extends Geometry {
  constructor(opts = {}) {
    opts = { ...Conway.defaultOpts, ...opts }
    super()

    let mesh = conway(opts.conway)

    this.indices = null
    this.texCoords = null

    this.normals = Geometry.calculateNormals(mesh.positions, mesh.cells, opts.shading)
    this.vertices = Geometry.calculateVertices(mesh.positions, mesh.cells, opts.shading)
    this.texCoords = map(flatten(this.vertices), (v) => [0,0])

    this.colors = map(mesh.cells, (cell, i) => {
      let repeat = (cell.length - 2) * 3
      let colors = []

      let color = opts.palette[i % opts.palette.length].rgba

      if (opts.palette.length > (cell.length - 3)) {
        color = opts.palette[cell.length - 3].rgba
      }

      for (let i = 0; i < repeat; i++) {
        colors.push(color)
      }

      return colors
    })

    this.vertices = flatten(this.vertices, true)
    this.normals = flatten(this.normals, true)
    this.colors = flatten(this.colors, true)
    this.texCoords = flatten(this.texCoords, true)

    if (opts.shading == Geometry.SMOOTH_SHADING) {
      this.indices = flatten(Geometry.unindexCells(mesh.cells), true)
    }

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }),
             conway: 'O',
             palette: [Color.fromHex('#ffffff')],
             shading: Geometry.FLAT_SHADING }
  }
}