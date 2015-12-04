import { vec3, mat4 } from 'gl-matrix'
import { Color } from '../core/color'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE, SHORT_SIZE, RGBA_SIZE } from '../core/engine'
import { Texture } from '../core/texture'
import { Material } from '../core/material'
import { DefaultPipeline } from '../builder/program/pipeline/default'

export class DefaultMaterial extends Material {
  constructor(opts = DefaultMaterial.defaultOpts) {

    super(DefaultMaterial, opts.pipeline)

    this.color = opts.color

    if (opts.src != null) {
      this.texture = new Texture(opts.src)
    }

    this.modelMatrix        = this.pipeline.uniform('uModelMatrix')
    this.viewMatrix         = this.pipeline.uniform('uViewMatrix')
    this.projectionMatrix   = this.pipeline.uniform('uProjectionMatrix')
    this.uNormalMatrix      = this.pipeline.uniform('uNormalMatrix')
    this.aColor             = this.pipeline.attr('aVertexColor')
    this.aPosition          = this.pipeline.attr('aVertexPosition')
    this.aNormal            = this.pipeline.attr('aVertexNormal')
    this.uSampler           = this.pipeline.uniform('uSampler')
    this.aTextureCoord      = this.pipeline.attr('aTextureCoord')
    this.uAmbientColor      = this.pipeline.uniform('uAmbientColor')
    this.uDirectionalVector = this.pipeline.uniform('uDirectionalVector')
    this.uDirectionalColor  = this.pipeline.uniform('uDirectionalColor')
  }

  static get defaultOpts() {
    return { pipeline: new DefaultPipeline() }
  }

  render(m, v, p) {
    super.render()

    var normalMatrix = mat4.create()
    mat4.mul(normalMatrix, v, m)
    mat4.invert(normalMatrix, normalMatrix)
    mat4.transpose(normalMatrix, normalMatrix)

    // Enable attributes
    gl.enableVertexAttribArray(this.aPosition)
    gl.enableVertexAttribArray(this.aNormal)
    gl.enableVertexAttribArray(this.aTextureCoord)
    gl.enableVertexAttribArray(this.aColor)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.vertexAttribPointer(this.aPosition,
                           VERTEX_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.verticesIndex)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
    gl.vertexAttribPointer(this.aColor,
                           RGBA_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.colorsIndex)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer)
    gl.vertexAttribPointer(this.aTextureCoord,
                           TEX_COORD_SIZE,
                           gl.FLOAT,
                           gl.FALSE,
                           0,
                           this.target.texCoordsIndex)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(this.aNormal, VERTEX_SIZE, gl.FLOAT, gl.FALSE, 0, this.target.normalsIndex);

    // Pass variables into pipeline
    gl.uniformMatrix4fv(this.modelMatrix, gl.FALSE, new Float32Array(m))
    gl.uniformMatrix4fv(this.viewMatrix, gl.FALSE, new Float32Array(v))
    gl.uniformMatrix4fv(this.projectionMatrix, gl.FALSE, new Float32Array(p))
    gl.uniformMatrix4fv(this.uNormalMatrix, gl.FALSE, new Float32Array(normalMatrix))

    gl.uniform3fv(this.uAmbientColor, Color.fromHex('454545').rgb)
    gl.uniform3fv(this.uDirectionalColor, Color.fromHex('9a9a9a').rgb)
    gl.uniform3fv(this.uDirectionalVector, new Float32Array([0.85, 0.8, 0.75]))

    if (this.texture) {
      this.texture.bind(this.uSampler)
    }

    // Draw elements
    if (this.target.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      gl.drawElements(gl.TRIANGLES,
                      this.target.indices.length,
                      gl.UNSIGNED_SHORT,
                      this.target.indicesIndex * SHORT_SIZE)
    } else  {
      gl.drawArrays(gl.TRIANGLES, 0, this.target.vertices.length / VERTEX_SIZE)
    }

    // Disable attributes
    // gl.disableVertexAttribArray(this.aPosition)
    // gl.disableVertexAttribArray(this.aTextureCoord)
    // gl.disableVertexAttribArray(this.aNormal)
  }
}

DefaultMaterial.pipeline = null