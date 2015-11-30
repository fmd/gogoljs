import { vec3 } from 'gl-matrix'

export class Axis {
  static get X() {
    return vec3.fromValues(1,0,0)
  }

  static get Y() {
    return vec3.fromValues(0,1,0)
  }

  static get Z() {
    return vec3.fromValues(0,0,1)
  }
}