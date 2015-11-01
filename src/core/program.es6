import { gl } from './engine'
import { VertexShader, FragmentShader } from './shader'

export class Program {
  constructor(vertexShader, fragmentShader) {
    let program = gl.createProgram()

    gl.attachShader(program, vertexShader.shader)
    gl.attachShader(program, fragmentShader.shader)
    gl.linkProgram(program)

    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
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
      let v = gl.getShaderInfoLog(this.vertexShader.shader)
      let f = gl.getShaderInfoLog(this.fragmentShader.shader)
      throw `Could not compile program: ${v} - ${f}`
    }
  }
}