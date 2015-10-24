import { gl } from './engine'
import { Component } from './component'

export class Scene extends Component {
  constructor() {
    super()
    this._vertexBuffer = null;
    this._indexBuffer = null;
    this.isBaked = false;
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
        vertices.concat(child.vertices)
      }

      if (child.indices) {
        indices.concat(child.indices)
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    this.isBaked = true
  }

  destroy() {
    gl.deleteBuffer(this._vertexBuffer)
    gl.deleteBuffer(this._indexBuffer)
  }
}
