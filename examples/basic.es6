import { gogol, Scene, Quad, Program } from '../src'
gogol.init('gogol-example')

let s = new Scene()
gogol.scene = s

let sun = new Quad(50, 50)
let earth = new Quad(25, 25)
let moon = new Quad(10, 10)

sun.addChild(earth)
earth.translate(200, 0, 0)

earth.addChild(moon)
moon.translate(50, 0, 0)

s.addChild(sun)
sun.translate(400, 300, 0)

s.bake()

function render() {
  gogol.processOneFrame()
  sun.rotate(0.25)
  earth.rotate(1.0)
  moon.rotate(2.0)
  window.setTimeout(render, 1000 / 60)
}

render()