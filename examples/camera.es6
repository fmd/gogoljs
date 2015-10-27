import { mat4, vec3 } from 'gl-matrix'
import { gogol, Scene, Cube, Transform, Program, Color, PerspectiveCamera } from '../src'
gogol.init('gogol-example')

let s = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = s

s.camera.translate(0.0, 0.0, -100.0)

let sun = new Cube(5.0, 5.0, 5.0)
sun.material.color = Color.fromHex('#f39c12')

let marsJoint = new Transform()
let mars = new Cube(2.0, 2.0, 2.0)
mars.material.color = Color.fromHex('#c0392b')

let earthJoint = new Transform()
let earth = new Cube(2.5, 2.5, 2.5)
earth.material.color = Color.fromHex('#16a085')

let moonJoint = new Transform()
let moon = new Cube(1.0, 1.0, 1.0)
moon.material.color = Color.fromHex('#95a5a6')

earthJoint.addChild(earth)
earth.translate(20.0, 0, 0)

marsJoint.addChild(mars)
mars.translate(0, 10.0, 0)

moonJoint.addChild(moon)
moon.translate(8.0, 0, 0)

earth.addChild(moonJoint)

sun.addChild(earthJoint)
sun.addChild(marsJoint)

s.addChild(sun)

s.bake()

function render() {
  gogol.processOneFrame()
  s.camera.rotate(0.5, vec3.fromValues(0,1,0))

  sun.rotate(0.25)

  earthJoint.rotate(1.0, vec3.fromValues(0,1,0))
  marsJoint.rotate(1.2, vec3.fromValues(0,0,1))
  moonJoint.rotate(2.1, vec3.fromValues(0,1,0))

  earth.rotate(0.8, vec3.fromValues(0,1,0))

  window.setTimeout(render, 1000 / 60)
}

render()