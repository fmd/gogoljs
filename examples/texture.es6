import { gogol, Scene, Quad, Program, Color, TextureMaterial } from '../src'
gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let s = new Scene()
gogol.scene = s

let mat = () => { return new TextureMaterial({ src: 'texture.png' }) }

let sun = new Quad({ width: 128, height: 128, material: mat() })
let mars = new Quad({ width: 64, height: 64, material: mat() })
let earth = new Quad({ width: 32, height: 32, material: mat() })
let moon = new Quad({ width: 32, height: 32, material: mat() })

sun.addChild(earth)
earth.translate(100, 0, 0)

sun.addChild(mars)
mars.translate(0, 50, 0)

earth.addChild(moon)
moon.translate(20, 0, 0)

s.addChild(sun)
sun.translate(400, 300, 0)

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