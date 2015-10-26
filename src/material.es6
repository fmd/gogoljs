import { Program } from './program'
import { VertexShader, FragmentShader } from './shader'

export class Material {
  constructor(materialClass, vertexSrc, fragmentSrc) {
    if (materialClass.program == null) {
      materialClass.program = this._makeProgram(vertexSrc, fragmentSrc)
    }

    this.program = materialClass.program
    this.target = null
  }

  _makeProgram(vertexSrc, fragmentSrc) {
    this.vertexShader = new VertexShader().compileFromString(vertexSrc)
    this.fragmentShader = new FragmentShader().compileFromString(fragmentSrc)
    this.program = new Program(this.vertexShader, this.fragmentShader)
    return this.program
  }

  render() {
    if (Material.currentProgram != this.program) {
      Material.currentProgram = this.program
      this.program.activate()
    }
  }
}

Material.currentProgram = null
