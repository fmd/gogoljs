import { Transform } from './transform'

export class Renderable extends Transform {
  constructor() {
    super()
    this.material = null
    this.vertices = null
    this.indices = null
  }
}