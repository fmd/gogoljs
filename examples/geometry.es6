import { mat4, vec3 } from 'gl-matrix'
import { gogol, Color, Scene, Sphere, Torus, Geometry, Axis,
         ColorLightingTextureMaterial, PerspectiveCamera } from '../src'

gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let scene = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = scene

scene.camera.translate(0.0, 0.0, 5.0)

let mat = () => { return new ColorLightingTextureMaterial() }

let t = new Torus({ material: mat(), shading: Geometry.FLAT_SHADING })
let s = new Sphere({ material: mat(), shading: Geometry.FLAT_SHADING })

scene.addChild(s)
scene.addChild(t)
scene.bake()

function render() {
  gogol.processOneFrame()
  t.rotate(1.3, Axis.Y)
  s.rotate(1.3, Axis.Y)
  window.setTimeout(render, 1000 / 60)
}

render()