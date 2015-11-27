import { mat4, vec3 } from 'gl-matrix'
import { gogol, Color, Scene, Sphere, Torus, Transform,
         ColorMaterial, ColorLightingMaterial, PerspectiveCamera } from '../src'

gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let scene = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = scene

scene.camera.translate(0.0, 0.0, 5.0)

let mat = () => { return new ColorLightingMaterial() }

let t = new Torus({ material: mat() })
let s = new Sphere({ material: mat() })

let b = new Transform()
let t2 = new Torus({ material: mat() })
let s2 = new Sphere({ material: mat() })

b.addChild(t2)
b.addChild(s2)

scene.addChild(s)
scene.addChild(t)
scene.addChild(b)
scene.bake()

b.translate(1.0, 0.0, 0.0)

function render() {
  gogol.processOneFrame()

  t.rotate(4.0, vec3.fromValues(1,0,0))
  s.rotate(4.0, vec3.fromValues(1,0,0))

  t2.rotate(4.0, vec3.fromValues(1,0,0))
  s2.rotate(4.0, vec3.fromValues(1,0,0))

  window.setTimeout(render, 1000 / 60)
}

render()