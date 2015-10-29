import { mat4, vec3, glMatrix } from 'gl-matrix'
import { Transform } from './transform'

export class Camera extends Transform {
  constructor() {
    super()
    this.projection = mat4.create()
  }

  get pv() {
    let m = mat4.create()
    let i = mat4.create()
    mat4.invert(i, this.matrix)
    mat4.mul(m, m, this.projection)
    mat4.mul(m, m, this.matrix)

    return m
  }
}

export class PerspectiveCamera extends Camera {
  constructor(opts = PerspectiveCamera.defaultOpts) {
    super()
    this.opts = opts
    this.refresh()
  }

  refresh() {
    mat4.perspective(this.projection,
                     glMatrix.toRadian(this.opts.fovy),
                     this.opts.aspect,
                     this.opts.near,
                     this.opts.far)
  }

  static get defaultOpts() {
    return { fovy: 45.0,
             aspect: 4.0 / 3.0,
             near: 0.1,
             far: 1000.0 }
  }
}

export class OrthographicCamera extends Camera {
  constructor(opts = OrthographicCamera.defaultOpts) {
    super()
    this.opts = opts
    this.refresh()
  }

  refresh() {
    mat4.ortho(this.projection,
               0.0,
               this.opts.width,
               this.opts.height,
               0.0,
               this.opts.near,
               this.opts.far)
  }

  static get defaultOpts() {
    return { width: 800.0,
             height: 600.0,
             near: 0.0,
             far: 100.0 }
  }
}