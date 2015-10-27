import { mat4, vec3 } from 'gl-matrix'
import { gogol, Scene, Quad, Program, Color, PerspectiveCamera, OrthographicCamera } from '../src'
gogol.init('gogol-example')

let s = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = s

s.camera.translate(0.0, 10.0, 100.0)

let sun = new Quad(5.0, 5.0)
sun.material.color = Color.fromHex('#f39c12')

let mars = new Quad(2.0, 2.0)
mars.material.color = Color.fromHex('#c0392b')

let earth = new Quad(2.5, 2.5)
earth.material.color = Color.fromHex('#16a085')

let moon = new Quad(1.0, 1.0)
moon.material.color = Color.fromHex('#95a5a6')

sun.addChild(earth)
earth.translate(20.0, 0, 0)

sun.addChild(mars)
mars.translate(0, 10.0, 0)

earth.addChild(moon)
moon.translate(8.0, 0, 0)

s.addChild(sun)
//sun.translate(0, 0, 0)


s.bake()

function render() {
  gogol.processOneFrame()
  sun.rotate(0.25)
  earth.rotate(1.0)
  mars.rotate(1.2)
  moon.rotate(2.0)
  window.setTimeout(render, 1000 / 60)
}

render()