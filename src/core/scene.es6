import { mat4, vec3, glMatrix } from 'gl-matrix'
import { gogol, gl } from './engine'
import { Component } from './component'
import { Program } from './program'
import { OrthographicCamera } from './camera'

export class Scene extends Component {
  constructor(opts = Scene.defaultOpts) {
    super()
    this.camera = opts.camera

    this._texCoordBuffer = null
    this._vertexBuffer = null
    this._indexBuffer = null
    this._normalBuffer = null

    this.isBaked = false;
  }

  static get defaultOpts() {
    return { camera: new OrthographicCamera() }
  }

  bake() {
    if (this.isBaked) {
      return
    }

    let texCoords = []
    let vertices = []
    let indices = []
    let normals = []

    this._texCoordBuffer = gl.createBuffer()
    this._vertexBuffer = gl.createBuffer()
    this._indexBuffer = gl.createBuffer()
    this._normalBuffer = gl.createBuffer()

    for (let child of this.children.flatten()) {
      if (child.vertices && child.indices) {
        child.material.texCoordBuffer = this._texCoordBuffer
        child.material.vertexBuffer = this._vertexBuffer
        child.material.indexBuffer = this._indexBuffer
        child.material.normalBuffer = this._normalBuffer

        child.bake(vertices, indices, texCoords, normals)
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

    this.isBaked = true
  }

  render() {
    let p = this.camera.projection
    let v = this.camera.view

    for (let child of this.children.flatten()) {
      if (!child.material) {
        continue
      }

      child.render(v, p)
    }
  }

  destroy() {
    gl.deleteBuffer(this._vertexBuffer)
    gl.deleteBuffer(this._indexBuffer)
  }
}
