import { vec3 } from 'gl-matrix'
import { Cube, PerspectiveCamera, Color, Scene, gogol } from '../src'

gogol.init('gogol-example')

let scene = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = scene

scene.camera.translate(0.0, 0.0, 100.0)

let sun = new Cube({ width: 5.0, height: 5.0, depth: 5.0 })
sun.material.color = Color.fromHex('#f39c12')

scene.addChild(sun)
scene.bake()

function render() {
  gogol.processOneFrame()

  sun.rotate(0.25, vec3.fromValues(0,1,0))

  window.setTimeout(render, 1000 / 60)
}

render()