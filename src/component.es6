export class Component {
  constructor() {
    this.parent = null
    this.children = []
  }

  addChild(component) {
    component.parent = this
    this.children.push(component);
  }
}