import { gl } from './engine'

export class Shader {
  constructor(type) {
    this.shader = gl.createShader(type);
    return this
  }

  compileFromUrl(url) {
    return this
  }

  compileFromElement(id) {
    return this
  }

  compileFromString(str) {
    gl.shaderSource(this.shader, str)
    gl.compileShader(this.shader)

    this.source = str
    this.checkErrors()

    return this
  }

  checkErrors() {
    var success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)
    if (!success) {
      console.log(this.source)
      throw "Could not compile shader:" + gl.getShaderInfoLog(this.shader);
    }
  }
}

export class VertexShader extends Shader {
  constructor() {
    super(gl.VERTEX_SHADER)
    return this
  }
}

export class FragmentShader extends Shader {
  constructor() {
    super(gl.FRAGMENT_SHADER)
    return this
  }
}