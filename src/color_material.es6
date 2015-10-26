import { Color } from './color'
import { gl, VERTEX_SIZE } from './engine'
import { Program } from './program'
import { VertexShader, FragmentShader } from './shader'
import { Material } from './material'

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

var _program = null

export class ColorMaterial extends Material {
  constructor(opts = ColorMaterial.defaultOpts) {
    super()
    this._makeProgram()
    this.program = _program
    this.color = opts.color
    this.mvp = this.program.attr('mvp')
    this.uColor = this.program.attr('uColor')
    this.aPosition = this.program.attr('aPosition')
  }

  static get defaultOpts() {
    return { color: new Color(1.0, 1.0, 1.0, 1.0) }
  }

  _makeProgram() {
    if (_program != null) {
      return
    }

    let vShader = new VertexShader().compileFromString(vertexSrc)
    let fShader = new FragmentShader().compileFromString(fragmentSrc)
    _program = new Program(vShader, fShader)
  }

  render(mvp, vIndex, iIndex, len) {
    this.program.activate()

    gl.enableVertexAttribArray(this.aPosition)

    gl.vertexAttribPointer(this.aPosition, VERTEX_SIZE, gl.FLOAT, gl.FALSE, 0, vIndex)
    gl.uniform4fv(this.uColor, this.color.toVector())
    gl.uniformMatrix4fv(this.mvp, gl.FALSE, new Float32Array(mvp))
    gl.drawElements(gl.TRIANGLES, len, gl.UNSIGNED_BYTE, iIndex)

    gl.disableVertexAttribArray(this.aPosition)
  }
}