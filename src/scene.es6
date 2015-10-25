import { mat4, vec3 } from 'gl-matrix'
import { gogol, gl } from './engine'
import { Component } from './component'
import { Program } from './program'

export class Scene extends Component {
  constructor(opts = Scene.defaultOpts) {
    super()
    this._vertexBuffer = null;
    this._indexBuffer = null;

    this.projectionMatrix = mat4.create()
    this.viewMatrix = mat4.create()

    this.program = opts.program;
    this.isBaked = false;
  }

  static get defaultOpts() {
    return { program: Program.default }
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
        vertices = vertices.concat(child.vertices)
      }

      if (child.indices) {
        indices = indices.concat(child.indices)
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

    gl.useProgram(this.program.program)

    for (let child of this.children) {
      let mvp = mat4.create()

      mat4.mul(mvp, mvp, this.projectionMatrix)
      mat4.mul(mvp, mvp, this.viewMatrix)
      mat4.mul(mvp, mvp, child.matrix)

      gl.vertexAttribPointer(this.program.vpos, 3, gl.FLOAT, gl.FALSE, 0, 0)

      gl.uniformMatrix4fv(this.program.mvp, gl.FALSE, new Float32Array(mvp))
      gl.drawElements(gl.TRIANGLES, child.indices.length, gl.UNSIGNED_BYTE, 0)
    }
  }

  destroy() {
    gl.deleteBuffer(this._vertexBuffer)
    gl.deleteBuffer(this._indexBuffer)
  }
}
