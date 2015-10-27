import { quat, mat4, vec3, glMatrix } from 'gl-matrix'
import { Component } from './component'

export class Transform extends Component {
  constructor() {
    super()
    this.rotation = quat.create()
    this.position = vec3.create()
    this.scale = vec3.fromValues(1,1,1)
  }

  get matrix() {
    let m = mat4.create()
    mat4.fromRotationTranslationScale(m, this.rotation, this.position, this.scale)
    return m
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
    this.position[0] += x
    this.position[1] += y
    this.position[1] += z
  }

  rotate(deg, axis = vec3.fromValues(0,0,1)) {
    let q = quat.create()
    quat.setAxisAngle(q, axis, glMatrix.toRadian(deg))
    quat.mul(this.rotation, this.rotation, q)
  }
}