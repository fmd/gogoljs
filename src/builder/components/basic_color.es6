import { ShaderComponent } from '../shader_component'
import { ProgramComponent } from '../program_component'
import { ShaderVar } from '../shader_var'

export class BasicColorComponent extends ProgramComponent {
  constructor() {
    let uc = ShaderVar.fromString('uniform lowp vec4 uColor')
    let vc = ShaderVar.fromString('varying lowp vec4 vFragColor')
    let inputs = [ uc, vc ]
    let outputs = [ vc ]
    let connections = { gl_FragColor: `${vc.name}` }

    let vertex = ``
    let fragment = `vFragColor = uColor;`

    let v = new ShaderComponent('vertPos', vertex, [], [])
    let f = new ShaderComponent('vertPos', fragment, inputs, outputs, connections)
    super(v, f)
  }
}