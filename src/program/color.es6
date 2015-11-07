import { Attribute } from './attribute'
import { VertexSource } from './vertex_source'
import { Color } from '../core/color'

export class ColorProgram {
  constructor(color = Color.white) {
    this.attributes = [Attribute.position]

    let v = new VertexSource(this.attributes)
    console.log(v.asString())
  }
}