import { ComponentList } from './component_list'

export class Component {
  constructor() {
    this.parent = null
    this.children = new ComponentList()
  }

  addChild(component) {
    component.parent = this
    this.children.push(component)
  }

  render() {

  }
}