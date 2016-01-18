import { compact } from 'lodash'

export class ShaderGlobal {
  constructor(qualifier, dataType, name, precision = null) {
    this.qualifier = qualifier
    this.precision = precision
    this.dataType = dataType
    this.name = name
  }

  get dataLength() {
    switch(this.dataType) {
      case 'vec2':
        return 2
      case 'vec3':
        return 3
      case 'vec4':
        return 4
      default:
        return 3
    }
  }

  get parts() {
    return compact([this.qualifier, this.precision, this.dataType, this.name])
  }

  get glsl() {
    return this.fromRaw(this.parts.join(' '))
  }

  get arg() {
    return `${this.dataType} ${this.name}`
  }

  get input() {
    return `in ${this.arg}`
  }

  get output() {
    return `out ${this.arg}`
  }

  get inout() {
    return `inout ${this.arg}`
  }

  static fromString(s) {
    let parts = s.split(' ')
    if (parts.length == 3) {
      return new ShaderGlobal(...parts)
    }

    return new ShaderGlobal(parts[0], parts[2], parts[3], parts[1])
  }

  static get uModelMatrix () {
    return new ShaderGlobal('uniform', 'mat4', 'uModelMatrix')
  }

  static get uViewMatrix () {
    return new ShaderGlobal('uniform', 'mat4', 'uViewMatrix')
  }

  static get uProjectionMatrix () {
    return new ShaderGlobal('uniform', 'mat4', 'uProjectionMatrix')
  }

  static get uModelViewMatrix () {
    return new ShaderGlobal('uniform', 'mat4', 'uModelViewMatrix')
  }

  static get aVertexPosition () {
    return new ShaderGlobal('attribute', 'vec3', 'aVertexPosition', 'highp')
  }

  static get aVertexNormal () {
    return new ShaderGlobal('attribute', 'vec3', 'aVertexNormal', 'highp')
  }

  static get aTextureCoord () {
    return new ShaderGlobal('attribute', 'vec2', 'aTextureCoord', 'highp')
  }

  static get uColor () {
    return new ShaderGlobal('uniform', 'vec4', 'uColor', 'lowp')
  }

  fromRaw(raw) {
    return `${raw};`
  }
}