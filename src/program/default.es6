import { Program } from './core/program'
import { VertexShader, FragmentShader } from './core/shader'

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

export class DefaultProgram extends Program {
  constructor() {
    super()
  }
}