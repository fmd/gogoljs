import { ProgramBuilder,
         ProgramPipeline,
         ShaderGlobal,
         ShaderLocal } from '../src'


let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
let sLocal = (s) => { return ShaderLocal.fromString(s) }

let p = new ProgramPipeline({ // *** Pipeline Requires ***

                              // --- Globals ---
                              // Matrices & Attributes
                              ...ProgramPipeline.matrices,
                              ...ProgramPipeline.attributes,

                              // Lighting
                              uNormalMatrix:   sGlobal('uniform mat4 uNormalMatrix'),
                              vLighting:       sGlobal('varying highp vec3 vLighting'),

                              // Texture
                              uSampler:        sGlobal('uniform sampler2D uSampler'),
                              vTextureCoord:   sGlobal('varying highp vec2 vTextureCoord'),
                              uColor:          sGlobal('uniform lowp vec4 uColor'),

                              // --- Locals ---
                              iVertexPosition: sLocal('highp vec4 iVertexPosition'),
                              iFragColor:      sLocal('lowp vec4 iFragColor') },

                            { // *** Pipeline Connections ***
                              vertex:   { gl_Position:  'iVertexPosition' },
                              fragment: { gl_FragColor: 'iFragColor' } })

p.pipe(BasicMaterialComponent)
p.pipe(BasicLightingComponent)
