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
  constructor(width, height, texture) {
    super(width, height)
    this.texCoords = calculateTexCoords(width, height)
    this.useMaterial(new TextureMaterial({ texture: texture }))
  }
}