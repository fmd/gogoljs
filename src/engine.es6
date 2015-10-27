import { Color } from './color'

export const TEX_COORD_SIZE = 2
export const VERTEX_SIZE = 3
export const FLOAT_SIZE = 4

export var gl
export var gogol

export class Engine {
  init(canvasId, opts = this.defaultOpts) {
    this._opts = opts
    this._canvas = document.getElementById(canvasId)
    this._initContext(opts)
    this.scene = null
  }

  get opts() {
    return this._opts
  }

  get canvas() {
    return this._canvas
  }

  get defaultOpts() {
    return { clearColor: Color.black }
  }

  resize() {
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  processOneFrame() {
    var c = this.opts.clearColor
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    if (this.scene != null && this.scene.isBaked) {
      this.scene.render()
    }
  }

  _initContext(opts) {
    var c = opts.clearColor

    gl = this.canvas.getContext('webgl')
    gl.clearColor(c.r, c.g, c.b, c.a)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }
}

gogol = new Engine()