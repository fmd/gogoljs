export class Color {
  constructor(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  static fromHex(hex) {
    hex = hex.replace('#','')
    let r = parseInt(hex.substring(0,2), 16) / 255
    let g = parseInt(hex.substring(2,4), 16) / 255
    let b = parseInt(hex.substring(4,6), 16) / 255
    let a = 1.0
    return new Color(r, g, b, a)
  }

  static get black() {
    return new Color(0.0, 0.0, 0.0, 1.0)
  }

  static get white() {
    return new Color(1.0, 1.0, 1.0, 1.0)
  }

  toVector() {
    return new Float32Array([this.r, this.g, this.b, this.a])
  }
}