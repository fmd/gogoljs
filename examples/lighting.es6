import { mat4, vec3 } from 'gl-matrix'
import { gogol, Scene, Cube, Transform, Program, ColorLightingMaterial, Color, PerspectiveCamera } from '../src'

gogol.init('gogol-example', { clearColor: Color.fromHex('232323') })

let s = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = s

s.camera.translate(0.0, 0.0, 100.0)

let mat = () => { return new ColorLightingMaterial() }

let sun = new Cube({ width: 5.0, height: 5.0, depth: 5.0, material: mat() })
sun.material.color = Color.fromHex('#f39c12')

let marsJoint = new Transform()
let mars = new Cube({ width: 2.0, height: 2.0, depth: 2.0, material: mat() })
mars.material.color = Color.fromHex('#c0392b')

let earthJoint = new Transform()
let earth = new Cube({ width: 2.5, height: 2.5, depth: 2.5, material: mat() })
earth.material.color = Color.fromHex('#16a085')

let moonJoint = new Transform()
let moon = new Cube({ width: 1.0, height: 1.0, depth: 1.0, material: mat() })
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

  sun.rotate(0.25)
  sun.rotate(0.25, vec3.fromValues(0,1,0))

  earthJoint.rotate(1.0, vec3.fromValues(0,1,0))
  marsJoint.rotate(1.2, vec3.fromValues(0,0,1))
  moonJoint.rotate(2.1, vec3.fromValues(0,1,0))

  earth.rotate(0.8, vec3.fromValues(0,1,0))

  window.setTimeout(render, 1000 / 60)
}

global.sun = sun
global.earth = earth
global.moon = moon
global.mars = mars
global.scene = s
global.Color = Color

render()