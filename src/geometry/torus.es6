import torus from 'primitive-torus'
import normals from 'normals'
import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorLightingTextureMaterial } from '../material/color_lighting_texture'

export class Torus extends Geometry {
  constructor(opts = {}) {
    opts = {...Torus.defaultOpts, ...opts}
    super()

    let mesh = torus({ majorSegments: 32, minorSegments: 16 })

    this.indices = null

    if (opts.shading == Geometry.FLAT_SHADING) {
      this.normals = Geometry.calculateNormals(mesh.positions, mesh.cells, opts.shading)
      this.vertices = Geometry.calculateVertices(mesh.positions, mesh.cells, opts.shading)

      this.colors = flatten(map(flatten(this.vertices), (v) => opts.color.rgba), true)
      this.texCoords = flatten(map(flatten(this.vertices), (v) => [0,0]), true)

      this.normals = flatten(this.normals, true)
      this.vertices = flatten(this.vertices, true)

    } else {
      this.normals = flatten(mesh.normals, true)
      this.indices = flatten(mesh.cells, true)
      this.vertices = flatten(mesh.positions, true)
      this.texCoords = flatten(map(flatten(this.vertices, true), (v) => [0,0]), true);
      this.colors = flatten(map(mesh.positions, (v) => opts.color.rgba))
    }

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorLightingTextureMaterial(), color: Color.fromHex('#ffffff'), shading: Geometry.SMOOTH_SHADING }
  }
}