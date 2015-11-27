import { mat4, vec3 } from 'gl-matrix'
import { gogol, Color, Scene, Conway,
         ColorLightingMaterial, PerspectiveCamera } from '../src'

gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let scene = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = scene

scene.camera.translate(0.0, 0.0, 5.0)

let mat = () => { return new ColorLightingMaterial() }

let t = new Conway({ material: mat() })

scene.addChild(t)
scene.bake()

function render() {
  gogol.processOneFrame()

  t.rotate(4.0, vec3.fromValues(1,0,0))

  window.setTimeout(render, 1000 / 60)
}

render()