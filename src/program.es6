import { gl } from './engine'
import { VertexShader, FragmentShader } from './shader'

var _defaultProgram = null

export class Program {
  constructor(vertexShader, fragmentShader) {
    let program = gl.createProgram()

    gl.attachShader(program, vertexShader.shader)
    gl.attachShader(program, fragmentShader.shader)
    gl.linkProgram(program)

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!success) {
      throw "Could not compile program:" + gl.getShaderInfoLog(program);
    }

    this.program = program
    return this
  }

  static get default() {
    if (_defaultProgram != null) {
      return _defaultProgram
    }

    var p = new Program(VertexShader.default, FragmentShader.default)

    p.mvp = gl.getUniformLocation(p.program, 'mvp');
    p.vpos = gl.getAttribLocation(p.program, 'aVertexPosition');

    gl.enableVertexAttribArray(p.vpos);

    _defaultProgram = p
    return p
  }
}

Program._default = null