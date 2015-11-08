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
      `  highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);`,
      `  highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);`,
      `  highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);`,
      `  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);`,
      `  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);`,
      `  vLighting = ambientLight + (directionalLightColor * directional);`
    ].join(`\n`)

    let inputs = [this.props.uNormalMatrix, this.props.aVertexNormal]
    let outputs = [this.props.vLighting]

    this.vertexComponent = new ShaderComponent('basicLighting', src, inputs, outputs)
  }

  buildFragment(vLighting, iFragColor) {
    let src = `  vFragColor = vFragColor * vec4(vLighting, 1.0);`
    let inputs = [this.props.vLighting, this.props.iFragColor]
    let outputs = [this.props.iFragColor]

    this.fragmentComponent = new ShaderComponent('basicLighting', src, inputs, outputs)
  }
}