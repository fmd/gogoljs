import { mat4 } from 'gl-matrix'
import { gl, VERTEX_SIZE } from './engine'
import { Program } from './program'
import { Transform } from './transform'

export class Renderable extends Transform {
  constructor() {
    super()
    this.material = null
    this.program = Program.default

    this.vertices = []
    this.indices = []

    // Set when the scene is baked.
    this.verticesIndex = null
    this.indicesIndex = null
  }

  render(pvMatrix) {
    let mvp = mat4.create()
    mat4.mul(mvp, pvMatrix, this.matrix)

    gl.vertexAttribPointer(this.program.vpos,
                           VERTEX_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.verticesIndex)

    gl.uniformMatrix4fv(this.program.mvp, gl.FALSE, new Float32Array(mvp))

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_BYTE, this.indicesIndex)
  }
}