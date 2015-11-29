import { vec3, mat4 } from 'gl-matrix'
import { Color } from '../core/color'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE, SHORT_SIZE, RGBA_SIZE } from '../core/engine'
import { Texture } from '../core/texture'
import { Material } from '../core/material'
import { ProgramPipeline } from '../builder/program/pipeline'
import { BasicMaterialComponent } from '../builder/components/basic_material'
import { BasicLightingComponent } from '../builder/components/basic_lighting'
import { ShaderGlobal } from '../builder/shader/global'
import { ShaderLocal } from '../builder/shader/local'

export class ColorLightingTextureMaterial extends Material {
  constructor(opts = ColorLightingTextureMaterial.defaultOpts) {
    let sGlobal = (s) => { return ShaderGlobal.fromString(s) }
    let sLocal = (s) => { return ShaderLocal.fromString(s) }

    let p = new ProgramPipeline(
      { // --- Globals ---
        ...ProgramPipeline.matrices,
        ...ProgramPipeline.attributes,

        // Lighting
        uNormalMatrix:      sGlobal('uniform mat4 uNormalMatrix'),
        vLighting:          sGlobal('varying highp vec3 vLighting'),
        uAmbientColor:      sGlobal('uniform highp vec3 uAmbientColor'),
        uDirectionalColor:  sGlobal('uniform highp vec3 uDirectionalColor'),
        uDirectionalVector: sGlobal('uniform highp vec3 uDirectionalVector'),

        // Texture
        uSampler:           sGlobal('uniform sampler2D uSampler'),
        vTextureCoord:      sGlobal('varying highp vec2 vTextureCoord'),

        // Color
        aVertexColor:       sGlobal('attribute highp vec4 aVertexColor'),
        vVertexColor:       sGlobal('varying highp vec4 vVertexColor') },

      { // --- Locals ---
        iVertexPosition:    sLocal('highp vec4 iVertexPosition'),
        iFragColor:         sLocal('lowp vec4 iFragColor') },

      { // --- Connections ---
        vertex:   { gl_Position:  'iVertexPosition' },
        fragment: { gl_FragColor: 'iFragColor' } })

    p.pipe(BasicMaterialComponent)
    p.pipe(BasicLightingComponent)

    super(ColorLightingTextureMaterial, p.vertex, p.fragment)

    this.color = opts.color

    if (opts.src != null) {
      this.texture = new Texture(opts.src)
    }

    // These need to start being set automagically.
    this.modelMatrix = this.program.uniform('uModelMatrix')
    this.viewMatrix = this.program.uniform('uViewMatrix')
    this.projectionMatrix = this.program.uniform('uProjectionMatrix')
    this.uNormalMatrix = this.program.uniform('uNormalMatrix')
    this.aColor = this.program.attr('aVertexColor')
    this.aPosition = this.program.attr('aVertexPosition')
    this.aNormal = this.program.attr('aVertexNormal')
    this.uSampler = this.program.uniform('uSampler')
    this.aTextureCoord = this.program.attr('aTextureCoord')
    this.uAmbientColor = this.program.uniform('uAmbientColor')
    this.uDirectionalVector = this.program.uniform('uDirectionalVector')
    this.uDirectionalColor = this.program.uniform('uDirectionalColor')
  }

  static get defaultOpts() {
    return { src: null }
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

    // Pass variables into program
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

ColorLightingTextureMaterial.program = null