import { Color } from './color'
import { Texture } from './texture'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE } from './engine'
import { Material } from './material'

let vertexSrc = `
  uniform   mat4 mvp;
  attribute vec4 aPosition;
  attribute vec2 aTextureCoord;

  varying highp vec2 vTextureCoord;

  void main() {
    gl_Position = mvp * aPosition;
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

    this.mvp = this.program.uniform('mvp')
    this.uSampler = this.program.uniform('uSampler')
    this.aPosition = this.program.attr('aPosition')
    this.aTextureCoord = this.program.attr('aTextureCoord')
  }

  static get defaultOpts() {
    return { src: null }
  }

  render(mvp) {
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
    gl.uniformMatrix4fv(this.mvp, gl.FALSE, new Float32Array(mvp))

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