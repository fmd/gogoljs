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
    this.uSampler           = this.pipeline.uniform('uSampler')
    this.uAmbientColor      = this.pipeline.uniform('uAmbientColor')
    this.uDirectionalVector = this.pipeline.uniform('uDirectionalVector')
    this.uDirectionalColor  = this.pipeline.uniform('uDirectionalColor')
  }

  static get defaultOpts() {
    return { pipeline: new DefaultPipeline() }
  }

  render(m, v, p, bufferSet, indexBuffer) {
    super.render()

    var normalMatrix = mat4.create()
    mat4.mul(normalMatrix, v, m)
    mat4.invert(normalMatrix, normalMatrix)
    mat4.transpose(normalMatrix, normalMatrix)

    let attrs = this.target.attributeArrays
    for (let key in attrs) {
      let a = this.pipeline.attr(key)

      gl.enableVertexAttribArray(a)

      gl.bindBuffer(gl.ARRAY_BUFFER, bufferSet[key].buffer)

      gl.vertexAttribPointer(a, this.pipeline.attributes[key].dataLength, gl.FLOAT,
                             gl.FALSE, 0, attrs[key].index)
    }

    if (this.target.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer)
      gl.drawElements(gl.TRIANGLES,
                      this.target.indices.length,
                      gl.UNSIGNED_SHORT,
                      this.target.indices.index * SHORT_SIZE)
    } else  {
      gl.drawArrays(gl.TRIANGLES, 0, this.target.vertices.elements.length / VERTEX_SIZE)
    }

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

    // Disable attributes
    // gl.disableVertexAttribArray(this.aPosition)
    // gl.disableVertexAttribArray(this.aTextureCoord)
    // gl.disableVertexAttribArray(this.aNormal)
  }
}

DefaultMaterial.pipeline = null