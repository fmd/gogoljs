import { mat4 } from 'gl-matrix'
import { Component } from './component'

export class Transform extends Component {
  constructor() {
    super()
    this.matrix = mat4.create()
  }
}