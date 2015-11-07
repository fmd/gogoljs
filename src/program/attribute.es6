class VirtualAttribute {
  constructor(attrType, type, name, precision) {
    this.attrType = attrType   // attribute
    this.precision = precision // highp
    this.type = type           // vec3
    this.name = name           // position

    this.methods = ``      // methods
    this.vertexMain = ``   // vertex main function addition
    this.fragmentMain = `` // fragment main function addition
  }

  get declaration() {
    this.attrType + ' ' + this.precision + ' ' + this.type + ' ' + this.name + ';'
  }
}

export class Uniform extends VirtualAttribute {
  constructor(type, name, precision = 'lowp') {
    super('uniform', type, name, precision)
  }
}

export class Attribute extends VirtualAttribute {
  constructor(type, name, precision = 'lowp') {
    super('attribute', type, name, precision)
  }

  static get position() {
    let p = new Attribute('vec3', 'aPosition', 'highp')
    p.vertexMain = 'gl_Position = uPMatrix * uMVMatrix * aPosition;'
    return p
  }

  static get normal() {
    let n = new Attribute('vec3', 'aNormal', 'highp')
  }

  static get uv() {
    let u = new Attribute('vec3', 'aTexCoord', 'highp')
  }
}