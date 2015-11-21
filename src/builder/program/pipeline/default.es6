import { ProgramPipeline } from '../pipeline'
import { ShaderGlobal } from '../../shader/global'
import { ShaderLocal } from '../../shader/local'

export class DefaultPipeline extends ProgramPipeline {
   constructor() {
      let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
      let sLocal = (s) => { return ShaderLocal.fromString(s) }

      let globals = {  // --- Globals ---
                       ...ProgramPipeline.matrices,
                       ...ProgramPipeline.attributes,

                       // Lighting
                       uNormalMatrix:      sGlobal('uniform mat4 uNormalMatrix'),
                       vLighting:          sGlobal('varying highp vec3 vLighting'),
                       uAmbientColor:      sGlobal('uniform highp vec3 uAmbientColor'),
                       uDirectionalColor:  sGlobal('uniform highp vec3 uDirectionalColor'),
                       uDirectionalVector: sGlobal('uniform highp vec3 uDirectionalVector'),

                       // Texture
                       uSampler:           sGlobal('uniform sampler2D uSampler'),
                       vTextureCoord:      sGlobal('varying highp vec2 vTextureCoord'),
                       uColor:             sGlobal('uniform lowp vec4 uColor') }

      let locals = { // --- Locals ---
                     iVertexPosition:    sLocal('highp vec4 iVertexPosition'),
                     iFragColor:         sLocal('lowp vec4 iFragColor') }

      let connections = { // --- Connections ---
                          vertex:   { gl_Position:  'iVertexPosition' },
                          fragment: { gl_FragColor: 'iFragColor' } }

      super(globals, locals, connections)

      this.pipe(BasicMaterialComponent)
      this.pipe(BasicLightingComponent)
   }
}
