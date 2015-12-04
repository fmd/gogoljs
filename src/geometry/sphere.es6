import sphere from 'primitive-sphere'
import { Color } from '../core/color'
import { flatten, map } from 'lodash'
import { Geometry } from '../core/geometry'
import { ColorLightingTextureMaterial } from '../material/default'

export class Sphere extends Geometry {
  constructor(opts = {}) {
    opts = { ...Sphere.defaultOpts, ...opts }
    super()

    let mesh = sphere(1, { segments: 16 })

    this.indices = null

    if (opts.shading == Geometry.FLAT_SHADING) {
      this.normals = Geometry.calculateNormals(mesh.positions, mesh.cells, opts.shading)
      this.vertices = Geometry.calculateVertices(mesh.positions, mesh.cells, opts.shading)
      this.colors = flatten(map(flatten(this.vertices), (v) => opts.color.rgba), true)
      this.texCoords = flatten(map(flatten(this.vertices), (v) => [0,0]));
      this.normals = flatten(this.normals, true)
      this.vertices = flatten(this.vertices, true)
    } else {
      this.normals = flatten(mesh.normals, true)
      this.indices = flatten(mesh.cells, true)
      this.vertices = flatten(mesh.positions, true)
      this.texCoords = map(flatten(this.vertices, true), (v) => [0,0]);
      this.colors = flatten(map(mesh.positions, (v) => opts.color.rgba))
    }

    this.useMaterial(opts.material)
  }

  static get defaultOpts() {
    return { material: new ColorLightingTextureMaterial(),
             shading: Geometry.SMOOTH_SHADING,
             color: Color.fromHex('#ffffff') }
  }
}