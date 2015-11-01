// Let's push this way of doing things to the limit before we refactor.

import { vec3, mat4 } from 'gl-matrix'
import { Color } from '../core/color'
import { gl, VERTEX_SIZE, TEX_COORD_SIZE } from '../core/engine'
import { Texture } from '../core/texture'
import { Material } from '../core/material'

let vertexSrc = `
  uniform   mat4 projectionMatrix;
  uniform   mat4 viewMatrix;
  uniform   mat4 modelMatrix;
  uniform   mat4 uNormalMatrix;

  attribute highp vec3 aNormal;
  attribute highp vec3 aPosition;
  attribute highp vec2 aTextureCoord;

  varying highp vec3 vLighting;
  varying highp vec2 vTextureCoord;

  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);

    highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
    highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
    highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);

    highp vec4 transformedNormal = uNormalMatrix * vec4(aNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

    vLighting = ambientLight + (directionalLightColor * directional);
    vTextureCoord = aTextureCoord;
  }`

let fragmentSrc = `
  uniform lowp vec4 uColor;
  varying highp vec3 vLighting;
  varying highp vec2 vTextureCoord;
  uniform sampler2D uSampler;

  void main() {
    highp vec4 t = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor =  vec4(uColor.rgb * vLighting * t.rgb, t.a);
  }`

  export class ColorLightingTextureMaterial extends Material {
  constructor(opts = ColorLightingTextureMaterial.defaultOpts) {
    super(ColorLightingTextureMaterial, vertexSrc, fragmentSrc)

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