import { gogol, Scene, Quad, Program } from '../src'
gogol.init('gogol-example')

let s = new Scene()
let q = new Quad(100, 100)

gogol.scene = s
s.addChild(q)
s.bake()

render()

function render() {
  gogol.processOneFrame()
  window.setTimeout(render, 1000 / 60)
}

s.destroy()