export var gl
export class Engine {
  init(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.initContext()
  }

  resize() {
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  initContext() {
    gl = this.canvas.getContext('webgl')
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}