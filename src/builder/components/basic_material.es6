import { ShaderComponent } from '../shader/component'
import { ProgramComponent } from '../program/component'
import { ShaderGlobal } from '../shader/global'

export class BasicMaterialComponent extends ProgramComponent {
  constructor(requires) {
    super(requires)

    this.buildVertex()
    this.buildFragment()
  }

  buildVertex() {
    let inputs = [this.props.uProjectionMatrix,
                  this.props.uViewMatrix,
                  this.props.uModelMatrix,
                  this.props.aVertexPosition,
                  this.props.aTextureCoord]

    let outputs = [this.props.iVertexPosition,
                   this.props.vTextureCoord]

    let src = [
      `  mat4 mvp = uProjectionMatrix * uViewMatrix * uModelMatrix;`,
      `  iVertexPosition = mvp * vec4(aVertexPosition, 1.0);`,
      `  vTextureCoord = aTextureCoord;`].join(`\n`)

    this.vertexComponent = new ShaderComponent('basicMaterial', src, inputs, outputs)
  }

  buildFragment() {
    let inputs = [this.props.uColor,
                  this.props.iFragColor,
                  this.props.vTextureCoord,
                  this.props.uSampler]

    let outputs = [this.props.iFragColor]

    let src= [
      `  highp vec4 t = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));`,
      `  iFragColor = vec4(uColor.rgb * t.rgb, t.a);`
    ].join(`\n`)

    this.fragmentComponent = new ShaderComponent('basicMaterial', src, inputs, outputs)
  }
}