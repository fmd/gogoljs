import { TextureMaterial } from './texture_material'
import { Texture } from './texture'
import { Quad } from './quad'

let calculateTexCoords = function() {
  return [0.0,  0.0,
          0.0,  1.0,
          1.0,  1.0,
          1.0,  0.0]
}

export class Sprite extends Quad {
  constructor(opts = Sprite.defaultOpts()) {
    super(opts.width, opts.height)
    this.texCoords = calculateTexCoords(opts.width, opts.height)
    this.useMaterial(new TextureMaterial({ src: opts.src }))
  }

  static get defaultOpts() {
    return { width: 32, height: 32, src: null }
  }
}