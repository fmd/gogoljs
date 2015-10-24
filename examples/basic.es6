import { gogol, Scene, Quad } from '../src'
gogol.init('gogol-example')

let s = new Scene()
let q = new Quad(100, 100)

s.addChild(q)
s.bake()

console.log(q)
console.log(s)