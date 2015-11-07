import { compact } from 'lodash'

export class ShaderInput {
  constructor(qualifier, dataType, name, precision = null) {
    this.qualifier = qualifier
    this.precision = precision
    this.dataType = dataType
    this.name = name
  }

  get parts() {
    return compact([this.qualifier, this.precision, this.dataType, this.name])
  }

  get glsl() {
    return this.fromRaw(this.parts.join(' '))
  }

  static fromString(s) {
    let parts = s.split(' ')
    if (parts.length == 3) {
      return new ShaderInput(...parts)
    }

    return new ShaderInput(parts[0], parts[2], parts[3], parts[1])
  }

  static get uModelMatrix () {
    return new ShaderInput('uniform', 'mat4', 'uModelMatrix')
  }

  static get uViewMatrix () {
    return new ShaderInput('uniform', 'mat4', 'uViewMatrix')
  }

  static get uProjectionMatrix () {
    return new ShaderInput('uniform', 'mat4', 'uProjectionMatrix')
  }

  static get uModelViewMatrix () {
    return new ShaderInput('uniform', 'mat4', 'uModelViewMatrix')
  }

  static get aVertexPosition () {
    return new ShaderInput('attribute', 'vec3', 'aVertexPosition', 'highp')
  }

  static get uColor () {
    return new ShaderInput('uniform', 'vec4', 'uColor', 'lowp')
  }

  fromRaw(raw) {
    return `${raw};\n`
  }
}