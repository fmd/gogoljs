import { VertexShader, FragmentShader } from './shader'

export class Program {
  constructor(vertexShader, fragmentShader) {
    let program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!success) {
      throw "Could not compile program:" + gl.getShaderInfoLog(program);
    }

    this.program = program
    return this
  }

  static get default() {
    return new Program(VertexShader.default, FragmentShader.default)
  }
}