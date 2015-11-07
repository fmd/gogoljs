import { gl } from '../core/engine'
import { Attribute } from './attribute'

export class VertexSource {
  constructor(attributes) {
    this.attributes = attributes
  }

  matrices() {
    return `uniform mat4 uPMatrix;\n` +
           `uniform mat4 uVMatrix;\n` +
           `uniform mat4 uMMatrix;\n` +
           `uniform mat4 uNMatrix;\n` +
           `uniform mat4 uMVMatrix;\n`
  }

  methods() {
    let methods = ``

    for (let attribute of this.attributes) {
      methods += attribute.methods + `\n`
    }

    return methods
  }

  main() {
    let def = `void main() {\n`

    for (let attribute of this.attributes) {
      def += attribute.vertexMain + '\n'
    }

    def += `}\n`
    return def
  }

  declarations() {
    let s = ''
    for (let attribute of this.attributes) {
      s += attribute.declaration + '\n'
    }
    return s + `\n`
  }

  asString() {
    let r = this.matrices() + this.declarations() + this.methods() + this.main()
    return r
  }
}