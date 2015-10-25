import { mat4, vec3 } from 'gl-matrix'
import { Component } from './component'

export class Transform extends Component {
  constructor() {
    super()
    this.matrix = mat4.create()
  }

  translate(x, y, z) {
    mat4.translate(this.matrix, this.matrix, vec3.fromValues(x, y, z))
  }
}