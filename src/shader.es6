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

var _defaultVertexShader = null

export class VertexShader extends Shader {
  constructor() {
    super(gl.VERTEX_SHADER)
  }

  static get default() {
    if (_defaultVertexShader != null) {
      return _defaultVertexShader
    }

    let src = `attribute vec4 aVertexPosition;
               uniform mat4 mvp;

               void main() {
                 gl_Position =  mvp * aVertexPosition;
               }`

    _defaultVertexShader = new VertexShader().compileFromString(src)
    return _defaultVertexShader
  }
}

var _defaultFragmentShader = null

export class FragmentShader extends Shader {
  constructor() {
    super(gl.FRAGMENT_SHADER)
  }

  static get default() {
    if (_defaultFragmentShader != null) {
      return _defaultFragmentShader
    }

    let src = `void main() {
                 gl_FragColor = vec4(1,1,1,1);
               }`

    _defaultFragmentShader = new FragmentShader().compileFromString(src)
    return _defaultFragmentShader
  }
}