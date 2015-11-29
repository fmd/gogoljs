import normals from 'normals'
import conway from 'conway-hart'
import { vec3 } from 'gl-matrix'
import { Color } from '../core/color'
import { flatten, uniq } from 'lodash'
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

    if (opts.shading == Geometry.SMOOTH_SHADING) {
      this.indices = flatten(mesh.cells, true)
    }

    console.log(this.normals.length)
    console.log(this.vertices.length)

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }),
             conway: 'O',
             shading: Geometry.FLAT_SHADING }
  }
}