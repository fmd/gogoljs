import { ShaderComponent } from '../shader_component'
import { ShaderInput } from '../shader_input'

export class BasicFragmentComponent extends ShaderComponent {
  constructor() {
    let requires = { uColor: ShaderInput.uColor }

    let modifies = { oFragColor: ShaderInput.fromString('varying lowp vec4 oFragColor') }

    super(requires, modifies)
  }

  main() {
    return `oFragColor = uColor`
  }
}