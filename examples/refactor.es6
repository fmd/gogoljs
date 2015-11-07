import { gogol,
         BasicMaterialComponent,
         BasicLightingComponent,
         BasicColorComponent,
         ProgramBuilder } from '../src'

gogol.init('gogol-example')

let c = new BasicMaterialComponent()
let l = new BasicLightingComponent()
let s = new ProgramBuilder()

s.add(c)
s.add(l)
console.log('--- Vertex ---')
console.log(s.vertexComponent)
console.log('--- Fragment ---')
console.log(s.fragmentComponent)