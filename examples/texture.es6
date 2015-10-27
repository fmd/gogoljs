import { gogol, Scene, Sprite, Program, Color } from '../src'
gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let s = new Scene()
gogol.scene = s

let sun = new Sprite({ width: 128, height: 128, src: 'texture.jpg' })
let mars = new Sprite({ width: 64, height: 64, src: 'texture.png' })
let earth = new Sprite({ width: 32, height: 32, src: 'texture.png' })
let moon = new Sprite({ width: 32, height: 32, src: 'texture.png' })

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