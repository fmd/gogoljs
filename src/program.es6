import { gl } from './engine'
import { VertexShader, FragmentShader } from './shader'

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
    var p = new Program(VertexShader.default, FragmentShader.default)

    p.mvp = gl.getUniformLocation(p.program, 'mvp');
    p.vpos = gl.getAttribLocation(p.program, 'aVertexPosition');
    gl.enableVertexAttribArray(p.vpos);

    return p
  }
}