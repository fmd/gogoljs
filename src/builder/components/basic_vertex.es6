import { ShaderComponent } from '../shader_component'
import { ShaderInput } from '../shader_input'

export class BasicVertexComponent extends ShaderComponent {
  constructor() {
    let requires = { ...ShaderComponent.matrices,
                     ...ShaderComponent.aVertexPosition }

    let modifies = { oVertexPosition: ShaderInput.fromString('varying highp vec3 oVertexPosition') }

    super(requires, modifies)
  }

  main() {
    return `oVertexPosition = uProjectionMatrix * uModelViewMatrix * aVertexPosition;`
  }
}