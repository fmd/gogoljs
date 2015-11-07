import { ShaderComponent } from '../shader_component'
import { ProgramComponent } from '../program_component'
import { ShaderVar } from '../shader_var'

export class BasicLightingComponent extends ProgramComponent {
  constructor() {
    super()

    let nm = ShaderVar.fromString('uniform mat4 uNormalMatrix')
    let an = ShaderVar.fromString('attribute highp vec3 aVertexNormal')
    let vl = ShaderVar.fromString('varying highp vec3 vLighting')
    let vc = ShaderVar.fromString('varying lowp vec4 vFragColor')

    let vertex =  `highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
                   highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
                   highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);
                   highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
                   highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
                   vLighting = ambientLight + (directionalLightColor * directional);`

    let fragment = `vFragColor = vFragColor * vLighting;`

    this.vertexComponent = new ShaderComponent('basicLight', vertex, [nm, an], [vl])
    this.fragmentComponent = new ShaderComponent('basicLight', fragment, [vl, vc], [vc])
  }
}