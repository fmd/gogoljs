import normals from 'normals'
import conway from 'conway-hart'
import { vec3 } from 'gl-matrix'
import { Color } from '../core/color'
import { flatten } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorMaterial } from '../material/color'


export class Conway extends Geometry {
  constructor(opts = {}) {
    opts = {...Conway.defaultOpts, ...opts}
    super()

    let mesh = conway(opts.conway)

    this.vertices = flatten(mesh.positions)
    this.indices = flatten(mesh.cells)
    this.normals = flatten(normals.vertexNormals(mesh.cells, mesh.positions));
    this.texCoords = [] //flatten(mesh.uvs)

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }),
             conway: 'O' }
  }
}