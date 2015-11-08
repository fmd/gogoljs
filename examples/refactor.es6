import { gogol,
         BasicMaterialComponent,
         BasicLightingComponent,
         ProgramBuilder,
         ProgramPipeline,
         ShaderGlobal,
         ShaderLocal } from '../src'

gogol.init('gogol-example')

// let c = new BasicMaterialComponent()
// let l = new BasicLightingComponent()
// let s = new ProgramBuilder()

// s.add(c)
// s.add(l)

// console.log('--- Vertex ---')
// console.log(s.vertexComponent)
// console.log('--- Fragment ---')
// console.log(s.fragmentComponent)

// let nm =
// let an =
// let vl =
// let vc = sGlobal('varying lowp vec4 vFragColor')

let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
let sLocal = (s) => { return ShaderLocal.fromString(s) }
let p = new ProgramPipeline({ ...ProgramPipeline.matrices,
                              ...ProgramPipeline.attributes,

                              // --- Globals ---
                              // Lighting
                              uNormalMatrix:   sGlobal('uniform mat4 uNormalMatrix'),
                              vLighting:       sGlobal('varying highp vec3 vLighting'),

                              // Texture
                              uSampler:        sGlobal('uniform sampler2D uSampler'),
                              vTextureCoord:   sGlobal('varying highp vec2 vTextureCoord'),
                              uColor:          sGlobal('uniform lowp vec4 uColor'),

                              // --- Locals ---
                              iVertexPosition: sLocal('highp vec4 iVertexPosition'),
                              iFragColor:      sLocal('lowp vec4 iFragColor') })

p.connect(BasicMaterialComponent)
p.connect(BasicLightingComponent)

console.log('-- Vertex --')
console.log('------------')
console.log(p.vertex)

console.log('-- Fragment --')
console.log('--------------')
console.log(p.fragment)