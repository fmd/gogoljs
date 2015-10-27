import { gogol, Scene, Quad, Program, Color, ColorMaterial } from '../src'
gogol.init('gogol-example')

let s = new Scene()
gogol.scene = s

let mat = () => { return new ColorMaterial() }

let sun = new Quad({ width: 50, height: 50, material: mat() })
sun.material.color = Color.fromHex('#f39c12')

let mars = new Quad({ width: 20, height: 20, material: mat() })
mars.material.color = Color.fromHex('#c0392b')

let earth = new Quad({ width: 25, height: 25, material: mat() })
earth.material.color = Color.fromHex('#16a085')

let moon = new Quad({ width: 10, height: 10, material: mat() })
moon.material.color = Color.fromHex('#95a5a6')

sun.addChild(earth)
earth.translate(200, 0, 0)

sun.addChild(mars)
mars.translate(0, 100, 0)

earth.addChild(moon)
moon.translate(80, 0, 0)

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