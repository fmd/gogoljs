import { vec3, mat4 } from 'gl-matrix'
import { Color } from '../core/color'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE } from '../core/engine'
import { Texture } from '../core/texture'
import { Material } from '../core/material'
import { ProgramPipeline } from '../builder/program_pipeline'
import { BasicMaterialComponent } from '../builder/components/basic_material'
import { BasicLightingComponent } from '../builder/components/basic_lighting'

export class ColorLightingTextureMaterial extends Material {
  constructor(opts = ColorLightingTextureMaterial.defaultOpts) {
    let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
    let sLocal = (s) => { return ShaderLocal.fromString(s) }

    let p = new ProgramPipeline({ ...ProgramPipeline.matrices,
                                  ...ProgramPipeline.attributes,

                                  // --- Globals ---
                                  // Lighting
                                  uNormalMatrix:   sGlobal('uniform mat4 uNormalMatrix'),
                                  vLighting:       sGlobal('varying highp vec3 vLighting'),

                                  // Texture
                                  uSampler:        sGlobal('uniform sampler2D uSampler'),
                                  vTextureCoord:   sGlobal('varying highp vec2 vTextureCoord'),
                                  uColor:          sGlobal('uniform lowp vec4 uColor'),

                                  // --- Locals ---
                                  iVertexPosition: sLocal('highp vec4 iVertexPosition'),
                                  iFragColor:      sLocal('lowp vec4 iFragColor') })

    p.connect(BasicMaterialComponent)
    p.connect(BasicLightingComponent)

    super(ColorLightingTextureMaterial, pipeline.vertex, pipeline.fragment)

    this.color = opts.color

    if (opts.src != null) {
      this.texture = new Texture(opts.src)
    }

    // These need to start being set automagically.
    this.modelMatrix = this.program.uniform('modelMatrix')
    this.viewMatrix = this.program.uniform('viewMatrix')
    this.projectionMatrix = this.program.uniform('projectionMatrix')
    this.uColor = this.program.uniform('uColor')
    this.uNormalMatrix = this.program.uniform('uNormalMatrix')
    this.aPosition = this.program.attr('aPosition')
    this.aNormal = this.program.attr('aNormal')
    this.uSampler = this.program.uniform('uSampler')
    this.aTextureCoord = this.program.attr('aTextureCoord')
  }

  static get defaultOpts() {
    return { color: new Color(1.0, 1.0, 1.0, 1.0),
             src: null }
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

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(this.aNormal, VERTEX_SIZE, gl.FLOAT, gl.FALSE, 0, this.target.normalsIndex);

    // Pass variables into program
    gl.uniform4fv(this.uColor, this.color.toVector())
    gl.uniformMatrix4fv(this.modelMatrix, gl.FALSE, new Float32Array(m))
    gl.uniformMatrix4fv(this.viewMatrix, gl.FALSE, new Float32Array(v))
    gl.uniformMatrix4fv(this.projectionMatrix, gl.FALSE, new Float32Array(p))
    gl.uniformMatrix4fv(this.uNormalMatrix, gl.FALSE, new Float32Array(normalMatrix))

    if (this.texture) {
      this.texture.bind(this.uSampler)
    }

    // Draw elements
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.drawElements(gl.TRIANGLES,
                    this.target.indices.length,
                    gl.UNSIGNED_BYTE,
                    this.target.indicesIndex)

    // Disable attributes
    gl.disableVertexAttribArray(this.aPosition)
    gl.disableVertexAttribArray(this.aTextureCoord)
    gl.disableVertexAttribArray(this.aNormal)
  }
}

ColorLightingTextureMaterial.program = null