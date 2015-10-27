import { gl } from './engine'

export class Texture {
  constructor(src) {
    var texture = gl.createTexture()
    var image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D)

      // Bind
      gl.bindTexture(gl.TEXTURE_2D, null)
    }

    image.src = src
    this._image = image
    this._texture = texture
  }

  get texture() {
    return this._texture
  }

  bind(sampler) {
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this._texture)
    gl.uniform1i(sampler, 0)
  }
}