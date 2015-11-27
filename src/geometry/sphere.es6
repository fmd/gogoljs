import sphere from 'primitive-sphere'
import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorMaterial } from '../material/color'

export class Sphere extends Geometry {
  constructor(opts = {}) {
    opts = { ...Sphere.defaultOpts, ...opts }
    super()

    let mesh = sphere(1, { segments: 16 })

    this.indices = null
    this.texCoords = this.uvs

    if (opts.shading == Geometry.FLAT_SHADING) {
      this.normals = Geometry.calculateNormals(mesh.positions, mesh.cells, opts.shading)
      this.vertices = Geometry.calculateVertices(mesh.positions, mesh.cells, opts.shading)
    } else {
      this.normals = flatten(mesh.normals, true)
      this.indices = flatten(mesh.cells, true)
      this.vertices = flatten(mesh.positions, true)
    }

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }),
             shading: Geometry.SMOOTH_SHADING }
  }
}