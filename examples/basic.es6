import { gogol, Scene, Quad, Program } from '../src'
gogol.init('gogol-example')

let s = new Scene()
gogol.scene = s

let q = new Quad(100, 100)
q.translate(400, 300, 0)
s.addChild(q)
s.bake()

render()

function render() {
  gogol.processOneFrame()
  window.setTimeout(render, 1000 / 60)
}