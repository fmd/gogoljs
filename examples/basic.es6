import { gogol, Scene, Quad, Program } from '../src'
gogol.init('gogol-example')

let s = new Scene()
gogol.scene = s

let q = new Quad(10, 10)
let q2 = new Quad(50, 50)
q.translate(100, 300, 0)
q2.translate(600, 300, 0)

s.addChild(q)
s.addChild(q2)
s.bake()

render()

function render() {
  gogol.processOneFrame()
  window.setTimeout(render, 1000 / 60)
}