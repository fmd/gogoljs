import { uniq, map, flatten, compact, reduce } from 'lodash'

export class ProgramBuilder {
  constructor() {
    this.components = []
  }

  add(c) {
    this.components.push(c)
  }

  remove(c) {
    this.components.splice(this.components.indexOf(c), 1)
  }

  mainCall(conns, calls) {
    return [`void main() {`, `  ${calls}`, `  ${conns}`, `}`].join(`\n`)
  }

  get vertexMain() {
    let conns = map(this.components, (c) => { return c.vertexComponent.connections })
    conns = reduce(conns, (merged, toMerge) => { return {...merged, ...toMerge } }, {})
    conns = map(conns, (o, i) => { return `${i} = ${o};` }).join(`\n`)

    let calls = map(this.components, (c) => {
      return c.vertexComponent.methodCall
    }).join(`\n  `)

    return this.mainCall(conns, calls)
  }

  get fragmentMain() {
    let conns = map(this.components, (c) => { return c.fragmentComponent.connections })
    conns = reduce(conns, (merged, toMerge) => { return {...merged, ...toMerge } }, {})
    conns = map(conns, (o, i) => { return `${i} = ${o};` }).join(`\n`)

    let calls = compact(map(this.components, (c) => {
      return c.fragmentComponent.methodCall
    })).join(`\n  `)

    return this.mainCall(conns, calls)
  }

  get vertexComponent() {
    let vars = uniq(map(this.components, (c) => { return c.vertexComponent.vars }))
    let mapped_vars = map(flatten(vars), (v) => { return v.glsl }).join('')
    let methods = compact(map(this.components, (c) => { return c.vertexComponent.method })).join(`\n`)

    return `${mapped_vars}\n${methods}\n${this.vertexMain}`
  }

  get fragmentComponent() {
    let vars = uniq(map(this.components, (c) => { return c.fragmentComponent.vars }))
    let mapped_vars = map(flatten(vars), (v) => { return v.glsl }).join('')
    let methods = compact(map(this.components, (c) => { return c.fragmentComponent.method })).join(`\n`)

    return `${mapped_vars}\n${methods}\n${this.fragmentMain}`
  }
}