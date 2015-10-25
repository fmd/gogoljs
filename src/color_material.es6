import { Color } from './color'
import { gl, VERTEX_SIZE } from './engine'
import { Program } from './program'
import { VertexShader, FragmentShader } from './shader'
import { Material } from './material'

let vertexSrc = `
  attribute vec4 aVertexPosition;
  uniform mat4 mvp;

  void main() {
    gl_Position =  mvp * aVertexPosition;
  }`

let fragmentSrc = `
  void main() {
    gl_FragColor = vec4(1,1,1,1);
  }`

export class ColorMaterial extends Material {
  constructor(color) {
    super()

    let vShader = new VertexShader().compileFromString(vertexSrc)
    let fShader = new FragmentShader().compileFromString(fragmentSrc)

    this.program = new Program(vShader, fShader)
    this.mvp = this.program.attr('mvp')
    this.aVertexPosition = this.program.attr('aVertexPosition')
  }

  render(mvp, vIndex, iIndex, len) {
    this.program.activate()

    gl.enableVertexAttribArray(this.aVertexPosition)

    gl.vertexAttribPointer(this.aVertexPosition, VERTEX_SIZE, gl.FLOAT, gl.FALSE, 0, vIndex)
    gl.uniformMatrix4fv(this.mvp, gl.FALSE, new Float32Array(mvp))
    gl.drawElements(gl.TRIANGLES, len, gl.UNSIGNED_BYTE, iIndex)

    gl.disableVertexAttribArray(this.aVertexPosition)
  }
}