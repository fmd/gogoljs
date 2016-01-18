import { ProgramPipeline } from '../pipeline'
import { ShaderGlobal } from '../../shader/global'
import { ShaderLocal } from '../../shader/local'
import { BasicMaterialComponent } from '../../components/basic_material'
import { BasicLightingComponent } from '../../components/basic_lighting'

export class DefaultPipeline extends ProgramPipeline {
   constructor() {
    let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
    let sLocal = (s) => { return ShaderLocal.fromString(s) }

    let opts = [{ // --- Globals ---
                  ...ProgramPipeline.defaultMatrices,
                  ...ProgramPipeline.defaultAttributes,

                  // Lighting
                  uNormalMatrix:      sGlobal('uniform mat4 uNormalMatrix'),
                  vLighting:          sGlobal('varying highp vec3 vLighting'),
                  uAmbientColor:      sGlobal('uniform highp vec3 uAmbientColor'),
                  uDirectionalColor:  sGlobal('uniform highp vec3 uDirectionalColor'),
                  uDirectionalVector: sGlobal('uniform highp vec3 uDirectionalVector'),

                  // Texture
                  uSampler:           sGlobal('uniform sampler2D uSampler'),
                  vTextureCoord:      sGlobal('varying highp vec2 vTextureCoord'),

                  // Color
                  aVertexColor:       sGlobal('attribute highp vec4 aVertexColor'),
                  vVertexColor:       sGlobal('varying highp vec4 vVertexColor') },

                { // --- Locals ---
                  iVertexPosition:    sLocal('highp vec4 iVertexPosition'),
                  iFragColor:         sLocal('lowp vec4 iFragColor') },

                { // --- Connections ---
                  vertex:   { gl_Position:  'iVertexPosition' },
                  fragment: { gl_FragColor: 'iFragColor' } }]

    super(...opts)

    this.pipe(BasicMaterialComponent)
    this.pipe(BasicLightingComponent)
  }
}


