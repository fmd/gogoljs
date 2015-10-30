import { Color } from '../core/color'
import { Texture } from '../core/texture'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE } from '../core/engine'
import { Material } from '../core/material'

let vertexSrc = `
  uniform   mat4 modelMatrix;
  uniform   mat4 viewMatrix;
  uniform   mat4 projectionMatrix;
  attribute vec4 aPosition;
  attribute vec2 aTextureCoord;

  varying highp vec2 vTextureCoord;

  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * aPosition;
    vTextureCoord = aTextureCoord;
  }`

let fragmentSrc = `
  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main() {
    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }`

export class TextureMaterial extends Material {
  constructor(opts = TextureMaterial.defaultOpts) {
    super(TextureMaterial, vertexSrc, fragmentSrc)

    if (opts.src != null) {
      this.texture = new Texture(opts.src)
    }

    this.modelMatrix = this.program.uniform('modelMatrix')
    this.viewMatrix = this.program.uniform('viewMatrix')
    this.projectionMatrix = this.program.uniform('projectionMatrix')
    this.uSampler = this.program.uniform('uSampler')
    this.aPosition = this.program.attr('aPosition')
    this.aTextureCoord = this.program.attr('aTextureCoord')
  }

  static get defaultOpts() {
    return { src: null }
  }

  render(m, v, p) {
    super.render()

    // Enable attributes
    gl.enableVertexAttribArray(this.aPosition)
    gl.enableVertexAttribArray(this.aTextureCoord)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.vertexAttribPointer(this.aPosition,
                           VERTEX_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.verticesIndex)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer)
    gl.vertexAttribPointer(this.aTextureCoord,
                           TEX_COORD_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.texCoordsIndex)

    if (this.texture) {
      this.texture.bind(this.uSampler)
    }

    // Pass variables into program
    gl.uniformMatrix4fv(this.modelMatrix, gl.FALSE, new Float32Array(m))
    gl.uniformMatrix4fv(this.viewMatrix, gl.FALSE, new Float32Array(v))
    gl.uniformMatrix4fv(this.projectionMatrix, gl.FALSE, new Float32Array(p))

    // Draw elements
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.drawElements(gl.TRIANGLES,
                    this.target.indices.length,
                    gl.UNSIGNED_BYTE,
                    this.target.indicesIndex)

    // Disable attributes
    gl.disableVertexAttribArray(this.aTextureCoord)
    gl.disableVertexAttribArray(this.aPosition)
  }
}

TextureMaterial.program = null