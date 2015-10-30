import { gl } from './engine'
import { VertexShader, FragmentShader } from './shader'

export class Program {
  constructor(vertexShader, fragmentShader) {
    let program = gl.createProgram()

    gl.attachShader(program, vertexShader.shader)
    gl.attachShader(program, fragmentShader.shader)
    gl.linkProgram(program)

    this.program = program
    this.checkErrors()

    return this
  }

  activate() {
    gl.useProgram(this.program)
  }

  uniform(str) {
    return gl.getUniformLocation(this.program, str)
  }

  attr(str) {
    return gl.getAttribLocation(this.program, str)
  }

  checkErrors() {
    let success = gl.getProgramParameter(this.program, gl.LINK_STATUS)

    if (!success) {
      throw "Could not compile program:" + gl.getShaderInfoLog(this.program)
    }
  }
}