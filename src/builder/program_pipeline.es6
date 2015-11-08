import { map, compact } from 'lodash'
import { ShaderGlobal } from './shader_global'
import { ShaderLocal } from './shader_local'

export class ProgramPipeline {
  constructor(requires) {
    this.requires = requires
    this.components = []
  }

  connect(componentClass) {
    this.components.push(new componentClass(this.requires))
    console.log(this.components)
  }

  static get matrices() {
    return { uProjectionMatrix: ShaderGlobal.uProjectionMatrix,
             uViewMatrix:       ShaderGlobal.uViewMatrix,
             uModelMatrix:      ShaderGlobal.uModelMatrix,
             uModelViewMatrix:  ShaderGlobal.uModelViewMatrix }
  }

  static get attributes() {
    return { aVertexPosition: ShaderGlobal.aVertexPosition,
             aVertexNormal:   ShaderGlobal.aVertexNormal,
             aTextureCoord:   ShaderGlobal.aTextureCoord }
  }

  main(calls) {
    return [`void main() {`, `  ${calls}`, `}`].join(`\n`)
  }

  get vertex() {
    let calls = map(this.components, (c) => {
      return c.vertexComponent.methodCall
    }).join(`\n  `)

    let methods = compact(map(this.components, (c) => { return c.vertexComponent.method })).join(`\n`)
    return `${methods}\n${this.main(calls)}`
  }

  get fragment() {
    let calls = compact(map(this.components, (c) => {
      return c.fragmentComponent.methodCall
    })).join(`\n  `)

    let methods = compact(map(this.components, (c) => { return c.fragmentComponent.method })).join(`\n`)
    return `${methods}\n${this.main(calls)}`
  }
}