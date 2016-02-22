import { flatten } from 'lodash'
import { mat4, vec3, glMatrix } from 'gl-matrix'
import { gogol, gl, FLOAT_SIZE } from './engine'
import { Component } from './component'
import { OrthographicCamera } from './camera'

export class Scene extends Component {
  constructor(opts = Scene.defaultOpts) {
    super()
    this.camera = opts.camera

    this._texCoordBuffer = null
    this._vertexBuffer = null
    this._colorBuffer = null
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

    this._bufferSet = {}
    this._indexBuffer = null

    for (let child of this.children.flatten()) {
      if (child.attributeArrays) {
        let attrs = child.attributeArrays
        for (let key in attrs) {
          if (typeof this._bufferSet[key] === 'undefined') {
            this._bufferSet[key] = { 'buffer': gl.createBuffer(),
                                     'elements': [] }
          }
        }

        if (child.indices !== null) {
          if (this._indexBuffer === null) {
            this._indexBuffer = { 'buffer': gl.createBuffer(),
                                  'elements': [] }
          }
        }

        for (let key in child.attributeArrays) {
          child.attributeArrays[key].index = this._bufferSet[key].elements.length * FLOAT_SIZE
        }

        if (child.indices) {
          let elements = child.indices
          child.indices = { elements: elements,
                            index: this._indexBuffer.elements.length }
        }

        for (let key in attrs) {
          this._bufferSet[key].elements = this._bufferSet[key].elements.concat(attrs[key])
        }

        if (child.indices !== null) {
          if (this._indexBuffer !== null) {
            this._indexBuffer.elements = [...this._indexBuffer.elements,
                                          ...child.indices.elements]
          }
        }
      }
    }

    for (let key in this._bufferSet) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this._bufferSet[key].buffer)
      gl.bufferData(gl.ARRAY_BUFFER,
                    new Float32Array(this._bufferSet[key].elements),
                    gl.STATIC_DRAW)
    }

    if (this._indexBuffer !== null) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer.buffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(this._indexBuffer.elements),
                    gl.STATIC_DRAW)
    }

    this.isBaked = true
  }

  render() {
    let p = this.camera.projection
    let v = this.camera.view

    for (let child of this.children.flatten()) {
      if (!child.material) {
        continue
      }

      child.render(v, p, this._bufferSet, this._indexBuffer)
    }
  }

  destroy() {

  }
}
