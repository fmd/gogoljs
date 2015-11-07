import { map, intersection, difference, uniq } from 'lodash'
import { ShaderVar } from './shader_var'

export class ShaderComponent {
  constructor(name, main, inputs = [], outputs = [], connections = {}) {
    this.name = name
    this.main = main
    this.inputs = inputs
    this.outputs = outputs
    this.connections = connections
  }

  static get matrices() {
    return [ ShaderVar.uProjectionMatrix,
             ShaderVar.uViewMatrix,
             ShaderVar.uModelMatrix ]
  }

  get vars() {
    return uniq([...this.inputs, ...this.outputs])
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