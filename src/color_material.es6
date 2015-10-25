import { Color } from './color'
import { gl, VERTEX_SIZE } from './engine'
import { Program } from './program'
import { VertexShader, FragmentShader } from './shader'
import { Material } from './material'

let vertexSrc = `
  attribute vec4 vpos;
  uniform mat4 mvp;

  void main() {
    gl_Position =  mvp * vpos;
  }`

let fragmentSrc = `
  void main() {
    gl_FragColor = vec4(1,1,1,1);
  }`

var _program = null

export class ColorMaterial extends Material {
  constructor(color) {
    super()
    this._makeProgram()

    this.mvp = this.program.attr('mvp')
    this.vpos = this.program.attr('vpos')
  }

  _makeProgram() {
    if (_program != null) {
      return
    }

    let vShader = new VertexShader().compileFromString(vertexSrc)
    let fShader = new FragmentShader().compileFromString(fragmentSrc)
    _program = new Program(vShader, fShader)
    this.program = _program
  }

  render(mvp, vIndex, iIndex, len) {
    this.program.activate()

    gl.enableVertexAttribArray(this.vpos)

    gl.vertexAttribPointer(this.vpos, VERTEX_SIZE, gl.FLOAT, gl.FALSE, 0, vIndex)
    gl.uniformMatrix4fv(this.mvp, gl.FALSE, new Float32Array(mvp))
    gl.drawElements(gl.TRIANGLES, len, gl.UNSIGNED_BYTE, iIndex)

    gl.disableVertexAttribArray(this.vpos)
  }
}