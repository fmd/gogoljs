import { ShaderComponent } from '../shader_component'
import { ProgramComponent } from '../program_component'
import { ShaderVar } from '../shader_var'

export class BasicMaterialComponent extends ProgramComponent {
  constructor() {
    super()

    this.buildVertex()
    this.buildFragment()
  }

  buildVertex() {
    let at = ShaderVar.fromString('attribute highp vec2 aTextureCoord')
    let vt = ShaderVar.fromString('varying highp vec2 vTextureCoord')

    let av = ShaderVar.fromString('attribute highp vec3 aVertexPosition')
    let vv = ShaderVar.fromString('varying highp vec3 vVertexPosition')

    let inputs = [...ShaderComponent.matrices, av, at]
    let outputs = [av, vv]

    let src = `  vVertexPosition = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;`
    let conns = { gl_Position: `vec4(${vv.name}, 1.0)` }

    this.vertexComponent = new ShaderComponent('vertPos', src, inputs, outputs, conns)
  }

  buildFragment() {
    let uc = ShaderVar.fromString('uniform lowp vec4 uColor')
    let vc = ShaderVar.fromString('varying lowp vec4 vFragColor')
    let vt = ShaderVar.fromString('varying highp vec2 vTextureCoord')
    let us = ShaderVar.fromString('uniform sampler2D uSampler')

    let inputs = [uc, vc, vt]
    let outputs = [vc]
    let conns = { gl_FragColor: vc.name }

    let src= [
      `  highp vec4 t = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));`,
      `  vFragColor = vec4(uColor.rgb * t.rgb, t.a);`
    ].join(`\n`)

    this.fragmentComponent = new ShaderComponent('basicMaterial', src, inputs, outputs, conns)
  }
}