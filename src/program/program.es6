import { gl } from '../core/engine'

export class Program {
  constructor() {
    this.id = gl.createProgram()
    this.vertexShader = null
    this.fragmentShader = null
  }

  build(vertexShader, fragmentShader) {
    gl.attachShader(this.id, vertexShader.id)
    gl.attachShader(this.id, fragmentShader.id)
    gl.linkProgram(this.id)
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
  }

  use() {
    gl.useProgram(this.program)
  }
}