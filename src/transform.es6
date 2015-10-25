import { mat4, vec3, glMatrix } from 'gl-matrix'
import { Component } from './component'

export class Transform extends Component {
  constructor() {
    super()
    this.matrix = mat4.create()
  }

  get worldMatrix() {
    if (this.parent != null && this.parent.matrix != null) {
        let out = mat4.create()
        mat4.mul(out, this.parent.worldMatrix, this.matrix)
        return out
    }

    return this.matrix
}

  translate(x, y, z) {
    mat4.translate(this.matrix, this.matrix, vec3.fromValues(x, y, z))
  }

  rotate(deg) {
    mat4.rotate(this.matrix, this.matrix, glMatrix.toRadian(deg), vec3.fromValues(0.0, 0.0, 1.0))
  }
}