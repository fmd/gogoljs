import { Transform } from './transform'

export class Renderable extends Transform {
  constructor() {
    super()
    this.material = null
    this.vertices = []
    this.indices = []
  }
}