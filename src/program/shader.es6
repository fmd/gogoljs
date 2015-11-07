import { gl } from '../core/engine'

export class Shader {
  constructor(id) {
    this.id = id
  }

  checkErrors() {
    var success = gl.getShaderParameter(this.id, gl.COMPILE_STATUS)
    if (!success) {
      throw 'Could not compile shader: ' + gl.getShaderInfoLog(this.id);
    }
  }

  fromString(s) {
    gl.shaderSource(this.id, s)
    gl.compileShader(this.id)
    this.checkErrors()
    return this
  }
}

export class VertexShader extends Shader {
  constructor() {
    super(gl.createShader(gl.VERTEX_SHADER))
    return this
  }
}

export class FragmentShader extends Shader {
  constructor() {
    super(gl.createShader(gl.FRAGMENT_SHADER))
    return this
  }
}