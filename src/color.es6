export class color {
  init(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  static get black() {
    return new color(0.0, 0.0, 0.0, 1.0)
  }

  static get white() {
    return new color(1.0, 1.0, 1.0, 1.0)
  }
}