import { map, compact, uniq, flatten } from 'lodash'
import { ShaderGlobal } from '../shader/global'
import { ShaderLocal } from '../shader/local'

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
    return this._source('vertex')
  }

  get fragment() {
    return this._source('fragment')
  }

  _source(shader) {
    let cpt = (c, shader) => { return c[`${shader}Component`] }

    let globals;
    globals = map(this.components, (c) => { return cpt(c, shader).globals })
    globals = uniq(map(flatten(globals), (v) => { return v.glsl })).join(`\n`)

    let locals;
    locals = map(this.components, (c) => { return cpt(c, shader).locals })
    locals = uniq(map(flatten(locals), (v) => { return v.glsl })).join(`\n  `)

    let calls = compact(map(this.components, (c) => {
      return cpt(c, shader).methodCall
    })).join(`\n  `)

    let methods = compact(map(this.components, (c) => { return cpt(c, shader).method })).join(`\n`)

    let main = this.main(calls, this.conns(shader), locals)

    return compact([this[`${shader}Prefix`], globals, methods, main]).join(`\n`)
  }
}