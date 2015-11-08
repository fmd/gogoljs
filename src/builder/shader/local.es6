import { ShaderGlobal } from './global'

export class ShaderLocal extends ShaderGlobal {
  constructor(dataType, name, precision = null) {
    super(null, dataType, name, precision)
  }

  static fromString(s) {
    let parts = s.split(' ')
    if (parts.length == 2) {
      return new ShaderLocal(...parts)
    }

    return new ShaderLocal(parts[1], parts[2], parts[0])
  }
}