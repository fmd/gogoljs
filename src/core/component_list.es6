export class ComponentList extends Array {
  flatten() {
    let components = []
    for (let c of this) {
      components.push(c)
      components = components.concat(c.children.flatten())
    }
    return components
  }
}