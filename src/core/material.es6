export class Material {
  constructor(materialClass, pipeline) {
    if (materialClass.pipeline == null) {
      materialClass.pipeline = pipeline.compile()
    }

    this.pipeline = materialClass.pipeline
    this.target = null
  }

  render() {
    if (Material.currentPipeline != this.pipeline) {
      Material.currentPipeline = this.pipeline
      this.pipeline.activate()
    }
  }
}

Material.currentPipeline = null
