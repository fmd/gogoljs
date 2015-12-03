import { VertexShader, FragmentShader } from './shader'

export class Material {
  constructor(materialClass, pipeline) {
    if (materialClass.pipeline == null) {
      materialClass.pipeline = this._makeProgram()
    }

    this.pipeline = materialClass.pipeline
    this.pipeline = pipeline
    this.target = null
  }

  _makeProgram() {
    this.pipeline.compile()
    return this.pipeline
  }

  render() {
    if (Material.currentProgram != this.pipeline) {
      Material.currentProgram = this.pipeline
      this.pipeline.activate()
    }
  }
}

Material.currentProgram = null
