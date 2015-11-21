import { Color } from '../core/color'
import { gl, VERTEX_SIZE } from '../core/engine'
import { Material } from '../core/material'

let vertexSrc = `
  uniform   mat4 modelMatrix;
  uniform   mat4 viewMatrix;
  uniform   mat4 projectionMatrix;
  attribute vec3 aPosition;

  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);
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
    this.modelMatrix = this.program.uniform('modelMatrix')
    this.viewMatrix = this.program.uniform('viewMatrix')
    this.projectionMatrix = this.program.uniform('projectionMatrix')
    this.uColor = this.program.uniform('uColor')
    this.aPosition = this.program.attr('aPosition')
  }

  static get defaultOpts() {
    return { color: new Color(1.0, 1.0, 1.0, 1.0) }
  }

  render(m, v, p) {
    super.render()

    // Enable attributes
    gl.enableVertexAttribArray(this.aPosition)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.vertexAttribPointer(this.aPosition,
                           VERTEX_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           0)

    // Pass variables into program
    gl.uniform4fv(this.uColor, this.color.rgba)
    gl.uniformMatrix4fv(this.modelMatrix, gl.FALSE, new Float32Array(m))
    gl.uniformMatrix4fv(this.viewMatrix, gl.FALSE, new Float32Array(v))
    gl.uniformMatrix4fv(this.projectionMatrix, gl.FALSE, new Float32Array(p))

    // Draw elements
    if (this.target.indices.length > 0) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      gl.drawElements(gl.TRIANGLES,
                      this.target.indices.length,
                      gl.UNSIGNED_BYTE,
                      this.target.indicesIndex)
    } else {
      gl.drawArrays(gl.TRIANGLES,
                    0,
                    this.target.vertices.length / VERTEX_SIZE)
    }

    // Disable attributes
    gl.disableVertexAttribArray(this.aPosition)
  }
}

ColorMaterial.program = null