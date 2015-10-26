import { Program } from './program'
import { VertexShader, FragmentShader } from './shader'

export class Material {
  constructor() {
    this.target = null
    this.program = null
  }

  _makeProgram(vertexSrc, fragmentSrc) {
    this.vertexShader = new VertexShader().compileFromString(vertexSrc)
    this.fragmentShader = new FragmentShader().compileFromString(fragmentSrc)
    this.program = new Program(this.vertexShader, this.fragmentShader)
    return this.program
  }
}