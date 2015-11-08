import { map, intersection, difference, uniq, filter } from 'lodash'
import { ShaderGlobal } from './global'

export class ShaderComponent {
  constructor(name, main, inputs = [], outputs = []) {
    this.name = name
    this.main = main
    this.inputs = inputs
    this.outputs = outputs
  }

  get locals() {
    return filter(uniq([...this.inputs, ...this.outputs]), (v) => {
      return v.constructor.name == 'ShaderLocal'
    })
  }

  get globals() {
    return filter(uniq([...this.inputs, ...this.outputs]), (v) => {
      return v.constructor.name == 'ShaderGlobal'
    })
  }

  get args() {
    let inputs = map(difference(this.inputs, this.outputs), (v) => { return v.input })
    let outputs = map(difference(this.outputs, this.inputs), (v) => { return v.output })
    let inouts = map(intersection(this.inputs, this.outputs), (v) => { return v.inout })
    return [...inputs, ...outputs, ...inouts].join(', ')
  }

  get callArgs() {
    let inputs = map(difference(this.inputs, this.outputs), (v) => { return v.name })

    let outputs = map(difference(this.outputs, this.inputs), (v) => { return v.name })
    let inouts = map(intersection(this.inputs, this.outputs), (v) => { return v.name })
    return [...inputs, ...outputs, ...inouts].join(', ')
  }

  get methodCall() {
    if (!this.main) {
      return ``
    }

    return `${this.name}(${this.callArgs});`
  }

  get method() {
    if (!this.main) {
      return ``
    }

    return [`void ${this.name}(${this.args}) {`,
            `${this.main}`,
            `}`].join(`\n`)
  }
}