import { gl } from './engine'
import { Component } from './component'

export class Scene extends Component {
  constructor(opts = Scene.defaultOpts) {
    super()
    this._vertexBuffer = null;
    this._indexBuffer = null;

    this.program = opts.program;
    this.isBaked = false;
  }

  static get defaultOpts() {
    return { program: Program.default }
  }

  bake() {
    if (this.isBaked) {
      return
    }

    let vertices = []
    let indices = []

    this._vertexBuffer = gl.createBuffer()
    this._indexBuffer = gl.createBuffer()

    for (let child of this.children) {
      if (child.vertices) {
        vertices = vertices.concat(child.vertices)
      }

      if (child.indices) {
        indices = indices.concat(child.indices)
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW)

    this.isBaked = true
  }

  render() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.useProgram(this.program)

    for (let child of this.children) {

    }
  }

  destroy() {
    gl.deleteBuffer(this._vertexBuffer)
    gl.deleteBuffer(this._indexBuffer)
  }
}
