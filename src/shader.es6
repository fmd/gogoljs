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
    gl.shaderSource(this.shader, str);
    gl.compileShader(this.shader);

    var success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)
    if (!success) {
      throw "Could not compile shader:" + gl.getShaderInfoLog(this.shader);
    }

    return this
  }
}

export class VertexShader extends Shader {
  constructor() {
    super(gl.VERTEX_SHADER)
  }

  static get default() {
    let src = `attribute vec4 aVertexPosition;
               uniform mat4 mvp;

               void main() {
                 gl_Position =  mvp * aVertexPosition;
               }`

    return new VertexShader().compileFromString(src)
  }
}

export class FragmentShader extends Shader {
  constructor() {
    super(gl.FRAGMENT_SHADER)
  }

  static get default() {
    let src = `void main() {
                 gl_FragColor = vec4(1,1,1,1);
               }`

    return new FragmentShader().compileFromString(src)
  }
}