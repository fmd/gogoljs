import { mat4, vec3 } from 'gl-matrix'
import { gogol, Scene, Conway, Sphere, Torus, Cube, Transform, Program, ColorMaterial, ColorLightingMaterial,
         ColorLightingTextureMaterial, Color, PerspectiveCamera } from '../src'
gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let s = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = s

s.camera.translate(0.0, 0.0, 5.0)

let mat = () => { return new ColorLightingMaterial() }

let t = new Torus({ material: mat() })
global.tor = t

s.addChild(t)
s.bake()

function render() {
  gogol.processOneFrame()
  t.rotate(0.4, vec3.fromValues(0,1,0))
  window.setTimeout(render, 1000 / 60)
}

render()