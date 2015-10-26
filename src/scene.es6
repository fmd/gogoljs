import { mat4, vec3 } from 'gl-matrix'
import { gogol, gl } from './engine'
import { Component } from './component'
import { Program } from './program'

export class Scene extends Component {
  constructor(opts = Scene.defaultOpts) {
    super()
    this._vertexBuffer = null
    this._indexBuffer = null

    this.projectionMatrix = mat4.create()
    this.viewMatrix = mat4.create()

    this.isBaked = false;
  }

  static get defaultOpts() {
    return { }
  }

  bake() {
    if (this.isBaked) {
      return
    }

    let vertices = []
    let indices = []

    this._vertexBuffer = gl.createBuffer()
    this._indexBuffer = gl.createBuffer()

    for (let child of this.children.flatten()) {
      if (child.vertices && child.indices) {
        child.bake(vertices, indices)
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW)

    mat4.ortho(this.projectionMatrix, 0.0, gogol.canvas.width, gogol.canvas.height, 0.0, 0.0, 100.0)

    mat4.lookAt(this.viewMatrix, vec3.fromValues(0,0,1), vec3.fromValues(0,0,0), vec3.fromValues(0,1,0))

    this.isBaked = true
  }

  render() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)

    let currentProgram = null

    let pvMatrix = mat4.create()
    mat4.mul(pvMatrix, pvMatrix, this.projectionMatrix)
    mat4.mul(pvMatrix, pvMatrix, this.viewMatrix)

    for (let child of this.children.flatten()) {
      if (!child.material) {
        continue
      }

      child.render(pvMatrix)
    }
  }

  destroy() {
    gl.deleteBuffer(this._vertexBuffer)
    gl.deleteBuffer(this._indexBuffer)
  }
}
