import { Color } from '../core/color'
import { gl, VERTEX_SIZE } from '../core/engine'
import { Material } from '../core/material'

let vertexSrc = `
  uniform   mat4 mvp;
  attribute vec4 aPosition;

  void main() {
    gl_Position = mvp * aPosition;
  }`

let fragmentSrc = `
  uniform lowp vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }`

export class ColorMaterial extends Material {
  constructor(opts = ColorMaterial.defaultOpts) {
    super(ColorMaterial, vertexSrc, fragmentSrc)

    this.color = opts.color
    this.mvp = this.program.uniform('mvp')
    this.uColor = this.program.uniform('uColor')
    this.aPosition = this.program.attr('aPosition')
  }

  static get defaultOpts() {
    return { color: new Color(1.0, 1.0, 1.0, 1.0) }
  }

  render(mvp) {
    super.render()

    // Enable attributes
    gl.enableVertexAttribArray(this.aPosition)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.vertexAttribPointer(this.aPosition,
                           VERTEX_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.verticesIndex)

    // Pass variables into program
    gl.uniform4fv(this.uColor, this.color.toVector())
    gl.uniformMatrix4fv(this.mvp, gl.FALSE, new Float32Array(mvp))

    // Draw elements
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.drawElements(gl.TRIANGLES,
                    this.target.indices.length,
                    gl.UNSIGNED_BYTE,
                    this.target.indicesIndex)

    // Disable attributes
    gl.disableVertexAttribArray(this.aPosition)
  }
}

ColorMaterial.program = null