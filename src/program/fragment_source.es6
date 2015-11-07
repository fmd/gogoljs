import { gl } from '../core/engine'
import { Attribute } from './attribute'

export class FragmentSource {
  constructor(attributes) {
    this.attributes = attributes
  }

  prefix() {
    ``
  }

  matrices() {
    ``
  }

  attributes() {
    s = ''
    for (attribute of this.attributes) {
      s += attribute.fragmentComponent + '\n'
    }
    return s
  }
}