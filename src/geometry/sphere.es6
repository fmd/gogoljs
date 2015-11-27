import sphere from 'primitive-sphere'
import normals from 'normals'
import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorMaterial } from '../material/color'

export class Sphere extends Geometry {
  constructor(opts = {}) {
    opts = {...Sphere.defaultOpts, ...opts}
    super()

    let mesh = sphere(1, { segments: 16 })

    this.vertices = flatten(mesh.positions, true)
    this.texCoords = flatten(mesh.uvs, true)
    this.indices = flatten(mesh.cells, true)
    this.normals = flatten(mesh.normals, true)

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }) }
  }
}