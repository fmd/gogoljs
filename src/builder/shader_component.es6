import { map } from 'lodash'
import { ShaderInput } from './shader_input'

export class ShaderComponent {
  constructor(requires = {}, modifies = {}) {
    this.requires = requires
    this.modifies = modifies
  }

  static get matrices() {
    return { uProjectionMatrix: ShaderInput.uProjectionMatrix,
             uViewMatrix: ShaderInput.uViewMatrix,
             uModelMatrix: ShaderInput.uModelMatrix,
             uModelViewMatrix: ShaderInput.uModelViewMatrix }
  }

  static get aVertexPosition() {
    return { aVertexPosition: ShaderInput.aVertexPosition }
  }

  get vars() {
    return map({ ...this.requires, ...this.modifies }, (v) => { return v.glsl }).join('')
  }
}