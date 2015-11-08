import { map, compact, uniq, flatten } from 'lodash'
import { ShaderGlobal } from './shader_global'
import { ShaderLocal } from './shader_local'

export class ProgramPipeline {
  constructor(globals, locals, connections) {
    this.components = []
    this.globals = globals
    this.locals = locals
    this.requires = {...globals, ...locals}
    this.connections = connections
  }

  pipe(componentClass) {
    this.components.push(new componentClass(this.requires))
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

  main(calls, conns, locals) {
    return [`void main() {`, `  ${locals}`, `  ${calls}`, `  ${conns}`,  `}`].join(`\n`)
  }

  conns(shader) {
    return map(this.connections[shader], (i, o) => { return `${o} = ${i};` }).join(`\n  `)
  }

  get vertexPrefix() {
    return ``
  }

  get fragmentPrefix() {
    return `precision mediump float;`
  }

  get vertex() {
    let vertexGlobals = map(this.components, (c) => { return c.vertexComponent.globals })
    vertexGlobals = uniq(map(flatten(vertexGlobals), (v) => { return v.glsl })).join(`\n`)

    let vertexLocals = map(this.components, (c) => { return c.vertexComponent.locals })
    vertexLocals = uniq(map(flatten(vertexLocals), (v) => { return v.glsl })).join(`\n  `)

    let calls = map(this.components, (c) => {
      return c.vertexComponent.methodCall
    }).join(`\n  `)

    let methods = compact(map(this.components, (c) => { return c.vertexComponent.method })).join(`\n`)

    return compact([
      this.vertexPrefix,
      vertexGlobals,
      methods,
      this.main(calls, this.conns('vertex'), vertexLocals)
    ]).join(`\n`)
  }

  get fragment() {
    let fragmentGlobals = map(this.components, (c) => { return c.fragmentComponent.globals })
    fragmentGlobals = uniq(map(flatten(fragmentGlobals), (v) => { return v.glsl })).join(`\n`)

    let fragmentLocals = map(this.components, (c) => { return c.fragmentComponent.locals })
    fragmentLocals = uniq(map(flatten(fragmentLocals), (v) => { return v.glsl })).join(`\n  `)

    let calls = compact(map(this.components, (c) => {
      return c.fragmentComponent.methodCall
    })).join(`\n  `)

    let methods = compact(map(this.components, (c) => { return c.fragmentComponent.method })).join(`\n`)

    return compact([
      this.fragmentPrefix,
      fragmentGlobals,
      methods,
      this.main(calls, this.conns('fragment'), fragmentLocals)
    ]).join(`\n`)
  }
}