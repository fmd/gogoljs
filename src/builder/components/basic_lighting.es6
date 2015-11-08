import { ShaderComponent } from '../shader_component'
import { ProgramComponent } from '../program_component'
import { ShaderGlobal } from '../shader_global'

export class BasicLightingComponent extends ProgramComponent {
  constructor(requires) {
    super(requires)
    this.buildVertex()
    this.buildFragment()
  }

  buildVertex() {
    let src =  [
      `  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);`,
      `  highp float directional = max(dot(transformedNormal.xyz, uDirectionalVector), 0.0);`,
      `  vLighting = uAmbientColor + (uDirectionalColor * directional);`
    ].join(`\n`)

    let inputs = [this.props.uNormalMatrix,
                  this.props.aVertexNormal,
                  this.props.uAmbientColor,
                  this.props.uDirectionalColor,
                  this.props.uDirectionalVector]

    let outputs = [this.props.vLighting]

    this.vertexComponent = new ShaderComponent('basicLighting', src, inputs, outputs)
  }

  buildFragment(vLighting, iFragColor) {
    let src = `  iFragColor = iFragColor * vec4(vLighting, 1.0);`
    let inputs = [this.props.vLighting, this.props.iFragColor]
    let outputs = [this.props.iFragColor]

    this.fragmentComponent = new ShaderComponent('basicLighting', src, inputs, outputs)
  }
}