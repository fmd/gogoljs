import torus from 'primitive-torus'
import normals from 'normals'
import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorMaterial } from '../material/color'

export class Torus extends Geometry {
  constructor(opts = {}) {
    opts = {...Torus.defaultOpts, ...opts}
    super()

    let mesh = torus({ majorSegments: 8, minorSegments: 16 })

    console.log('asdasd')

    this.vertices = flatten(mesh.positions)
    this.normals = flatten(mesh.normals)
    this.texCoords = flatten(mesh.uvs)
    this.indices = flatten(mesh.cells)

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorMaterial({ color: Color.fromHex('#f39c12') }) }
  }
}