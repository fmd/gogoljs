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
    let vp = ShaderVar.fromString('varying highp vec3 vVertexPosition')
    let inputs = [...ShaderComponent.matrices, ShaderVar.aVertexPosition]
    let outputs = [vp]
    let conns = { gl_Position: `vec4(${vp.name}, 1.0)` }

    let src = `vVertexPosition = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;`

    this.vertexComponent = new ShaderComponent('vertPos', src, inputs, outputs, conns)
  }

  buildFragment() {
    let uc = ShaderVar.fromString('uniform lowp vec4 uColor')
    let vc = ShaderVar.fromString('varying lowp vec4 vFragColor')
    let inputs = [uc, vc]
    let outputs = [vc]
    let conns = { gl_FragColor: vc.name }
    let src = `vFragColor = uColor;`
    this.fragmentComponent = new ShaderComponent('basicMaterial', src, inputs, outputs, conns)
  }
}